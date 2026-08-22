/**
 * AI Similarity Constants
 * Configuration for similarity comparison and matching
 */

export const AI_SIMILARITY = {
  // Similarity Types
  TYPES: {
    COSINE: 'cosine',
    EUCLIDEAN: 'euclidean',
    DOT_PRODUCT: 'dot_product',
    MANHATTAN: 'manhattan',
    JACCARD: 'jaccard',
    PEARSON: 'pearson',
    SPEARMAN: 'spearman',
    KENDALL: 'kendall',
    HAMMING: 'hamming',
    LEVENSHTEIN: 'levenshtein',
    JARO_WINKLER: 'jaro_winkler',
    SORENSEN_DICE: 'sorensen_dice',
    OVERLAP: 'overlap',
    TANIMOTO: 'tanimoto',
    CHEBYSHEV: 'chebyshev',
    MINKOWSKI: 'minkowski',
  } as const,

  // Similarity Status
  STATUSES: {
    PENDING: 'pending',
    CALCULATING: 'calculating',
    COMPARING: 'comparing',
    COMPLETED: 'completed',
    CACHED: 'cached',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
  } as const,

  // Similarity Categories
  CATEGORIES: {
    VECTOR: 'vector',
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    MULTIMODAL: 'multimodal',
    STRUCTURAL: 'structural',
    SEMANTIC: 'semantic',
    SYNTACTIC: 'syntactic',
    CONTEXTUAL: 'contextual',
  } as const,

  // Similarity Algorithms
  ALGORITHMS: {
    // Vector Similarity
    COSINE_SIMILARITY: 'cosine_similarity',
    EUCLIDEAN_DISTANCE: 'euclidean_distance',
    MANHATTAN_DISTANCE: 'manhattan_distance',
    CHEBYSHEV_DISTANCE: 'chebyshev_distance',
    MINKOWSKI_DISTANCE: 'minkowski_distance',

    // Text Similarity
    LEVENSHTEIN_DISTANCE: 'levenshtein_distance',
    JARO_WINKLER: 'jaro_winkler',
    SORENSEN_DICE: 'sorensen_dice',
    JACCARD_SIMILARITY: 'jaccard_similarity',
    OVERLAP_COEFFICIENT: 'overlap_coefficient',

    // Statistical Similarity
    PEARSON_CORRELATION: 'pearson_correlation',
    SPEARMAN_RANK: 'spearman_rank',
    KENDALL_TAU: 'kendall_tau',

    // Semantic Similarity
    WORD2VEC: 'word2vec',
    BERT: 'bert',
    SBERT: 'sbert',
    GPT: 'gpt',
    CLIP: 'clip',

    // Structural Similarity
    SSIM: 'ssim',
    MS_SSIM: 'ms_ssim',
    PSNR: 'psnr',
    RMSE: 'rmse',
  } as const,

  // Similarity Thresholds
  THRESHOLDS: {
    VERY_LOW: 0.1,
    LOW: 0.3,
    MEDIUM: 0.5,
    HIGH: 0.7,
    VERY_HIGH: 0.9,
    EXACT: 0.99,
  } as const,

  // Similarity Ranges
  RANGES: {
    VECTOR: [0, 1],
    DISTANCE: [0, Infinity],
    CORRELATION: [-1, 1],
    PERCENTAGE: [0, 100],
    SCORE: [0, 1],
  } as const,

  // Similarity Limits
  LIMITS: {
    MAX_BATCH_SIZE: 100,
    MAX_COMPARISONS: 10000,
    MAX_TEXT_LENGTH: 10000,
    MAX_VECTOR_DIMENSION: 10000,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    DEFAULT_TOP_K: 10,
    MAX_TOP_K: 1000,
  } as const,

  // Similarity Metrics
  METRICS: {
    ACCURACY: 'accuracy',
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    SPEED: 'speed',
    MEMORY_USAGE: 'memory_usage',
    COMPUTATION_TIME: 'computation_time',
  } as const,

  // Similarity Output Formats
  FORMATS: {
    SCORE: 'score',
    RANK: 'rank',
    PERCENTAGE: 'percentage',
    DISTANCE: 'distance',
    SIMILARITY: 'similarity',
    DISSIMILARITY: 'dissimilarity',
  } as const,

  // Similarity Normalization
  NORMALIZATION: {
    NONE: 'none',
    MIN_MAX: 'min_max',
    Z_SCORE: 'z_score',
    ROBUST: 'robust',
    UNIT_VECTOR: 'unit_vector',
  } as const,
} as const;

