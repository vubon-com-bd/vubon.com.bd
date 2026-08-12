/**
 * AI সিমিলারিটি টাইপ এনাম
 */
export const AI_SIMILARITY_TYPE = {
  COSINE: 'cosine',
  DOT_PRODUCT: 'dot_product',
  EUCLIDEAN: 'euclidean',
  MANHATTAN: 'manhattan',
  JACCARD: 'jaccard',
  PEARSON: 'pearson',
  SPEARMAN: 'spearman',
  HAMMING: 'hamming',
} as const;

/**
 * AI_SIMILARITY_TYPE থেকে টাইপ
 */
export type AISimilarityTypeType = (typeof AI_SIMILARITY_TYPE)[keyof typeof AI_SIMILARITY_TYPE];

/**
 * সিমিলারিটি টাইপ লেবেল
 */
export const AI_SIMILARITY_TYPE_LABELS: Record<AISimilarityTypeType, string> = {
  [AI_SIMILARITY_TYPE.COSINE]: 'Cosine Similarity',
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: 'Dot Product',
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: 'Euclidean Distance',
  [AI_SIMILARITY_TYPE.MANHATTAN]: 'Manhattan Distance',
  [AI_SIMILARITY_TYPE.JACCARD]: 'Jaccard Similarity',
  [AI_SIMILARITY_TYPE.PEARSON]: 'Pearson Correlation',
  [AI_SIMILARITY_TYPE.SPEARMAN]: 'Spearman Correlation',
  [AI_SIMILARITY_TYPE.HAMMING]: 'Hamming Distance',
} as const;

/**
 * সিমিলারিটি টাইপ বিবরণ
 */
export const AI_SIMILARITY_TYPE_DESCRIPTIONS: Record<AISimilarityTypeType, string> = {
  [AI_SIMILARITY_TYPE.COSINE]: 'Measures similarity based on the cosine of angle between vectors',
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: 'Measures similarity based on the dot product of vectors',
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: 'Measures similarity based on Euclidean distance (L2)',
  [AI_SIMILARITY_TYPE.MANHATTAN]: 'Measures similarity based on Manhattan distance (L1)',
  [AI_SIMILARITY_TYPE.JACCARD]: 'Measures similarity based on set intersection over union',
  [AI_SIMILARITY_TYPE.PEARSON]: 'Measures linear correlation between variables',
  [AI_SIMILARITY_TYPE.SPEARMAN]: 'Measures rank-based correlation between variables',
  [AI_SIMILARITY_TYPE.HAMMING]: 'Measures similarity based on binary differences',
} as const;

/**
 * সিমিলারিটি টাইপ আইকন
 */
export const AI_SIMILARITY_TYPE_ICONS: Record<AISimilarityTypeType, string> = {
  [AI_SIMILARITY_TYPE.COSINE]: '📐',
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: '⚡',
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: '📏',
  [AI_SIMILARITY_TYPE.MANHATTAN]: '🏙️',
  [AI_SIMILARITY_TYPE.JACCARD]: '🔄',
  [AI_SIMILARITY_TYPE.PEARSON]: '📊',
  [AI_SIMILARITY_TYPE.SPEARMAN]: '📈',
  [AI_SIMILARITY_TYPE.HAMMING]: '🔢',
} as const;

/**
 * সিমিলারিটি টাইপ কালার (হেক্স কোড)
 */
export const AI_SIMILARITY_TYPE_COLORS: Record<AISimilarityTypeType, string> = {
  [AI_SIMILARITY_TYPE.COSINE]: '#3b82f6', // Blue-500
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: '#8b5cf6', // Violet-500
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: '#22c55e', // Green-500
  [AI_SIMILARITY_TYPE.MANHATTAN]: '#f59e0b', // Amber-500
  [AI_SIMILARITY_TYPE.JACCARD]: '#ec4899', // Pink-500
  [AI_SIMILARITY_TYPE.PEARSON]: '#06b6d4', // Cyan-500
  [AI_SIMILARITY_TYPE.SPEARMAN]: '#f472b6', // Pink-400
  [AI_SIMILARITY_TYPE.HAMMING]: '#64748b', // Slate-500
} as const;

