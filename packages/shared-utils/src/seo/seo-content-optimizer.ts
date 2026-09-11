export interface SEOKeywordData {
  keyword: string;
}

export interface ContentOptimizationResult {
  optimizedContent: string;
  suggestions: string[];
}

export const optimizeContent = (
  content: string,
  keywords: SEOKeywordData[]
): ContentOptimizationResult => {
  const optimized = content;
  const suggestions: string[] = [];
  for (const keyword of keywords) {
    if (!content.toLowerCase().includes(keyword.keyword.toLowerCase())) {
      suggestions.push(`Add keyword: ${keyword.keyword}`);
    }
  }
  return { optimizedContent: optimized, suggestions };
};

export const checkKeywordDensity = (content: string, keyword: string): number => {
  const words = content.split(' ');
  if (words.length === 0) return 0;
  const keywordCount = words.filter((w) => w.toLowerCase() === keyword.toLowerCase()).length;
  return (keywordCount / words.length) * 100;
};

export const getReadabilityScore = (content: string): number => {
  void content;
  return 70;
};