// Similarity Types
export type AISimilarityType = (typeof AI_SIMILARITY.TYPES)[keyof typeof AI_SIMILARITY.TYPES];

// Similarity Status
export type AISimilarityStatus =
  (typeof AI_SIMILARITY.STATUSES)[keyof typeof AI_SIMILARITY.STATUSES];

// Similarity Categories
export type AISimilarityCategory =
  (typeof AI_SIMILARITY.CATEGORIES)[keyof typeof AI_SIMILARITY.CATEGORIES];

// Similarity Algorithms
export type AISimilarityAlgorithm =
  (typeof AI_SIMILARITY.ALGORITHMS)[keyof typeof AI_SIMILARITY.ALGORITHMS];

// Similarity Thresholds
export type AISimilarityThreshold =
  (typeof AI_SIMILARITY.THRESHOLDS)[keyof typeof AI_SIMILARITY.THRESHOLDS];

// Similarity Ranges
export type AISimilarityRange = (typeof AI_SIMILARITY.RANGES)[keyof typeof AI_SIMILARITY.RANGES];

// Similarity Limits
export type AISimilarityLimit = (typeof AI_SIMILARITY.LIMITS)[keyof typeof AI_SIMILARITY.LIMITS];

// Similarity Metrics
export type AISimilarityMetric = (typeof AI_SIMILARITY.METRICS)[keyof typeof AI_SIMILARITY.METRICS];

// Similarity Formats
export type AISimilarityFormat = (typeof AI_SIMILARITY.FORMATS)[keyof typeof AI_SIMILARITY.FORMATS];

// Similarity Normalization
export type AISimilarityNormalization =
  (typeof AI_SIMILARITY.NORMALIZATION)[keyof typeof AI_SIMILARITY.NORMALIZATION];

// Utility Functions
export function getSimilarityTypeLabel(type: AISimilarityType): string {
  const labels: Record<AISimilarityType, string> = {
    [AI_SIMILARITY.TYPES.COSINE]: 'Cosine',
    [AI_SIMILARITY.TYPES.EUCLIDEAN]: 'Euclidean',
    [AI_SIMILARITY.TYPES.DOT_PRODUCT]: 'Dot Product',
    [AI_SIMILARITY.TYPES.MANHATTAN]: 'Manhattan',
    [AI_SIMILARITY.TYPES.JACCARD]: 'Jaccard',
    [AI_SIMILARITY.TYPES.PEARSON]: 'Pearson',
    [AI_SIMILARITY.TYPES.SPEARMAN]: 'Spearman',
    [AI_SIMILARITY.TYPES.KENDALL]: 'Kendall',
    [AI_SIMILARITY.TYPES.HAMMING]: 'Hamming',
    [AI_SIMILARITY.TYPES.LEVENSHTEIN]: 'Levenshtein',
    [AI_SIMILARITY.TYPES.JARO_WINKLER]: 'Jaro-Winkler',
    [AI_SIMILARITY.TYPES.SORENSEN_DICE]: 'Sørensen-Dice',
    [AI_SIMILARITY.TYPES.OVERLAP]: 'Overlap',
    [AI_SIMILARITY.TYPES.TANIMOTO]: 'Tanimoto',
    [AI_SIMILARITY.TYPES.CHEBYSHEV]: 'Chebyshev',
    [AI_SIMILARITY.TYPES.MINKOWSKI]: 'Minkowski',
  };
  return labels[type] || 'Unknown';
}

