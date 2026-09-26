import { Injectable } from '@nestjs/common';

interface ClusterableItem {
  readonly id: string;
  readonly values: readonly number[];
}

interface ClusterResult {
  readonly index: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

@Injectable()
export class ClusteringEngineService {
  kmeans(items: readonly ClusterableItem[], k: number, maxIterations = 100): readonly ClusterResult[] {
    if (k <= 0 || items.length === 0) return [];
    const dim = items[0].values.length;
    let centroids = items.slice(0, k).map((i) => [...i.values]);
    let assignments = new Array(items.length).fill(0);

    for (let iter = 0; iter < maxIterations; iter++) {
      const newAssign = items.map((item) => this.nearest(item.values, centroids));
      if (this.same(assignments, newAssign)) { assignments = newAssign; break; }
      assignments = newAssign;
      centroids = this.recompute(items, assignments, k, dim);
    }
    return this.build(items, assignments, centroids);
  }

  private nearest(values: readonly number[], centroids: number[][]): number {
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      const d = this.sqDist(values, centroids[i]);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }

  private sqDist(a: readonly number[], b: readonly number[]): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; s += d * d; }
    return s;
  }

  private same(a: readonly number[], b: readonly number[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  private recompute(items: readonly ClusterableItem[], assignments: readonly number[], k: number, dim: number): number[][] {
    const sums = Array.from({ length: k }, () => new Array(dim).fill(0));
    const counts = new Array(k).fill(0);
    items.forEach((item, i) => {
      const c = assignments[i];
      counts[c]++;
      for (let d = 0; d < dim; d++) sums[c][d] += item.values[d];
    });
    return sums.map((s, i) => (counts[i] === 0 ? s : s.map((v) => v / counts[i])));
  }

  private build(items: readonly ClusterableItem[], assignments: readonly number[], centroids: number[][]): readonly ClusterResult[] {
    return centroids.map((centroid, i) => ({
      index: i,
      memberIds: items.filter((_, idx) => assignments[idx] === i).map((it) => it.id),
      centroid,
    }));
  }
}
