/**
 * Social Media Post Type Constants
 * Post type definitions and classifications
 */

export const MARKETINGSOCIAL_POST = {
  // Post Types
  TYPES: {
    STANDARD: 'standard',
    PROMOTIONAL: 'promotional',
    EDUCATIONAL: 'educational',
    INFORMATIONAL: 'informational',
    ENTERTAINMENT: 'entertainment',
    ENGAGEMENT: 'engagement',
    COMMUNITY: 'community',
    EVENT: 'event',
    NEWS: 'news',
    ANNOUNCEMENT: 'announcement',
    PRODUCT_LAUNCH: 'product_launch',
    SALE: 'sale',
    DISCOUNT: 'discount',
    OFFER: 'offer',
    CONTEST: 'contest',
    GIVEAWAY: 'giveaway',
    POLL: 'poll',
    QUIZ: 'quiz',
    SURVEY: 'survey',
    QUESTION: 'question',
    TRIVIA: 'trivia',
    QUOTE: 'quote',
    MEME: 'meme',
    VIDEO: 'video',
    PHOTO: 'photo',
    LINK: 'link',
    ARTICLE: 'article',
    BLOG: 'blog',
    CASE_STUDY: 'case_study',
    TESTIMONIAL: 'testimonial',
    REVIEW: 'review',
    TIPS: 'tips',
    TUTORIAL: 'tutorial',
    HOW_TO: 'how_to',
    INTERVIEW: 'interview',
    FEATURE: 'feature',
    SPOTLIGHT: 'spotlight',
    APPRECIATION: 'appreciation',
    MILESTONE: 'milestone',
    BEHIND_SCENES: 'behind_scenes',
    LIVE: 'live',
    STORY: 'story',
    REEL: 'reel',
    SHORT: 'short',
    CAROUSEL: 'carousel',
    COLLAGE: 'collage',
    INFOGRAPHIC: 'infographic',
    CUSTOM: 'custom',
  } as const,

  // Post Formats
  FORMATS: {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    CAROUSEL: 'carousel',
    STORY: 'story',
    REEL: 'reel',
    SHORT: 'short',
    LIVE: 'live',
    POLL: 'poll',
    QUIZ: 'quiz',
    SURVEY: 'survey',
    LINK: 'link',
    ARTICLE: 'article',
    INFOGRAPHIC: 'infographic',
    COLLAGE: 'collage',
    INTERACTIVE: 'interactive',
  } as const,

  // Post Purposes
  PURPOSES: {
    AWARENESS: 'awareness',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    EDUCATION: 'education',
    ENTERTAINMENT: 'entertainment',
    INSPIRATION: 'inspiration',
    INFORMATION: 'information',
    COMMUNITY: 'community',
    BRANDING: 'branding',
    SALES: 'sales',
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
    TESTIMONIALS: 'testimonials',
  } as const,

  // Post Call to Action Types
  CTA_TYPES: {
    LEARN_MORE: 'learn_more',
    SHOP_NOW: 'shop_now',
    BUY_NOW: 'buy_now',
    BOOK_NOW: 'book_now',
    SIGN_UP: 'sign_up',
    SUBSCRIBE: 'subscribe',
    DOWNLOAD: 'download',
    REGISTER: 'register',
    CONTACT_US: 'contact_us',
    GET_OFFER: 'get_offer',
    APPLY_NOW: 'apply_now',
    JOIN_NOW: 'join_now',
    DONATE: 'donate',
    READ_MORE: 'read_more',
    WATCH_NOW: 'watch_now',
    LISTEN_NOW: 'listen_now',
    VISIT_SITE: 'visit_site',
    VIEW_GALLERY: 'view_gallery',
    SEE_PRODUCTS: 'see_products',
    GET_STARTED: 'get_started',
    TALK_TO_US: 'talk_to_us',
    FOLLOW_US: 'follow_us',
    SHARE_NOW: 'share_now',
    VOTE_NOW: 'vote_now',
    PLAY_NOW: 'play_now',
  } as const,

  // Post Frequency
  FREQUENCY: {
    ONCE: 'once',
    DAILY: 'daily',
    MULTIPLE_DAILY: 'multiple_daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

  // Post Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'standard',
    DEFAULT_FORMAT: 'text',
    DEFAULT_PURPOSE: 'awareness',
    DEFAULT_CTA: 'learn_more',
    DEFAULT_FREQUENCY: 'weekly',
    MAX_POSTS_PER_DAY: 10,
    MAX_POSTS_PER_HOUR: 2,
    DEFAULT_IMAGE_COUNT: 1,
    MAX_IMAGES_PER_POST: 10,
    MAX_VIDEO_DURATION: 300, // seconds
    MIN_POST_INTERVAL_HOURS: 4,
    MAX_HASHTAGS_PER_POST: 30,
    MAX_MENTIONS_PER_POST: 20,
  } as const,

  // Post Limits
  LIMITS: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MIN_CAPTION_LENGTH: 1,
    MAX_CAPTION_LENGTH: 2200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_IMAGES_PER_POST: 10,
    MAX_VIDEOS_PER_POST: 1,
    MAX_LINKS_PER_POST: 1,
    MAX_HASHTAGS: 30,
    MAX_MENTIONS: 20,
    MAX_POLL_OPTIONS: 5,
    MAX_QUIZ_QUESTIONS: 10,
    MAX_SURVEY_QUESTIONS: 20,
    MAX_CAROUSEL_ITEMS: 10,
    MAX_STORY_DURATION_SEC: 15,
    MAX_REEL_DURATION_SEC: 90,
    MAX_SHORTS_DURATION_SEC: 60,
    MAX_LIVE_DURATION_MIN: 240,
  } as const,
} as const;

