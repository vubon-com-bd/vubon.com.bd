/**
 * AI Embedding Types Constants
 * Types and classifications for AI embeddings
 */

export const AI_EMBEDDING_TYPE = {
  // Embedding Categories
  CATEGORIES: {
    DENSE: 'dense',
    SPARSE: 'sparse',
    HYBRID: 'hybrid',
    SEMANTIC: 'semantic',
    SYNTACTIC: 'syntactic',
    CONTEXTUAL: 'contextual',
    STATIC: 'static',
    DYNAMIC: 'dynamic',
  } as const,

  // Embedding Sub-Types
  SUB_TYPES: {
    // Text Embeddings
    WORD_EMBEDDING: 'word_embedding',
    SENTENCE_EMBEDDING: 'sentence_embedding',
    DOCUMENT_EMBEDDING: 'document_embedding',
    PARAGRAPH_EMBEDDING: 'paragraph_embedding',

    // Image Embeddings
    GLOBAL_IMAGE: 'global_image',
    LOCAL_IMAGE: 'local_image',
    REGION_IMAGE: 'region_image',

    // Audio Embeddings
    SPEECH_EMBEDDING: 'speech_embedding',
    MUSIC_EMBEDDING: 'music_embedding',
    SOUND_EMBEDDING: 'sound_embedding',

    // Video Embeddings
    FRAME_EMBEDDING: 'frame_embedding',
    MOTION_EMBEDDING: 'motion_embedding',
    TEMPORAL_EMBEDDING: 'temporal_embedding',

    // Multimodal Embeddings
    IMAGE_TEXT: 'image_text',
    AUDIO_TEXT: 'audio_text',
    VIDEO_TEXT: 'video_text',
    IMAGE_AUDIO: 'image_audio',

    // Specialized Embeddings
    CODE_EMBEDDING: 'code_embedding',
    GRAPH_EMBEDDING: 'graph_embedding',
    KNOWLEDGE_EMBEDDING: 'knowledge_embedding',
    ENTITY_EMBEDDING: 'entity_embedding',
    RELATION_EMBEDDING: 'relation_embedding',
  } as const,

  // Embedding Dimensions
  DIMENSION_TYPES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    ULTRA_HIGH: 'ultra_high',
  } as const,

  // Embedding Training Methods
  TRAINING_METHODS: {
    WORD2VEC: 'word2vec',
    GLOVE: 'glove',
    FASTTEXT: 'fasttext',
    BERT: 'bert',
    GPT: 'gpt',
    CONTRASTIVE: 'contrastive',
    TRIMMED: 'trimmed',
    DISTILLED: 'distilled',
  } as const,

  // Embedding Quality
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    PREMIUM: 'premium',
  } as const,

  // Embedding Usage
  USAGE: {
    SEARCH: 'search',
    RECOMMENDATION: 'recommendation',
    CLASSIFICATION: 'classification',
    CLUSTERING: 'clustering',
    RANKING: 'ranking',
    RETRIEVAL: 'retrieval',
    TRANSFER: 'transfer',
    ANALYSIS: 'analysis',
  } as const,
} as const;

// Embedding Categories
export type AIEmbeddingCategory =
  (typeof AI_EMBEDDING_TYPE.CATEGORIES)[keyof typeof AI_EMBEDDING_TYPE.CATEGORIES];

// Embedding Sub-Types
export type AIEmbeddingSubType =
  (typeof AI_EMBEDDING_TYPE.SUB_TYPES)[keyof typeof AI_EMBEDDING_TYPE.SUB_TYPES];

// Embedding Dimension Types
export type AIEmbeddingDimensionType =
  (typeof AI_EMBEDDING_TYPE.DIMENSION_TYPES)[keyof typeof AI_EMBEDDING_TYPE.DIMENSION_TYPES];

// Embedding Training Methods
export type AIEmbeddingTrainingMethod =
  (typeof AI_EMBEDDING_TYPE.TRAINING_METHODS)[keyof typeof AI_EMBEDDING_TYPE.TRAINING_METHODS];

// Embedding Quality
export type AIEmbeddingQuality =
  (typeof AI_EMBEDDING_TYPE.QUALITY)[keyof typeof AI_EMBEDDING_TYPE.QUALITY];

// Embedding Usage
export type AIEmbeddingUsage =
  (typeof AI_EMBEDDING_TYPE.USAGE)[keyof typeof AI_EMBEDDING_TYPE.USAGE];

// Utility Functions
export function getEmbeddingCategoryLabel(category: AIEmbeddingCategory): string {
  const labels: Record<AIEmbeddingCategory, string> = {
    [AI_EMBEDDING_TYPE.CATEGORIES.DENSE]: 'Dense',
    [AI_EMBEDDING_TYPE.CATEGORIES.SPARSE]: 'Sparse',
    [AI_EMBEDDING_TYPE.CATEGORIES.HYBRID]: 'Hybrid',
    [AI_EMBEDDING_TYPE.CATEGORIES.SEMANTIC]: 'Semantic',
    [AI_EMBEDDING_TYPE.CATEGORIES.SYNTACTIC]: 'Syntactic',
    [AI_EMBEDDING_TYPE.CATEGORIES.CONTEXTUAL]: 'Contextual',
    [AI_EMBEDDING_TYPE.CATEGORIES.STATIC]: 'Static',
    [AI_EMBEDDING_TYPE.CATEGORIES.DYNAMIC]: 'Dynamic',
  };
  return labels[category] || 'Unknown';
}

