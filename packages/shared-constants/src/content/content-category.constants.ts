/**
 * Content Category Constants
 * Categories and classifications for content organization
 */

export const CONTENT_CATEGORY = {
  // Main Categories
  MAIN: {
    TECHNOLOGY: 'technology',
    BUSINESS: 'business',
    ECOMMERCE: 'ecommerce',
    MARKETING: 'marketing',
    DESIGN: 'design',
    DEVELOPMENT: 'development',
    PRODUCTIVITY: 'productivity',
    EDUCATION: 'education',
    HEALTH: 'health',
    LIFESTYLE: 'lifestyle',
    FINANCE: 'finance',
    SCIENCE: 'science',
    POLITICS: 'politics',
    SPORTS: 'sports',
    ENTERTAINMENT: 'entertainment',
    TRAVEL: 'travel',
    FOOD: 'food',
    FASHION: 'fashion',
    CULTURE: 'culture',
    ENVIRONMENT: 'environment',
    CUSTOM: 'custom',
  } as const,

  // Sub Categories
  SUB: {
    // Technology
    AI: 'ai',
    ML: 'ml',
    DATA_SCIENCE: 'data_science',
    CLOUD: 'cloud',
    CYBERSECURITY: 'cybersecurity',
    BLOCKCHAIN: 'blockchain',
    IOT: 'iot',
    ROBOTICS: 'robotics',

    // Business
    STARTUP: 'startup',
    ENTREPRENEURSHIP: 'entrepreneurship',
    MANAGEMENT: 'management',
    LEADERSHIP: 'leadership',
    STRATEGY: 'strategy',
    OPERATIONS: 'operations',
    HR: 'hr',

    // E-commerce
    RETAIL: 'retail',
    DTC: 'dtc',
    B2B: 'b2b',
    B2C: 'b2c',
    MARKETPLACE: 'marketplace',
    OMNICHANNEL: 'omnichannel',

    // Marketing
    DIGITAL: 'digital',
    SOCIAL: 'social',
    CONTENT: 'content',
    SEO: 'seo',
    EMAIL: 'email',
    INFLUENCER: 'influencer',
    AFFILIATE: 'affiliate',
    PAID: 'paid',

    // Design
    UX: 'ux',
    UI: 'ui',
    GRAPHIC: 'graphic',
    INTERACTION: 'interaction',
    SERVICE: 'service',
    PRODUCT: 'product',

    // Development
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    FULLSTACK: 'fullstack',
    MOBILE: 'mobile',
    DEVOPS: 'devops',
    QA: 'qa',
  } as const,

  // Category Hierarchy
  HIERARCHY: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
  } as const,

  // Category Types
  TYPES: {
    PARENT: 'parent',
    CHILD: 'child',
    BOTH: 'both',
  } as const,

  // Category Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INTERNAL: 'internal',
  } as const,
} as const;

// Main Categories
export type ContentMainCategory =
  (typeof CONTENT_CATEGORY.MAIN)[keyof typeof CONTENT_CATEGORY.MAIN];

// Sub Categories
export type ContentSubCategory = (typeof CONTENT_CATEGORY.SUB)[keyof typeof CONTENT_CATEGORY.SUB];

// Category Hierarchy
export type ContentCategoryHierarchy =
  (typeof CONTENT_CATEGORY.HIERARCHY)[keyof typeof CONTENT_CATEGORY.HIERARCHY];

// Category Types
export type ContentCategoryType =
  (typeof CONTENT_CATEGORY.TYPES)[keyof typeof CONTENT_CATEGORY.TYPES];

// Category Visibility
export type ContentCategoryVisibility =
  (typeof CONTENT_CATEGORY.VISIBILITY)[keyof typeof CONTENT_CATEGORY.VISIBILITY];

