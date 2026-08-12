/**
 * ডিফল্ট সিমিলারিটি মেট্রিক (COSINE)
 */
export const AI_SIMILARITY_DEFAULT_METRIC = 'cosine' as const;

/**
 * ন্যূনতম সিমিলারিটি স্কোর (০.০)
 */
export const AI_SIMILARITY_MIN_SCORE = 0.0 as const;

/**
 * সর্বোচ্চ সিমিলারিটি স্কোর (১.০)
 */
export const AI_SIMILARITY_MAX_SCORE = 1.0 as const;

/**
 * ডিফল্ট সিমিলারিটি থ্রেশহোল্ড (০.৫)
 */
export const AI_SIMILARITY_THRESHOLD = 0.5 as const;

/**
 * সিমিলারিটি মেট্রিক এনাম
 */
export const AI_SIMILARITY_METRIC = {
  COSINE: 'cosine',
  EUCLIDEAN: 'euclidean',
  DOT: 'dot',
  MANHATTAN: 'manhattan',
  JACCARD: 'jaccard',
  PEARSON: 'pearson',
  SPEARMAN: 'spearman',
  HAMMING: 'hamming',
  LEVENSHTEIN: 'levenshtein',
} as const;

/**
 * AI_SIMILARITY_METRIC থেকে টাইপ
 */
export type AISimilarityMetricType =
  (typeof AI_SIMILARITY_METRIC)[keyof typeof AI_SIMILARITY_METRIC];

/**
 * সিমিলারিটি মেট্রিক লেবেল
 */
export const AI_SIMILARITY_METRIC_LABELS: Record<AISimilarityMetricType, string> = {
  [AI_SIMILARITY_METRIC.COSINE]: 'Cosine Similarity',
  [AI_SIMILARITY_METRIC.EUCLIDEAN]: 'Euclidean Distance',
  [AI_SIMILARITY_METRIC.DOT]: 'Dot Product',
  [AI_SIMILARITY_METRIC.MANHATTAN]: 'Manhattan Distance',
  [AI_SIMILARITY_METRIC.JACCARD]: 'Jaccard Similarity',
  [AI_SIMILARITY_METRIC.PEARSON]: 'Pearson Correlation',
  [AI_SIMILARITY_METRIC.SPEARMAN]: 'Spearman Correlation',
  [AI_SIMILARITY_METRIC.HAMMING]: 'Hamming Distance',
  [AI_SIMILARITY_METRIC.LEVENSHTEIN]: 'Levenshtein Distance',
} as const;

/**
 * সিমিলারিটি মেট্রিক বিবরণ
 */
export const AI_SIMILARITY_METRIC_DESCRIPTIONS: Record<AISimilarityMetricType, string> = {
  [AI_SIMILARITY_METRIC.COSINE]: 'Measures similarity based on angle between vectors',
  [AI_SIMILARITY_METRIC.EUCLIDEAN]: 'Measures similarity based on straight-line distance',
  [AI_SIMILARITY_METRIC.DOT]: 'Measures similarity based on dot product of vectors',
  [AI_SIMILARITY_METRIC.MANHATTAN]: 'Measures similarity based on absolute differences',
  [AI_SIMILARITY_METRIC.JACCARD]: 'Measures similarity based on set intersection over union',
  [AI_SIMILARITY_METRIC.PEARSON]: 'Measures linear correlation between variables',
  [AI_SIMILARITY_METRIC.SPEARMAN]: 'Measures monotonic correlation between variables',
  [AI_SIMILARITY_METRIC.HAMMING]: 'Measures similarity based on binary differences',
  [AI_SIMILARITY_METRIC.LEVENSHTEIN]: 'Measures similarity based on edit distance',
} as const;

/**
 * সিমিলারিটি মেট্রিক আইকন
 */
export const AI_SIMILARITY_METRIC_ICONS: Record<AISimilarityMetricType, string> = {
  [AI_SIMILARITY_METRIC.COSINE]: '📐',
  [AI_SIMILARITY_METRIC.EUCLIDEAN]: '📏',
  [AI_SIMILARITY_METRIC.DOT]: '⚡',
  [AI_SIMILARITY_METRIC.MANHATTAN]: '🏙️',
  [AI_SIMILARITY_METRIC.JACCARD]: '🔄',
  [AI_SIMILARITY_METRIC.PEARSON]: '📊',
  [AI_SIMILARITY_METRIC.SPEARMAN]: '📈',
  [AI_SIMILARITY_METRIC.HAMMING]: '🔢',
  [AI_SIMILARITY_METRIC.LEVENSHTEIN]: '✏️',
} as const;