export function getEmbeddingSubTypeLabel(subType: AIEmbeddingSubType): string {
  const labels: Record<AIEmbeddingSubType, string> = {
    [AI_EMBEDDING_TYPE.SUB_TYPES.WORD_EMBEDDING]: 'Word Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.SENTENCE_EMBEDDING]: 'Sentence Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.DOCUMENT_EMBEDDING]: 'Document Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.PARAGRAPH_EMBEDDING]: 'Paragraph Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.GLOBAL_IMAGE]: 'Global Image',
    [AI_EMBEDDING_TYPE.SUB_TYPES.LOCAL_IMAGE]: 'Local Image',
    [AI_EMBEDDING_TYPE.SUB_TYPES.REGION_IMAGE]: 'Region Image',
    [AI_EMBEDDING_TYPE.SUB_TYPES.SPEECH_EMBEDDING]: 'Speech Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.MUSIC_EMBEDDING]: 'Music Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.SOUND_EMBEDDING]: 'Sound Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.FRAME_EMBEDDING]: 'Frame Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.MOTION_EMBEDDING]: 'Motion Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.TEMPORAL_EMBEDDING]: 'Temporal Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.IMAGE_TEXT]: 'Image-Text',
    [AI_EMBEDDING_TYPE.SUB_TYPES.AUDIO_TEXT]: 'Audio-Text',
    [AI_EMBEDDING_TYPE.SUB_TYPES.VIDEO_TEXT]: 'Video-Text',
    [AI_EMBEDDING_TYPE.SUB_TYPES.IMAGE_AUDIO]: 'Image-Audio',
    [AI_EMBEDDING_TYPE.SUB_TYPES.CODE_EMBEDDING]: 'Code Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.GRAPH_EMBEDDING]: 'Graph Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.KNOWLEDGE_EMBEDDING]: 'Knowledge Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.ENTITY_EMBEDDING]: 'Entity Embedding',
    [AI_EMBEDDING_TYPE.SUB_TYPES.RELATION_EMBEDDING]: 'Relation Embedding',
  };
  return labels[subType] || 'Unknown';
}

export function getEmbeddingDimensionTypeLabel(dimType: AIEmbeddingDimensionType): string {
  const labels: Record<AIEmbeddingDimensionType, string> = {
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.LOW]: 'Low (50-100)',
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.MEDIUM]: 'Medium (100-300)',
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.HIGH]: 'High (300-768)',
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.ULTRA_HIGH]: 'Ultra High (768+)',
  };
  return labels[dimType] || 'Unknown';
}

export function getEmbeddingTrainingMethodLabel(method: AIEmbeddingTrainingMethod): string {
  const labels: Record<AIEmbeddingTrainingMethod, string> = {
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.WORD2VEC]: 'Word2Vec',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.GLOVE]: 'GloVe',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.FASTTEXT]: 'FastText',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.BERT]: 'BERT',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.GPT]: 'GPT',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.CONTRASTIVE]: 'Contrastive',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.TRIMMED]: 'Trimmed',
    [AI_EMBEDDING_TYPE.TRAINING_METHODS.DISTILLED]: 'Distilled',
  };
  return labels[method] || 'Unknown';
}

export function getEmbeddingQualityLabel(quality: AIEmbeddingQuality): string {
  const labels: Record<AIEmbeddingQuality, string> = {
    [AI_EMBEDDING_TYPE.QUALITY.LOW]: 'Low',
    [AI_EMBEDDING_TYPE.QUALITY.MEDIUM]: 'Medium',
    [AI_EMBEDDING_TYPE.QUALITY.HIGH]: 'High',
    [AI_EMBEDDING_TYPE.QUALITY.PREMIUM]: 'Premium',
  };
  return labels[quality] || 'Unknown';
}

export function getEmbeddingUsageLabel(usage: AIEmbeddingUsage): string {
  const labels: Record<AIEmbeddingUsage, string> = {
    [AI_EMBEDDING_TYPE.USAGE.SEARCH]: 'Search',
    [AI_EMBEDDING_TYPE.USAGE.RECOMMENDATION]: 'Recommendation',
    [AI_EMBEDDING_TYPE.USAGE.CLASSIFICATION]: 'Classification',
    [AI_EMBEDDING_TYPE.USAGE.CLUSTERING]: 'Clustering',
    [AI_EMBEDDING_TYPE.USAGE.RANKING]: 'Ranking',
    [AI_EMBEDDING_TYPE.USAGE.RETRIEVAL]: 'Retrieval',
    [AI_EMBEDDING_TYPE.USAGE.TRANSFER]: 'Transfer',
    [AI_EMBEDDING_TYPE.USAGE.ANALYSIS]: 'Analysis',
  };
  return labels[usage] || 'Unknown';
}

export function getDimensionRange(dimType: AIEmbeddingDimensionType): [number, number] {
  const ranges: Record<AIEmbeddingDimensionType, [number, number]> = {
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.LOW]: [50, 100],
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.MEDIUM]: [100, 300],
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.HIGH]: [300, 768],
    [AI_EMBEDDING_TYPE.DIMENSION_TYPES.ULTRA_HIGH]: [768, 10000],
  };
  return ranges[dimType] || [0, 0];
}

export function getQualityScore(quality: AIEmbeddingQuality): number {
  const scores: Record<AIEmbeddingQuality, number> = {
    [AI_EMBEDDING_TYPE.QUALITY.LOW]: 0.3,
    [AI_EMBEDDING_TYPE.QUALITY.MEDIUM]: 0.6,
    [AI_EMBEDDING_TYPE.QUALITY.HIGH]: 0.8,
    [AI_EMBEDDING_TYPE.QUALITY.PREMIUM]: 0.95,
  };
  return scores[quality] || 0;
}
