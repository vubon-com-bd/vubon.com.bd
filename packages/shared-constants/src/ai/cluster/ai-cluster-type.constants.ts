/**
 * AI Cluster Type Constants
 * Types and classifications for AI clustering
 */

export const AI_CLUSTER_TYPE = {
  // Cluster Domains
  DOMAINS: {
    DATA: 'data',
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    DOCUMENT: 'document',
    USER: 'user',
    PRODUCT: 'product',
    BEHAVIOR: 'behavior',
    SPATIAL: 'spatial',
    TEMPORAL: 'temporal',
  } as const,

  // Cluster Sub-Types
  SUB_TYPES: {
    // Data Clustering
    NUMERICAL: 'numerical',
    CATEGORICAL: 'categorical',
    MIXED: 'mixed',
    HIGH_DIMENSIONAL: 'high_dimensional',

    // Document Clustering
    TOPIC: 'topic',
    THEME: 'theme',
    DOC_CATEGORY: 'doc_category',
    TAG: 'tag',

    // User Clustering
    DEMOGRAPHIC: 'demographic',
    BEHAVIORAL: 'behavioral',
    PSYCHOGRAPHIC: 'psychographic',
    SEGMENT: 'segment',

    // Product Clustering
    PROD_CATEGORY: 'prod_category',
    BRAND: 'brand',
    SIMILARITY: 'similarity',
    COMPLEMENTARY: 'complementary',

    // Temporal Clustering
    PERIODIC: 'periodic',
    SEQUENTIAL: 'sequential',
    EVENT_BASED: 'event_based',

    // Spatial Clustering
    REGIONAL: 'regional',
    POINT_BASED: 'point_based',
    AREA_BASED: 'area_based',
  } as const,

  // Cluster Shapes
  SHAPES: {
    SPHERICAL: 'spherical',
    ELLIPTICAL: 'elliptical',
    IRREGULAR: 'irregular',
    LINEAR: 'linear',
    COMPLEX: 'complex',
  } as const,

  // Cluster Sizes
  SIZES: {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    HUGE: 'huge',
    MASSIVE: 'massive',
  } as const,

  // Cluster Densities
  DENSITIES: {
    UNIFORM: 'uniform',
    VARIABLE: 'variable',
    DENSE: 'dense',
    SPARSE: 'sparse',
    HIERARCHICAL: 'hierarchical',
  } as const,

  // Cluster Separability
  SEPARABILITY: {
    WELL_SEPARATED: 'well_separated',
    OVERLAPPING: 'overlapping',
    FUZZY: 'fuzzy',
    NESTED: 'nested',
    CHAINED: 'chained',
  } as const,
} as const;

// Cluster Domains
export type AIClusterDomain =
  (typeof AI_CLUSTER_TYPE.DOMAINS)[keyof typeof AI_CLUSTER_TYPE.DOMAINS];

// Cluster Sub-Types
export type AIClusterSubType =
  (typeof AI_CLUSTER_TYPE.SUB_TYPES)[keyof typeof AI_CLUSTER_TYPE.SUB_TYPES];

// Cluster Shapes
export type AIClusterShape = (typeof AI_CLUSTER_TYPE.SHAPES)[keyof typeof AI_CLUSTER_TYPE.SHAPES];

// Cluster Sizes
export type AIClusterSize = (typeof AI_CLUSTER_TYPE.SIZES)[keyof typeof AI_CLUSTER_TYPE.SIZES];

// Cluster Densities
export type AIClusterDensity =
  (typeof AI_CLUSTER_TYPE.DENSITIES)[keyof typeof AI_CLUSTER_TYPE.DENSITIES];

// Cluster Separability
export type AIClusterSeparability =
  (typeof AI_CLUSTER_TYPE.SEPARABILITY)[keyof typeof AI_CLUSTER_TYPE.SEPARABILITY];

// Utility Functions
export function getClusterDomainLabel(domain: AIClusterDomain): string {
  const labels: Record<AIClusterDomain, string> = {
    [AI_CLUSTER_TYPE.DOMAINS.DATA]: 'Data',
    [AI_CLUSTER_TYPE.DOMAINS.TEXT]: 'Text',
    [AI_CLUSTER_TYPE.DOMAINS.IMAGE]: 'Image',
    [AI_CLUSTER_TYPE.DOMAINS.AUDIO]: 'Audio',
    [AI_CLUSTER_TYPE.DOMAINS.VIDEO]: 'Video',
    [AI_CLUSTER_TYPE.DOMAINS.DOCUMENT]: 'Document',
    [AI_CLUSTER_TYPE.DOMAINS.USER]: 'User',
    [AI_CLUSTER_TYPE.DOMAINS.PRODUCT]: 'Product',
    [AI_CLUSTER_TYPE.DOMAINS.BEHAVIOR]: 'Behavior',
    [AI_CLUSTER_TYPE.DOMAINS.SPATIAL]: 'Spatial',
    [AI_CLUSTER_TYPE.DOMAINS.TEMPORAL]: 'Temporal',
  };
  return labels[domain] || 'Unknown';
}