// Post Types
export type MarketingSocialPostType =
  (typeof MARKETINGSOCIAL_POST.TYPES)[keyof typeof MARKETINGSOCIAL_POST.TYPES];

// Post Formats
export type MarketingSocialPostFormat =
  (typeof MARKETINGSOCIAL_POST.FORMATS)[keyof typeof MARKETINGSOCIAL_POST.FORMATS];

// Post Purposes
export type MarketingSocialPostPurpose =
  (typeof MARKETINGSOCIAL_POST.PURPOSES)[keyof typeof MARKETINGSOCIAL_POST.PURPOSES];

// Post Call to Action Types
export type MarketingSocialPostCTA =
  (typeof MARKETINGSOCIAL_POST.CTA_TYPES)[keyof typeof MARKETINGSOCIAL_POST.CTA_TYPES];

// Post Frequency
export type MarketingSocialPostFrequency =
  (typeof MARKETINGSOCIAL_POST.FREQUENCY)[keyof typeof MARKETINGSOCIAL_POST.FREQUENCY];

// Post Defaults
export type MarketingSocialPostDefault =
  (typeof MARKETINGSOCIAL_POST.DEFAULTS)[keyof typeof MARKETINGSOCIAL_POST.DEFAULTS];

// Post Limits
export type MarketingSocialPostLimit =
  (typeof MARKETINGSOCIAL_POST.LIMITS)[keyof typeof MARKETINGSOCIAL_POST.LIMITS];

