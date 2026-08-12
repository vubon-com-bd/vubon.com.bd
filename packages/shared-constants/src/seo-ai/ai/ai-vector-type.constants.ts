/**
 * AI ভেক্টর টাইপ এনাম
 */
export const AI_VECTOR_TYPE = {
  DENSE: 'dense',
  SPARSE: 'sparse',
  BINARY: 'binary',
  HYBRID: 'hybrid',
  FLOAT: 'float',
  INT8: 'int8',
} as const;

/**
 * AI_VECTOR_TYPE থেকে টাইপ
 */
export type AIVectorTypeType = (typeof AI_VECTOR_TYPE)[keyof typeof AI_VECTOR_TYPE];

/**
 * ভেক্টর টাইপ লেবেল
 */
export const AI_VECTOR_TYPE_LABELS: Record<AIVectorTypeType, string> = {
  [AI_VECTOR_TYPE.DENSE]: 'Dense',
  [AI_VECTOR_TYPE.SPARSE]: 'Sparse',
  [AI_VECTOR_TYPE.BINARY]: 'Binary',
  [AI_VECTOR_TYPE.HYBRID]: 'Hybrid',
  [AI_VECTOR_TYPE.FLOAT]: 'Float',
  [AI_VECTOR_TYPE.INT8]: 'Int8',
} as const;

/**
 * ভেক্টর টাইপ বিবরণ
 */
export const AI_VECTOR_TYPE_DESCRIPTIONS: Record<AIVectorTypeType, string> = {
  [AI_VECTOR_TYPE.DENSE]: 'Dense vectors with values in all dimensions',
  [AI_VECTOR_TYPE.SPARSE]: 'Sparse vectors with mostly zero values',
  [AI_VECTOR_TYPE.BINARY]: 'Binary vectors with 0/1 values only',
  [AI_VECTOR_TYPE.HYBRID]: 'Hybrid vectors combining dense and sparse features',
  [AI_VECTOR_TYPE.FLOAT]: 'Float vectors with floating-point values',
  [AI_VECTOR_TYPE.INT8]: '8-bit integer vectors for memory efficiency',
} as const;

/**
 * ভেক্টর টাইপ আইকন
 */
export const AI_VECTOR_TYPE_ICONS: Record<AIVectorTypeType, string> = {
  [AI_VECTOR_TYPE.DENSE]: '📊',
  [AI_VECTOR_TYPE.SPARSE]: '🔲',
  [AI_VECTOR_TYPE.BINARY]: '🔢',
  [AI_VECTOR_TYPE.HYBRID]: '🔄',
  [AI_VECTOR_TYPE.FLOAT]: '💧',
  [AI_VECTOR_TYPE.INT8]: '📐',
} as const;

/**
 * ভেক্টর টাইপ কালার (হেক্স কোড)
 */
export const AI_VECTOR_TYPE_COLORS: Record<AIVectorTypeType, string> = {
  [AI_VECTOR_TYPE.DENSE]: '#3b82f6', // Blue-500
  [AI_VECTOR_TYPE.SPARSE]: '#8b5cf6', // Violet-500
  [AI_VECTOR_TYPE.BINARY]: '#22c55e', // Green-500
  [AI_VECTOR_TYPE.HYBRID]: '#f59e0b', // Amber-500
  [AI_VECTOR_TYPE.FLOAT]: '#06b6d4', // Cyan-500
  [AI_VECTOR_TYPE.INT8]: '#f472b6', // Pink-400
} as const;

/**
 * ভেক্টর টাইপ ক্যারেক্টারিস্টিক্স
 */
export const AI_VECTOR_TYPE_CHARACTERISTICS: Record<
  AIVectorTypeType,
  {
    memoryEfficiency: number;
    searchSpeed: number;
    accuracy: number;
    dimensionSupport: number;
    compression: boolean;
  }
> = {
  [AI_VECTOR_TYPE.DENSE]: {
    memoryEfficiency: 70,
    searchSpeed: 85,
    accuracy: 95,
    dimensionSupport: 100,
    compression: false,
  },
  [AI_VECTOR_TYPE.SPARSE]: {
    memoryEfficiency: 90,
    searchSpeed: 60,
    accuracy: 80,
    dimensionSupport: 50,
    compression: true,
  },
  [AI_VECTOR_TYPE.BINARY]: {
    memoryEfficiency: 95,
    searchSpeed: 95,
    accuracy: 70,
    dimensionSupport: 80,
    compression: true,
  },
  [AI_VECTOR_TYPE.HYBRID]: {
    memoryEfficiency: 65,
    searchSpeed: 75,
    accuracy: 90,
    dimensionSupport: 90,
    compression: false,
  },
  [AI_VECTOR_TYPE.FLOAT]: {
    memoryEfficiency: 60,
    searchSpeed: 80,
    accuracy: 98,
    dimensionSupport: 100,
    compression: false,
  },
  [AI_VECTOR_TYPE.INT8]: {
    memoryEfficiency: 85,
    searchSpeed: 88,
    accuracy: 85,
    dimensionSupport: 85,
    compression: true,
  },
} as const;

