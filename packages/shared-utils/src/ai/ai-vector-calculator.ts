export interface AIVectorData {
  vectorId: string;
  aiId: string;
  type: string;
  indexType: string;
  dimensions: number;
  values: number[];
  metadata: Record<string, unknown>;
  isActive: boolean;
}

export const createVector = (values: number[], type: string = 'dense'): AIVectorData => {
  return {
    vectorId: crypto.randomUUID(),
    aiId: '',
    type,
    indexType: 'flat',
    dimensions: values.length,
    values,
    metadata: {},
    isActive: true,
  };
};

export const normalizeVector = (vector: number[]): number[] => {
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  if (magnitude === 0) return vector;
  return vector.map((v) => v / magnitude);
};

export const addVectors = (v1: number[], v2: number[]): number[] => {
  if (v1.length !== v2.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  return v1.map((v, i) => v + v2[i]);
};

export const subtractVectors = (v1: number[], v2: number[]): number[] => {
  if (v1.length !== v2.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  return v1.map((v, i) => v - v2[i]);
};
