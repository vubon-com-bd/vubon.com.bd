/**
 * AI ক্লাস্টার টাইপ এনাম
 */
export const AI_CLUSTER_TYPE = {
  KMEANS: 'kmeans',
  DBSCAN: 'dbscan',
  HIERARCHICAL: 'hierarchical',
  GMM: 'gmm',
  SPECTRAL: 'spectral',
  AGGREGATIVE: 'aggregative',
  BIRCH: 'birch',
} as const;

/**
 * AI_CLUSTER_TYPE থেকে টাইপ
 */
export type AIClusterTypeType = (typeof AI_CLUSTER_TYPE)[keyof typeof AI_CLUSTER_TYPE];

/**
 * ক্লাস্টার টাইপ লেবেল
 */
export const AI_CLUSTER_TYPE_LABELS: Record<AIClusterTypeType, string> = {
  [AI_CLUSTER_TYPE.KMEANS]: 'K-Means',
  [AI_CLUSTER_TYPE.DBSCAN]: 'DBSCAN',
  [AI_CLUSTER_TYPE.HIERARCHICAL]: 'Hierarchical',
  [AI_CLUSTER_TYPE.GMM]: 'Gaussian Mixture',
  [AI_CLUSTER_TYPE.SPECTRAL]: 'Spectral',
  [AI_CLUSTER_TYPE.AGGREGATIVE]: 'Aggregative',
  [AI_CLUSTER_TYPE.BIRCH]: 'BIRCH',
} as const;

/**
 * ক্লাস্টার টাইপ বিবরণ
 */
export const AI_CLUSTER_TYPE_DESCRIPTIONS: Record<AIClusterTypeType, string> = {
  [AI_CLUSTER_TYPE.KMEANS]: 'Partitions data into K clusters using centroid-based approach',
  [AI_CLUSTER_TYPE.DBSCAN]: 'Density-based clustering for arbitrary shaped clusters',
  [AI_CLUSTER_TYPE.HIERARCHICAL]:
    'Builds hierarchy of clusters using bottom-up or top-down approach',
  [AI_CLUSTER_TYPE.GMM]: 'Probabilistic clustering using Gaussian mixture models',
  [AI_CLUSTER_TYPE.SPECTRAL]: 'Uses eigenvalues of similarity matrix for clustering',
  [AI_CLUSTER_TYPE.AGGREGATIVE]: 'Agglomerative hierarchical clustering',
  [AI_CLUSTER_TYPE.BIRCH]: 'Balanced iterative reducing and clustering using hierarchies',
} as const;

/**
 * ক্লাস্টার টাইপ আইকন
 */
export const AI_CLUSTER_TYPE_ICONS: Record<AIClusterTypeType, string> = {
  [AI_CLUSTER_TYPE.KMEANS]: '🎯',
  [AI_CLUSTER_TYPE.DBSCAN]: '📊',
  [AI_CLUSTER_TYPE.HIERARCHICAL]: '🌳',
  [AI_CLUSTER_TYPE.GMM]: '📐',
  [AI_CLUSTER_TYPE.SPECTRAL]: '🎵',
  [AI_CLUSTER_TYPE.AGGREGATIVE]: '📈',
  [AI_CLUSTER_TYPE.BIRCH]: '🌿',
} as const;

/**
 * ক্লাস্টার টাইপ কালার (হেক্স কোড)
 */
export const AI_CLUSTER_TYPE_COLORS: Record<AIClusterTypeType, string> = {
  [AI_CLUSTER_TYPE.KMEANS]: '#3b82f6', // Blue-500
  [AI_CLUSTER_TYPE.DBSCAN]: '#22c55e', // Green-500
  [AI_CLUSTER_TYPE.HIERARCHICAL]: '#8b5cf6', // Violet-500
  [AI_CLUSTER_TYPE.GMM]: '#ec4899', // Pink-500
  [AI_CLUSTER_TYPE.SPECTRAL]: '#f59e0b', // Amber-500
  [AI_CLUSTER_TYPE.AGGREGATIVE]: '#06b6d4', // Cyan-500
  [AI_CLUSTER_TYPE.BIRCH]: '#f472b6', // Pink-400
} as const;

