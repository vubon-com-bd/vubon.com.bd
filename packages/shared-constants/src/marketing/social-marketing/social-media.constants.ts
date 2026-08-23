/**
 * Social Media Constants
 * Core social media marketing configuration and settings
 */

export const MARKETINGSOCIAL = {
  // Social Media Types
  TYPES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    SPONSORED: 'sponsored',
    PROMOTED: 'promoted',
    BOOSTED: 'boosted',
    CROSS_POSTED: 'cross_posted',
    REPOSTED: 'reposted',
    SHARED: 'shared',
    USER_GENERATED: 'user_generated',
    INFLUENCER: 'influencer',
    COLLABORATION: 'collaboration',
    LIVE: 'live',
    STORY: 'story',
    REEL: 'reel',
    SHORTS: 'shorts',
    COMMUNITY: 'community',
    ENGAGEMENT: 'engagement',
    CUSTOM: 'custom',
  } as const,

  // Social Media Categories
  CATEGORIES: {
    SOCIAL_NETWORKING: 'social_networking',
    VIDEO_SHARING: 'video_sharing',
    PHOTO_SHARING: 'photo_sharing',
    MICROBLOGGING: 'microblogging',
    BLOGGING: 'blogging',
    FORUM: 'forum',
    REVIEW: 'review',
    QNA: 'qna',
    MESSAGING: 'messaging',
    LIVE_STREAMING: 'live_streaming',
    SHORT_VIDEO: 'short_video',
    PODCAST: 'podcast',
    NEWS: 'news',
    PROFESSIONAL: 'professional',
  } as const,

  // Social Media Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // Social Media Content Types
  CONTENT_TYPES: {
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
    PRODUCT_TAG: 'product_tag',
    EVENT: 'event',
    OFFER: 'offer',
    ANNOUNCEMENT: 'announcement',
    ARTICLE: 'article',
    BLOG: 'blog',
    CASE_STUDY: 'case_study',
    TESTIMONIAL: 'testimonial',
    TUTORIAL: 'tutorial',
    TIPS: 'tips',
    MEME: 'meme',
    QUOTE: 'quote',
    INTERACTIVE: 'interactive',
  } as const,

  // Social Media Engagement Types
  ENGAGEMENT_TYPES: {
    LIKE: 'like',
    LOVE: 'love',
    CARE: 'care',
    HAHA: 'haha',
    WOW: 'wow',
    SAD: 'sad',
    ANGRY: 'angry',
    COMMENT: 'comment',
    SHARE: 'share',
    REPOST: 'repost',
    RETWEET: 'retweet',
    QUOTE_TWEET: 'quote_tweet',
    SAVE: 'save',
    FOLLOW: 'follow',
    UNFOLLOW: 'unfollow',
    MENTION: 'mention',
    TAG: 'tag',
    MESSAGE: 'message',
    VIEW: 'view',
    CLICK: 'click',
    CONVERSION: 'conversion',
  } as const,

  // Social Media Metrics
  METRICS: {
    IMPRESSIONS: 'impressions',
    REACH: 'reach',
    ENGAGEMENTS: 'engagements',
    ENGAGEMENT_RATE: 'engagement_rate',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    COST_PER_CLICK: 'cost_per_click',
    COST_PER_ENGAGEMENT: 'cost_per_engagement',
    COST_PER_CONVERSION: 'cost_per_conversion',
    RETURN_ON_AD_SPEND: 'return_on_ad_spend',
    FOLLOWERS: 'followers',
    NEW_FOLLOWERS: 'new_followers',
    UNFOLLOWERS: 'unfollowers',
    IMPRESSIONS_PER_FOLLOWER: 'impressions_per_follower',
    ENGAGEMENT_PER_FOLLOWER: 'engagement_per_follower',
    VIDEO_VIEWS: 'video_views',
    VIDEO_VIEW_RATE: 'video_view_rate',
    AVERAGE_WATCH_TIME: 'average_watch_time',
    COMPLETION_RATE: 'completion_rate',
    SHARES: 'shares',
    COMMENTS: 'comments',
    LIKES: 'likes',
    SAVES: 'saves',
    MENTIONS: 'mentions',
    HASHTAGS: 'hashtags',
    SENTIMENT_SCORE: 'sentiment_score',
    SENTIMENT_POSITIVE: 'sentiment_positive',
    SENTIMENT_NEUTRAL: 'sentiment_neutral',
    SENTIMENT_NEGATIVE: 'sentiment_negative',
    BRAND_AWARENESS: 'brand_awareness',
    BRAND_SENTIMENT: 'brand_sentiment',
    SHARE_OF_VOICE: 'share_of_voice',
  } as const,

  // Social Media Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'organic',
    DEFAULT_CATEGORY: 'social_networking',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_CONTENT_TYPE: 'text',
    DEFAULT_POST_FREQUENCY: 3, // posts per day
    MAX_POSTS_PER_DAY: 10,
    MAX_POSTS_PER_HOUR: 2,
    MAX_IMAGE_SIZE_MB: 10,
    MAX_VIDEO_SIZE_MB: 100,
    MAX_VIDEO_DURATION_SEC: 120,
    MAX_CAROUSEL_ITEMS: 10,
    DEFAULT_HASHTAGS: ['#ecommerce', '#shop', '#style'],
    DEFAULT_CALL_TO_ACTION: 'Learn More',
    MAX_HASHTAGS: 30,
    MAX_MENTIONS: 20,
    DEFAULT_POSTING_TIME: '10:00',
    DEFAULT_BUMP_INTERVAL: 4, // hours
  } as const,

  // Social Media Limits
  LIMITS: {
    MIN_CAPTION_LENGTH: 1,
    MAX_CAPTION_LENGTH: 2200,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_HASHTAGS: 30,
    MAX_MENTIONS: 20,
    MAX_IMAGE_SIZE_MB: 10,
    MAX_VIDEO_SIZE_MB: 100,
    MAX_VIDEO_DURATION_SEC: 120,
    MAX_CAROUSEL_ITEMS: 10,
    MAX_STORY_DURATION_SEC: 15,
    MAX_REEL_DURATION_SEC: 90,
    MAX_SHORTS_DURATION_SEC: 60,
    MAX_LIVE_DURATION_MIN: 240,
    MAX_POLL_OPTIONS: 5,
    MAX_QUIZ_QUESTIONS: 10,
    MAX_SURVEY_QUESTIONS: 20,
  } as const,
} as const;

