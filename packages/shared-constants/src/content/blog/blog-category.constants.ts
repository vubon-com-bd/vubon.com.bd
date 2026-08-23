/**
 * Blog Category Constants
 * Categories for blog organization
 */

export const CONTENT_BLOG_CATEGORY = {
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

  // Category Hierarchy
  HIERARCHY: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
  } as const,
} as const;

// Main Categories
export type ContentBlogCategoryMain =
  (typeof CONTENT_BLOG_CATEGORY.MAIN)[keyof typeof CONTENT_BLOG_CATEGORY.MAIN];

// Sub Categories
export type ContentBlogCategorySub =
  (typeof CONTENT_BLOG_CATEGORY.SUB)[keyof typeof CONTENT_BLOG_CATEGORY.SUB];

// Category Types
export type ContentBlogCategoryType =
  (typeof CONTENT_BLOG_CATEGORY.TYPES)[keyof typeof CONTENT_BLOG_CATEGORY.TYPES];

// Category Visibility
export type ContentBlogCategoryVisibility =
  (typeof CONTENT_BLOG_CATEGORY.VISIBILITY)[keyof typeof CONTENT_BLOG_CATEGORY.VISIBILITY];

// Category Hierarchy
export type ContentBlogCategoryHierarchy =
  (typeof CONTENT_BLOG_CATEGORY.HIERARCHY)[keyof typeof CONTENT_BLOG_CATEGORY.HIERARCHY];

