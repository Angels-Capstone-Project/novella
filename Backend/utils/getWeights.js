function getEnv(key, fallback) {
  const value = process.env[key];
  return value ? parseInt(value, 10) : fallback;
}

export function getWeights(userType) {
  const upper = userType.toUpperCase();

  return {
    tagSimilarity: getEnv(`WEIGHT_TAG_SIMILARITY_${upper}`, 3),
    audienceMatch: getEnv(`WEIGHT_AUDIENCE_MATCH_${upper}`, 5),
    engagementSimilarity: getEnv(`WEIGHT_ENGAGEMENT_SIMILARITY_${upper}`, 2),
    readBySimilarity: getEnv(`WEIGHT_READBY_SIMILARITY_${upper}`, 1),
    likedBySimilarity: getEnv(`WEIGHT_LIKEDBY_SIMILARITY_${upper}`, 2),
  };
}
