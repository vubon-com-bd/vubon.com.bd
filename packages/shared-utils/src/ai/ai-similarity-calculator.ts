export const calculateCosineSimilarity = (v1: number[], v2: number[]): number => {
  if (v1.length !== v2.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  const dotProduct = v1.reduce((sum, v, i) => sum + v * v2[i], 0);
  const magnitude1 = Math.sqrt(v1.reduce((sum, v) => sum + v * v, 0));
  const magnitude2 = Math.sqrt(v2.reduce((sum, v) => sum + v * v, 0));
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

export const calculateEuclideanDistance = (v1: number[], v2: number[]): number => {
  if (v1.length !== v2.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  const diff = v1.map((v, i) => v - v2[i]);
  return Math.sqrt(diff.reduce((sum, v) => sum + v * v, 0));
};

export const calculateDotProduct = (v1: number[], v2: number[]): number => {
  if (v1.length !== v2.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  return v1.reduce((sum, v, i) => sum + v * v2[i], 0);
};

export const findMostSimilar = (query: number[], vectors: number[][]): number[][] => {
  const similarities = vectors.map((v) => ({
    vector: v,
    similarity: calculateCosineSimilarity(query, v),
  }));
  return similarities.sort((a, b) => b.similarity - a.similarity).map((item) => item.vector);
};