export function getSimilarityStatusLabel(status: AISimilarityStatus): string {
  const labels: Record<AISimilarityStatus, string> = {
    [AI_SIMILARITY.STATUSES.PENDING]: 'Pending',
    [AI_SIMILARITY.STATUSES.CALCULATING]: 'Calculating',
    [AI_SIMILARITY.STATUSES.COMPARING]: 'Comparing',
    [AI_SIMILARITY.STATUSES.COMPLETED]: 'Completed',
    [AI_SIMILARITY.STATUSES.CACHED]: 'Cached',
    [AI_SIMILARITY.STATUSES.FAILED]: 'Failed',
    [AI_SIMILARITY.STATUSES.EXPIRED]: 'Expired',
    [AI_SIMILARITY.STATUSES.ARCHIVED]: 'Archived',
    [AI_SIMILARITY.STATUSES.OPTIMIZED]: 'Optimized',
  };
  return labels[status] || 'Unknown';
}

export function getSimilarityCategoryLabel(category: AISimilarityCategory): string {
  const labels: Record<AISimilarityCategory, string> = {
    [AI_SIMILARITY.CATEGORIES.VECTOR]: 'Vector',
    [AI_SIMILARITY.CATEGORIES.TEXT]: 'Text',
    [AI_SIMILARITY.CATEGORIES.IMAGE]: 'Image',
    [AI_SIMILARITY.CATEGORIES.AUDIO]: 'Audio',
    [AI_SIMILARITY.CATEGORIES.VIDEO]: 'Video',
    [AI_SIMILARITY.CATEGORIES.MULTIMODAL]: 'Multimodal',
    [AI_SIMILARITY.CATEGORIES.STRUCTURAL]: 'Structural',
    [AI_SIMILARITY.CATEGORIES.SEMANTIC]: 'Semantic',
    [AI_SIMILARITY.CATEGORIES.SYNTACTIC]: 'Syntactic',
    [AI_SIMILARITY.CATEGORIES.CONTEXTUAL]: 'Contextual',
  };
  return labels[category] || 'Unknown';
}

export function getSimilarityAlgorithmLabel(algorithm: AISimilarityAlgorithm): string {
  const labels: Record<AISimilarityAlgorithm, string> = {
    [AI_SIMILARITY.ALGORITHMS.COSINE_SIMILARITY]: 'Cosine Similarity',
    [AI_SIMILARITY.ALGORITHMS.EUCLIDEAN_DISTANCE]: 'Euclidean Distance',
    [AI_SIMILARITY.ALGORITHMS.MANHATTAN_DISTANCE]: 'Manhattan Distance',
    [AI_SIMILARITY.ALGORITHMS.CHEBYSHEV_DISTANCE]: 'Chebyshev Distance',
    [AI_SIMILARITY.ALGORITHMS.MINKOWSKI_DISTANCE]: 'Minkowski Distance',
    [AI_SIMILARITY.ALGORITHMS.LEVENSHTEIN_DISTANCE]: 'Levenshtein Distance',
    [AI_SIMILARITY.ALGORITHMS.JARO_WINKLER]: 'Jaro-Winkler',
    [AI_SIMILARITY.ALGORITHMS.SORENSEN_DICE]: 'Sørensen-Dice',
    [AI_SIMILARITY.ALGORITHMS.JACCARD_SIMILARITY]: 'Jaccard Similarity',
    [AI_SIMILARITY.ALGORITHMS.OVERLAP_COEFFICIENT]: 'Overlap Coefficient',
    [AI_SIMILARITY.ALGORITHMS.PEARSON_CORRELATION]: 'Pearson Correlation',
    [AI_SIMILARITY.ALGORITHMS.SPEARMAN_RANK]: 'Spearman Rank',
    [AI_SIMILARITY.ALGORITHMS.KENDALL_TAU]: 'Kendall Tau',
    [AI_SIMILARITY.ALGORITHMS.WORD2VEC]: 'Word2Vec',
    [AI_SIMILARITY.ALGORITHMS.BERT]: 'BERT',
    [AI_SIMILARITY.ALGORITHMS.SBERT]: 'SBERT',
    [AI_SIMILARITY.ALGORITHMS.GPT]: 'GPT',
    [AI_SIMILARITY.ALGORITHMS.CLIP]: 'CLIP',
    [AI_SIMILARITY.ALGORITHMS.SSIM]: 'SSIM',
    [AI_SIMILARITY.ALGORITHMS.MS_SSIM]: 'MS-SSIM',
    [AI_SIMILARITY.ALGORITHMS.PSNR]: 'PSNR',
    [AI_SIMILARITY.ALGORITHMS.RMSE]: 'RMSE',
  };
  return labels[algorithm] || 'Unknown';
}

