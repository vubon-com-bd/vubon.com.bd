/**
 * AI Vector Type Constants
 * Types and classifications for AI vectors
 */

export const AI_VECTOR_TYPE = {
  // Vector Categories
  CATEGORIES: {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    MULTIMODAL: 'multimodal',
    CODE: 'code',
    GRAPH: 'graph',
    USER: 'user',
    PRODUCT: 'product',
    CATEGORY: 'category',
    ENTITY: 'entity',
    RELATION: 'relation',
  } as const,

  // Vector Sub-Types
  SUB_TYPES: {
    // Text Vectors
    WORD: 'word',
    SENTENCE: 'sentence',
    PARAGRAPH: 'paragraph',
    DOCUMENT: 'document',
    TOKEN: 'token',

    // Image Vectors
    GLOBAL: 'global',
    LOCAL: 'local',
    REGION: 'region',
    PATCH: 'patch',

    // Audio Vectors
    SPEECH: 'speech',
    MUSIC: 'music',
    SOUND: 'sound',

    // Video Vectors
    FRAME: 'frame',
    MOTION: 'motion',
    TEMPORAL: 'temporal',

    // Multimodal Vectors
    IMAGE_TEXT: 'image_text',
    AUDIO_TEXT: 'audio_text',
    VIDEO_TEXT: 'video_text',
    IMAGE_AUDIO: 'image_audio',

    // Specialized Vectors
    CODE: 'code',
    GRAPH: 'graph',
    KNOWLEDGE: 'knowledge',
    ENTITY: 'entity',
    RELATION: 'relation',
  } as const,

  // Vector Dimensions
  DIMENSIONS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    ULTRA_HIGH: 'ultra_high',
    MASSIVE: 'massive',
  } as const,

  // Vector Precision
  PRECISION: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    ULTRA_HIGH: 'ultra_high',
  } as const,

  // Vector Density
  DENSITY: {
    DENSE: 'dense',
    SPARSE: 'sparse',
    HYBRID: 'hybrid',
  } as const,

  // Vector Generation Methods
  GENERATION_METHODS: {
    MODEL_BASED: 'model_based',
    RULE_BASED: 'rule_based',
    HYBRID: 'hybrid',
    AUGMENTED: 'augmented',
  } as const,
} as const;

// Vector Categories
export type AIVectorCategory =
  (typeof AI_VECTOR_TYPE.CATEGORIES)[keyof typeof AI_VECTOR_TYPE.CATEGORIES];

// Vector Sub-Types
export type AIVectorSubType =
  (typeof AI_VECTOR_TYPE.SUB_TYPES)[keyof typeof AI_VECTOR_TYPE.SUB_TYPES];

// Vector Dimensions
export type AIVectorDimensionType =
  (typeof AI_VECTOR_TYPE.DIMENSIONS)[keyof typeof AI_VECTOR_TYPE.DIMENSIONS];

// Vector Precision
export type AIVectorPrecision =
  (typeof AI_VECTOR_TYPE.PRECISION)[keyof typeof AI_VECTOR_TYPE.PRECISION];

// Vector Density
export type AIVectorDensity = (typeof AI_VECTOR_TYPE.DENSITY)[keyof typeof AI_VECTOR_TYPE.DENSITY];

// Vector Generation Methods
export type AIVectorGenerationMethod =
  (typeof AI_VECTOR_TYPE.GENERATION_METHODS)[keyof typeof AI_VECTOR_TYPE.GENERATION_METHODS];

