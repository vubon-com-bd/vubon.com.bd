export interface VectorDocument {
  readonly documentId: string;
  readonly embedding: readonly number[];
}

export interface SearchMatch {
  readonly documentId: string;
  readonly score: number;
}

export class SemanticSearchService {
  private cosine(a: readonly number[], b: readonly number[]): number {
    if (a.length !== b.length) return 0;
    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  search(
    queryEmbedding: readonly number[],
    documents: readonly VectorDocument[],
    topN: number,
    threshold = 0.0,
  ): readonly SearchMatch[] {
    return documents
      .map((doc) => ({
        documentId: doc.documentId,
        score: this.cosine(queryEmbedding, doc.embedding),
      }))
      .filter((m) => m.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }
}
