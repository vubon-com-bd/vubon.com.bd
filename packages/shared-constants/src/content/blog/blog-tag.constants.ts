/**
 * Blog Tag Constants
 * Tags for blog posts
 */

export const CONTENT_BLOG_TAG = {
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
    OPINION: 'opinion',
    INTERVIEW: 'interview',
    HOW_TO: 'how_to',
    LIST: 'list',
    COMPARISON: 'comparison',
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
export type ContentBlogPopularTag =
  (typeof CONTENT_BLOG_TAG.POPULAR)[keyof typeof CONTENT_BLOG_TAG.POPULAR];

// Topic Tags
export type ContentBlogTopicTag =
  (typeof CONTENT_BLOG_TAG.TOPIC)[keyof typeof CONTENT_BLOG_TAG.TOPIC];

// Type Tags
export type ContentBlogTypeTag = (typeof CONTENT_BLOG_TAG.TYPE)[keyof typeof CONTENT_BLOG_TAG.TYPE];

// Audience Tags
export type ContentBlogAudienceTag =
  (typeof CONTENT_BLOG_TAG.AUDIENCE)[keyof typeof CONTENT_BLOG_TAG.AUDIENCE];

// Tag Colors
export type ContentBlogTagColor =
  (typeof CONTENT_BLOG_TAG.COLORS)[keyof typeof CONTENT_BLOG_TAG.COLORS];

// Tag Categories
export type ContentBlogTagCategory =
  (typeof CONTENT_BLOG_TAG.CATEGORIES)[keyof typeof CONTENT_BLOG_TAG.CATEGORIES];

// Utility Functions
export function contentBlogTagGetPopularLabel(tag: ContentBlogPopularTag): string {
  const labels: Record<ContentBlogPopularTag, string> = {
    [CONTENT_BLOG_TAG.POPULAR.TRENDING]: 'Trending',
    [CONTENT_BLOG_TAG.POPULAR.POPULAR]: 'Popular',
    [CONTENT_BLOG_TAG.POPULAR.NEW]: 'New',
    [CONTENT_BLOG_TAG.POPULAR.UPDATED]: 'Updated',
    [CONTENT_BLOG_TAG.POPULAR.FEATURED]: 'Featured',
    [CONTENT_BLOG_TAG.POPULAR.EDITORS_PICK]: "Editor's Pick",
    [CONTENT_BLOG_TAG.POPULAR.STAFF_PICK]: 'Staff Pick',
    [CONTENT_BLOG_TAG.POPULAR.RECOMMENDED]: 'Recommended',
    [CONTENT_BLOG_TAG.POPULAR.SPONSORED]: 'Sponsored',
    [CONTENT_BLOG_TAG.POPULAR.PROMOTED]: 'Promoted',
    [CONTENT_BLOG_TAG.POPULAR.EXCLUSIVE]: 'Exclusive',
    [CONTENT_BLOG_TAG.POPULAR.PREMIUM]: 'Premium',
    [CONTENT_BLOG_TAG.POPULAR.FREE]: 'Free',
    [CONTENT_BLOG_TAG.POPULAR.BETA]: 'Beta',
    [CONTENT_BLOG_TAG.POPULAR.EXPERIMENTAL]: 'Experimental',
  };
  return labels[tag] || 'Unknown Tag';
}

export function contentBlogTagGetTopicLabel(tag: ContentBlogTopicTag): string {
  const labels: Record<ContentBlogTopicTag, string> = {
    [CONTENT_BLOG_TAG.TOPIC.AI]: 'Artificial Intelligence',
    [CONTENT_BLOG_TAG.TOPIC.ML]: 'Machine Learning',
    [CONTENT_BLOG_TAG.TOPIC.DATA]: 'Data Science',
    [CONTENT_BLOG_TAG.TOPIC.CLOUD]: 'Cloud Computing',
    [CONTENT_BLOG_TAG.TOPIC.SECURITY]: 'Cybersecurity',
    [CONTENT_BLOG_TAG.TOPIC.BLOCKCHAIN]: 'Blockchain',
    [CONTENT_BLOG_TAG.TOPIC.IOT]: 'IoT',
    [CONTENT_BLOG_TAG.TOPIC.ROBOTICS]: 'Robotics',
    [CONTENT_BLOG_TAG.TOPIC.STARTUP]: 'Startup',
    [CONTENT_BLOG_TAG.TOPIC.BUSINESS]: 'Business',
    [CONTENT_BLOG_TAG.TOPIC.MARKETING]: 'Marketing',
    [CONTENT_BLOG_TAG.TOPIC.SALES]: 'Sales',
    [CONTENT_BLOG_TAG.TOPIC.DESIGN]: 'Design',
    [CONTENT_BLOG_TAG.TOPIC.UX]: 'UX Design',
    [CONTENT_BLOG_TAG.TOPIC.UI]: 'UI Design',
    [CONTENT_BLOG_TAG.TOPIC.DEVELOPMENT]: 'Development',
    [CONTENT_BLOG_TAG.TOPIC.FRONTEND]: 'Frontend',
    [CONTENT_BLOG_TAG.TOPIC.BACKEND]: 'Backend',
    [CONTENT_BLOG_TAG.TOPIC.FULLSTACK]: 'Fullstack',
    [CONTENT_BLOG_TAG.TOPIC.MOBILE]: 'Mobile',
    [CONTENT_BLOG_TAG.TOPIC.DEVOPS]: 'DevOps',
    [CONTENT_BLOG_TAG.TOPIC.QA]: 'QA Testing',
  };
  return labels[tag] || 'Unknown Topic';
}

export function contentBlogTagGetTypeLabel(tag: ContentBlogTypeTag): string {
  const labels: Record<ContentBlogTypeTag, string> = {
    [CONTENT_BLOG_TAG.TYPE.TUTORIAL]: 'Tutorial',
    [CONTENT_BLOG_TAG.TYPE.GUIDE]: 'Guide',
    [CONTENT_BLOG_TAG.TYPE.CASE_STUDY]: 'Case Study',
    [CONTENT_BLOG_TAG.TYPE.WHITE_PAPER]: 'White Paper',
    [CONTENT_BLOG_TAG.TYPE.EBOOK]: 'E-Book',
    [CONTENT_BLOG_TAG.TYPE.VIDEO]: 'Video',
    [CONTENT_BLOG_TAG.TYPE.PODCAST]: 'Podcast',
    [CONTENT_BLOG_TAG.TYPE.WEBINAR]: 'Webinar',
    [CONTENT_BLOG_TAG.TYPE.ARTICLE]: 'Article',
    [CONTENT_BLOG_TAG.TYPE.BLOG]: 'Blog Post',
    [CONTENT_BLOG_TAG.TYPE.NEWS]: 'News',
    [CONTENT_BLOG_TAG.TYPE.REVIEW]: 'Review',
    [CONTENT_BLOG_TAG.TYPE.OPINION]: 'Opinion',
    [CONTENT_BLOG_TAG.TYPE.INTERVIEW]: 'Interview',
    [CONTENT_BLOG_TAG.TYPE.HOW_TO]: 'How-To',
    [CONTENT_BLOG_TAG.TYPE.LIST]: 'List',
    [CONTENT_BLOG_TAG.TYPE.COMPARISON]: 'Comparison',
  };
  return labels[tag] || 'Unknown Type';
}

export function contentBlogTagGetAudienceLabel(tag: ContentBlogAudienceTag): string {
  const labels: Record<ContentBlogAudienceTag, string> = {
    [CONTENT_BLOG_TAG.AUDIENCE.BEGINNER]: 'Beginner',
    [CONTENT_BLOG_TAG.AUDIENCE.INTERMEDIATE]: 'Intermediate',
    [CONTENT_BLOG_TAG.AUDIENCE.ADVANCED]: 'Advanced',
    [CONTENT_BLOG_TAG.AUDIENCE.EXPERT]: 'Expert',
    [CONTENT_BLOG_TAG.AUDIENCE.B2B]: 'B2B',
    [CONTENT_BLOG_TAG.AUDIENCE.B2C]: 'B2C',
    [CONTENT_BLOG_TAG.AUDIENCE.DEVELOPERS]: 'Developers',
    [CONTENT_BLOG_TAG.AUDIENCE.DESIGNERS]: 'Designers',
    [CONTENT_BLOG_TAG.AUDIENCE.MARKETERS]: 'Marketers',
    [CONTENT_BLOG_TAG.AUDIENCE.FOUNDERS]: 'Founders',
    [CONTENT_BLOG_TAG.AUDIENCE.MANAGERS]: 'Managers',
    [CONTENT_BLOG_TAG.AUDIENCE.STUDENTS]: 'Students',
  };
  return labels[tag] || 'Unknown Audience';
}

export function contentBlogTagGetColor(tag: ContentBlogPopularTag): ContentBlogTagColor {
  const colorMap: Record<ContentBlogPopularTag, ContentBlogTagColor> = {
    [CONTENT_BLOG_TAG.POPULAR.TRENDING]: CONTENT_BLOG_TAG.COLORS.TRENDING,
    [CONTENT_BLOG_TAG.POPULAR.POPULAR]: CONTENT_BLOG_TAG.COLORS.POPULAR,
    [CONTENT_BLOG_TAG.POPULAR.NEW]: CONTENT_BLOG_TAG.COLORS.NEW,
    [CONTENT_BLOG_TAG.POPULAR.UPDATED]: CONTENT_BLOG_TAG.COLORS.UPDATED,
    [CONTENT_BLOG_TAG.POPULAR.FEATURED]: CONTENT_BLOG_TAG.COLORS.FEATURED,
    [CONTENT_BLOG_TAG.POPULAR.EDITORS_PICK]: CONTENT_BLOG_TAG.COLORS.FEATURED,
    [CONTENT_BLOG_TAG.POPULAR.STAFF_PICK]: CONTENT_BLOG_TAG.COLORS.FEATURED,
    [CONTENT_BLOG_TAG.POPULAR.RECOMMENDED]: CONTENT_BLOG_TAG.COLORS.FEATURED,
    [CONTENT_BLOG_TAG.POPULAR.SPONSORED]: CONTENT_BLOG_TAG.COLORS.SPONSORED,
    [CONTENT_BLOG_TAG.POPULAR.PROMOTED]: CONTENT_BLOG_TAG.COLORS.SPONSORED,
    [CONTENT_BLOG_TAG.POPULAR.EXCLUSIVE]: CONTENT_BLOG_TAG.COLORS.EXCLUSIVE,
    [CONTENT_BLOG_TAG.POPULAR.PREMIUM]: CONTENT_BLOG_TAG.COLORS.PREMIUM,
    [CONTENT_BLOG_TAG.POPULAR.FREE]: CONTENT_BLOG_TAG.COLORS.FREE,
    [CONTENT_BLOG_TAG.POPULAR.BETA]: CONTENT_BLOG_TAG.COLORS.BETA,
    [CONTENT_BLOG_TAG.POPULAR.EXPERIMENTAL]: CONTENT_BLOG_TAG.COLORS.EXPERIMENTAL,
  };
  return colorMap[tag] || '#6B7280';
}

export function contentBlogTagGetCategory(tag: string): ContentBlogTagCategory {
  if (Object.values(CONTENT_BLOG_TAG.POPULAR).includes(tag as ContentBlogPopularTag)) {
    return CONTENT_BLOG_TAG.CATEGORIES.POPULARITY;
  }
  if (Object.values(CONTENT_BLOG_TAG.TOPIC).includes(tag as ContentBlogTopicTag)) {
    return CONTENT_BLOG_TAG.CATEGORIES.TOPIC;
  }
  if (Object.values(CONTENT_BLOG_TAG.TYPE).includes(tag as ContentBlogTypeTag)) {
    return CONTENT_BLOG_TAG.CATEGORIES.TYPE;
  }
  if (Object.values(CONTENT_BLOG_TAG.AUDIENCE).includes(tag as ContentBlogAudienceTag)) {
    return CONTENT_BLOG_TAG.CATEGORIES.AUDIENCE;
  }
  return CONTENT_BLOG_TAG.CATEGORIES.CUSTOM;
}

export function contentBlogTagIsValidPopular(tag: string): tag is ContentBlogPopularTag {
  return Object.values(CONTENT_BLOG_TAG.POPULAR).includes(tag as ContentBlogPopularTag);
}

export function contentBlogTagIsValidTopic(tag: string): tag is ContentBlogTopicTag {
  return Object.values(CONTENT_BLOG_TAG.TOPIC).includes(tag as ContentBlogTopicTag);
}

export function contentBlogTagIsValidType(tag: string): tag is ContentBlogTypeTag {
  return Object.values(CONTENT_BLOG_TAG.TYPE).includes(tag as ContentBlogTypeTag);
}

export function contentBlogTagIsValidAudience(tag: string): tag is ContentBlogAudienceTag {
  return Object.values(CONTENT_BLOG_TAG.AUDIENCE).includes(tag as ContentBlogAudienceTag);
}
