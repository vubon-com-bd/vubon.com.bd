export interface AutocompleteData {
  autocompleteId: string;
  type: string;
  text: string;
  weight: number;
  count: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const generateAutocomplete = (query: string, data: string[]): AutocompleteData[] => {
  const results: AutocompleteData[] = [];
  const prefix = query.toLowerCase();
  for (const item of data) {
    if (item.toLowerCase().startsWith(prefix)) {
      results.push({
        autocompleteId: crypto.randomUUID(),
        type: 'query',
        text: item,
        weight: 1,
        count: 0,
        isActive: true,
        metadata: {},
      });
    }
  }
  return results.slice(0, 10);
};