/**
 * সিমিলারিটি মেট্রিক রেঞ্জ
 */
export const AI_SIMILARITY_METRIC_RANGE: Record<
  AISimilarityMetricType,
  { min: number; max: number; isHigherBetter: boolean }
> = {
  [AI_SIMILARITY_METRIC.COSINE]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_METRIC.EUCLIDEAN]: { min: 0, max: Infinity, isHigherBetter: false },
  [AI_SIMILARITY_METRIC.DOT]: { min: -Infinity, max: Infinity, isHigherBetter: true },
  [AI_SIMILARITY_METRIC.MANHATTAN]: { min: 0, max: Infinity, isHigherBetter: false },
  [AI_SIMILARITY_METRIC.JACCARD]: { min: 0, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_METRIC.PEARSON]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_METRIC.SPEARMAN]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_METRIC.HAMMING]: { min: 0, max: 1, isHigherBetter: false },
  [AI_SIMILARITY_METRIC.LEVENSHTEIN]: { min: 0, max: Infinity, isHigherBetter: false },
} as const;

/**
 * সিমিলারিটি মেট্রিক কনফিগারেশন
 */
export interface AISimilarityMetricConfig {
  metric: AISimilarityMetricType;
  label: string;
  description: string;
  icon: string;
  minScore: number;
  maxScore: number;
  isHigherBetter: boolean;
  supportedDataTypes: string[];
  computationalComplexity: 'O(n)' | 'O(n²)' | 'O(n log n)' | 'O(1)';
}

/**
 * সিমিলারিটি মেট্রিক মেটাডেটা
 */
export const AI_SIMILARITY_METRIC_METADATA: Record<
  AISimilarityMetricType,
  AISimilarityMetricConfig
> = {
  [AI_SIMILARITY_METRIC.COSINE]: {
    metric: AI_SIMILARITY_METRIC.COSINE,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.COSINE],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.COSINE],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.COSINE],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.COSINE].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.COSINE].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.COSINE].isHigherBetter,
    supportedDataTypes: ['dense', 'sparse', 'float'],
    computationalComplexity: 'O(n)',
  },
  [AI_SIMILARITY_METRIC.EUCLIDEAN]: {
    metric: AI_SIMILARITY_METRIC.EUCLIDEAN,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.EUCLIDEAN],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.EUCLIDEAN],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.EUCLIDEAN],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.EUCLIDEAN].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.EUCLIDEAN].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.EUCLIDEAN].isHigherBetter,
    supportedDataTypes: ['dense', 'float'],
    computationalComplexity: 'O(n)',
  },
  [AI_SIMILARITY_METRIC.DOT]: {
    metric: AI_SIMILARITY_METRIC.DOT,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.DOT],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.DOT],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.DOT],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.DOT].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.DOT].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.DOT].isHigherBetter,
    supportedDataTypes: ['dense', 'float'],
    computationalComplexity: 'O(n)',
  },
  [AI_SIMILARITY_METRIC.MANHATTAN]: {
    metric: AI_SIMILARITY_METRIC.MANHATTAN,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.MANHATTAN],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.MANHATTAN],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.MANHATTAN],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.MANHATTAN].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.MANHATTAN].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.MANHATTAN].isHigherBetter,
    supportedDataTypes: ['dense', 'sparse', 'float', 'int'],
    computationalComplexity: 'O(n)',
  },
  [AI_SIMILARITY_METRIC.JACCARD]: {
    metric: AI_SIMILARITY_METRIC.JACCARD,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.JACCARD],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.JACCARD],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.JACCARD],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.JACCARD].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.JACCARD].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.JACCARD].isHigherBetter,
    supportedDataTypes: ['binary', 'sparse'],
    computationalComplexity: 'O(n²)',
  },
  [AI_SIMILARITY_METRIC.PEARSON]: {
    metric: AI_SIMILARITY_METRIC.PEARSON,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.PEARSON],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.PEARSON],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.PEARSON],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.PEARSON].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.PEARSON].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.PEARSON].isHigherBetter,
    supportedDataTypes: ['dense', 'float'],
    computationalComplexity: 'O(n log n)',
  },
  [AI_SIMILARITY_METRIC.SPEARMAN]: {
    metric: AI_SIMILARITY_METRIC.SPEARMAN,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.SPEARMAN],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.SPEARMAN],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.SPEARMAN],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.SPEARMAN].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.SPEARMAN].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.SPEARMAN].isHigherBetter,
    supportedDataTypes: ['dense', 'float', 'int'],
    computationalComplexity: 'O(n log n)',
  },
  [AI_SIMILARITY_METRIC.HAMMING]: {
    metric: AI_SIMILARITY_METRIC.HAMMING,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.HAMMING],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.HAMMING],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.HAMMING],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.HAMMING].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.HAMMING].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.HAMMING].isHigherBetter,
    supportedDataTypes: ['binary'],
    computationalComplexity: 'O(n)',
  },
  [AI_SIMILARITY_METRIC.LEVENSHTEIN]: {
    metric: AI_SIMILARITY_METRIC.LEVENSHTEIN,
    label: AI_SIMILARITY_METRIC_LABELS[AI_SIMILARITY_METRIC.LEVENSHTEIN],
    description: AI_SIMILARITY_METRIC_DESCRIPTIONS[AI_SIMILARITY_METRIC.LEVENSHTEIN],
    icon: AI_SIMILARITY_METRIC_ICONS[AI_SIMILARITY_METRIC.LEVENSHTEIN],
    minScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.LEVENSHTEIN].min,
    maxScore: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.LEVENSHTEIN].max,
    isHigherBetter: AI_SIMILARITY_METRIC_RANGE[AI_SIMILARITY_METRIC.LEVENSHTEIN].isHigherBetter,
    supportedDataTypes: ['text', 'string'],
    computationalComplexity: 'O(n²)',
  },
} as const;

