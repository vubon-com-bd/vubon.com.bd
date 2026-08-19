/**
 * Content & Marketing Queue Constants
 * Contains all queue-related constants for content and marketing management
 */

export const ContentMarketingQueue = {
  // Queue names
  NAMES: {
    // Content queues
    CONTENT_PUBLISH: 'content.publish',
    CONTENT_UNPUBLISH: 'content.unpublish',
    CONTENT_PROCESS: 'content.process',
    CONTENT_VALIDATE: 'content.validate',
    CONTENT_ANALYTICS: 'content.analytics',

    // Blog queues
    BLOG_PUBLISH: 'blog.publish',
    BLOG_UNPUBLISH: 'blog.unpublish',
    BLOG_PROCESS: 'blog.process',

    // Page queues
    PAGE_PUBLISH: 'page.publish',
    PAGE_UNPUBLISH: 'page.unpublish',

    // SEO queues
    SEO_GENERATE: 'seo.generate',
    SEO_UPDATE: 'seo.update',
    SEO_SITEMAP: 'seo.sitemap',
    SEO_ROBOTS: 'seo.robots',

    // Media queues
    MEDIA_UPLOAD: 'media.upload',
    MEDIA_PROCESS: 'media.process',
    MEDIA_OPTIMIZE: 'media.optimize',
    MEDIA_THUMBNAIL: 'media.thumbnail',
    MEDIA_DELETE: 'media.delete',

    // Campaign queues
    CAMPAIGN_PROCESS: 'campaign.process',
    CAMPAIGN_LAUNCH: 'campaign.launch',
    CAMPAIGN_ANALYTICS: 'campaign.analytics',
    CAMPAIGN_BUDGET: 'campaign.budget',

    // Promotion queues
    PROMOTION_APPLY: 'promotion.apply',
    PROMOTION_EXPIRE: 'promotion.expire',
    PROMOTION_ANALYTICS: 'promotion.analytics',

    // Affiliate queues
    AFFILIATE_COMMISSION: 'affiliate.commission',
    AFFILIATE_PAYOUT: 'affiliate.payout',
    AFFILIATE_SYNC: 'affiliate.sync',

    // Referral queues
    REFERRAL_PROCESS: 'referral.process',
    REFERRAL_REWARD: 'referral.reward',
    REFERRAL_ANALYTICS: 'referral.analytics',

    // Loyalty queues
    LOYALTY_POINTS: 'loyalty.points',
    LOYALTY_TIER: 'loyalty.tier',
    LOYALTY_REWARD: 'loyalty.reward',

    // Email marketing queues
    EMAIL_SEND: 'email.send',
    EMAIL_BULK: 'email.bulk',
    EMAIL_TRACK: 'email.track',
    EMAIL_TEMPLATE: 'email.template',

    // SMS marketing queues
    SMS_SEND: 'sms.send',
    SMS_BULK: 'sms.bulk',
    SMS_TRACK: 'sms.track',

    // Social media queues
    SOCIAL_PUBLISH: 'social.publish',
    SOCIAL_SCHEDULE: 'social.schedule',
    SOCIAL_ANALYTICS: 'social.analytics',

    // Lead generation queues
    LEAD_CAPTURE: 'lead.capture',
    LEAD_PROCESS: 'lead.process',
    LEAD_SCORE: 'lead.score',
    LEAD_CONVERT: 'lead.convert',

    // Analytics queues
    ANALYTICS_PROCESS: 'analytics.process',
    ANALYTICS_REPORT: 'analytics.report',
    ANALYTICS_DASHBOARD: 'analytics.dashboard',

    // Notification queues
    NOTIFICATION_SEND: 'notification.send',
    NOTIFICATION_PROCESS: 'notification.process',
    NOTIFICATION_BROADCAST: 'notification.broadcast',

    // Template queues
    TEMPLATE_RENDER: 'template.render',
    TEMPLATE_PREVIEW: 'template.preview',

    // Segment queues
    SEGMENT_UPDATE: 'segment.update',
    SEGMENT_SYNC: 'segment.sync',
  } as const,

  // Job types
  JOB_TYPES: {
    // Content jobs
    PUBLISH_CONTENT: 'publish_content',
    UNPUBLISH_CONTENT: 'unpublish_content',
    PROCESS_CONTENT: 'process_content',
    VALIDATE_CONTENT: 'validate_content',

    // Blog jobs
    PUBLISH_BLOG: 'publish_blog',
    UNPUBLISH_BLOG: 'unpublish_blog',

    // Page jobs
    PUBLISH_PAGE: 'publish_page',
    UNPUBLISH_PAGE: 'unpublish_page',

    // SEO jobs
    GENERATE_SEO: 'generate_seo',
    UPDATE_SEO: 'update_seo',
    GENERATE_SITEMAP: 'generate_sitemap',
    GENERATE_ROBOTS: 'generate_robots',

    // Media jobs
    UPLOAD_MEDIA: 'upload_media',
    PROCESS_MEDIA: 'process_media',
    OPTIMIZE_MEDIA: 'optimize_media',
    GENERATE_THUMBNAIL: 'generate_thumbnail',
    DELETE_MEDIA: 'delete_media',

    // Campaign jobs
    PROCESS_CAMPAIGN: 'process_campaign',
    LAUNCH_CAMPAIGN: 'launch_campaign',
    ANALYZE_CAMPAIGN: 'analyze_campaign',
    TRACK_BUDGET: 'track_budget',

    // Promotion jobs
    APPLY_PROMOTION: 'apply_promotion',
    EXPIRE_PROMOTION: 'expire_promotion',
    ANALYZE_PROMOTION: 'analyze_promotion',

    // Affiliate jobs
    CALCULATE_COMMISSION: 'calculate_commission',
    PROCESS_PAYOUT: 'process_payout',
    SYNC_AFFILIATE: 'sync_affiliate',

    // Referral jobs
    PROCESS_REFERRAL: 'process_referral',
    CLAIM_REWARD: 'claim_reward',
    ANALYZE_REFERRAL: 'analyze_referral',

    // Loyalty jobs
    UPDATE_POINTS: 'update_points',
    UPDATE_TIER: 'update_tier',
    REDEEM_REWARD: 'redeem_reward',

    // Email jobs
    SEND_EMAIL: 'send_email',
    SEND_BULK_EMAIL: 'send_bulk_email',
    TRACK_EMAIL: 'track_email',
    RENDER_EMAIL_TEMPLATE: 'render_email_template',

    // SMS jobs
    SEND_SMS: 'send_sms',
    SEND_BULK_SMS: 'send_bulk_sms',
    TRACK_SMS: 'track_sms',

    // Social media jobs
    PUBLISH_SOCIAL: 'publish_social',
    SCHEDULE_SOCIAL: 'schedule_social',
    ANALYZE_SOCIAL: 'analyze_social',

    // Lead jobs
    CAPTURE_LEAD: 'capture_lead',
    PROCESS_LEAD: 'process_lead',
    SCORE_LEAD: 'score_lead',
    CONVERT_LEAD: 'convert_lead',

    // Analytics jobs
    PROCESS_ANALYTICS: 'process_analytics',
    GENERATE_REPORT: 'generate_report',
    UPDATE_DASHBOARD: 'update_dashboard',

    // Notification jobs
    SEND_NOTIFICATION: 'send_notification',
    PROCESS_NOTIFICATION: 'process_notification',
    SEND_BROADCAST: 'send_broadcast',

    // Template jobs
    RENDER_TEMPLATE: 'render_template',
    PREVIEW_TEMPLATE: 'preview_template',

    // Segment jobs
    UPDATE_SEGMENT: 'update_segment',
    SYNC_SEGMENT: 'sync_segment',
  } as const,

  // Queue priority levels
  PRIORITIES: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Queue attempts
  QUEUE_ATTEMPTS: 3,

  // Queue delay in milliseconds
  QUEUE_DELAY: 5000,

  // Queue backoff configuration
  QUEUE_BACKOFF: {
    type: 'exponential',
    delay: 1000,
  } as const,

  // Queue concurrency
  QUEUE_CONCURRENCY: 10,

  // Queue prefetch
  QUEUE_PREFETCH: 5,

  // Job timeout in milliseconds
  TIMEOUT: {
    // Content jobs
    PUBLISH_CONTENT: 60000, // 1 minute
    UNPUBLISH_CONTENT: 30000, // 30 seconds
    PROCESS_CONTENT: 60000, // 1 minute
    VALIDATE_CONTENT: 30000, // 30 seconds

    // Blog jobs
    PUBLISH_BLOG: 60000, // 1 minute
    UNPUBLISH_BLOG: 30000, // 30 seconds

    // Page jobs
    PUBLISH_PAGE: 60000, // 1 minute
    UNPUBLISH_PAGE: 30000, // 30 seconds

    // SEO jobs
    GENERATE_SEO: 30000, // 30 seconds
    UPDATE_SEO: 30000, // 30 seconds
    GENERATE_SITEMAP: 120000, // 2 minutes
    GENERATE_ROBOTS: 30000, // 30 seconds

    // Media jobs
    UPLOAD_MEDIA: 300000, // 5 minutes
    PROCESS_MEDIA: 120000, // 2 minutes
    OPTIMIZE_MEDIA: 180000, // 3 minutes
    GENERATE_THUMBNAIL: 60000, // 1 minute
    DELETE_MEDIA: 30000, // 30 seconds

    // Campaign jobs
    PROCESS_CAMPAIGN: 120000, // 2 minutes
    LAUNCH_CAMPAIGN: 60000, // 1 minute
    ANALYZE_CAMPAIGN: 90000, // 1.5 minutes
    TRACK_BUDGET: 30000, // 30 seconds

    // Promotion jobs
    APPLY_PROMOTION: 30000, // 30 seconds
    EXPIRE_PROMOTION: 30000, // 30 seconds
    ANALYZE_PROMOTION: 60000, // 1 minute

    // Affiliate jobs
    CALCULATE_COMMISSION: 60000, // 1 minute
    PROCESS_PAYOUT: 120000, // 2 minutes
    SYNC_AFFILIATE: 60000, // 1 minute

    // Referral jobs
    PROCESS_REFERRAL: 30000, // 30 seconds
    CLAIM_REWARD: 30000, // 30 seconds
    ANALYZE_REFERRAL: 60000, // 1 minute

    // Loyalty jobs
    UPDATE_POINTS: 30000, // 30 seconds
    UPDATE_TIER: 30000, // 30 seconds
    REDEEM_REWARD: 30000, // 30 seconds

    // Email jobs
    SEND_EMAIL: 60000, // 1 minute
    SEND_BULK_EMAIL: 600000, // 10 minutes
    TRACK_EMAIL: 30000, // 30 seconds
    RENDER_EMAIL_TEMPLATE: 30000, // 30 seconds

    // SMS jobs
    SEND_SMS: 30000, // 30 seconds
    SEND_BULK_SMS: 120000, // 2 minutes
    TRACK_SMS: 30000, // 30 seconds

    // Social media jobs
    PUBLISH_SOCIAL: 60000, // 1 minute
    SCHEDULE_SOCIAL: 30000, // 30 seconds
    ANALYZE_SOCIAL: 60000, // 1 minute

    // Lead jobs
    CAPTURE_LEAD: 30000, // 30 seconds
    PROCESS_LEAD: 60000, // 1 minute
    SCORE_LEAD: 30000, // 30 seconds
    CONVERT_LEAD: 30000, // 30 seconds

    // Analytics jobs
    PROCESS_ANALYTICS: 60000, // 1 minute
    GENERATE_REPORT: 180000, // 3 minutes
    UPDATE_DASHBOARD: 30000, // 30 seconds

    // Notification jobs
    SEND_NOTIFICATION: 30000, // 30 seconds
    PROCESS_NOTIFICATION: 30000, // 30 seconds
    SEND_BROADCAST: 120000, // 2 minutes

    // Template jobs
    RENDER_TEMPLATE: 30000, // 30 seconds
    PREVIEW_TEMPLATE: 30000, // 30 seconds

    // Segment jobs
    UPDATE_SEGMENT: 60000, // 1 minute
    SYNC_SEGMENT: 60000, // 1 minute
  } as const,

  // Queue events
  EVENTS: {
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    STALLED: 'stalled',
    PROGRESS: 'progress',
    WAITING: 'waiting',
    ACTIVE: 'active',
    DELAYED: 'delayed',
    PAUSED: 'paused',
    RESUME: 'resume',
    CLEANED: 'cleaned',
    DRAINED: 'drained',
    REMOVED: 'removed',
    DEAD_LETTER: 'dead_letter',
  } as const,

  // Retry policy
  RETRY_POLICY: {
    MAX_ATTEMPTS: 3,
    RETRY_DELAY: 60000, // 60 seconds
    BACKOFF: {
      type: 'exponential',
      delay: 60000,
      factor: 2,
    } as const,
  } as const,

  // Dead letter queue configuration
  DEAD_LETTER_QUEUE_CONFIG: {
    EXCHANGE: 'content.dlx',
    ROUTING_KEY: 'content.dlq',
    TTL: 86400000, // 24 hours
    MAX_RETRIES: 3,
  } as const,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 10,
    HIGH: 20,
    LOW: 5,
    MINIMAL: 2,
  } as const,

  // Batch size for processing
  BATCH_SIZE: 100,

  // Maximum queue size (messages)
  MAX_SIZE: 10000,

  // Processing interval in milliseconds
  PROCESSING_INTERVAL: 1000,

  // Queue configuration
  CONFIG: {
    CONTENT_PUBLISH: {
      name: 'content.publish',
      concurrency: 3,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    EMAIL_SEND: {
      name: 'email.send',
      concurrency: 5,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    SMS_SEND: {
      name: 'sms.send',
      concurrency: 10,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 15000,
      },
    },
    SOCIAL_PUBLISH: {
      name: 'social.publish',
      concurrency: 3,
      priority: 4,
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    CAMPAIGN_PROCESS: {
      name: 'campaign.process',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    MEDIA_PROCESS: {
      name: 'media.process',
      concurrency: 3,
      priority: 4,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    ANALYTICS_PROCESS: {
      name: 'analytics.process',
      concurrency: 2,
      priority: 6,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    LEAD_PROCESS: {
      name: 'lead.process',
      concurrency: 5,
      priority: 4,
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type ContentMarketingQueueName =
  (typeof ContentMarketingQueue.NAMES)[keyof typeof ContentMarketingQueue.NAMES];
export type ContentMarketingQueueEvent =
  (typeof ContentMarketingQueue.EVENTS)[keyof typeof ContentMarketingQueue.EVENTS];
export type ContentMarketingJobType =
  (typeof ContentMarketingQueue.JOB_TYPES)[keyof typeof ContentMarketingQueue.JOB_TYPES];

// Queue configuration builder
export const ContentMarketingQueueConfig = {
  createJobConfig: (
    jobType: ContentMarketingJobType,
    customConfig?: Partial<{
      attempts: number;
      backoff: { type: string; delay: number; factor?: number };
      timeout: number;
      delay: number;
      priority: number;
      removeOnComplete: boolean;
      removeOnFail: boolean;
    }>
  ) => {
    const defaultConfig = {
      attempts: ContentMarketingQueue.RETRY_POLICY.MAX_ATTEMPTS,
      backoff: ContentMarketingQueue.RETRY_POLICY.BACKOFF,
      timeout:
        ContentMarketingQueue.TIMEOUT[
          jobType.toUpperCase() as keyof typeof ContentMarketingQueue.TIMEOUT
        ] || 30000,
      delay: ContentMarketingQueue.QUEUE_DELAY,
      priority: ContentMarketingQueue.PRIORITIES.MEDIUM,
      removeOnComplete: true,
      removeOnFail: false,
      deadLetterExchange: ContentMarketingQueue.DEAD_LETTER_QUEUE_CONFIG.EXCHANGE,
      deadLetterRoutingKey: ContentMarketingQueue.DEAD_LETTER_QUEUE_CONFIG.ROUTING_KEY,
      messageTTL: ContentMarketingQueue.DEAD_LETTER_QUEUE_CONFIG.TTL,
    };
    return { ...defaultConfig, ...customConfig };
  },

  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return (
      ContentMarketingQueue.CONCURRENCY[
        type.toUpperCase() as keyof typeof ContentMarketingQueue.CONCURRENCY
      ] || 10
    );
  },

  getPrefetch: (): number => {
    return ContentMarketingQueue.QUEUE_PREFETCH;
  },

  getBatchSize: (): number => {
    return ContentMarketingQueue.BATCH_SIZE;
  },

  getMaxSize: (): number => {
    return ContentMarketingQueue.MAX_SIZE;
  },

  getProcessingInterval: (): number => {
    return ContentMarketingQueue.PROCESSING_INTERVAL;
  },

  getJobTimeout: (jobType: ContentMarketingJobType): number => {
    return (
      ContentMarketingQueue.TIMEOUT[
        jobType.toUpperCase() as keyof typeof ContentMarketingQueue.TIMEOUT
      ] || 30000
    );
  },

  getPriority: (level: 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW' = 'MEDIUM'): number => {
    return ContentMarketingQueue.PRIORITIES[level] || ContentMarketingQueue.PRIORITIES.MEDIUM;
  },

  isRetryable: (jobType: ContentMarketingJobType): boolean => {
    const nonRetryableJobs: ContentMarketingJobType[] = [
      ContentMarketingQueue.JOB_TYPES.VALIDATE_CONTENT,
      ContentMarketingQueue.JOB_TYPES.GENERATE_ROBOTS,
      ContentMarketingQueue.JOB_TYPES.CAPTURE_LEAD,
      ContentMarketingQueue.JOB_TYPES.SCORE_LEAD,
      ContentMarketingQueue.JOB_TYPES.TRACK_EMAIL,
      ContentMarketingQueue.JOB_TYPES.TRACK_SMS,
    ];
    return !nonRetryableJobs.includes(jobType);
  },
} as const;