export function getSimilarityThresholdLabel(threshold: AISimilarityThreshold): string {
  const labels: Record<AISimilarityThreshold, string> = {
    [AI_SIMILARITY.THRESHOLDS.VERY_LOW]: 'Very Low',
    [AI_SIMILARITY.THRESHOLDS.LOW]: 'Low',
    [AI_SIMILARITY.THRESHOLDS.MEDIUM]: 'Medium',
    [AI_SIMILARITY.THRESHOLDS.HIGH]: 'High',
    [AI_SIMILARITY.THRESHOLDS.VERY_HIGH]: 'Very High',
    [AI_SIMILARITY.THRESHOLDS.EXACT]: 'Exact',
  };
  return labels[threshold] || 'Unknown';
}

export function getSimilarityFormatLabel(format: AISimilarityFormat): string {
  const labels: Record<AISimilarityFormat, string> = {
    [AI_SIMILARITY.FORMATS.SCORE]: 'Score',
    [AI_SIMILARITY.FORMATS.RANK]: 'Rank',
    [AI_SIMILARITY.FORMATS.PERCENTAGE]: 'Percentage',
    [AI_SIMILARITY.FORMATS.DISTANCE]: 'Distance',
    [AI_SIMILARITY.FORMATS.SIMILARITY]: 'Similarity',
    [AI_SIMILARITY.FORMATS.DISSIMILARITY]: 'Dissimilarity',
  };
  return labels[format] || 'Unknown';
}

export function getSimilarityNormalizationLabel(normalization: AISimilarityNormalization): string {
  const labels: Record<AISimilarityNormalization, string> = {
    [AI_SIMILARITY.NORMALIZATION.NONE]: 'None',
    [AI_SIMILARITY.NORMALIZATION.MIN_MAX]: 'Min-Max',
    [AI_SIMILARITY.NORMALIZATION.Z_SCORE]: 'Z-Score',
    [AI_SIMILARITY.NORMALIZATION.ROBUST]: 'Robust',
    [AI_SIMILARITY.NORMALIZATION.UNIT_VECTOR]: 'Unit Vector',
  };
  return labels[normalization] || 'Unknown';
}