// Social Media Types
export type MarketingSocialType =
  (typeof MARKETINGSOCIAL.TYPES)[keyof typeof MARKETINGSOCIAL.TYPES];

// Social Media Categories
export type MarketingSocialCategory =
  (typeof MARKETINGSOCIAL.CATEGORIES)[keyof typeof MARKETINGSOCIAL.CATEGORIES];

// Social Media Priorities
export type MarketingSocialPriority =
  (typeof MARKETINGSOCIAL.PRIORITIES)[keyof typeof MARKETINGSOCIAL.PRIORITIES];

// Social Media Content Types
export type MarketingSocialContentType =
  (typeof MARKETINGSOCIAL.CONTENT_TYPES)[keyof typeof MARKETINGSOCIAL.CONTENT_TYPES];

// Social Media Engagement Types
export type MarketingSocialEngagementType =
  (typeof MARKETINGSOCIAL.ENGAGEMENT_TYPES)[keyof typeof MARKETINGSOCIAL.ENGAGEMENT_TYPES];

// Social Media Metrics
export type MarketingSocialMetric =
  (typeof MARKETINGSOCIAL.METRICS)[keyof typeof MARKETINGSOCIAL.METRICS];

// Social Media Defaults
export type MarketingSocialDefault =
  (typeof MARKETINGSOCIAL.DEFAULTS)[keyof typeof MARKETINGSOCIAL.DEFAULTS];

// Social Media Limits
export type MarketingSocialLimit =
  (typeof MARKETINGSOCIAL.LIMITS)[keyof typeof MARKETINGSOCIAL.LIMITS];

