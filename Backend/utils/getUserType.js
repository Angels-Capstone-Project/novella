export function getUserType({
  likedStoryIds = [],
  readStoryIds = [],
  engagementData = {},
}) {
  const totalInteractions =
    (likedStoryIds?.length || 0) +
    (readStoryIds?.length || 0) +
    Object.keys(engagementData || {}).length;

  if (totalInteractions <= 6) return "new";
  if (totalInteractions < 18) return "casual";
  return "power";
}