// Utility Functions
export function marketingsocialGetPostTypeLabel(postType: MarketingSocialPostType): string {
  const labels: Record<MarketingSocialPostType, string> = {
    [MARKETINGSOCIAL_POST.TYPES.STANDARD]: 'Standard',
    [MARKETINGSOCIAL_POST.TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETINGSOCIAL_POST.TYPES.EDUCATIONAL]: 'Educational',
    [MARKETINGSOCIAL_POST.TYPES.INFORMATIONAL]: 'Informational',
    [MARKETINGSOCIAL_POST.TYPES.ENTERTAINMENT]: 'Entertainment',
    [MARKETINGSOCIAL_POST.TYPES.ENGAGEMENT]: 'Engagement',
    [MARKETINGSOCIAL_POST.TYPES.COMMUNITY]: 'Community',
    [MARKETINGSOCIAL_POST.TYPES.EVENT]: 'Event',
    [MARKETINGSOCIAL_POST.TYPES.NEWS]: 'News',
    [MARKETINGSOCIAL_POST.TYPES.ANNOUNCEMENT]: 'Announcement',
    [MARKETINGSOCIAL_POST.TYPES.PRODUCT_LAUNCH]: 'Product Launch',
    [MARKETINGSOCIAL_POST.TYPES.SALE]: 'Sale',
    [MARKETINGSOCIAL_POST.TYPES.DISCOUNT]: 'Discount',
    [MARKETINGSOCIAL_POST.TYPES.OFFER]: 'Offer',
    [MARKETINGSOCIAL_POST.TYPES.CONTEST]: 'Contest',
    [MARKETINGSOCIAL_POST.TYPES.GIVEAWAY]: 'Giveaway',
    [MARKETINGSOCIAL_POST.TYPES.POLL]: 'Poll',
    [MARKETINGSOCIAL_POST.TYPES.QUIZ]: 'Quiz',
    [MARKETINGSOCIAL_POST.TYPES.SURVEY]: 'Survey',
    [MARKETINGSOCIAL_POST.TYPES.QUESTION]: 'Question',
    [MARKETINGSOCIAL_POST.TYPES.TRIVIA]: 'Trivia',
    [MARKETINGSOCIAL_POST.TYPES.QUOTE]: 'Quote',
    [MARKETINGSOCIAL_POST.TYPES.MEME]: 'Meme',
    [MARKETINGSOCIAL_POST.TYPES.VIDEO]: 'Video',
    [MARKETINGSOCIAL_POST.TYPES.PHOTO]: 'Photo',
    [MARKETINGSOCIAL_POST.TYPES.LINK]: 'Link',
    [MARKETINGSOCIAL_POST.TYPES.ARTICLE]: 'Article',
    [MARKETINGSOCIAL_POST.TYPES.BLOG]: 'Blog',
    [MARKETINGSOCIAL_POST.TYPES.CASE_STUDY]: 'Case Study',
    [MARKETINGSOCIAL_POST.TYPES.TESTIMONIAL]: 'Testimonial',
    [MARKETINGSOCIAL_POST.TYPES.REVIEW]: 'Review',
    [MARKETINGSOCIAL_POST.TYPES.TIPS]: 'Tips',
    [MARKETINGSOCIAL_POST.TYPES.TUTORIAL]: 'Tutorial',
    [MARKETINGSOCIAL_POST.TYPES.HOW_TO]: 'How To',
    [MARKETINGSOCIAL_POST.TYPES.INTERVIEW]: 'Interview',
    [MARKETINGSOCIAL_POST.TYPES.FEATURE]: 'Feature',
    [MARKETINGSOCIAL_POST.TYPES.SPOTLIGHT]: 'Spotlight',
    [MARKETINGSOCIAL_POST.TYPES.APPRECIATION]: 'Appreciation',
    [MARKETINGSOCIAL_POST.TYPES.MILESTONE]: 'Milestone',
    [MARKETINGSOCIAL_POST.TYPES.BEHIND_SCENES]: 'Behind the Scenes',
    [MARKETINGSOCIAL_POST.TYPES.LIVE]: 'Live',
    [MARKETINGSOCIAL_POST.TYPES.STORY]: 'Story',
    [MARKETINGSOCIAL_POST.TYPES.REEL]: 'Reel',
    [MARKETINGSOCIAL_POST.TYPES.SHORT]: 'Short',
    [MARKETINGSOCIAL_POST.TYPES.CAROUSEL]: 'Carousel',
    [MARKETINGSOCIAL_POST.TYPES.COLLAGE]: 'Collage',
    [MARKETINGSOCIAL_POST.TYPES.INFOGRAPHIC]: 'Infographic',
    [MARKETINGSOCIAL_POST.TYPES.CUSTOM]: 'Custom',
  };
  return labels[postType] || 'Unknown Post Type';
}

