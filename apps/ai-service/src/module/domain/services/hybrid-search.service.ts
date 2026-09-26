import { SemanticSearchService } from './semantic-search.service';

export interface KeywordMatch {
  readonly documentId: string;
  readonly score: number;
}

export interface SearchMatch {
  readonly documentId: string;
  readonly score: number;
}

export class HybridSearchService {
  constructor(private readonly semanticSearch: SemanticSearchService) {}

  /**
   * Combine semantic (vector) + keyword (BM25-like) results.
   */
  combine(
    semantic: readonly SearchMatch[],
    keyword: readonly KeywordMatch[],
    semanticWeight = 0.7,
  ): readonly SearchMatch[] {
    if (semanticWeight < 0 || semanticWeight > 1) {
      throw new Error('HybridSearch: weight must be in [0,1]');
    }

    const keywordWeight = 1 - semanticWeight;
    const merged = new Map<string, number>();

    for (const m of semantic) {
      merged.set(m.documentId, m.score * semanticWeight);
    }
    for (const m of keyword) {
      const current = merged.get(m.documentId) ?? 0;
      merged.set(m.documentId, current + m.score * keywordWeight);
    }

    return [...merged.entries()]
      .map(([documentId, score]) => ({ documentId, score }))
      .sort((a, b) => b.score - a.score);
  }
}
