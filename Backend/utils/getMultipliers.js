function getEnv(key, fallback) {
  const value = process.env[key];
  return value ? parseFloat(value) : fallback;
}

export function getMultipliers() {
  return {
    tag: getEnv("MULTIPLIER_TAG", 1),
    engagement: getEnv("MULTIPLIER_ENGAGEMENT", 1),
    read: getEnv("MULTIPLIER_READ", 1),
    like: getEnv("MULTIPLIER_LIKE", 1),
    audience: getEnv("MULTIPLIER_AUDIENCE", 1),
  };
}