/**
 * ভেক্টর টাইপ কনফিগারেশন
 */
export interface AIVectorTypeConfig {
  type: AIVectorTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  memoryEfficiency: number;
  searchSpeed: number;
  accuracy: number;
  dimensionSupport: number;
  compression: boolean;
  typicalUseCases: string[];
  storageBytesPerDimension: number;
}

/**
 * ভেক্টর টাইপ মেটাডেটা
 */
export const AI_VECTOR_TYPE_METADATA: Record<AIVectorTypeType, AIVectorTypeConfig> = {
  [AI_VECTOR_TYPE.DENSE]: {
    type: AI_VECTOR_TYPE.DENSE,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.DENSE],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.DENSE],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.DENSE],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.DENSE],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.DENSE].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.DENSE].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.DENSE].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.DENSE].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.DENSE].compression,
    typicalUseCases: [
      'Text embeddings',
      'Image features',
      'Audio embeddings',
      'Neural network outputs',
    ],
    storageBytesPerDimension: 4,
  },
  [AI_VECTOR_TYPE.SPARSE]: {
    type: AI_VECTOR_TYPE.SPARSE,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.SPARSE],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.SPARSE],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.SPARSE],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.SPARSE],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.SPARSE].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.SPARSE].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.SPARSE].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.SPARSE].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.SPARSE].compression,
    typicalUseCases: ['Bag of words', 'TF-IDF features', 'One-hot encoding', 'Feature hashing'],
    storageBytesPerDimension: 0.5,
  },
  [AI_VECTOR_TYPE.BINARY]: {
    type: AI_VECTOR_TYPE.BINARY,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.BINARY],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.BINARY],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.BINARY],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.BINARY],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.BINARY].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.BINARY].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.BINARY].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.BINARY].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.BINARY].compression,
    typicalUseCases: ['Hash embeddings', 'LSH features', 'Signatures', 'Bloom filters'],
    storageBytesPerDimension: 0.125,
  },
  [AI_VECTOR_TYPE.HYBRID]: {
    type: AI_VECTOR_TYPE.HYBRID,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.HYBRID],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.HYBRID],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.HYBRID],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.HYBRID],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.HYBRID].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.HYBRID].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.HYBRID].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.HYBRID].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.HYBRID].compression,
    typicalUseCases: [
      'Combined features',
      'Multi-modal embeddings',
      'Ensemble vectors',
      'Composite representations',
    ],
    storageBytesPerDimension: 4,
  },
  [AI_VECTOR_TYPE.FLOAT]: {
    type: AI_VECTOR_TYPE.FLOAT,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.FLOAT],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.FLOAT],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.FLOAT],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.FLOAT],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.FLOAT].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.FLOAT].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.FLOAT].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.FLOAT].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.FLOAT].compression,
    typicalUseCases: [
      'Precise embeddings',
      'Research applications',
      'Scientific computing',
      'High-precision features',
    ],
    storageBytesPerDimension: 8,
  },
  [AI_VECTOR_TYPE.INT8]: {
    type: AI_VECTOR_TYPE.INT8,
    label: AI_VECTOR_TYPE_LABELS[AI_VECTOR_TYPE.INT8],
    description: AI_VECTOR_TYPE_DESCRIPTIONS[AI_VECTOR_TYPE.INT8],
    icon: AI_VECTOR_TYPE_ICONS[AI_VECTOR_TYPE.INT8],
    color: AI_VECTOR_TYPE_COLORS[AI_VECTOR_TYPE.INT8],
    memoryEfficiency: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.INT8].memoryEfficiency,
    searchSpeed: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.INT8].searchSpeed,
    accuracy: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.INT8].accuracy,
    dimensionSupport: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.INT8].dimensionSupport,
    compression: AI_VECTOR_TYPE_CHARACTERISTICS[AI_VECTOR_TYPE.INT8].compression,
    typicalUseCases: [
      'Quantized embeddings',
      'Mobile deployments',
      'Edge AI applications',
      'Memory-constrained environments',
    ],
    storageBytesPerDimension: 1,
  },
} as const;

/**
 * ভেক্টর টাইপ গ্রুপ
 */
export const AI_VECTOR_TYPE_GROUPS = {
  PRECISION: [AI_VECTOR_TYPE.FLOAT, AI_VECTOR_TYPE.DENSE] as const,
  EFFICIENCY: [AI_VECTOR_TYPE.INT8, AI_VECTOR_TYPE.BINARY, AI_VECTOR_TYPE.SPARSE] as const,
  SPECIALIZED: [AI_VECTOR_TYPE.HYBRID] as const,
} as const;

/**
 * ভেক্টর টাইপ গ্রুপ লেবেল
 */
export const AI_VECTOR_TYPE_GROUP_LABELS = {
  PRECISION: 'Precision',
  EFFICIENCY: 'Efficiency',
  SPECIALIZED: 'Specialized',
} as const;