export function marketingsocialGetPostFormatLabel(format: MarketingSocialPostFormat): string {
  const labels: Record<MarketingSocialPostFormat, string> = {
    [MARKETINGSOCIAL_POST.FORMATS.TEXT]: 'Text',
    [MARKETINGSOCIAL_POST.FORMATS.IMAGE]: 'Image',
    [MARKETINGSOCIAL_POST.FORMATS.VIDEO]: 'Video',
    [MARKETINGSOCIAL_POST.FORMATS.CAROUSEL]: 'Carousel',
    [MARKETINGSOCIAL_POST.FORMATS.STORY]: 'Story',
    [MARKETINGSOCIAL_POST.FORMATS.REEL]: 'Reel',
    [MARKETINGSOCIAL_POST.FORMATS.SHORT]: 'Short',
    [MARKETINGSOCIAL_POST.FORMATS.LIVE]: 'Live',
    [MARKETINGSOCIAL_POST.FORMATS.POLL]: 'Poll',
    [MARKETINGSOCIAL_POST.FORMATS.QUIZ]: 'Quiz',
    [MARKETINGSOCIAL_POST.FORMATS.SURVEY]: 'Survey',
    [MARKETINGSOCIAL_POST.FORMATS.LINK]: 'Link',
    [MARKETINGSOCIAL_POST.FORMATS.ARTICLE]: 'Article',
    [MARKETINGSOCIAL_POST.FORMATS.INFOGRAPHIC]: 'Infographic',
    [MARKETINGSOCIAL_POST.FORMATS.COLLAGE]: 'Collage',
    [MARKETINGSOCIAL_POST.FORMATS.INTERACTIVE]: 'Interactive',
  };
  return labels[format] || 'Unknown Format';
}

export function marketingsocialGetPostPurposeLabel(purpose: MarketingSocialPostPurpose): string {
  const labels: Record<MarketingSocialPostPurpose, string> = {
    [MARKETINGSOCIAL_POST.PURPOSES.AWARENESS]: 'Awareness',
    [MARKETINGSOCIAL_POST.PURPOSES.ENGAGEMENT]: 'Engagement',
    [MARKETINGSOCIAL_POST.PURPOSES.CONVERSION]: 'Conversion',
    [MARKETINGSOCIAL_POST.PURPOSES.RETENTION]: 'Retention',
    [MARKETINGSOCIAL_POST.PURPOSES.EDUCATION]: 'Education',
    [MARKETINGSOCIAL_POST.PURPOSES.ENTERTAINMENT]: 'Entertainment',
    [MARKETINGSOCIAL_POST.PURPOSES.INSPIRATION]: 'Inspiration',
    [MARKETINGSOCIAL_POST.PURPOSES.INFORMATION]: 'Information',
    [MARKETINGSOCIAL_POST.PURPOSES.COMMUNITY]: 'Community',
    [MARKETINGSOCIAL_POST.PURPOSES.BRANDING]: 'Branding',
    [MARKETINGSOCIAL_POST.PURPOSES.SALES]: 'Sales',
    [MARKETINGSOCIAL_POST.PURPOSES.SUPPORT]: 'Support',
    [MARKETINGSOCIAL_POST.PURPOSES.FEEDBACK]: 'Feedback',
    [MARKETINGSOCIAL_POST.PURPOSES.TESTIMONIALS]: 'Testimonials',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function marketingsocialGetPostCTALabel(cta: MarketingSocialPostCTA): string {
  const labels: Record<MarketingSocialPostCTA, string> = {
    [MARKETINGSOCIAL_POST.CTA_TYPES.LEARN_MORE]: 'Learn More',
    [MARKETINGSOCIAL_POST.CTA_TYPES.SHOP_NOW]: 'Shop Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.BUY_NOW]: 'Buy Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.BOOK_NOW]: 'Book Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.SIGN_UP]: 'Sign Up',
    [MARKETINGSOCIAL_POST.CTA_TYPES.SUBSCRIBE]: 'Subscribe',
    [MARKETINGSOCIAL_POST.CTA_TYPES.DOWNLOAD]: 'Download',
    [MARKETINGSOCIAL_POST.CTA_TYPES.REGISTER]: 'Register',
    [MARKETINGSOCIAL_POST.CTA_TYPES.CONTACT_US]: 'Contact Us',
    [MARKETINGSOCIAL_POST.CTA_TYPES.GET_OFFER]: 'Get Offer',
    [MARKETINGSOCIAL_POST.CTA_TYPES.APPLY_NOW]: 'Apply Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.JOIN_NOW]: 'Join Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.DONATE]: 'Donate',
    [MARKETINGSOCIAL_POST.CTA_TYPES.READ_MORE]: 'Read More',
    [MARKETINGSOCIAL_POST.CTA_TYPES.WATCH_NOW]: 'Watch Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.LISTEN_NOW]: 'Listen Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.VISIT_SITE]: 'Visit Site',
    [MARKETINGSOCIAL_POST.CTA_TYPES.VIEW_GALLERY]: 'View Gallery',
    [MARKETINGSOCIAL_POST.CTA_TYPES.SEE_PRODUCTS]: 'See Products',
    [MARKETINGSOCIAL_POST.CTA_TYPES.GET_STARTED]: 'Get Started',
    [MARKETINGSOCIAL_POST.CTA_TYPES.TALK_TO_US]: 'Talk to Us',
    [MARKETINGSOCIAL_POST.CTA_TYPES.FOLLOW_US]: 'Follow Us',
    [MARKETINGSOCIAL_POST.CTA_TYPES.SHARE_NOW]: 'Share Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.VOTE_NOW]: 'Vote Now',
    [MARKETINGSOCIAL_POST.CTA_TYPES.PLAY_NOW]: 'Play Now',
  };
  return labels[cta] || 'Unknown CTA';
}

