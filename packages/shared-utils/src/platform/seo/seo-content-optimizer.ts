export interface KeywordData {
  keyword: string;
}

export interface ContentOptimizationResult {
  optimizedContent: string;
  suggestions: string[];
}

export const optimizeSEOContent = (
  content: string,
  keywords: KeywordData[]
): ContentOptimizationResult => {
  const suggestions: string[] = [];
  for (const keyword of keywords) {
    if (!content.toLowerCase().includes(keyword.keyword.toLowerCase())) {
      suggestions.push(`Add keyword: ${keyword.keyword}`);
    }
  }
  return { optimizedContent: content, suggestions };
};

export const checkSEOKeywordDensity = (content: string, keyword: string): number => {
  const words = content.split(' ');
  if (words.length === 0) return 0;
  const keywordCount = words.filter((w) => w.toLowerCase() === keyword.toLowerCase()).length;
  return (keywordCount / words.length) * 100;
};

export const getSEOReadabilityScore = (content: string): number => {
  void content;
  return 70;
};