// Utility Functions
export function marketingsocialGetTypeLabel(type: MarketingSocialType): string {
  const labels: Record<MarketingSocialType, string> = {
    [MARKETINGSOCIAL.TYPES.ORGANIC]: 'Organic',
    [MARKETINGSOCIAL.TYPES.PAID]: 'Paid',
    [MARKETINGSOCIAL.TYPES.SPONSORED]: 'Sponsored',
    [MARKETINGSOCIAL.TYPES.PROMOTED]: 'Promoted',
    [MARKETINGSOCIAL.TYPES.BOOSTED]: 'Boosted',
    [MARKETINGSOCIAL.TYPES.CROSS_POSTED]: 'Cross-Posted',
    [MARKETINGSOCIAL.TYPES.REPOSTED]: 'Reposted',
    [MARKETINGSOCIAL.TYPES.SHARED]: 'Shared',
    [MARKETINGSOCIAL.TYPES.USER_GENERATED]: 'User Generated',
    [MARKETINGSOCIAL.TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGSOCIAL.TYPES.COLLABORATION]: 'Collaboration',
    [MARKETINGSOCIAL.TYPES.LIVE]: 'Live',
    [MARKETINGSOCIAL.TYPES.STORY]: 'Story',
    [MARKETINGSOCIAL.TYPES.REEL]: 'Reel',
    [MARKETINGSOCIAL.TYPES.SHORTS]: 'Shorts',
    [MARKETINGSOCIAL.TYPES.COMMUNITY]: 'Community',
    [MARKETINGSOCIAL.TYPES.ENGAGEMENT]: 'Engagement',
    [MARKETINGSOCIAL.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Social Type';
}

export function marketingsocialGetCategoryLabel(category: MarketingSocialCategory): string {
  const labels: Record<MarketingSocialCategory, string> = {
    [MARKETINGSOCIAL.CATEGORIES.SOCIAL_NETWORKING]: 'Social Networking',
    [MARKETINGSOCIAL.CATEGORIES.VIDEO_SHARING]: 'Video Sharing',
    [MARKETINGSOCIAL.CATEGORIES.PHOTO_SHARING]: 'Photo Sharing',
    [MARKETINGSOCIAL.CATEGORIES.MICROBLOGGING]: 'Microblogging',
    [MARKETINGSOCIAL.CATEGORIES.BLOGGING]: 'Blogging',
    [MARKETINGSOCIAL.CATEGORIES.FORUM]: 'Forum',
    [MARKETINGSOCIAL.CATEGORIES.REVIEW]: 'Review',
    [MARKETINGSOCIAL.CATEGORIES.QNA]: 'Q&A',
    [MARKETINGSOCIAL.CATEGORIES.MESSAGING]: 'Messaging',
    [MARKETINGSOCIAL.CATEGORIES.LIVE_STREAMING]: 'Live Streaming',
    [MARKETINGSOCIAL.CATEGORIES.SHORT_VIDEO]: 'Short Video',
    [MARKETINGSOCIAL.CATEGORIES.PODCAST]: 'Podcast',
    [MARKETINGSOCIAL.CATEGORIES.NEWS]: 'News',
    [MARKETINGSOCIAL.CATEGORIES.PROFESSIONAL]: 'Professional',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingsocialGetPriorityLabel(priority: MarketingSocialPriority): string {
  const labels: Record<MarketingSocialPriority, string> = {
    [MARKETINGSOCIAL.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGSOCIAL.PRIORITIES.HIGH]: 'High',
    [MARKETINGSOCIAL.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGSOCIAL.PRIORITIES.LOW]: 'Low',
    [MARKETINGSOCIAL.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingsocialGetContentTypeLabel(
  contentType: MarketingSocialContentType
): string {
  const labels: Record<MarketingSocialContentType, string> = {
    [MARKETINGSOCIAL.CONTENT_TYPES.TEXT]: 'Text',
    [MARKETINGSOCIAL.CONTENT_TYPES.IMAGE]: 'Image',
    [MARKETINGSOCIAL.CONTENT_TYPES.VIDEO]: 'Video',
    [MARKETINGSOCIAL.CONTENT_TYPES.CAROUSEL]: 'Carousel',
    [MARKETINGSOCIAL.CONTENT_TYPES.STORY]: 'Story',
    [MARKETINGSOCIAL.CONTENT_TYPES.REEL]: 'Reel',
    [MARKETINGSOCIAL.CONTENT_TYPES.SHORT]: 'Short',
    [MARKETINGSOCIAL.CONTENT_TYPES.LIVE]: 'Live',
    [MARKETINGSOCIAL.CONTENT_TYPES.POLL]: 'Poll',
    [MARKETINGSOCIAL.CONTENT_TYPES.QUIZ]: 'Quiz',
    [MARKETINGSOCIAL.CONTENT_TYPES.SURVEY]: 'Survey',
    [MARKETINGSOCIAL.CONTENT_TYPES.LINK]: 'Link',
    [MARKETINGSOCIAL.CONTENT_TYPES.PRODUCT_TAG]: 'Product Tag',
    [MARKETINGSOCIAL.CONTENT_TYPES.EVENT]: 'Event',
    [MARKETINGSOCIAL.CONTENT_TYPES.OFFER]: 'Offer',
    [MARKETINGSOCIAL.CONTENT_TYPES.ANNOUNCEMENT]: 'Announcement',
    [MARKETINGSOCIAL.CONTENT_TYPES.ARTICLE]: 'Article',
    [MARKETINGSOCIAL.CONTENT_TYPES.BLOG]: 'Blog',
    [MARKETINGSOCIAL.CONTENT_TYPES.CASE_STUDY]: 'Case Study',
    [MARKETINGSOCIAL.CONTENT_TYPES.TESTIMONIAL]: 'Testimonial',
    [MARKETINGSOCIAL.CONTENT_TYPES.TUTORIAL]: 'Tutorial',
    [MARKETINGSOCIAL.CONTENT_TYPES.TIPS]: 'Tips',
    [MARKETINGSOCIAL.CONTENT_TYPES.MEME]: 'Meme',
    [MARKETINGSOCIAL.CONTENT_TYPES.QUOTE]: 'Quote',
    [MARKETINGSOCIAL.CONTENT_TYPES.INTERACTIVE]: 'Interactive',
  };
  return labels[contentType] || 'Unknown Content Type';
}

export function marketingsocialGetEngagementTypeLabel(
  engagementType: MarketingSocialEngagementType
): string {
  const labels: Record<MarketingSocialEngagementType, string> = {
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.LIKE]: 'Like',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.LOVE]: 'Love',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.CARE]: 'Care',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.HAHA]: 'Haha',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.WOW]: 'Wow',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.SAD]: 'Sad',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.ANGRY]: 'Angry',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.COMMENT]: 'Comment',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.SHARE]: 'Share',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.REPOST]: 'Repost',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.RETWEET]: 'Retweet',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.QUOTE_TWEET]: 'Quote Tweet',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.SAVE]: 'Save',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.FOLLOW]: 'Follow',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.UNFOLLOW]: 'Unfollow',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.MENTION]: 'Mention',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.TAG]: 'Tag',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.MESSAGE]: 'Message',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.VIEW]: 'View',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.CLICK]: 'Click',
    [MARKETINGSOCIAL.ENGAGEMENT_TYPES.CONVERSION]: 'Conversion',
  };
  return labels[engagementType] || 'Unknown Engagement Type';
}

