export interface IndexEntry {
  readonly vectorId: string;
  readonly values: readonly number[];
}

export interface IndexSearchResult {
  readonly vectorId: string;
  readonly distance: number;
}

export class VectorIndexService {
  /**
   * Brute-force k-NN search (for tests/small datasets).
   * In production, this delegates to the vector DB adapter.
   */
  search(
    query: readonly number[],
    entries: readonly IndexEntry[],
    topK: number,
    metric: 'cosine' | 'euclidean' = 'cosine',
  ): readonly IndexSearchResult[] {
    const scored = entries.map((e) => ({
      vectorId: e.vectorId,
      distance: this.distance(query, e.values, metric),
    }));

    return scored
      .sort((a, b) => a.distance - b.distance)
      .slice(0, topK);
  }

  private distance(
    a: readonly number[],
    b: readonly number[],
    metric: 'cosine' | 'euclidean',
  ): number {
    if (a.length !== b.length) {
      throw new Error('VectorIndex: dimension mismatch');
    }

    if (metric === 'euclidean') {
      let sum = 0;
      for (let i = 0; i < a.length; i++) {
        const diff = a[i] - b[i];
        sum += diff * diff;
      }
      return Math.sqrt(sum);
    }

    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 1;
    return 1 - dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }
}