// Utility Functions
export function contentCategoryGetMainLabel(category: ContentMainCategory): string {
  const labels: Record<ContentMainCategory, string> = {
    [CONTENT_CATEGORY.MAIN.TECHNOLOGY]: 'Technology',
    [CONTENT_CATEGORY.MAIN.BUSINESS]: 'Business',
    [CONTENT_CATEGORY.MAIN.ECOMMERCE]: 'E-commerce',
    [CONTENT_CATEGORY.MAIN.MARKETING]: 'Marketing',
    [CONTENT_CATEGORY.MAIN.DESIGN]: 'Design',
    [CONTENT_CATEGORY.MAIN.DEVELOPMENT]: 'Development',
    [CONTENT_CATEGORY.MAIN.PRODUCTIVITY]: 'Productivity',
    [CONTENT_CATEGORY.MAIN.EDUCATION]: 'Education',
    [CONTENT_CATEGORY.MAIN.HEALTH]: 'Health',
    [CONTENT_CATEGORY.MAIN.LIFESTYLE]: 'Lifestyle',
    [CONTENT_CATEGORY.MAIN.FINANCE]: 'Finance',
    [CONTENT_CATEGORY.MAIN.SCIENCE]: 'Science',
    [CONTENT_CATEGORY.MAIN.POLITICS]: 'Politics',
    [CONTENT_CATEGORY.MAIN.SPORTS]: 'Sports',
    [CONTENT_CATEGORY.MAIN.ENTERTAINMENT]: 'Entertainment',
    [CONTENT_CATEGORY.MAIN.TRAVEL]: 'Travel',
    [CONTENT_CATEGORY.MAIN.FOOD]: 'Food',
    [CONTENT_CATEGORY.MAIN.FASHION]: 'Fashion',
    [CONTENT_CATEGORY.MAIN.CULTURE]: 'Culture',
    [CONTENT_CATEGORY.MAIN.ENVIRONMENT]: 'Environment',
    [CONTENT_CATEGORY.MAIN.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentCategoryGetSubLabel(category: ContentSubCategory): string {
  const labels: Record<ContentSubCategory, string> = {
    // Technology
    [CONTENT_CATEGORY.SUB.AI]: 'Artificial Intelligence',
    [CONTENT_CATEGORY.SUB.ML]: 'Machine Learning',
    [CONTENT_CATEGORY.SUB.DATA_SCIENCE]: 'Data Science',
    [CONTENT_CATEGORY.SUB.CLOUD]: 'Cloud Computing',
    [CONTENT_CATEGORY.SUB.CYBERSECURITY]: 'Cybersecurity',
    [CONTENT_CATEGORY.SUB.BLOCKCHAIN]: 'Blockchain',
    [CONTENT_CATEGORY.SUB.IOT]: 'IoT',
    [CONTENT_CATEGORY.SUB.ROBOTICS]: 'Robotics',

    // Business
    [CONTENT_CATEGORY.SUB.STARTUP]: 'Startup',
    [CONTENT_CATEGORY.SUB.ENTREPRENEURSHIP]: 'Entrepreneurship',
    [CONTENT_CATEGORY.SUB.MANAGEMENT]: 'Management',
    [CONTENT_CATEGORY.SUB.LEADERSHIP]: 'Leadership',
    [CONTENT_CATEGORY.SUB.STRATEGY]: 'Strategy',
    [CONTENT_CATEGORY.SUB.OPERATIONS]: 'Operations',
    [CONTENT_CATEGORY.SUB.HR]: 'Human Resources',

    // E-commerce
    [CONTENT_CATEGORY.SUB.RETAIL]: 'Retail',
    [CONTENT_CATEGORY.SUB.DTC]: 'DTC',
    [CONTENT_CATEGORY.SUB.B2B]: 'B2B',
    [CONTENT_CATEGORY.SUB.B2C]: 'B2C',
    [CONTENT_CATEGORY.SUB.MARKETPLACE]: 'Marketplace',
    [CONTENT_CATEGORY.SUB.OMNICHANNEL]: 'Omnichannel',

    // Marketing
    [CONTENT_CATEGORY.SUB.DIGITAL]: 'Digital Marketing',
    [CONTENT_CATEGORY.SUB.SOCIAL]: 'Social Media',
    [CONTENT_CATEGORY.SUB.CONTENT]: 'Content Marketing',
    [CONTENT_CATEGORY.SUB.SEO]: 'SEO',
    [CONTENT_CATEGORY.SUB.EMAIL]: 'Email Marketing',
    [CONTENT_CATEGORY.SUB.INFLUENCER]: 'Influencer Marketing',
    [CONTENT_CATEGORY.SUB.AFFILIATE]: 'Affiliate Marketing',
    [CONTENT_CATEGORY.SUB.PAID]: 'Paid Advertising',

    // Design
    [CONTENT_CATEGORY.SUB.UX]: 'UX Design',
    [CONTENT_CATEGORY.SUB.UI]: 'UI Design',
    [CONTENT_CATEGORY.SUB.GRAPHIC]: 'Graphic Design',
    [CONTENT_CATEGORY.SUB.INTERACTION]: 'Interaction Design',
    [CONTENT_CATEGORY.SUB.SERVICE]: 'Service Design',
    [CONTENT_CATEGORY.SUB.PRODUCT]: 'Product Design',

    // Development
    [CONTENT_CATEGORY.SUB.FRONTEND]: 'Frontend Development',
    [CONTENT_CATEGORY.SUB.BACKEND]: 'Backend Development',
    [CONTENT_CATEGORY.SUB.FULLSTACK]: 'Fullstack Development',
    [CONTENT_CATEGORY.SUB.MOBILE]: 'Mobile Development',
    [CONTENT_CATEGORY.SUB.DEVOPS]: 'DevOps',
    [CONTENT_CATEGORY.SUB.QA]: 'QA Testing',
  };
  return labels[category] || 'Unknown Sub-Category';
}

export function contentCategoryGetHierarchyLabel(hierarchy: ContentCategoryHierarchy): string {
  const labels: Record<ContentCategoryHierarchy, string> = {
    [CONTENT_CATEGORY.HIERARCHY.LEVEL_1]: 'Level 1 (Top)',
    [CONTENT_CATEGORY.HIERARCHY.LEVEL_2]: 'Level 2',
    [CONTENT_CATEGORY.HIERARCHY.LEVEL_3]: 'Level 3 (Bottom)',
  };
  return labels[hierarchy] || 'Unknown Hierarchy';
}

export function contentCategoryGetTypeLabel(type: ContentCategoryType): string {
  const labels: Record<ContentCategoryType, string> = {
    [CONTENT_CATEGORY.TYPES.PARENT]: 'Parent Category',
    [CONTENT_CATEGORY.TYPES.CHILD]: 'Child Category',
    [CONTENT_CATEGORY.TYPES.BOTH]: 'Both Parent & Child',
  };
  return labels[type] || 'Unknown Type';
}

export function contentCategoryGetVisibilityLabel(visibility: ContentCategoryVisibility): string {
  const labels: Record<ContentCategoryVisibility, string> = {
    [CONTENT_CATEGORY.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_CATEGORY.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_CATEGORY.VISIBILITY.INTERNAL]: 'Internal',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentCategoryIsValidMain(category: string): category is ContentMainCategory {
  return Object.values(CONTENT_CATEGORY.MAIN).includes(category as ContentMainCategory);
}

export function contentCategoryIsValidSub(category: string): category is ContentSubCategory {
  return Object.values(CONTENT_CATEGORY.SUB).includes(category as ContentSubCategory);
}

export function contentCategoryGetSubCategories(main: ContentMainCategory): ContentSubCategory[] {
  const subMap: Record<ContentMainCategory, ContentSubCategory[]> = {
    [CONTENT_CATEGORY.MAIN.TECHNOLOGY]: [
      CONTENT_CATEGORY.SUB.AI,
      CONTENT_CATEGORY.SUB.ML,
      CONTENT_CATEGORY.SUB.DATA_SCIENCE,
      CONTENT_CATEGORY.SUB.CLOUD,
      CONTENT_CATEGORY.SUB.CYBERSECURITY,
      CONTENT_CATEGORY.SUB.BLOCKCHAIN,
      CONTENT_CATEGORY.SUB.IOT,
      CONTENT_CATEGORY.SUB.ROBOTICS,
    ],
    [CONTENT_CATEGORY.MAIN.BUSINESS]: [
      CONTENT_CATEGORY.SUB.STARTUP,
      CONTENT_CATEGORY.SUB.ENTREPRENEURSHIP,
      CONTENT_CATEGORY.SUB.MANAGEMENT,
      CONTENT_CATEGORY.SUB.LEADERSHIP,
      CONTENT_CATEGORY.SUB.STRATEGY,
      CONTENT_CATEGORY.SUB.OPERATIONS,
      CONTENT_CATEGORY.SUB.HR,
    ],
    [CONTENT_CATEGORY.MAIN.ECOMMERCE]: [
      CONTENT_CATEGORY.SUB.RETAIL,
      CONTENT_CATEGORY.SUB.DTC,
      CONTENT_CATEGORY.SUB.B2B,
      CONTENT_CATEGORY.SUB.B2C,
      CONTENT_CATEGORY.SUB.MARKETPLACE,
      CONTENT_CATEGORY.SUB.OMNICHANNEL,
    ],
    [CONTENT_CATEGORY.MAIN.MARKETING]: [
      CONTENT_CATEGORY.SUB.DIGITAL,
      CONTENT_CATEGORY.SUB.SOCIAL,
      CONTENT_CATEGORY.SUB.CONTENT,
      CONTENT_CATEGORY.SUB.SEO,
      CONTENT_CATEGORY.SUB.EMAIL,
      CONTENT_CATEGORY.SUB.INFLUENCER,
      CONTENT_CATEGORY.SUB.AFFILIATE,
      CONTENT_CATEGORY.SUB.PAID,
    ],
    [CONTENT_CATEGORY.MAIN.DESIGN]: [
      CONTENT_CATEGORY.SUB.UX,
      CONTENT_CATEGORY.SUB.UI,
      CONTENT_CATEGORY.SUB.GRAPHIC,
      CONTENT_CATEGORY.SUB.INTERACTION,
      CONTENT_CATEGORY.SUB.SERVICE,
      CONTENT_CATEGORY.SUB.PRODUCT,
    ],
    [CONTENT_CATEGORY.MAIN.DEVELOPMENT]: [
      CONTENT_CATEGORY.SUB.FRONTEND,
      CONTENT_CATEGORY.SUB.BACKEND,
      CONTENT_CATEGORY.SUB.FULLSTACK,
      CONTENT_CATEGORY.SUB.MOBILE,
      CONTENT_CATEGORY.SUB.DEVOPS,
      CONTENT_CATEGORY.SUB.QA,
    ],
    [CONTENT_CATEGORY.MAIN.PRODUCTIVITY]: [],
    [CONTENT_CATEGORY.MAIN.EDUCATION]: [],
    [CONTENT_CATEGORY.MAIN.HEALTH]: [],
    [CONTENT_CATEGORY.MAIN.LIFESTYLE]: [],
    [CONTENT_CATEGORY.MAIN.FINANCE]: [],
    [CONTENT_CATEGORY.MAIN.SCIENCE]: [],
    [CONTENT_CATEGORY.MAIN.POLITICS]: [],
    [CONTENT_CATEGORY.MAIN.SPORTS]: [],
    [CONTENT_CATEGORY.MAIN.ENTERTAINMENT]: [],
    [CONTENT_CATEGORY.MAIN.TRAVEL]: [],
    [CONTENT_CATEGORY.MAIN.FOOD]: [],
    [CONTENT_CATEGORY.MAIN.FASHION]: [],
    [CONTENT_CATEGORY.MAIN.CULTURE]: [],
    [CONTENT_CATEGORY.MAIN.ENVIRONMENT]: [],
    [CONTENT_CATEGORY.MAIN.CUSTOM]: [],
  };
  return subMap[main] || [];
}