/**
 * সিমিলারিটি কনফিগারেশন
 */
export interface AISimilarityConfig {
  metric: AISimilarityMetricType;
  minScore: number;
  maxScore: number;
  threshold: number;
  normalize: boolean;
  useCache: boolean;
  cacheTTL: number;
}

/**
 * সিমিলারিটি ডিফল্ট কনফিগারেশন
 */
export const AI_SIMILARITY_DEFAULT_CONFIG: AISimilarityConfig = {
  metric: AI_SIMILARITY_DEFAULT_METRIC as AISimilarityMetricType,
  minScore: AI_SIMILARITY_MIN_SCORE,
  maxScore: AI_SIMILARITY_MAX_SCORE,
  threshold: AI_SIMILARITY_THRESHOLD,
  normalize: true,
  useCache: true,
  cacheTTL: 3600,
} as const;

/**
 * সিমিলারিটি ফিল্টার
 */
export interface AISimilarityFilter {
  metric?: AISimilarityMetricType;
  minScore?: number;
  maxScore?: number;
  threshold?: number;
  normalize?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * সিমিলারিটি রেসপন্স
 */
export interface AISimilarityResponse<T = unknown> {
  id: string;
  score: number;
  normalizedScore: number;
  metric: AISimilarityMetricType;
  metadata: T;
  timestamp: Date;
}

/**
 * সিমিলারিটি মেট্রিক গ্রুপ
 */
export const AI_SIMILARITY_METRIC_GROUPS = {
  ANGULAR: [AI_SIMILARITY_METRIC.COSINE, AI_SIMILARITY_METRIC.DOT] as const,
  DISTANCE: [
    AI_SIMILARITY_METRIC.EUCLIDEAN,
    AI_SIMILARITY_METRIC.MANHATTAN,
    AI_SIMILARITY_METRIC.HAMMING,
    AI_SIMILARITY_METRIC.LEVENSHTEIN,
  ] as const,
  SET_BASED: [AI_SIMILARITY_METRIC.JACCARD] as const,
  STATISTICAL: [AI_SIMILARITY_METRIC.PEARSON, AI_SIMILARITY_METRIC.SPEARMAN] as const,
} as const;

/**
 * সিমিলারিটি মেট্রিক গ্রুপ লেবেল
 */
export const AI_SIMILARITY_METRIC_GROUP_LABELS = {
  ANGULAR: 'Angular',
  DISTANCE: 'Distance',
  SET_BASED: 'Set Based',
  STATISTICAL: 'Statistical',
} as const;

/**
 * সিমিলারিটি স্কোর ক্যাটাগরি
 */
export const AI_SIMILARITY_SCORE_CATEGORIES = {
  VERY_LOW: 0.1,
  LOW: 0.3,
  MEDIUM: 0.5,
  HIGH: 0.7,
  VERY_HIGH: 0.9,
} as const;

/**
 * সিমিলারিটি স্কোর ক্যাটাগরি লেবেল
 */
export const AI_SIMILARITY_SCORE_CATEGORY_LABELS = {
  VERY_LOW: 'Very Low',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
} as const;