export function isSimilarityActive(status: AISimilarityStatus): boolean {
  const activeStatuses: AISimilarityStatus[] = [
    AI_SIMILARITY.STATUSES.COMPLETED,
    AI_SIMILARITY.STATUSES.CACHED,
    AI_SIMILARITY.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isSimilarityCalculating(status: AISimilarityStatus): boolean {
  const calculatingStatuses: AISimilarityStatus[] = [
    AI_SIMILARITY.STATUSES.PENDING,
    AI_SIMILARITY.STATUSES.CALCULATING,
    AI_SIMILARITY.STATUSES.COMPARING,
  ];
  return calculatingStatuses.includes(status);
}

export function isSimilarityFailed(status: AISimilarityStatus): boolean {
  const failedStatuses: AISimilarityStatus[] = [
    AI_SIMILARITY.STATUSES.FAILED,
    AI_SIMILARITY.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function getDefaultThreshold(): number {
  return AI_SIMILARITY.THRESHOLDS.MEDIUM;
}

export function getDefaultTopK(): number {
  return AI_SIMILARITY.LIMITS.DEFAULT_TOP_K;
}

export function getMaxTopK(): number {
  return AI_SIMILARITY.LIMITS.MAX_TOP_K;
}

export function normalizeScore(score: number, range: [number, number]): number {
  const [min, max] = range;
  if (max === min) return 0;
  return (score - min) / (max - min);
}

export function denormalizeScore(normalized: number, range: [number, number]): number {
  const [min, max] = range;
  return normalized * (max - min) + min;
}

export function getSimilarityRange(type: AISimilarityType): [number, number] {
  const ranges: Record<AISimilarityType, [number, number]> = {
    [AI_SIMILARITY.TYPES.COSINE]: [0, 1],
    [AI_SIMILARITY.TYPES.EUCLIDEAN]: [0, Infinity],
    [AI_SIMILARITY.TYPES.DOT_PRODUCT]: [-Infinity, Infinity],
    [AI_SIMILARITY.TYPES.MANHATTAN]: [0, Infinity],
    [AI_SIMILARITY.TYPES.JACCARD]: [0, 1],
    [AI_SIMILARITY.TYPES.PEARSON]: [-1, 1],
    [AI_SIMILARITY.TYPES.SPEARMAN]: [-1, 1],
    [AI_SIMILARITY.TYPES.KENDALL]: [-1, 1],
    [AI_SIMILARITY.TYPES.HAMMING]: [0, 1],
    [AI_SIMILARITY.TYPES.LEVENSHTEIN]: [0, Infinity],
    [AI_SIMILARITY.TYPES.JARO_WINKLER]: [0, 1],
    [AI_SIMILARITY.TYPES.SORENSEN_DICE]: [0, 1],
    [AI_SIMILARITY.TYPES.OVERLAP]: [0, 1],
    [AI_SIMILARITY.TYPES.TANIMOTO]: [0, 1],
    [AI_SIMILARITY.TYPES.CHEBYSHEV]: [0, Infinity],
    [AI_SIMILARITY.TYPES.MINKOWSKI]: [0, Infinity],
  };
  return ranges[type] || [0, 1];
}

export function getAlgorithmForType(type: AISimilarityType): AISimilarityAlgorithm {
  const algorithms: Record<AISimilarityType, AISimilarityAlgorithm> = {
    [AI_SIMILARITY.TYPES.COSINE]: AI_SIMILARITY.ALGORITHMS.COSINE_SIMILARITY,
    [AI_SIMILARITY.TYPES.EUCLIDEAN]: AI_SIMILARITY.ALGORITHMS.EUCLIDEAN_DISTANCE,
    [AI_SIMILARITY.TYPES.DOT_PRODUCT]: AI_SIMILARITY.ALGORITHMS.COSINE_SIMILARITY,
    [AI_SIMILARITY.TYPES.MANHATTAN]: AI_SIMILARITY.ALGORITHMS.MANHATTAN_DISTANCE,
    [AI_SIMILARITY.TYPES.JACCARD]: AI_SIMILARITY.ALGORITHMS.JACCARD_SIMILARITY,
    [AI_SIMILARITY.TYPES.PEARSON]: AI_SIMILARITY.ALGORITHMS.PEARSON_CORRELATION,
    [AI_SIMILARITY.TYPES.SPEARMAN]: AI_SIMILARITY.ALGORITHMS.SPEARMAN_RANK,
    [AI_SIMILARITY.TYPES.KENDALL]: AI_SIMILARITY.ALGORITHMS.KENDALL_TAU,
    [AI_SIMILARITY.TYPES.HAMMING]: AI_SIMILARITY.ALGORITHMS.JACCARD_SIMILARITY,
    [AI_SIMILARITY.TYPES.LEVENSHTEIN]: AI_SIMILARITY.ALGORITHMS.LEVENSHTEIN_DISTANCE,
    [AI_SIMILARITY.TYPES.JARO_WINKLER]: AI_SIMILARITY.ALGORITHMS.JARO_WINKLER,
    [AI_SIMILARITY.TYPES.SORENSEN_DICE]: AI_SIMILARITY.ALGORITHMS.SORENSEN_DICE,
    [AI_SIMILARITY.TYPES.OVERLAP]: AI_SIMILARITY.ALGORITHMS.OVERLAP_COEFFICIENT,
    [AI_SIMILARITY.TYPES.TANIMOTO]: AI_SIMILARITY.ALGORITHMS.JACCARD_SIMILARITY,
    [AI_SIMILARITY.TYPES.CHEBYSHEV]: AI_SIMILARITY.ALGORITHMS.CHEBYSHEV_DISTANCE,
    [AI_SIMILARITY.TYPES.MINKOWSKI]: AI_SIMILARITY.ALGORITHMS.MINKOWSKI_DISTANCE,
  };
  return algorithms[type] || AI_SIMILARITY.ALGORITHMS.COSINE_SIMILARITY;
}
