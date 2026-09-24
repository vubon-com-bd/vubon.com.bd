export class KeywordExtractionService {
  extract(text: string, max = 10): readonly string[] {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
      'to', 'of', 'in', 'on', 'at', 'for', 'with', 'this', 'that',
    ]);
    const words = text
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));
    const freq = new Map<string, number>();
    for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, max)
      .map(([w]) => w);
  }
}
