/**
 * Content Tag Constants
 * Tags for content organization and discovery
 */

export const CONTENT_TAG = {
  // Popular Tags
  POPULAR: {
    TRENDING: 'trending',
    POPULAR: 'popular',
    NEW: 'new',
    UPDATED: 'updated',
    FEATURED: 'featured',
    EDITORS_PICK: 'editors_pick',
    STAFF_PICK: 'staff_pick',
    RECOMMENDED: 'recommended',
    SPONSORED: 'sponsored',
    PROMOTED: 'promoted',
    EXCLUSIVE: 'exclusive',
    PREMIUM: 'premium',
    FREE: 'free',
    BETA: 'beta',
    EXPERIMENTAL: 'experimental',
  } as const,

  // Topic Tags
  TOPIC: {
    AI: 'ai',
    ML: 'ml',
    DATA: 'data',
    CLOUD: 'cloud',
    SECURITY: 'security',
    BLOCKCHAIN: 'blockchain',
    IOT: 'iot',
    ROBOTICS: 'robotics',
    STARTUP: 'startup',
    BUSINESS: 'business',
    MARKETING: 'marketing',
    SALES: 'sales',
    DESIGN: 'design',
    UX: 'ux',
    UI: 'ui',
    DEVELOPMENT: 'development',
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    FULLSTACK: 'fullstack',
    MOBILE: 'mobile',
    DEVOPS: 'devops',
    QA: 'qa',
  } as const,

  // Type Tags
  TYPE: {
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    EBOOK: 'ebook',
    VIDEO: 'video',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    ARTICLE: 'article',
    BLOG: 'blog',
    NEWS: 'news',
    REVIEW: 'review',
    TESTIMONIAL: 'testimonial',
    FAQ: 'faq',
    DOCUMENTATION: 'documentation',
  } as const,

  // Audience Tags
  AUDIENCE: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    B2B: 'b2b',
    B2C: 'b2c',
    DEVELOPERS: 'developers',
    DESIGNERS: 'designers',
    MARKETERS: 'marketers',
    FOUNDERS: 'founders',
    MANAGERS: 'managers',
    STUDENTS: 'students',
  } as const,

  // Tag Colors
  COLORS: {
    TRENDING: '#EF4444',
    POPULAR: '#F59E0B',
    NEW: '#10B981',
    UPDATED: '#3B82F6',
    FEATURED: '#8B5CF6',
    PREMIUM: '#F59E0B',
    EXCLUSIVE: '#EC4899',
    SPONSORED: '#6B7280',
    FREE: '#10B981',
    BETA: '#06B6D4',
    EXPERIMENTAL: '#8B5CF6',
  } as const,

  // Tag Categories
  CATEGORIES: {
    POPULARITY: 'popularity',
    TOPIC: 'topic',
    TYPE: 'type',
    AUDIENCE: 'audience',
    CUSTOM: 'custom',
  } as const,
} as const;

// Popular Tags
export type ContentPopularTag = (typeof CONTENT_TAG.POPULAR)[keyof typeof CONTENT_TAG.POPULAR];

// Topic Tags
export type ContentTopicTag = (typeof CONTENT_TAG.TOPIC)[keyof typeof CONTENT_TAG.TOPIC];

// Type Tags
export type ContentTypeTag = (typeof CONTENT_TAG.TYPE)[keyof typeof CONTENT_TAG.TYPE];

// Audience Tags
export type ContentAudienceTag = (typeof CONTENT_TAG.AUDIENCE)[keyof typeof CONTENT_TAG.AUDIENCE];

// Tag Colors
export type ContentTagColor = (typeof CONTENT_TAG.COLORS)[keyof typeof CONTENT_TAG.COLORS];

// Tag Categories
export type ContentTagCategory =
  (typeof CONTENT_TAG.CATEGORIES)[keyof typeof CONTENT_TAG.CATEGORIES];