// Utility Functions
export function getVectorCategoryLabel(category: AIVectorCategory): string {
  const labels: Record<AIVectorCategory, string> = {
    [AI_VECTOR_TYPE.CATEGORIES.TEXT]: 'Text',
    [AI_VECTOR_TYPE.CATEGORIES.IMAGE]: 'Image',
    [AI_VECTOR_TYPE.CATEGORIES.AUDIO]: 'Audio',
    [AI_VECTOR_TYPE.CATEGORIES.VIDEO]: 'Video',
    [AI_VECTOR_TYPE.CATEGORIES.MULTIMODAL]: 'Multimodal',
    [AI_VECTOR_TYPE.CATEGORIES.CODE]: 'Code',
    [AI_VECTOR_TYPE.CATEGORIES.GRAPH]: 'Graph',
    [AI_VECTOR_TYPE.CATEGORIES.USER]: 'User',
    [AI_VECTOR_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [AI_VECTOR_TYPE.CATEGORIES.CATEGORY]: 'Category',
    [AI_VECTOR_TYPE.CATEGORIES.ENTITY]: 'Entity',
    [AI_VECTOR_TYPE.CATEGORIES.RELATION]: 'Relation',
  };
  return labels[category] || 'Unknown';
}

export function getVectorSubTypeLabel(subType: AIVectorSubType): string {
  const labels: Record<AIVectorSubType, string> = {
    [AI_VECTOR_TYPE.SUB_TYPES.WORD]: 'Word',
    [AI_VECTOR_TYPE.SUB_TYPES.SENTENCE]: 'Sentence',
    [AI_VECTOR_TYPE.SUB_TYPES.PARAGRAPH]: 'Paragraph',
    [AI_VECTOR_TYPE.SUB_TYPES.DOCUMENT]: 'Document',
    [AI_VECTOR_TYPE.SUB_TYPES.TOKEN]: 'Token',
    [AI_VECTOR_TYPE.SUB_TYPES.GLOBAL]: 'Global',
    [AI_VECTOR_TYPE.SUB_TYPES.LOCAL]: 'Local',
    [AI_VECTOR_TYPE.SUB_TYPES.REGION]: 'Region',
    [AI_VECTOR_TYPE.SUB_TYPES.PATCH]: 'Patch',
    [AI_VECTOR_TYPE.SUB_TYPES.SPEECH]: 'Speech',
    [AI_VECTOR_TYPE.SUB_TYPES.MUSIC]: 'Music',
    [AI_VECTOR_TYPE.SUB_TYPES.SOUND]: 'Sound',
    [AI_VECTOR_TYPE.SUB_TYPES.FRAME]: 'Frame',
    [AI_VECTOR_TYPE.SUB_TYPES.MOTION]: 'Motion',
    [AI_VECTOR_TYPE.SUB_TYPES.TEMPORAL]: 'Temporal',
    [AI_VECTOR_TYPE.SUB_TYPES.IMAGE_TEXT]: 'Image-Text',
    [AI_VECTOR_TYPE.SUB_TYPES.AUDIO_TEXT]: 'Audio-Text',
    [AI_VECTOR_TYPE.SUB_TYPES.VIDEO_TEXT]: 'Video-Text',
    [AI_VECTOR_TYPE.SUB_TYPES.IMAGE_AUDIO]: 'Image-Audio',
    [AI_VECTOR_TYPE.SUB_TYPES.CODE]: 'Code',
    [AI_VECTOR_TYPE.SUB_TYPES.GRAPH]: 'Graph',
    [AI_VECTOR_TYPE.SUB_TYPES.KNOWLEDGE]: 'Knowledge',
    [AI_VECTOR_TYPE.SUB_TYPES.ENTITY]: 'Entity',
    [AI_VECTOR_TYPE.SUB_TYPES.RELATION]: 'Relation',
  };
  return labels[subType] || 'Unknown';
}

export function getVectorDimensionTypeLabel(dimType: AIVectorDimensionType): string {
  const labels: Record<AIVectorDimensionType, string> = {
    [AI_VECTOR_TYPE.DIMENSIONS.LOW]: 'Low (50-100)',
    [AI_VECTOR_TYPE.DIMENSIONS.MEDIUM]: 'Medium (100-300)',
    [AI_VECTOR_TYPE.DIMENSIONS.HIGH]: 'High (300-768)',
    [AI_VECTOR_TYPE.DIMENSIONS.ULTRA_HIGH]: 'Ultra High (768-2048)',
    [AI_VECTOR_TYPE.DIMENSIONS.MASSIVE]: 'Massive (2048+)',
  };
  return labels[dimType] || 'Unknown';
}

export function getVectorPrecisionLabel(precision: AIVectorPrecision): string {
  const labels: Record<AIVectorPrecision, string> = {
    [AI_VECTOR_TYPE.PRECISION.LOW]: 'Low',
    [AI_VECTOR_TYPE.PRECISION.MEDIUM]: 'Medium',
    [AI_VECTOR_TYPE.PRECISION.HIGH]: 'High',
    [AI_VECTOR_TYPE.PRECISION.ULTRA_HIGH]: 'Ultra High',
  };
  return labels[precision] || 'Unknown';
}

export function getVectorDensityLabel(density: AIVectorDensity): string {
  const labels: Record<AIVectorDensity, string> = {
    [AI_VECTOR_TYPE.DENSITY.DENSE]: 'Dense',
    [AI_VECTOR_TYPE.DENSITY.SPARSE]: 'Sparse',
    [AI_VECTOR_TYPE.DENSITY.HYBRID]: 'Hybrid',
  };
  return labels[density] || 'Unknown';
}

export function getVectorGenerationMethodLabel(method: AIVectorGenerationMethod): string {
  const labels: Record<AIVectorGenerationMethod, string> = {
    [AI_VECTOR_TYPE.GENERATION_METHODS.MODEL_BASED]: 'Model Based',
    [AI_VECTOR_TYPE.GENERATION_METHODS.RULE_BASED]: 'Rule Based',
    [AI_VECTOR_TYPE.GENERATION_METHODS.HYBRID]: 'Hybrid',
    [AI_VECTOR_TYPE.GENERATION_METHODS.AUGMENTED]: 'Augmented',
  };
  return labels[method] || 'Unknown';
}

export function getDimensionRange(dimType: AIVectorDimensionType): [number, number] {
  const ranges: Record<AIVectorDimensionType, [number, number]> = {
    [AI_VECTOR_TYPE.DIMENSIONS.LOW]: [50, 100],
    [AI_VECTOR_TYPE.DIMENSIONS.MEDIUM]: [100, 300],
    [AI_VECTOR_TYPE.DIMENSIONS.HIGH]: [300, 768],
    [AI_VECTOR_TYPE.DIMENSIONS.ULTRA_HIGH]: [768, 2048],
    [AI_VECTOR_TYPE.DIMENSIONS.MASSIVE]: [2048, 10000],
  };
  return ranges[dimType] || [0, 0];
}

export function getPrecisionScore(precision: AIVectorPrecision): number {
  const scores: Record<AIVectorPrecision, number> = {
    [AI_VECTOR_TYPE.PRECISION.LOW]: 0.3,
    [AI_VECTOR_TYPE.PRECISION.MEDIUM]: 0.6,
    [AI_VECTOR_TYPE.PRECISION.HIGH]: 0.8,
    [AI_VECTOR_TYPE.PRECISION.ULTRA_HIGH]: 0.95,
  };
  return scores[precision] || 0;
}
