export interface SearchSuggestionData {
  suggestionId: string;
  type: string;
  text: string;
  weight: number;
  count: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const generateSuggestions = (
  query: string,
  popularQueries: string[]
): SearchSuggestionData[] => {
  const suggestions: SearchSuggestionData[] = [];
  for (const popular of popularQueries) {
    if (popular.toLowerCase().includes(query.toLowerCase())) {
      suggestions.push({
        suggestionId: crypto.randomUUID(),
        type: 'popular',
        text: popular,
        weight: 1,
        count: 0,
        isActive: true,
        metadata: {},
      });
    }
  }
  return suggestions.slice(0, 10);
};
