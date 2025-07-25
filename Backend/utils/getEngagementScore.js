export function getEngagementScore(duration) {
  const s30 = parseInt(process.env.ENGAGEMENT_SCORE_30 || "3", 10);
  const s20 = parseInt(process.env.ENGAGEMENT_SCORE_20 || "2", 10);
  const s10 = parseInt(process.env.ENGAGEMENT_SCORE_10 || "1", 10);
  const below = parseInt(process.env.ENGAGEMENT_SCORE_BELOW || "0", 10);

  if (duration >= 30) return s30;
  if (duration >= 20) return s20;
  if (duration >= 10) return s10;
  return below;
}
