/**
 * KeywordExtractionService — Extract significant keywords
 * @module support-service/domain/services
 */
const STOP_WORDS: ReadonlySet<string> = new Set([
  'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
  'a', 'an', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'about',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'my', 'your',
  'this', 'that', 'these', 'those', 'so', 'as', 'if', 'then', 'do',
  'does', 'did', 'have', 'has', 'had', 'will', 'would', 'should', 'can',
  'could', 'not', 'no', 'from', 'up', 'down', 'out', 'into', 'than',
]);

export interface Keyword {
  readonly word: string;
  readonly count: number;
}

export class KeywordExtractionService {
  extract(text: string, limit = 10): readonly Keyword[] {
    if (!text) return [];
    const tokens = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 3 && !STOP_WORDS.has(t));

    const freq = new Map<string, number>();
    for (const token of tokens) {
      freq.set(token, (freq.get(token) ?? 0) + 1);
    }
    return Array.from(freq.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
      .slice(0, limit);
  }

  topWord(text: string): string | null {
    const list = this.extract(text, 1);
    return list[0]?.word ?? null;
  }
}