// Utility Functions
export function contentTagGetPopularLabel(tag: ContentPopularTag): string {
  const labels: Record<ContentPopularTag, string> = {
    [CONTENT_TAG.POPULAR.TRENDING]: 'Trending',
    [CONTENT_TAG.POPULAR.POPULAR]: 'Popular',
    [CONTENT_TAG.POPULAR.NEW]: 'New',
    [CONTENT_TAG.POPULAR.UPDATED]: 'Updated',
    [CONTENT_TAG.POPULAR.FEATURED]: 'Featured',
    [CONTENT_TAG.POPULAR.EDITORS_PICK]: "Editor's Pick",
    [CONTENT_TAG.POPULAR.STAFF_PICK]: 'Staff Pick',
    [CONTENT_TAG.POPULAR.RECOMMENDED]: 'Recommended',
    [CONTENT_TAG.POPULAR.SPONSORED]: 'Sponsored',
    [CONTENT_TAG.POPULAR.PROMOTED]: 'Promoted',
    [CONTENT_TAG.POPULAR.EXCLUSIVE]: 'Exclusive',
    [CONTENT_TAG.POPULAR.PREMIUM]: 'Premium',
    [CONTENT_TAG.POPULAR.FREE]: 'Free',
    [CONTENT_TAG.POPULAR.BETA]: 'Beta',
    [CONTENT_TAG.POPULAR.EXPERIMENTAL]: 'Experimental',
  };
  return labels[tag] || 'Unknown Tag';
}

export function contentTagGetTopicLabel(tag: ContentTopicTag): string {
  const labels: Record<ContentTopicTag, string> = {
    [CONTENT_TAG.TOPIC.AI]: 'Artificial Intelligence',
    [CONTENT_TAG.TOPIC.ML]: 'Machine Learning',
    [CONTENT_TAG.TOPIC.DATA]: 'Data Science',
    [CONTENT_TAG.TOPIC.CLOUD]: 'Cloud Computing',
    [CONTENT_TAG.TOPIC.SECURITY]: 'Cybersecurity',
    [CONTENT_TAG.TOPIC.BLOCKCHAIN]: 'Blockchain',
    [CONTENT_TAG.TOPIC.IOT]: 'IoT',
    [CONTENT_TAG.TOPIC.ROBOTICS]: 'Robotics',
    [CONTENT_TAG.TOPIC.STARTUP]: 'Startup',
    [CONTENT_TAG.TOPIC.BUSINESS]: 'Business',
    [CONTENT_TAG.TOPIC.MARKETING]: 'Marketing',
    [CONTENT_TAG.TOPIC.SALES]: 'Sales',
    [CONTENT_TAG.TOPIC.DESIGN]: 'Design',
    [CONTENT_TAG.TOPIC.UX]: 'UX Design',
    [CONTENT_TAG.TOPIC.UI]: 'UI Design',
    [CONTENT_TAG.TOPIC.DEVELOPMENT]: 'Development',
    [CONTENT_TAG.TOPIC.FRONTEND]: 'Frontend',
    [CONTENT_TAG.TOPIC.BACKEND]: 'Backend',
    [CONTENT_TAG.TOPIC.FULLSTACK]: 'Fullstack',
    [CONTENT_TAG.TOPIC.MOBILE]: 'Mobile',
    [CONTENT_TAG.TOPIC.DEVOPS]: 'DevOps',
    [CONTENT_TAG.TOPIC.QA]: 'QA Testing',
  };
  return labels[tag] || 'Unknown Topic';
}

export function contentTagGetTypeLabel(tag: ContentTypeTag): string {
  const labels: Record<ContentTypeTag, string> = {
    [CONTENT_TAG.TYPE.TUTORIAL]: 'Tutorial',
    [CONTENT_TAG.TYPE.GUIDE]: 'Guide',
    [CONTENT_TAG.TYPE.CASE_STUDY]: 'Case Study',
    [CONTENT_TAG.TYPE.WHITE_PAPER]: 'White Paper',
    [CONTENT_TAG.TYPE.EBOOK]: 'E-Book',
    [CONTENT_TAG.TYPE.VIDEO]: 'Video',
    [CONTENT_TAG.TYPE.PODCAST]: 'Podcast',
    [CONTENT_TAG.TYPE.WEBINAR]: 'Webinar',
    [CONTENT_TAG.TYPE.ARTICLE]: 'Article',
    [CONTENT_TAG.TYPE.BLOG]: 'Blog Post',
    [CONTENT_TAG.TYPE.NEWS]: 'News',
    [CONTENT_TAG.TYPE.REVIEW]: 'Review',
    [CONTENT_TAG.TYPE.TESTIMONIAL]: 'Testimonial',
    [CONTENT_TAG.TYPE.FAQ]: 'FAQ',
    [CONTENT_TAG.TYPE.DOCUMENTATION]: 'Documentation',
  };
  return labels[tag] || 'Unknown Type';
}