/**
 * ক্লাস্টার টাইপ ক্যারেক্টারিস্টিক্স
 */
export const AI_CLUSTER_TYPE_CHARACTERISTICS: Record<
  AIClusterTypeType,
  {
    requiresK: boolean;
    handlesOutliers: boolean;
    handlesNonSpherical: boolean;
    deterministic: boolean;
    scalable: boolean;
    interpretability: number;
  }
> = {
  [AI_CLUSTER_TYPE.KMEANS]: {
    requiresK: true,
    handlesOutliers: false,
    handlesNonSpherical: false,
    deterministic: true,
    scalable: true,
    interpretability: 4,
  },
  [AI_CLUSTER_TYPE.DBSCAN]: {
    requiresK: false,
    handlesOutliers: true,
    handlesNonSpherical: true,
    deterministic: true,
    scalable: false,
    interpretability: 3,
  },
  [AI_CLUSTER_TYPE.HIERARCHICAL]: {
    requiresK: false,
    handlesOutliers: false,
    handlesNonSpherical: true,
    deterministic: true,
    scalable: false,
    interpretability: 5,
  },
  [AI_CLUSTER_TYPE.GMM]: {
    requiresK: true,
    handlesOutliers: false,
    handlesNonSpherical: true,
    deterministic: false,
    scalable: false,
    interpretability: 3,
  },
  [AI_CLUSTER_TYPE.SPECTRAL]: {
    requiresK: true,
    handlesOutliers: false,
    handlesNonSpherical: true,
    deterministic: true,
    scalable: false,
    interpretability: 2,
  },
  [AI_CLUSTER_TYPE.AGGREGATIVE]: {
    requiresK: false,
    handlesOutliers: false,
    handlesNonSpherical: true,
    deterministic: true,
    scalable: false,
    interpretability: 5,
  },
  [AI_CLUSTER_TYPE.BIRCH]: {
    requiresK: true,
    handlesOutliers: false,
    handlesNonSpherical: true,
    deterministic: true,
    scalable: true,
    interpretability: 3,
  },
} as const;

/**
 * ক্লাস্টার টাইপ কনফিগারেশন
 */
export interface AIClusterTypeConfig {
  type: AIClusterTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  characteristics: {
    requiresK: boolean;
    handlesOutliers: boolean;
    handlesNonSpherical: boolean;
    deterministic: boolean;
    scalable: boolean;
    interpretability: number;
  };
  typicalUseCases: string[];
  complexity: number;
}

/**
 * ক্লাস্টার টাইপ মেটাডেটা
 */
