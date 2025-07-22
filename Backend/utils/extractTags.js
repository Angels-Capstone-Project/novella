export function extractTagsFromContent(content, options = {}) {
  const stopWords = new Set([
    "the",
    "is",
    "and",
    "a",
    "an",
    "in",
    "on",
    "to",
    "with",
    "it",
    "this",
    "that",
    "was",
    "for",
    "are",
    "as",
    "of",
    "but",
    "at",
    "by",
    "from",
    "be",
  ]);

  const minWordLength = options.minWordLength || 4;
  const minFrequency = options.minFrequency || 2;
  const maxTags = options.maxTags || 5;

  // removes common suffixes
  const normalizeWord = (word) => {
    return word
      .replace(/(ing|ed|s)$/i, "") 
      .replace(/(.)\1{2,}/g, "$1");
  };

  const words = content
    .replace(/[^\w\s]/g, "") // remove punctuation
    .toLowerCase()
    .split(/\s+/)
    .map(normalizeWord)
    .filter((word) => word.length >= minWordLength && !stopWords.has(word));

  const freqMap = {};

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Weight words closer to the beginning of the content slightly more
    const positionWeight = 1 + Math.max(0, 100 - i) / 200;
    freqMap[word] = (freqMap[word] || 0) + positionWeight;
  }

  const sorted = Object.entries(freqMap)
    .filter(([_, count]) => count >= minFrequency)
    .sort((a, b) => b[1] - a[1]);

   
  return sorted.slice(0, maxTags).map(([word]) => word);
  
}