// Utility Functions
export function contentBlogCategoryGetMainLabel(category: ContentBlogCategoryMain): string {
  const labels: Record<ContentBlogCategoryMain, string> = {
    [CONTENT_BLOG_CATEGORY.MAIN.TECHNOLOGY]: 'Technology',
    [CONTENT_BLOG_CATEGORY.MAIN.BUSINESS]: 'Business',
    [CONTENT_BLOG_CATEGORY.MAIN.ECOMMERCE]: 'E-commerce',
    [CONTENT_BLOG_CATEGORY.MAIN.MARKETING]: 'Marketing',
    [CONTENT_BLOG_CATEGORY.MAIN.DESIGN]: 'Design',
    [CONTENT_BLOG_CATEGORY.MAIN.DEVELOPMENT]: 'Development',
    [CONTENT_BLOG_CATEGORY.MAIN.PRODUCTIVITY]: 'Productivity',
    [CONTENT_BLOG_CATEGORY.MAIN.EDUCATION]: 'Education',
    [CONTENT_BLOG_CATEGORY.MAIN.HEALTH]: 'Health',
    [CONTENT_BLOG_CATEGORY.MAIN.LIFESTYLE]: 'Lifestyle',
    [CONTENT_BLOG_CATEGORY.MAIN.FINANCE]: 'Finance',
    [CONTENT_BLOG_CATEGORY.MAIN.SCIENCE]: 'Science',
    [CONTENT_BLOG_CATEGORY.MAIN.POLITICS]: 'Politics',
    [CONTENT_BLOG_CATEGORY.MAIN.SPORTS]: 'Sports',
    [CONTENT_BLOG_CATEGORY.MAIN.ENTERTAINMENT]: 'Entertainment',
    [CONTENT_BLOG_CATEGORY.MAIN.TRAVEL]: 'Travel',
    [CONTENT_BLOG_CATEGORY.MAIN.FOOD]: 'Food',
    [CONTENT_BLOG_CATEGORY.MAIN.FASHION]: 'Fashion',
    [CONTENT_BLOG_CATEGORY.MAIN.CULTURE]: 'Culture',
    [CONTENT_BLOG_CATEGORY.MAIN.ENVIRONMENT]: 'Environment',
    [CONTENT_BLOG_CATEGORY.MAIN.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentBlogCategoryGetSubLabel(category: ContentBlogCategorySub): string {
  const labels: Record<ContentBlogCategorySub, string> = {
    // Technology
    [CONTENT_BLOG_CATEGORY.SUB.AI]: 'Artificial Intelligence',
    [CONTENT_BLOG_CATEGORY.SUB.ML]: 'Machine Learning',
    [CONTENT_BLOG_CATEGORY.SUB.DATA_SCIENCE]: 'Data Science',
    [CONTENT_BLOG_CATEGORY.SUB.CLOUD]: 'Cloud Computing',
    [CONTENT_BLOG_CATEGORY.SUB.CYBERSECURITY]: 'Cybersecurity',
    [CONTENT_BLOG_CATEGORY.SUB.BLOCKCHAIN]: 'Blockchain',
    [CONTENT_BLOG_CATEGORY.SUB.IOT]: 'IoT',
    [CONTENT_BLOG_CATEGORY.SUB.ROBOTICS]: 'Robotics',

    // Business
    [CONTENT_BLOG_CATEGORY.SUB.STARTUP]: 'Startup',
    [CONTENT_BLOG_CATEGORY.SUB.ENTREPRENEURSHIP]: 'Entrepreneurship',
    [CONTENT_BLOG_CATEGORY.SUB.MANAGEMENT]: 'Management',
    [CONTENT_BLOG_CATEGORY.SUB.LEADERSHIP]: 'Leadership',
    [CONTENT_BLOG_CATEGORY.SUB.STRATEGY]: 'Strategy',
    [CONTENT_BLOG_CATEGORY.SUB.OPERATIONS]: 'Operations',
    [CONTENT_BLOG_CATEGORY.SUB.HR]: 'Human Resources',

    // E-commerce
    [CONTENT_BLOG_CATEGORY.SUB.RETAIL]: 'Retail',
    [CONTENT_BLOG_CATEGORY.SUB.DTC]: 'DTC',
    [CONTENT_BLOG_CATEGORY.SUB.B2B]: 'B2B',
    [CONTENT_BLOG_CATEGORY.SUB.B2C]: 'B2C',
    [CONTENT_BLOG_CATEGORY.SUB.MARKETPLACE]: 'Marketplace',
    [CONTENT_BLOG_CATEGORY.SUB.OMNICHANNEL]: 'Omnichannel',

    // Marketing
    [CONTENT_BLOG_CATEGORY.SUB.DIGITAL]: 'Digital Marketing',
    [CONTENT_BLOG_CATEGORY.SUB.SOCIAL]: 'Social Media',
    [CONTENT_BLOG_CATEGORY.SUB.CONTENT]: 'Content Marketing',
    [CONTENT_BLOG_CATEGORY.SUB.SEO]: 'SEO',
    [CONTENT_BLOG_CATEGORY.SUB.EMAIL]: 'Email Marketing',
    [CONTENT_BLOG_CATEGORY.SUB.INFLUENCER]: 'Influencer Marketing',
    [CONTENT_BLOG_CATEGORY.SUB.AFFILIATE]: 'Affiliate Marketing',
    [CONTENT_BLOG_CATEGORY.SUB.PAID]: 'Paid Advertising',

    // Design
    [CONTENT_BLOG_CATEGORY.SUB.UX]: 'UX Design',
    [CONTENT_BLOG_CATEGORY.SUB.UI]: 'UI Design',
    [CONTENT_BLOG_CATEGORY.SUB.GRAPHIC]: 'Graphic Design',
    [CONTENT_BLOG_CATEGORY.SUB.INTERACTION]: 'Interaction Design',
    [CONTENT_BLOG_CATEGORY.SUB.SERVICE]: 'Service Design',
    [CONTENT_BLOG_CATEGORY.SUB.PRODUCT]: 'Product Design',

    // Development
    [CONTENT_BLOG_CATEGORY.SUB.FRONTEND]: 'Frontend Development',
    [CONTENT_BLOG_CATEGORY.SUB.BACKEND]: 'Backend Development',
    [CONTENT_BLOG_CATEGORY.SUB.FULLSTACK]: 'Fullstack Development',
    [CONTENT_BLOG_CATEGORY.SUB.MOBILE]: 'Mobile Development',
    [CONTENT_BLOG_CATEGORY.SUB.DEVOPS]: 'DevOps',
    [CONTENT_BLOG_CATEGORY.SUB.QA]: 'QA Testing',
  };
  return labels[category] || 'Unknown Sub-Category';
}

export function contentBlogCategoryGetTypeLabel(type: ContentBlogCategoryType): string {
  const labels: Record<ContentBlogCategoryType, string> = {
    [CONTENT_BLOG_CATEGORY.TYPES.PARENT]: 'Parent Category',
    [CONTENT_BLOG_CATEGORY.TYPES.CHILD]: 'Child Category',
    [CONTENT_BLOG_CATEGORY.TYPES.BOTH]: 'Both Parent & Child',
  };
  return labels[type] || 'Unknown Type';
}

export function contentBlogCategoryGetVisibilityLabel(
  visibility: ContentBlogCategoryVisibility
): string {
  const labels: Record<ContentBlogCategoryVisibility, string> = {
    [CONTENT_BLOG_CATEGORY.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_BLOG_CATEGORY.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_BLOG_CATEGORY.VISIBILITY.INTERNAL]: 'Internal',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentBlogCategoryGetHierarchyLabel(
  hierarchy: ContentBlogCategoryHierarchy
): string {
  const labels: Record<ContentBlogCategoryHierarchy, string> = {
    [CONTENT_BLOG_CATEGORY.HIERARCHY.LEVEL_1]: 'Level 1 (Top)',
    [CONTENT_BLOG_CATEGORY.HIERARCHY.LEVEL_2]: 'Level 2',
    [CONTENT_BLOG_CATEGORY.HIERARCHY.LEVEL_3]: 'Level 3 (Bottom)',
  };
  return labels[hierarchy] || 'Unknown Hierarchy';
}

export function contentBlogCategoryIsValidMain(
  category: string
): category is ContentBlogCategoryMain {
  return Object.values(CONTENT_BLOG_CATEGORY.MAIN).includes(category as ContentBlogCategoryMain);
}

export function contentBlogCategoryIsValidSub(
  category: string
): category is ContentBlogCategorySub {
  return Object.values(CONTENT_BLOG_CATEGORY.SUB).includes(category as ContentBlogCategorySub);
}

export function contentBlogCategoryGetSubCategories(
  main: ContentBlogCategoryMain
): ContentBlogCategorySub[] {
  const subMap: Record<ContentBlogCategoryMain, ContentBlogCategorySub[]> = {
    [CONTENT_BLOG_CATEGORY.MAIN.TECHNOLOGY]: [
      CONTENT_BLOG_CATEGORY.SUB.AI,
      CONTENT_BLOG_CATEGORY.SUB.ML,
      CONTENT_BLOG_CATEGORY.SUB.DATA_SCIENCE,
      CONTENT_BLOG_CATEGORY.SUB.CLOUD,
      CONTENT_BLOG_CATEGORY.SUB.CYBERSECURITY,
      CONTENT_BLOG_CATEGORY.SUB.BLOCKCHAIN,
      CONTENT_BLOG_CATEGORY.SUB.IOT,
      CONTENT_BLOG_CATEGORY.SUB.ROBOTICS,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.BUSINESS]: [
      CONTENT_BLOG_CATEGORY.SUB.STARTUP,
      CONTENT_BLOG_CATEGORY.SUB.ENTREPRENEURSHIP,
      CONTENT_BLOG_CATEGORY.SUB.MANAGEMENT,
      CONTENT_BLOG_CATEGORY.SUB.LEADERSHIP,
      CONTENT_BLOG_CATEGORY.SUB.STRATEGY,
      CONTENT_BLOG_CATEGORY.SUB.OPERATIONS,
      CONTENT_BLOG_CATEGORY.SUB.HR,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.ECOMMERCE]: [
      CONTENT_BLOG_CATEGORY.SUB.RETAIL,
      CONTENT_BLOG_CATEGORY.SUB.DTC,
      CONTENT_BLOG_CATEGORY.SUB.B2B,
      CONTENT_BLOG_CATEGORY.SUB.B2C,
      CONTENT_BLOG_CATEGORY.SUB.MARKETPLACE,
      CONTENT_BLOG_CATEGORY.SUB.OMNICHANNEL,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.MARKETING]: [
      CONTENT_BLOG_CATEGORY.SUB.DIGITAL,
      CONTENT_BLOG_CATEGORY.SUB.SOCIAL,
      CONTENT_BLOG_CATEGORY.SUB.CONTENT,
      CONTENT_BLOG_CATEGORY.SUB.SEO,
      CONTENT_BLOG_CATEGORY.SUB.EMAIL,
      CONTENT_BLOG_CATEGORY.SUB.INFLUENCER,
      CONTENT_BLOG_CATEGORY.SUB.AFFILIATE,
      CONTENT_BLOG_CATEGORY.SUB.PAID,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.DESIGN]: [
      CONTENT_BLOG_CATEGORY.SUB.UX,
      CONTENT_BLOG_CATEGORY.SUB.UI,
      CONTENT_BLOG_CATEGORY.SUB.GRAPHIC,
      CONTENT_BLOG_CATEGORY.SUB.INTERACTION,
      CONTENT_BLOG_CATEGORY.SUB.SERVICE,
      CONTENT_BLOG_CATEGORY.SUB.PRODUCT,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.DEVELOPMENT]: [
      CONTENT_BLOG_CATEGORY.SUB.FRONTEND,
      CONTENT_BLOG_CATEGORY.SUB.BACKEND,
      CONTENT_BLOG_CATEGORY.SUB.FULLSTACK,
      CONTENT_BLOG_CATEGORY.SUB.MOBILE,
      CONTENT_BLOG_CATEGORY.SUB.DEVOPS,
      CONTENT_BLOG_CATEGORY.SUB.QA,
    ],
    [CONTENT_BLOG_CATEGORY.MAIN.PRODUCTIVITY]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.EDUCATION]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.HEALTH]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.LIFESTYLE]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.FINANCE]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.SCIENCE]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.POLITICS]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.SPORTS]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.ENTERTAINMENT]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.TRAVEL]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.FOOD]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.FASHION]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.CULTURE]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.ENVIRONMENT]: [],
    [CONTENT_BLOG_CATEGORY.MAIN.CUSTOM]: [],
  };
  return subMap[main] || [];
}