export const AI_CLUSTER_TYPE_METADATA: Record<AIClusterTypeType, AIClusterTypeConfig> = {
  [AI_CLUSTER_TYPE.KMEANS]: {
    type: AI_CLUSTER_TYPE.KMEANS,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.KMEANS],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.KMEANS],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.KMEANS],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.KMEANS],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.KMEANS],
    typicalUseCases: [
      'Customer segmentation',
      'Image compression',
      'Document clustering',
      'Market research',
    ],
    complexity: 2,
  },
  [AI_CLUSTER_TYPE.DBSCAN]: {
    type: AI_CLUSTER_TYPE.DBSCAN,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.DBSCAN],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.DBSCAN],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.DBSCAN],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.DBSCAN],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.DBSCAN],
    typicalUseCases: [
      'Spatial data analysis',
      'Anomaly detection',
      'Complex shape clustering',
      'Noise handling',
    ],
    complexity: 3,
  },
  [AI_CLUSTER_TYPE.HIERARCHICAL]: {
    type: AI_CLUSTER_TYPE.HIERARCHICAL,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.HIERARCHICAL],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.HIERARCHICAL],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.HIERARCHICAL],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.HIERARCHICAL],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.HIERARCHICAL],
    typicalUseCases: [
      'Taxonomy creation',
      'Gene analysis',
      'Document organization',
      'Phylogenetic trees',
    ],
    complexity: 4,
  },
  [AI_CLUSTER_TYPE.GMM]: {
    type: AI_CLUSTER_TYPE.GMM,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.GMM],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.GMM],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.GMM],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.GMM],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.GMM],
    typicalUseCases: [
      'Soft clustering',
      'Speech recognition',
      'Image segmentation',
      'Anomaly detection',
    ],
    complexity: 4,
  },
  [AI_CLUSTER_TYPE.SPECTRAL]: {
    type: AI_CLUSTER_TYPE.SPECTRAL,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.SPECTRAL],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.SPECTRAL],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.SPECTRAL],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.SPECTRAL],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.SPECTRAL],
    typicalUseCases: [
      'Image segmentation',
      'Social network analysis',
      'Graph clustering',
      'Community detection',
    ],
    complexity: 4,
  },
  [AI_CLUSTER_TYPE.AGGREGATIVE]: {
    type: AI_CLUSTER_TYPE.AGGREGATIVE,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.AGGREGATIVE],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.AGGREGATIVE],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.AGGREGATIVE],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.AGGREGATIVE],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.AGGREGATIVE],
    typicalUseCases: [
      'Hierarchical clustering',
      'Dendrogram analysis',
      'Data exploration',
      'Pattern discovery',
    ],
    complexity: 3,
  },
  [AI_CLUSTER_TYPE.BIRCH]: {
    type: AI_CLUSTER_TYPE.BIRCH,
    label: AI_CLUSTER_TYPE_LABELS[AI_CLUSTER_TYPE.BIRCH],
    description: AI_CLUSTER_TYPE_DESCRIPTIONS[AI_CLUSTER_TYPE.BIRCH],
    icon: AI_CLUSTER_TYPE_ICONS[AI_CLUSTER_TYPE.BIRCH],
    color: AI_CLUSTER_TYPE_COLORS[AI_CLUSTER_TYPE.BIRCH],
    characteristics: AI_CLUSTER_TYPE_CHARACTERISTICS[AI_CLUSTER_TYPE.BIRCH],
    typicalUseCases: [
      'Large-scale clustering',
      'Streaming data analysis',
      'Incremental clustering',
      'High-dimensional data',
    ],
    complexity: 3,
  },
} as const;

/**
 * ক্লাস্টার টাইপ গ্রুপ
 */
export const AI_CLUSTER_TYPE_GROUPS = {
  CENTROID_BASED: [AI_CLUSTER_TYPE.KMEANS] as const,
  DENSITY_BASED: [AI_CLUSTER_TYPE.DBSCAN] as const,
  HIERARCHICAL: [
    AI_CLUSTER_TYPE.HIERARCHICAL,
    AI_CLUSTER_TYPE.AGGREGATIVE,
    AI_CLUSTER_TYPE.BIRCH,
  ] as const,
  PROBABILISTIC: [AI_CLUSTER_TYPE.GMM] as const,
  SPECTRAL: [AI_CLUSTER_TYPE.SPECTRAL] as const,
} as const;

/**
 * ক্লাস্টার টাইপ গ্রুপ লেবেল
 */
export const AI_CLUSTER_TYPE_GROUP_LABELS = {
  CENTROID_BASED: 'Centroid Based',
  DENSITY_BASED: 'Density Based',
  HIERARCHICAL: 'Hierarchical',
  PROBABILISTIC: 'Probabilistic',
  SPECTRAL: 'Spectral',
} as const;

/**
 * ক্লাস্টার টাইপ স্কেলেবিলিটি রেটিং (১-৫)
 */
export const AI_CLUSTER_TYPE_SCALABILITY: Record<AIClusterTypeType, number> = {
  [AI_CLUSTER_TYPE.KMEANS]: 5,
  [AI_CLUSTER_TYPE.DBSCAN]: 2,
  [AI_CLUSTER_TYPE.HIERARCHICAL]: 2,
  [AI_CLUSTER_TYPE.GMM]: 3,
  [AI_CLUSTER_TYPE.SPECTRAL]: 2,
  [AI_CLUSTER_TYPE.AGGREGATIVE]: 2,
  [AI_CLUSTER_TYPE.BIRCH]: 5,
} as const;