export function contentTagGetAudienceLabel(tag: ContentAudienceTag): string {
  const labels: Record<ContentAudienceTag, string> = {
    [CONTENT_TAG.AUDIENCE.BEGINNER]: 'Beginner',
    [CONTENT_TAG.AUDIENCE.INTERMEDIATE]: 'Intermediate',
    [CONTENT_TAG.AUDIENCE.ADVANCED]: 'Advanced',
    [CONTENT_TAG.AUDIENCE.EXPERT]: 'Expert',
    [CONTENT_TAG.AUDIENCE.B2B]: 'B2B',
    [CONTENT_TAG.AUDIENCE.B2C]: 'B2C',
    [CONTENT_TAG.AUDIENCE.DEVELOPERS]: 'Developers',
    [CONTENT_TAG.AUDIENCE.DESIGNERS]: 'Designers',
    [CONTENT_TAG.AUDIENCE.MARKETERS]: 'Marketers',
    [CONTENT_TAG.AUDIENCE.FOUNDERS]: 'Founders',
    [CONTENT_TAG.AUDIENCE.MANAGERS]: 'Managers',
    [CONTENT_TAG.AUDIENCE.STUDENTS]: 'Students',
  };
  return labels[tag] || 'Unknown Audience';
}

export function contentTagGetColor(tag: ContentPopularTag): ContentTagColor {
  const colorMap: Record<ContentPopularTag, ContentTagColor> = {
    [CONTENT_TAG.POPULAR.TRENDING]: CONTENT_TAG.COLORS.TRENDING,
    [CONTENT_TAG.POPULAR.POPULAR]: CONTENT_TAG.COLORS.POPULAR,
    [CONTENT_TAG.POPULAR.NEW]: CONTENT_TAG.COLORS.NEW,
    [CONTENT_TAG.POPULAR.UPDATED]: CONTENT_TAG.COLORS.UPDATED,
    [CONTENT_TAG.POPULAR.FEATURED]: CONTENT_TAG.COLORS.FEATURED,
    [CONTENT_TAG.POPULAR.EDITORS_PICK]: CONTENT_TAG.COLORS.FEATURED,
    [CONTENT_TAG.POPULAR.STAFF_PICK]: CONTENT_TAG.COLORS.FEATURED,
    [CONTENT_TAG.POPULAR.RECOMMENDED]: CONTENT_TAG.COLORS.FEATURED,
    [CONTENT_TAG.POPULAR.SPONSORED]: CONTENT_TAG.COLORS.SPONSORED,
    [CONTENT_TAG.POPULAR.PROMOTED]: CONTENT_TAG.COLORS.SPONSORED,
    [CONTENT_TAG.POPULAR.EXCLUSIVE]: CONTENT_TAG.COLORS.EXCLUSIVE,
    [CONTENT_TAG.POPULAR.PREMIUM]: CONTENT_TAG.COLORS.PREMIUM,
    [CONTENT_TAG.POPULAR.FREE]: CONTENT_TAG.COLORS.FREE,
    [CONTENT_TAG.POPULAR.BETA]: CONTENT_TAG.COLORS.BETA,
    [CONTENT_TAG.POPULAR.EXPERIMENTAL]: CONTENT_TAG.COLORS.EXPERIMENTAL,
  };
  return colorMap[tag] || '#6B7280';
}

export function contentTagGetCategory(tag: string): ContentTagCategory {
  if (Object.values(CONTENT_TAG.POPULAR).includes(tag as ContentPopularTag)) {
    return CONTENT_TAG.CATEGORIES.POPULARITY;
  }
  if (Object.values(CONTENT_TAG.TOPIC).includes(tag as ContentTopicTag)) {
    return CONTENT_TAG.CATEGORIES.TOPIC;
  }
  if (Object.values(CONTENT_TAG.TYPE).includes(tag as ContentTypeTag)) {
    return CONTENT_TAG.CATEGORIES.TYPE;
  }
  if (Object.values(CONTENT_TAG.AUDIENCE).includes(tag as ContentAudienceTag)) {
    return CONTENT_TAG.CATEGORIES.AUDIENCE;
  }
  return CONTENT_TAG.CATEGORIES.CUSTOM;
}

export function contentTagIsValidPopular(tag: string): tag is ContentPopularTag {
  return Object.values(CONTENT_TAG.POPULAR).includes(tag as ContentPopularTag);
}

export function contentTagIsValidTopic(tag: string): tag is ContentTopicTag {
  return Object.values(CONTENT_TAG.TOPIC).includes(tag as ContentTopicTag);
}

export function contentTagIsValidType(tag: string): tag is ContentTypeTag {
  return Object.values(CONTENT_TAG.TYPE).includes(tag as ContentTypeTag);
}

export function contentTagIsValidAudience(tag: string): tag is ContentAudienceTag {
  return Object.values(CONTENT_TAG.AUDIENCE).includes(tag as ContentAudienceTag);
}
