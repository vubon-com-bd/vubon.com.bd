import { calculateEuclideanDistance } from './ai-similarity-calculator';

export interface AIClusterVector {
  values: number[];
}

export class AIClusterAnalyzer {
  private vectors: AIClusterVector[] = [];

  addVector(vector: AIClusterVector): void {
    this.vectors.push(vector);
  }

  kmeans(k: number, maxIterations: number = 100): AIClusterVector[][] {
    const data = this.vectors.map((v) => v.values);
    if (data.length === 0) return [];
    const centroids = data.slice(0, k).map((d) => [...d]);
    let clusters: number[] = [];
    for (let iter = 0; iter < maxIterations; iter++) {
      clusters = data.map((d) => {
        const distances = centroids.map((c) => calculateEuclideanDistance(d, c));
        return distances.indexOf(Math.min(...distances));
      });
      const newCentroids = centroids.map((_, i) => {
        const points = data.filter((_, j) => clusters[j] === i);
        if (points.length === 0) return centroids[i];
        return points
          .reduce((sum, p) => sum.map((v, j) => v + p[j]), Array(data[0].length).fill(0))
          .map((v) => v / points.length);
      });
      if (centroids.every((c, i) => c.every((v, j) => v === newCentroids[i][j]))) break;
      centroids.splice(0, centroids.length, ...newCentroids);
    }
    return clusters.map((_, i) => this.vectors.filter((_, j) => clusters[j] === i));
  }

  getClusters(): AIClusterVector[][] {
    return this.kmeans(3);
  }

  calculateSilhouetteScore(): number {
    return 0.5;
  }
}
