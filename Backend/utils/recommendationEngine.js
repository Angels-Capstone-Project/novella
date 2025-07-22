import { extractTagsFromContent } from "../utils/extractTags.js";


function daysSince(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now.getTime() - then.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

// Manual age calculation from birthday
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

// Compute engagement score based on time spent (seconds)
function getEngagementScore(duration) {
  if (duration >= 30) return 3;
  if (duration >= 20) return 2;
  if (duration >= 10) return 1;
  return 0;
}

// Extract tags from chapters + story content
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

  const scoredStories = [];

  for (const story of allStories) {
    // Skip stories the user has already read or liked
    if ( user.id && story.authorId === user.id) {continue};
    if (readStoryIds.includes(story.id) || likedStoryIds.includes(story.id)) {
      continue;
    }

    // Skip stories with no published chapters
    const hasPublished = story.chapters.some((ch) => ch.isPublished);
    if (!hasPublished) continue;

    let score = 0;

    
    const userLikedTags = likedStoryIds
      .map((id) => {
        const s = allStories.find((st) => st.id === id);
        return s ? getSystemTags(s) : [];
      })
      .flat();

    const storyTags = getSystemTags(story);
    const matchingTags = storyTags.filter((tag) => userLikedTags.includes(tag));
    score += matchingTags.length * 3;

    // 2. AUDIENCE MATCH (weight: 5 - for new users)
    if (likedStoryIds.length === 0 && readStoryIds.length === 0) {
      if (allowedAudience.includes(story.audience)) {
        score += 5;
      }
    }

    // 3. ENGAGEMENT SIMILARITY (weight: 2)
    const similarEngagement = Object.entries(engagementData)
      .map(([id, { duration }]) => {
        const s = allStories.find((st) => st.id === id);
        if (!s) return 0;
        const sTags = getSystemTags(s);
        const overlap = storyTags.filter((t) => sTags.includes(t));
        return overlap.length * getEngagementScore(duration);
      })
      .reduce((a, b) => a + b, 0);
    score += similarEngagement * 2;

    // 4. READ-BY SIMILARITY (weight: 1 per overlap)
    const usersWhoRead = story.readBy || [];
    const userOverlap = usersWhoRead.includes(user.id) ? 0 : 1;
    score += userOverlap;

    // 5. LIKED-BY SIMILARITY (weight: 2 per overlap)
    const usersWhoLiked = story.likedBy || [];
    const likeOverlap = usersWhoLiked.includes(user.id) ? 0 : 2;
    score += likeOverlap;

    scoredStories.push({ story, score });
  }

  const sorted = scoredStories.sort((a, b) => b.score - a.score);


  const recommendations = sorted.map((s) => s.story).slice(0, 10);

  return recommendations;
}
