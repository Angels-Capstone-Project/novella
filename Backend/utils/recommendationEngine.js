import { extractTagsFromContent } from "../utils/extractTags.js";
import { getUserType } from "../utils/getUserType.js";
import { getWeights } from "../utils/getWeights.js";
import { getMultipliers } from "../utils/getMultipliers.js";
import { getEngagementScore } from "../utils/getEngagementScore.js";

function calculateAge(birthdayString) {
  const today = new Date();
  const birthDate = new Date(birthdayString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getAllowedAudience(age) {
  if (age < 13) return ["Everyone"];
  if (age >= 13 && age < 18) return ["Everyone", "Teens"];
  return ["Everyone", "Teens", "Mature"];
}

function getSystemTags(story) {
  const storyTags = extractTagsFromContent(story.content || "");
  const chapterTags = story.chapters
    .map((ch) => extractTagsFromContent(ch.content || ""))
    .flat();
  return [...new Set([...storyTags, ...chapterTags])];
}

export function generateRecommendations({
  allStories,
  user,
  likedStoryIds = [],
  readStoryIds = [],
  engagementData = {},
}) {
  const age = calculateAge(user.birthday);
  const allowedAudience = getAllowedAudience(age);

  const userType = getUserType({ likedStoryIds, readStoryIds, engagementData });
  const weights = getWeights(userType);
  const multipliers = getMultipliers();

  const scoredStories = [];

  for (const story of allStories) {
    if (user.id && story.authorId === user.id) continue;
    if (readStoryIds.includes(story.id) || likedStoryIds.includes(story.id))
      continue;
    const hasPublished = story.chapters.some((ch) => ch.isPublished);
    if (!hasPublished) continue;

    let score = 0;

    // 1. TAG SIMILARITY
    const userLikedTags = likedStoryIds
      .map((id) => {
        const st = allStories.find((s) => s.id === id);
        return st ? getSystemTags(st) : [];
      })
      .flat();

    const storyTags = getSystemTags(story);
    const matchingTags = storyTags.filter((tag) => userLikedTags.includes(tag));
    score += matchingTags.length * weights.tagSimilarity * multipliers.tag;

    // 2. AUDIENCE MATCH
    if (likedStoryIds.length === 0 && readStoryIds.length === 0) {
      if (allowedAudience.includes(story.audience)) {
        score += 1 * weights.audienceMatch * multipliers.audience;
      }
    }

    // 3. ENGAGEMENT SIMILARITY
    const similarEngagement = Object.entries(engagementData)
      .map(([id, duration]) => {
        const s = allStories.find((st) => st.id === id);
        if (!s) return 0;
        const sTags = getSystemTags(s);
        const overlap = storyTags.filter((t) => sTags.includes(t));
        const engagementUnit = getEngagementScore(duration);
        return overlap.length * engagementUnit;
      })
      .reduce((a, b) => a + b, 0);
    score +=
      similarEngagement * weights.engagementSimilarity * multipliers.engagement;

    // 4. READ-BY SIMILARITY
    const usersWhoRead = story.readBy || [];
    const readScore = usersWhoRead.includes(user.id)
      ? 1 * weights.readBySimilarity * multipliers.read
      : 0;
    score += readScore;

    // 5. LIKED-BY SIMILARITY
    const usersWhoLiked = story.likedBy || [];
    const likeScore = usersWhoLiked.includes(user.id)
      ? 1 * weights.likedBySimilarity * multipliers.like
      : 0;
    score += likeScore;

    scoredStories.push({ story, score });
  }

  const sorted = scoredStories.sort((a, b) => b.score - a.score);
  return sorted.map((entry) => entry.story).slice(0, 10);
}