/**
 * সিমিলারিটি টাইপ রেঞ্জ
 */
export const AI_SIMILARITY_TYPE_RANGE: Record<
  AISimilarityTypeType,
  { min: number; max: number; isHigherBetter: boolean }
> = {
  [AI_SIMILARITY_TYPE.COSINE]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: { min: -Infinity, max: Infinity, isHigherBetter: true },
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: { min: 0, max: Infinity, isHigherBetter: false },
  [AI_SIMILARITY_TYPE.MANHATTAN]: { min: 0, max: Infinity, isHigherBetter: false },
  [AI_SIMILARITY_TYPE.JACCARD]: { min: 0, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_TYPE.PEARSON]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_TYPE.SPEARMAN]: { min: -1, max: 1, isHigherBetter: true },
  [AI_SIMILARITY_TYPE.HAMMING]: { min: 0, max: 1, isHigherBetter: false },
} as const;

/**
 * সিমিলারিটি টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_SIMILARITY_TYPE_COMPLEXITY: Record<AISimilarityTypeType, number> = {
  [AI_SIMILARITY_TYPE.COSINE]: 2,
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: 1,
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: 2,
  [AI_SIMILARITY_TYPE.MANHATTAN]: 2,
  [AI_SIMILARITY_TYPE.JACCARD]: 3,
  [AI_SIMILARITY_TYPE.PEARSON]: 4,
  [AI_SIMILARITY_TYPE.SPEARMAN]: 4,
  [AI_SIMILARITY_TYPE.HAMMING]: 1,
} as const;

/**
 * সিমিলারিটি টাইপ কনফিগারেশন
 */
export interface AISimilarityTypeConfig {
  type: AISimilarityTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  range: { min: number; max: number; isHigherBetter: boolean };
  complexity: number;
  supportedDataTypes: string[];
  computationalCost: 'low' | 'medium' | 'high';
}

/**
 * সিমিলারিটি টাইপ মেটাডেটা
 */
export const AI_SIMILARITY_TYPE_METADATA: Record<AISimilarityTypeType, AISimilarityTypeConfig> = {
  [AI_SIMILARITY_TYPE.COSINE]: {
    type: AI_SIMILARITY_TYPE.COSINE,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.COSINE],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.COSINE],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.COSINE],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.COSINE],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.COSINE],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.COSINE],
    supportedDataTypes: ['dense', 'sparse', 'float'],
    computationalCost: 'low',
  },
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: {
    type: AI_SIMILARITY_TYPE.DOT_PRODUCT,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.DOT_PRODUCT],
    supportedDataTypes: ['dense', 'float'],
    computationalCost: 'low',
  },
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: {
    type: AI_SIMILARITY_TYPE.EUCLIDEAN,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.EUCLIDEAN],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.EUCLIDEAN],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.EUCLIDEAN],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.EUCLIDEAN],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.EUCLIDEAN],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.EUCLIDEAN],
    supportedDataTypes: ['dense', 'float'],
    computationalCost: 'low',
  },
  [AI_SIMILARITY_TYPE.MANHATTAN]: {
    type: AI_SIMILARITY_TYPE.MANHATTAN,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.MANHATTAN],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.MANHATTAN],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.MANHATTAN],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.MANHATTAN],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.MANHATTAN],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.MANHATTAN],
    supportedDataTypes: ['dense', 'sparse', 'float', 'int'],
    computationalCost: 'low',
  },
  [AI_SIMILARITY_TYPE.JACCARD]: {
    type: AI_SIMILARITY_TYPE.JACCARD,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.JACCARD],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.JACCARD],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.JACCARD],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.JACCARD],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.JACCARD],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.JACCARD],
    supportedDataTypes: ['binary', 'sparse', 'set'],
    computationalCost: 'medium',
  },
  [AI_SIMILARITY_TYPE.PEARSON]: {
    type: AI_SIMILARITY_TYPE.PEARSON,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.PEARSON],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.PEARSON],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.PEARSON],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.PEARSON],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.PEARSON],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.PEARSON],
    supportedDataTypes: ['dense', 'float'],
    computationalCost: 'medium',
  },
  [AI_SIMILARITY_TYPE.SPEARMAN]: {
    type: AI_SIMILARITY_TYPE.SPEARMAN,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.SPEARMAN],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.SPEARMAN],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.SPEARMAN],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.SPEARMAN],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.SPEARMAN],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.SPEARMAN],
    supportedDataTypes: ['dense', 'float', 'int'],
    computationalCost: 'high',
  },
  [AI_SIMILARITY_TYPE.HAMMING]: {
    type: AI_SIMILARITY_TYPE.HAMMING,
    label: AI_SIMILARITY_TYPE_LABELS[AI_SIMILARITY_TYPE.HAMMING],
    description: AI_SIMILARITY_TYPE_DESCRIPTIONS[AI_SIMILARITY_TYPE.HAMMING],
    icon: AI_SIMILARITY_TYPE_ICONS[AI_SIMILARITY_TYPE.HAMMING],
    color: AI_SIMILARITY_TYPE_COLORS[AI_SIMILARITY_TYPE.HAMMING],
    range: AI_SIMILARITY_TYPE_RANGE[AI_SIMILARITY_TYPE.HAMMING],
    complexity: AI_SIMILARITY_TYPE_COMPLEXITY[AI_SIMILARITY_TYPE.HAMMING],
    supportedDataTypes: ['binary'],
    computationalCost: 'low',
  },
} as const;