export function marketingsocialGetMetricLabel(metric: MarketingSocialMetric): string {
  const labels: Record<MarketingSocialMetric, string> = {
    [MARKETINGSOCIAL.METRICS.IMPRESSIONS]: 'Impressions',
    [MARKETINGSOCIAL.METRICS.REACH]: 'Reach',
    [MARKETINGSOCIAL.METRICS.ENGAGEMENTS]: 'Engagements',
    [MARKETINGSOCIAL.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [MARKETINGSOCIAL.METRICS.CLICKS]: 'Clicks',
    [MARKETINGSOCIAL.METRICS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [MARKETINGSOCIAL.METRICS.CONVERSIONS]: 'Conversions',
    [MARKETINGSOCIAL.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [MARKETINGSOCIAL.METRICS.COST_PER_CLICK]: 'Cost Per Click',
    [MARKETINGSOCIAL.METRICS.COST_PER_ENGAGEMENT]: 'Cost Per Engagement',
    [MARKETINGSOCIAL.METRICS.COST_PER_CONVERSION]: 'Cost Per Conversion',
    [MARKETINGSOCIAL.METRICS.RETURN_ON_AD_SPEND]: 'Return on Ad Spend',
    [MARKETINGSOCIAL.METRICS.FOLLOWERS]: 'Followers',
    [MARKETINGSOCIAL.METRICS.NEW_FOLLOWERS]: 'New Followers',
    [MARKETINGSOCIAL.METRICS.UNFOLLOWERS]: 'Unfollowers',
    [MARKETINGSOCIAL.METRICS.IMPRESSIONS_PER_FOLLOWER]: 'Impressions Per Follower',
    [MARKETINGSOCIAL.METRICS.ENGAGEMENT_PER_FOLLOWER]: 'Engagement Per Follower',
    [MARKETINGSOCIAL.METRICS.VIDEO_VIEWS]: 'Video Views',
    [MARKETINGSOCIAL.METRICS.VIDEO_VIEW_RATE]: 'Video View Rate',
    [MARKETINGSOCIAL.METRICS.AVERAGE_WATCH_TIME]: 'Average Watch Time',
    [MARKETINGSOCIAL.METRICS.COMPLETION_RATE]: 'Completion Rate',
    [MARKETINGSOCIAL.METRICS.SHARES]: 'Shares',
    [MARKETINGSOCIAL.METRICS.COMMENTS]: 'Comments',
    [MARKETINGSOCIAL.METRICS.LIKES]: 'Likes',
    [MARKETINGSOCIAL.METRICS.SAVES]: 'Saves',
    [MARKETINGSOCIAL.METRICS.MENTIONS]: 'Mentions',
    [MARKETINGSOCIAL.METRICS.HASHTAGS]: 'Hashtags',
    [MARKETINGSOCIAL.METRICS.SENTIMENT_SCORE]: 'Sentiment Score',
    [MARKETINGSOCIAL.METRICS.SENTIMENT_POSITIVE]: 'Positive Sentiment',
    [MARKETINGSOCIAL.METRICS.SENTIMENT_NEUTRAL]: 'Neutral Sentiment',
    [MARKETINGSOCIAL.METRICS.SENTIMENT_NEGATIVE]: 'Negative Sentiment',
    [MARKETINGSOCIAL.METRICS.BRAND_AWARENESS]: 'Brand Awareness',
    [MARKETINGSOCIAL.METRICS.BRAND_SENTIMENT]: 'Brand Sentiment',
    [MARKETINGSOCIAL.METRICS.SHARE_OF_VOICE]: 'Share of Voice',
  };
  return labels[metric] || 'Unknown Metric';
}

export function marketingsocialIsPaidType(type: MarketingSocialType): boolean {
  const paidTypes: MarketingSocialType[] = [
    MARKETINGSOCIAL.TYPES.PAID,
    MARKETINGSOCIAL.TYPES.SPONSORED,
    MARKETINGSOCIAL.TYPES.PROMOTED,
    MARKETINGSOCIAL.TYPES.BOOSTED,
  ];
  return paidTypes.includes(type);
}

export function marketingsocialIsOrganicType(type: MarketingSocialType): boolean {
  return type === MARKETINGSOCIAL.TYPES.ORGANIC;
}

export function marketingsocialGetDefaultPostingTime(): string {
  return MARKETINGSOCIAL.DEFAULTS.DEFAULT_POSTING_TIME;
}

export function marketingsocialGetDefaultPostFrequency(): number {
  return MARKETINGSOCIAL.DEFAULTS.DEFAULT_POST_FREQUENCY;
}

export function marketingsocialGetMaxHashtags(): number {
  return MARKETINGSOCIAL.DEFAULTS.MAX_HASHTAGS;
}

export function marketingsocialGetDefaultCallToAction(): string {
  return MARKETINGSOCIAL.DEFAULTS.DEFAULT_CALL_TO_ACTION;
}
