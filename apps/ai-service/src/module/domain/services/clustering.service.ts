export interface ClusterableItem {
  readonly id: string;
  readonly values: readonly number[];
}

export interface Cluster {
  readonly index: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

export class ClusteringService {
  /**
   * Simple k-means clustering.
   */
  kmeans(
    items: readonly ClusterableItem[],
    k: number,
    maxIterations = 100,
  ): readonly Cluster[] {
    if (k <= 0) throw new Error('Clustering: k must be >= 1');
    if (items.length === 0) return [];

    const dimension = items[0].values.length;
    for (const item of items) {
      if (item.values.length !== dimension) {
        throw new Error('Clustering: inconsistent vector dimensions');
      }
    }

    let centroids = this.initializeCentroids(items, k, dimension);
    let assignments: number[] = new Array(items.length).fill(0);

    for (let iter = 0; iter < maxIterations; iter++) {
      const newAssignments = items.map((item) =>
        this.nearestCentroid(item.values, centroids),
      );

      if (this.assignmentsEqual(assignments, newAssignments)) {
        assignments = newAssignments;
        break;
      }
      assignments = newAssignments;
      centroids = this.recomputeCentroids(items, assignments, k, dimension);
    }

    return this.buildClusters(items, assignments, centroids, k);
  }

  private initializeCentroids(
    items: readonly ClusterableItem[],
    k: number,
    dimension: number,
  ): readonly (readonly number[])[] {
    const centroids: number[][] = [];
    for (let i = 0; i < k; i++) {
      const src = items[i % items.length];
      centroids.push([...src.values]);
    }
    void dimension;
    return centroids;
  }

  private nearestCentroid(
    values: readonly number[],
    centroids: readonly (readonly number[])[],
  ): number {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      const dist = this.squaredDistance(values, centroids[i]);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  }

  private squaredDistance(a: readonly number[], b: readonly number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i];
      sum += diff * diff;
    }
    return sum;
  }

  private assignmentsEqual(a: readonly number[], b: readonly number[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  private recomputeCentroids(
    items: readonly ClusterableItem[],
    assignments: readonly number[],
    k: number,
    dimension: number,
  ): readonly (readonly number[])[] {
    const sums: number[][] = Array.from({ length: k }, () =>
      new Array(dimension).fill(0),
    );
    const counts = new Array(k).fill(0);

    for (let i = 0; i < items.length; i++) {
      const c = assignments[i];
      counts[c]++;
      for (let d = 0; d < dimension; d++) {
        sums[c][d] += items[i].values[d];
      }
    }

    return sums.map((sum, idx) =>
      counts[idx] === 0
        ? sum
        : sum.map((s) => s / counts[idx]),
    );
  }

  private buildClusters(
    items: readonly ClusterableItem[],
    assignments: readonly number[],
    centroids: readonly (readonly number[])[],
    k: number,
  ): readonly Cluster[] {
    const clusters: Cluster[] = Array.from({ length: k }, (_, i) => ({
      index: i,
      memberIds: [],
      centroid: centroids[i] ?? [],
    }));

    items.forEach((item, idx) => {
      const cluster = clusters[assignments[idx]];
      (cluster.memberIds as string[]).push(item.id);
    });

    return clusters.map((c) => ({
      index: c.index,
      memberIds: Object.freeze([...c.memberIds]),
      centroid: Object.freeze([...c.centroid]),
    }));
  }
}
