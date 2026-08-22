/**
 * AI Similarity Type Constants
 * Types and classifications for AI similarity
 */

export const AI_SIMILARITY_TYPE = {
  // Similarity Domains
  DOMAINS: {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    MULTIMODAL: 'multimodal',
    VECTOR: 'vector',
    STRUCTURAL: 'structural',
    SEMANTIC: 'semantic',
    SYNTACTIC: 'syntactic',
    CONTEXTUAL: 'contextual',
  } as const,

  // Similarity Sub-Types
  SUB_TYPES: {
    // Text Similarity
    LEXICAL: 'lexical',
    SEMANTIC: 'semantic',
    SYNTACTIC: 'syntactic',
    CONTEXTUAL: 'contextual',

    // Image Similarity
    COLOR: 'color',
    TEXTURE: 'texture',
    SHAPE: 'shape',
    PATTERN: 'pattern',

    // Audio Similarity
    SPECTRAL: 'spectral',
    RHYTHMIC: 'rhythmic',
    MELODIC: 'melodic',
    TIMBRAL: 'timbral',

    // Video Similarity
    VISUAL: 'visual',
    TEMPORAL: 'temporal',
    SPATIAL: 'spatial',
    MOTION: 'motion',

    // Vector Similarity
    DENSE: 'dense',
    SPARSE: 'sparse',
    BINARY: 'binary',
    HYBRID: 'hybrid',
  } as const,

  // Similarity Levels
  LEVELS: {
    EXACT: 'exact',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none',
  } as const,

  // Similarity Confidence
  CONFIDENCE: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
  } as const,

  // Similarity Precision
  PRECISION: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Similarity Use Cases
  USE_CASES: {
    SEARCH: 'search',
    RECOMMENDATION: 'recommendation',
    DEDUPLICATION: 'deduplication',
    CLUSTERING: 'clustering',
    CLASSIFICATION: 'classification',
    RANKING: 'ranking',
    ANOMALY_DETECTION: 'anomaly_detection',
    LINK_PREDICTION: 'link_prediction',
  } as const,
} as const;

// Similarity Domains
export type AISimilarityDomain =
  (typeof AI_SIMILARITY_TYPE.DOMAINS)[keyof typeof AI_SIMILARITY_TYPE.DOMAINS];

// Similarity Sub-Types
export type AISimilaritySubType =
  (typeof AI_SIMILARITY_TYPE.SUB_TYPES)[keyof typeof AI_SIMILARITY_TYPE.SUB_TYPES];

// Similarity Levels
export type AISimilarityLevel =
  (typeof AI_SIMILARITY_TYPE.LEVELS)[keyof typeof AI_SIMILARITY_TYPE.LEVELS];

// Similarity Confidence
export type AISimilarityConfidence =
  (typeof AI_SIMILARITY_TYPE.CONFIDENCE)[keyof typeof AI_SIMILARITY_TYPE.CONFIDENCE];

// Similarity Precision
export type AISimilarityPrecision =
  (typeof AI_SIMILARITY_TYPE.PRECISION)[keyof typeof AI_SIMILARITY_TYPE.PRECISION];

// Similarity Use Cases
export type AISimilarityUseCase =
  (typeof AI_SIMILARITY_TYPE.USE_CASES)[keyof typeof AI_SIMILARITY_TYPE.USE_CASES];

// Utility Functions
export function getSimilarityDomainLabel(domain: AISimilarityDomain): string {
  const labels: Record<AISimilarityDomain, string> = {
    [AI_SIMILARITY_TYPE.DOMAINS.TEXT]: 'Text',
    [AI_SIMILARITY_TYPE.DOMAINS.IMAGE]: 'Image',
    [AI_SIMILARITY_TYPE.DOMAINS.AUDIO]: 'Audio',
    [AI_SIMILARITY_TYPE.DOMAINS.VIDEO]: 'Video',
    [AI_SIMILARITY_TYPE.DOMAINS.MULTIMODAL]: 'Multimodal',
    [AI_SIMILARITY_TYPE.DOMAINS.VECTOR]: 'Vector',
    [AI_SIMILARITY_TYPE.DOMAINS.STRUCTURAL]: 'Structural',
    [AI_SIMILARITY_TYPE.DOMAINS.SEMANTIC]: 'Semantic',
    [AI_SIMILARITY_TYPE.DOMAINS.SYNTACTIC]: 'Syntactic',
    [AI_SIMILARITY_TYPE.DOMAINS.CONTEXTUAL]: 'Contextual',
  };
  return labels[domain] || 'Unknown';
}