export function getClusterSubTypeLabel(subType: AIClusterSubType): string {
  const labels: Record<AIClusterSubType, string> = {
    [AI_CLUSTER_TYPE.SUB_TYPES.NUMERICAL]: 'Numerical',
    [AI_CLUSTER_TYPE.SUB_TYPES.CATEGORICAL]: 'Categorical',
    [AI_CLUSTER_TYPE.SUB_TYPES.MIXED]: 'Mixed',
    [AI_CLUSTER_TYPE.SUB_TYPES.HIGH_DIMENSIONAL]: 'High Dimensional',
    [AI_CLUSTER_TYPE.SUB_TYPES.TOPIC]: 'Topic',
    [AI_CLUSTER_TYPE.SUB_TYPES.THEME]: 'Theme',
    [AI_CLUSTER_TYPE.SUB_TYPES.DOC_CATEGORY]: 'Document Category',
    [AI_CLUSTER_TYPE.SUB_TYPES.TAG]: 'Tag',
    [AI_CLUSTER_TYPE.SUB_TYPES.DEMOGRAPHIC]: 'Demographic',
    [AI_CLUSTER_TYPE.SUB_TYPES.BEHAVIORAL]: 'Behavioral',
    [AI_CLUSTER_TYPE.SUB_TYPES.PSYCHOGRAPHIC]: 'Psychographic',
    [AI_CLUSTER_TYPE.SUB_TYPES.SEGMENT]: 'Segment',
    [AI_CLUSTER_TYPE.SUB_TYPES.PROD_CATEGORY]: 'Product Category',
    [AI_CLUSTER_TYPE.SUB_TYPES.BRAND]: 'Brand',
    [AI_CLUSTER_TYPE.SUB_TYPES.SIMILARITY]: 'Similarity',
    [AI_CLUSTER_TYPE.SUB_TYPES.COMPLEMENTARY]: 'Complementary',
    [AI_CLUSTER_TYPE.SUB_TYPES.PERIODIC]: 'Periodic',
    [AI_CLUSTER_TYPE.SUB_TYPES.SEQUENTIAL]: 'Sequential',
    [AI_CLUSTER_TYPE.SUB_TYPES.EVENT_BASED]: 'Event Based',
    [AI_CLUSTER_TYPE.SUB_TYPES.REGIONAL]: 'Regional',
    [AI_CLUSTER_TYPE.SUB_TYPES.POINT_BASED]: 'Point Based',
    [AI_CLUSTER_TYPE.SUB_TYPES.AREA_BASED]: 'Area Based',
  };
  return labels[subType] || 'Unknown';
}

export function getClusterShapeLabel(shape: AIClusterShape): string {
  const labels: Record<AIClusterShape, string> = {
    [AI_CLUSTER_TYPE.SHAPES.SPHERICAL]: 'Spherical',
    [AI_CLUSTER_TYPE.SHAPES.ELLIPTICAL]: 'Elliptical',
    [AI_CLUSTER_TYPE.SHAPES.IRREGULAR]: 'Irregular',
    [AI_CLUSTER_TYPE.SHAPES.LINEAR]: 'Linear',
    [AI_CLUSTER_TYPE.SHAPES.COMPLEX]: 'Complex',
  };
  return labels[shape] || 'Unknown';
}

export function getClusterSizeLabel(size: AIClusterSize): string {
  const labels: Record<AIClusterSize, string> = {
    [AI_CLUSTER_TYPE.SIZES.TINY]: 'Tiny',
    [AI_CLUSTER_TYPE.SIZES.SMALL]: 'Small',
    [AI_CLUSTER_TYPE.SIZES.MEDIUM]: 'Medium',
    [AI_CLUSTER_TYPE.SIZES.LARGE]: 'Large',
    [AI_CLUSTER_TYPE.SIZES.HUGE]: 'Huge',
    [AI_CLUSTER_TYPE.SIZES.MASSIVE]: 'Massive',
  };
  return labels[size] || 'Unknown';
}

export function getClusterDensityLabel(density: AIClusterDensity): string {
  const labels: Record<AIClusterDensity, string> = {
    [AI_CLUSTER_TYPE.DENSITIES.UNIFORM]: 'Uniform',
    [AI_CLUSTER_TYPE.DENSITIES.VARIABLE]: 'Variable',
    [AI_CLUSTER_TYPE.DENSITIES.DENSE]: 'Dense',
    [AI_CLUSTER_TYPE.DENSITIES.SPARSE]: 'Sparse',
    [AI_CLUSTER_TYPE.DENSITIES.HIERARCHICAL]: 'Hierarchical',
  };
  return labels[density] || 'Unknown';
}

export function getClusterSeparabilityLabel(separability: AIClusterSeparability): string {
  const labels: Record<AIClusterSeparability, string> = {
    [AI_CLUSTER_TYPE.SEPARABILITY.WELL_SEPARATED]: 'Well Separated',
    [AI_CLUSTER_TYPE.SEPARABILITY.OVERLAPPING]: 'Overlapping',
    [AI_CLUSTER_TYPE.SEPARABILITY.FUZZY]: 'Fuzzy',
    [AI_CLUSTER_TYPE.SEPARABILITY.NESTED]: 'Nested',
    [AI_CLUSTER_TYPE.SEPARABILITY.CHAINED]: 'Chained',
  };
  return labels[separability] || 'Unknown';
}

export function getClusterSizeThreshold(size: AIClusterSize): number {
  const thresholds: Record<AIClusterSize, number> = {
    [AI_CLUSTER_TYPE.SIZES.TINY]: 10,
    [AI_CLUSTER_TYPE.SIZES.SMALL]: 100,
    [AI_CLUSTER_TYPE.SIZES.MEDIUM]: 1000,
    [AI_CLUSTER_TYPE.SIZES.LARGE]: 10000,
    [AI_CLUSTER_TYPE.SIZES.HUGE]: 100000,
    [AI_CLUSTER_TYPE.SIZES.MASSIVE]: 1000000,
  };
  return thresholds[size] || 0;
}
