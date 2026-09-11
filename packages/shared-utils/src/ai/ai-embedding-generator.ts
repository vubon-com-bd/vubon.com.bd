export interface AIEmbeddingData {
  embeddingId: string;
  aiId: string;
  type: string;
  model: string;
  dimensions: number;
  provider: { provider: string };
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const generateEmbedding = (text: string): number[] => {
  void text;
  return Array(768)
    .fill(0)
    .map(() => Math.random() - 0.5);
};

export const getEmbeddingDimensions = (model: string): number => {
  const dimensions: Record<string, number> = {
    'text-embedding-ada-002': 1536,
    'textembedding-gecko': 768,
    'embed-english-v2.0': 4096,
    'all-MiniLM-L6-v2': 384,
  };
  return dimensions[model] || 768;
};

export const createEmbeddingModel = (
  type: string,
  model: string,
  provider: string
): AIEmbeddingData => {
  return {
    embeddingId: crypto.randomUUID(),
    aiId: '',
    type,
    model,
    dimensions: getEmbeddingDimensions(model),
    provider: { provider },
    isActive: true,
    metadata: {},
  };
};