/**
 * সিমিলারিটি টাইপ গ্রুপ
 */
export const AI_SIMILARITY_TYPE_GROUPS = {
  ANGULAR: [AI_SIMILARITY_TYPE.COSINE, AI_SIMILARITY_TYPE.DOT_PRODUCT] as const,
  DISTANCE: [
    AI_SIMILARITY_TYPE.EUCLIDEAN,
    AI_SIMILARITY_TYPE.MANHATTAN,
    AI_SIMILARITY_TYPE.HAMMING,
  ] as const,
  SET_BASED: [AI_SIMILARITY_TYPE.JACCARD] as const,
  STATISTICAL: [AI_SIMILARITY_TYPE.PEARSON, AI_SIMILARITY_TYPE.SPEARMAN] as const,
} as const;

/**
 * সিমিলারিটি টাইপ গ্রুপ লেবেল
 */
export const AI_SIMILARITY_TYPE_GROUP_LABELS = {
  ANGULAR: 'Angular',
  DISTANCE: 'Distance',
  SET_BASED: 'Set Based',
  STATISTICAL: 'Statistical',
} as const;

/**
 * সিমিলারিটি টাইপ অ্যাপ্লিকেশন কনটেক্সট
 */
export const AI_SIMILARITY_TYPE_CONTEXTS: Record<AISimilarityTypeType, string[]> = {
  [AI_SIMILARITY_TYPE.COSINE]: ['text-embeddings', 'document-similarity', 'semantic-search'],
  [AI_SIMILARITY_TYPE.DOT_PRODUCT]: ['vector-search', 'recommendation-systems', 'neural-networks'],
  [AI_SIMILARITY_TYPE.EUCLIDEAN]: ['clustering', 'anomaly-detection', 'image-similarity'],
  [AI_SIMILARITY_TYPE.MANHATTAN]: ['feature-matching', 'grid-based-similarity', 'optimization'],
  [AI_SIMILARITY_TYPE.JACCARD]: ['set-similarity', 'text-mining', 'recommendation-systems'],
  [AI_SIMILARITY_TYPE.PEARSON]: ['collaborative-filtering', 'user-similarity', 'item-similarity'],
  [AI_SIMILARITY_TYPE.SPEARMAN]: [
    'rank-correlation',
    'monotonic-relationships',
    'non-linear-correlation',
  ],
  [AI_SIMILARITY_TYPE.HAMMING]: ['binary-similarity', 'hash-matching', 'error-detection'],
} as const;