export function getSimilaritySubTypeLabel(subType: AISimilaritySubType): string {
  const labels: Record<AISimilaritySubType, string> = {
    [AI_SIMILARITY_TYPE.SUB_TYPES.LEXICAL]: 'Lexical',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SEMANTIC]: 'Semantic',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SYNTACTIC]: 'Syntactic',
    [AI_SIMILARITY_TYPE.SUB_TYPES.CONTEXTUAL]: 'Contextual',
    [AI_SIMILARITY_TYPE.SUB_TYPES.COLOR]: 'Color',
    [AI_SIMILARITY_TYPE.SUB_TYPES.TEXTURE]: 'Texture',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SHAPE]: 'Shape',
    [AI_SIMILARITY_TYPE.SUB_TYPES.PATTERN]: 'Pattern',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SPECTRAL]: 'Spectral',
    [AI_SIMILARITY_TYPE.SUB_TYPES.RHYTHMIC]: 'Rhythmic',
    [AI_SIMILARITY_TYPE.SUB_TYPES.MELODIC]: 'Melodic',
    [AI_SIMILARITY_TYPE.SUB_TYPES.TIMBRAL]: 'Timbral',
    [AI_SIMILARITY_TYPE.SUB_TYPES.VISUAL]: 'Visual',
    [AI_SIMILARITY_TYPE.SUB_TYPES.TEMPORAL]: 'Temporal',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SPATIAL]: 'Spatial',
    [AI_SIMILARITY_TYPE.SUB_TYPES.MOTION]: 'Motion',
    [AI_SIMILARITY_TYPE.SUB_TYPES.DENSE]: 'Dense',
    [AI_SIMILARITY_TYPE.SUB_TYPES.SPARSE]: 'Sparse',
    [AI_SIMILARITY_TYPE.SUB_TYPES.BINARY]: 'Binary',
    [AI_SIMILARITY_TYPE.SUB_TYPES.HYBRID]: 'Hybrid',
  };
  return labels[subType] || 'Unknown';
}

export function getSimilarityLevelLabel(level: AISimilarityLevel): string {
  const labels: Record<AISimilarityLevel, string> = {
    [AI_SIMILARITY_TYPE.LEVELS.EXACT]: 'Exact',
    [AI_SIMILARITY_TYPE.LEVELS.HIGH]: 'High',
    [AI_SIMILARITY_TYPE.LEVELS.MEDIUM]: 'Medium',
    [AI_SIMILARITY_TYPE.LEVELS.LOW]: 'Low',
    [AI_SIMILARITY_TYPE.LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

export function getSimilarityConfidenceLabel(confidence: AISimilarityConfidence): string {
  const labels: Record<AISimilarityConfidence, string> = {
    [AI_SIMILARITY_TYPE.CONFIDENCE.VERY_HIGH]: 'Very High',
    [AI_SIMILARITY_TYPE.CONFIDENCE.HIGH]: 'High',
    [AI_SIMILARITY_TYPE.CONFIDENCE.MEDIUM]: 'Medium',
    [AI_SIMILARITY_TYPE.CONFIDENCE.LOW]: 'Low',
    [AI_SIMILARITY_TYPE.CONFIDENCE.VERY_LOW]: 'Very Low',
  };
  return labels[confidence] || 'Unknown';
}

export function getSimilarityPrecisionLabel(precision: AISimilarityPrecision): string {
  const labels: Record<AISimilarityPrecision, string> = {
    [AI_SIMILARITY_TYPE.PRECISION.HIGH]: 'High',
    [AI_SIMILARITY_TYPE.PRECISION.MEDIUM]: 'Medium',
    [AI_SIMILARITY_TYPE.PRECISION.LOW]: 'Low',
  };
  return labels[precision] || 'Unknown';
}

export function getSimilarityUseCaseLabel(useCase: AISimilarityUseCase): string {
  const labels: Record<AISimilarityUseCase, string> = {
    [AI_SIMILARITY_TYPE.USE_CASES.SEARCH]: 'Search',
    [AI_SIMILARITY_TYPE.USE_CASES.RECOMMENDATION]: 'Recommendation',
    [AI_SIMILARITY_TYPE.USE_CASES.DEDUPLICATION]: 'Deduplication',
    [AI_SIMILARITY_TYPE.USE_CASES.CLUSTERING]: 'Clustering',
    [AI_SIMILARITY_TYPE.USE_CASES.CLASSIFICATION]: 'Classification',
    [AI_SIMILARITY_TYPE.USE_CASES.RANKING]: 'Ranking',
    [AI_SIMILARITY_TYPE.USE_CASES.ANOMALY_DETECTION]: 'Anomaly Detection',
    [AI_SIMILARITY_TYPE.USE_CASES.LINK_PREDICTION]: 'Link Prediction',
  };
  return labels[useCase] || 'Unknown';
}

export function getLevelThreshold(level: AISimilarityLevel): number {
  const thresholds: Record<AISimilarityLevel, number> = {
    [AI_SIMILARITY_TYPE.LEVELS.EXACT]: 0.99,
    [AI_SIMILARITY_TYPE.LEVELS.HIGH]: 0.8,
    [AI_SIMILARITY_TYPE.LEVELS.MEDIUM]: 0.5,
    [AI_SIMILARITY_TYPE.LEVELS.LOW]: 0.3,
    [AI_SIMILARITY_TYPE.LEVELS.NONE]: 0,
  };
  return thresholds[level] || 0;
}

export function getConfidenceScore(confidence: AISimilarityConfidence): number {
  const scores: Record<AISimilarityConfidence, number> = {
    [AI_SIMILARITY_TYPE.CONFIDENCE.VERY_HIGH]: 0.95,
    [AI_SIMILARITY_TYPE.CONFIDENCE.HIGH]: 0.8,
    [AI_SIMILARITY_TYPE.CONFIDENCE.MEDIUM]: 0.6,
    [AI_SIMILARITY_TYPE.CONFIDENCE.LOW]: 0.4,
    [AI_SIMILARITY_TYPE.CONFIDENCE.VERY_LOW]: 0.2,
  };
  return scores[confidence] || 0;
}