export function marketingsocialGetPostFrequencyLabel(
  frequency: MarketingSocialPostFrequency
): string {
  const labels: Record<MarketingSocialPostFrequency, string> = {
    [MARKETINGSOCIAL_POST.FREQUENCY.ONCE]: 'Once',
    [MARKETINGSOCIAL_POST.FREQUENCY.DAILY]: 'Daily',
    [MARKETINGSOCIAL_POST.FREQUENCY.MULTIPLE_DAILY]: 'Multiple Daily',
    [MARKETINGSOCIAL_POST.FREQUENCY.WEEKLY]: 'Weekly',
    [MARKETINGSOCIAL_POST.FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
    [MARKETINGSOCIAL_POST.FREQUENCY.MONTHLY]: 'Monthly',
    [MARKETINGSOCIAL_POST.FREQUENCY.QUARTERLY]: 'Quarterly',
    [MARKETINGSOCIAL_POST.FREQUENCY.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingsocialIsEngagementPost(postType: MarketingSocialPostType): boolean {
  const engagementTypes: MarketingSocialPostType[] = [
    MARKETINGSOCIAL_POST.TYPES.ENGAGEMENT,
    MARKETINGSOCIAL_POST.TYPES.POLL,
    MARKETINGSOCIAL_POST.TYPES.QUIZ,
    MARKETINGSOCIAL_POST.TYPES.SURVEY,
    MARKETINGSOCIAL_POST.TYPES.QUESTION,
    MARKETINGSOCIAL_POST.TYPES.TRIVIA,
    MARKETINGSOCIAL_POST.TYPES.CONTEST,
    MARKETINGSOCIAL_POST.TYPES.GIVEAWAY,
  ];
  return engagementTypes.includes(postType);
}

export function marketingsocialIsPromotionalPost(postType: MarketingSocialPostType): boolean {
  const promotionalTypes: MarketingSocialPostType[] = [
    MARKETINGSOCIAL_POST.TYPES.PROMOTIONAL,
    MARKETINGSOCIAL_POST.TYPES.SALE,
    MARKETINGSOCIAL_POST.TYPES.DISCOUNT,
    MARKETINGSOCIAL_POST.TYPES.OFFER,
    MARKETINGSOCIAL_POST.TYPES.PRODUCT_LAUNCH,
    MARKETINGSOCIAL_POST.TYPES.SPOTLIGHT,
    MARKETINGSOCIAL_POST.TYPES.FEATURE,
  ];
  return promotionalTypes.includes(postType);
}

export function marketingsocialGetMaxImagesPerPost(): number {
  return MARKETINGSOCIAL_POST.DEFAULTS.MAX_IMAGES_PER_POST;
}

export function marketingsocialGetMaxHashtags(): number {
  return MARKETINGSOCIAL_POST.DEFAULTS.MAX_HASHTAGS_PER_POST;
}

export function marketingsocialGetDefaultPostType(): MarketingSocialPostType {
  return MARKETINGSOCIAL_POST.DEFAULTS.DEFAULT_TYPE;
}

export function marketingsocialGetDefaultPostCTA(): MarketingSocialPostCTA {
  return MARKETINGSOCIAL_POST.DEFAULTS.DEFAULT_CTA;
}
