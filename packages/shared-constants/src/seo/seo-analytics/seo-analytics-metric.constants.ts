/**
 * SEO Analytics Metric Constants
 * Metrics for SEO analytics and performance tracking
 */

export const SEO_ANALYTICS_METRIC = {
  // Traffic Metrics
  TRAFFIC: {
    SESSIONS: 'sessions',
    USERS: 'users',
    NEW_USERS: 'new_users',
    RETURNING_USERS: 'returning_users',
    PAGE_VIEWS: 'page_views',
    UNIQUE_PAGE_VIEWS: 'unique_page_views',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',
    PAGES_PER_SESSION: 'pages_per_session',
    AVG_SESSION_DURATION: 'avg_session_duration',
    AVG_TIME_ON_PAGE: 'avg_time_on_page',
  } as const,

  // Acquisition Metrics
  ACQUISITION: {
    ORGANIC_TRAFFIC: 'organic_traffic',
    PAID_TRAFFIC: 'paid_traffic',
    SOCIAL_TRAFFIC: 'social_traffic',
    REFERRAL_TRAFFIC: 'referral_traffic',
    DIRECT_TRAFFIC: 'direct_traffic',
    EMAIL_TRAFFIC: 'email_traffic',
    ORGANIC_SESSIONS: 'organic_sessions',
    ORGANIC_USERS: 'organic_users',
    ORGANIC_CONVERSIONS: 'organic_conversions',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    COST_PER_CLICK: 'cost_per_click',
    CLICK_THROUGH_RATE: 'click_through_rate',
    IMPRESSIONS: 'impressions',
    AVERAGE_POSITION: 'average_position',
  } as const,

  // Conversion Metrics
  CONVERSION: {
    CONVERSION_RATE: 'conversion_rate',
    GOAL_COMPLETIONS: 'goal_completions',
    GOAL_VALUE: 'goal_value',
    ECOMMERCE_CONVERSION: 'ecommerce_conversion',
    REVENUE: 'revenue',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    TRANSACTIONS: 'transactions',
    ADD_TO_CART: 'add_to_cart',
    CHECKOUT_STARTED: 'checkout_started',
    PURCHASE_COMPLETED: 'purchase_completed',
    MICRO_CONVERSIONS: 'micro_conversions',
    MACRO_CONVERSIONS: 'macro_conversions',
  } as const,

  // Engagement Metrics
  ENGAGEMENT: {
    BOUNCE_RATE: 'bounce_rate_engagement',
    EXIT_RATE: 'exit_rate_engagement',
    TIME_ON_PAGE: 'time_on_page',
    PAGES_PER_SESSION: 'pages_per_session_engagement',
    SESSION_DURATION: 'session_duration',
    EVENT_COUNT: 'event_count',
    SOCIAL_SHARES: 'social_shares_engagement',
    COMMENTS: 'comments',
    LIKES: 'likes',
    REPLIES: 'replies',
    RETWEETS: 'retweets',
    MENTIONS: 'mentions',
  } as const,

  // Technical Metrics
  TECHNICAL: {
    PAGE_SPEED: 'page_speed',
    LOAD_TIME: 'load_time',
    TTFB: 'ttfb',
    FCP: 'fcp',
    LCP: 'lcp',
    CLS: 'cls',
    FID: 'fid',
    TIME_TO_INTERACTIVE: 'time_to_interactive',
    DNS_LOOKUP_TIME: 'dns_lookup_time',
    TCP_CONNECT_TIME: 'tcp_connect_time',
    SSL_HANDSHAKE_TIME: 'ssl_handshake_time',
    DOM_CONTENT_LOADED: 'dom_content_loaded',
    FULLY_LOADED: 'fully_loaded',
    PAGE_SIZE: 'page_size',
    REQUESTS: 'requests',
  } as const,

  // SEO Performance Metrics
  PERFORMANCE: {
    KEYWORD_RANKINGS: 'keyword_rankings',
    AVERAGE_POSITION: 'average_position_performance',
    IMPRESSIONS: 'impressions_performance',
    CLICKS: 'clicks',
    CTR: 'ctr',
    VISIBILITY: 'visibility',
    SEARCH_VOLUME: 'search_volume',
    KEYWORD_DIFFICULTY: 'keyword_difficulty',
    COMPETITION: 'competition',
    ESTIMATED_TRAFFIC: 'estimated_traffic',
    ESTIMATED_VALUE: 'estimated_value',
    SHARE_OF_VOICE: 'share_of_voice',
  } as const,

  // Backlink Metrics
  BACKLINK: {
    TOTAL_BACKLINKS: 'total_backlinks',
    UNIQUE_DOMAINS: 'unique_domains',
    DOFOLLOW_BACKLINKS: 'dofollow_backlinks',
    NOFOLLOW_BACKLINKS: 'nofollow_backlinks',
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    SPAM_SCORE: 'spam_score',
    TRUST_FLOW: 'trust_flow',
    CITATION_FLOW: 'citation_flow',
    REFERRING_IPS: 'referring_ips',
    ANCHOR_TEXT_DISTRIBUTION: 'anchor_text_distribution',
  } as const,

  // Content Metrics
  CONTENT: {
    WORD_COUNT: 'word_count',
    READABILITY: 'readability',
    UNIQUE_WORDS: 'unique_words',
    AVG_SENTENCE_LENGTH: 'avg_sentence_length',
    AVG_PARAGRAPH_LENGTH: 'avg_paragraph_length',
    HEADINGS: 'headings',
    IMAGES: 'images',
    INTERNAL_LINKS: 'internal_links_content',
    EXTERNAL_LINKS: 'external_links_content',
    CONTENT_SCORE: 'content_score',
    FRESHNESS: 'freshness',
    DUPLICATE_CONTENT: 'duplicate_content',
  } as const,

  // Mobile Metrics
  MOBILE: {
    MOBILE_TRAFFIC: 'mobile_traffic',
    MOBILE_BOUNCE_RATE: 'mobile_bounce_rate',
    MOBILE_CONVERSION: 'mobile_conversion',
    MOBILE_PAGE_SPEED: 'mobile_page_speed',
    MOBILE_FRIENDLY: 'mobile_friendly',
    AMP_TRAFFIC: 'amp_traffic',
    APP_TRAFFIC: 'app_traffic',
  } as const,

  // Social Metrics
  SOCIAL: {
    SOCIAL_TRAFFIC: 'social_traffic_metrics',
    SOCIAL_CONVERSION: 'social_conversion',
    SOCIAL_SHARES: 'social_shares_metrics',
    SOCIAL_ENGAGEMENT: 'social_engagement',
    SOCIAL_REACH: 'social_reach',
    SOCIAL_IMPRESSIONS: 'social_impressions',
    SOCIAL_CLICKS: 'social_clicks',
    SOCIAL_FOLLOWERS: 'social_followers',
  } as const,

  // Revenue Metrics
  REVENUE: {
    TOTAL_REVENUE: 'total_revenue',
    ORGANIC_REVENUE: 'organic_revenue',
    PAID_REVENUE: 'paid_revenue',
    SOCIAL_REVENUE: 'social_revenue',
    REFERRAL_REVENUE: 'referral_revenue',
    DIRECT_REVENUE: 'direct_revenue',
    REVENUE_PER_SESSION: 'revenue_per_session',
    REVENUE_PER_USER: 'revenue_per_user',
    ROI: 'roi',
    ROAS: 'roas',
    LTV: 'ltv',
    CAC: 'cac',
  } as const,
} as const;

// Traffic Metrics
export type SEOAnalyticsMetricTraffic =
  (typeof SEO_ANALYTICS_METRIC.TRAFFIC)[keyof typeof SEO_ANALYTICS_METRIC.TRAFFIC];

// Acquisition Metrics
export type SEOAnalyticsMetricAcquisition =
  (typeof SEO_ANALYTICS_METRIC.ACQUISITION)[keyof typeof SEO_ANALYTICS_METRIC.ACQUISITION];

// Conversion Metrics
export type SEOAnalyticsMetricConversion =
  (typeof SEO_ANALYTICS_METRIC.CONVERSION)[keyof typeof SEO_ANALYTICS_METRIC.CONVERSION];

// Engagement Metrics
export type SEOAnalyticsMetricEngagement =
  (typeof SEO_ANALYTICS_METRIC.ENGAGEMENT)[keyof typeof SEO_ANALYTICS_METRIC.ENGAGEMENT];

// Technical Metrics
export type SEOAnalyticsMetricTechnical =
  (typeof SEO_ANALYTICS_METRIC.TECHNICAL)[keyof typeof SEO_ANALYTICS_METRIC.TECHNICAL];

// Performance Metrics
export type SEOAnalyticsMetricPerformance =
  (typeof SEO_ANALYTICS_METRIC.PERFORMANCE)[keyof typeof SEO_ANALYTICS_METRIC.PERFORMANCE];

// Backlink Metrics
export type SEOAnalyticsMetricBacklink =
  (typeof SEO_ANALYTICS_METRIC.BACKLINK)[keyof typeof SEO_ANALYTICS_METRIC.BACKLINK];

// Content Metrics
export type SEOAnalyticsMetricContent =
  (typeof SEO_ANALYTICS_METRIC.CONTENT)[keyof typeof SEO_ANALYTICS_METRIC.CONTENT];

// Mobile Metrics
export type SEOAnalyticsMetricMobile =
  (typeof SEO_ANALYTICS_METRIC.MOBILE)[keyof typeof SEO_ANALYTICS_METRIC.MOBILE];

// Social Metrics
export type SEOAnalyticsMetricSocial =
  (typeof SEO_ANALYTICS_METRIC.SOCIAL)[keyof typeof SEO_ANALYTICS_METRIC.SOCIAL];

// Revenue Metrics
export type SEOAnalyticsMetricRevenue =
  (typeof SEO_ANALYTICS_METRIC.REVENUE)[keyof typeof SEO_ANALYTICS_METRIC.REVENUE];

// Utility Functions
export function getSEOAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Traffic
    sessions: 'Sessions',
    users: 'Users',
    new_users: 'New Users',
    returning_users: 'Returning Users',
    page_views: 'Page Views',
    unique_page_views: 'Unique Page Views',
    bounce_rate: 'Bounce Rate',
    exit_rate: 'Exit Rate',
    pages_per_session: 'Pages per Session',
    avg_session_duration: 'Avg Session Duration',
    avg_time_on_page: 'Avg Time on Page',

    // Acquisition
    organic_traffic: 'Organic Traffic',
    paid_traffic: 'Paid Traffic',
    social_traffic: 'Social Traffic',
    referral_traffic: 'Referral Traffic',
    direct_traffic: 'Direct Traffic',
    email_traffic: 'Email Traffic',
    organic_sessions: 'Organic Sessions',
    organic_users: 'Organic Users',
    organic_conversions: 'Organic Conversions',
    cost_per_acquisition: 'Cost per Acquisition',
    cost_per_click: 'Cost per Click',
    click_through_rate: 'Click Through Rate',
    impressions: 'Impressions',
    average_position: 'Average Position',

    // Conversion
    conversion_rate: 'Conversion Rate',
    goal_completions: 'Goal Completions',
    goal_value: 'Goal Value',
    ecommerce_conversion: 'E-commerce Conversion',
    revenue: 'Revenue',
    average_order_value: 'Average Order Value',
    transactions: 'Transactions',
    add_to_cart: 'Add to Cart',
    checkout_started: 'Checkout Started',
    purchase_completed: 'Purchase Completed',
    micro_conversions: 'Micro Conversions',
    macro_conversions: 'Macro Conversions',

    // Engagement
    bounce_rate_engagement: 'Bounce Rate',
    exit_rate_engagement: 'Exit Rate',
    time_on_page: 'Time on Page',
    pages_per_session_engagement: 'Pages per Session',
    session_duration: 'Session Duration',
    event_count: 'Event Count',
    social_shares_engagement: 'Social Shares',
    comments: 'Comments',
    likes: 'Likes',
    replies: 'Replies',
    retweets: 'Retweets',
    mentions: 'Mentions',

    // Technical
    page_speed: 'Page Speed',
    load_time: 'Load Time',
    ttfb: 'Time to First Byte',
    fcp: 'First Contentful Paint',
    lcp: 'Largest Contentful Paint',
    cls: 'Cumulative Layout Shift',
    fid: 'First Input Delay',
    time_to_interactive: 'Time to Interactive',
    dns_lookup_time: 'DNS Lookup Time',
    tcp_connect_time: 'TCP Connect Time',
    ssl_handshake_time: 'SSL Handshake Time',
    dom_content_loaded: 'DOM Content Loaded',
    fully_loaded: 'Fully Loaded',
    page_size: 'Page Size',
    requests: 'Requests',

    // Performance
    keyword_rankings: 'Keyword Rankings',
    average_position_performance: 'Average Position',
    impressions_performance: 'Impressions',
    clicks: 'Clicks',
    ctr: 'Click Through Rate',
    visibility: 'Visibility',
    search_volume: 'Search Volume',
    keyword_difficulty: 'Keyword Difficulty',
    competition: 'Competition',
    estimated_traffic: 'Estimated Traffic',
    estimated_value: 'Estimated Value',
    share_of_voice: 'Share of Voice',

    // Backlink
    total_backlinks: 'Total Backlinks',
    unique_domains: 'Unique Domains',
    dofollow_backlinks: 'Dofollow Backlinks',
    nofollow_backlinks: 'Nofollow Backlinks',
    domain_authority: 'Domain Authority',
    page_authority: 'Page Authority',
    spam_score: 'Spam Score',
    trust_flow: 'Trust Flow',
    citation_flow: 'Citation Flow',
    referring_ips: 'Referring IPs',
    anchor_text_distribution: 'Anchor Text Distribution',

    // Content
    word_count: 'Word Count',
    readability: 'Readability',
    unique_words: 'Unique Words',
    avg_sentence_length: 'Avg Sentence Length',
    avg_paragraph_length: 'Avg Paragraph Length',
    headings: 'Headings',
    images: 'Images',
    internal_links_content: 'Internal Links',
    external_links_content: 'External Links',
    content_score: 'Content Score',
    freshness: 'Freshness',
    duplicate_content: 'Duplicate Content',

    // Mobile
    mobile_traffic: 'Mobile Traffic',
    mobile_bounce_rate: 'Mobile Bounce Rate',
    mobile_conversion: 'Mobile Conversion',
    mobile_page_speed: 'Mobile Page Speed',
    mobile_friendly: 'Mobile Friendly',
    amp_traffic: 'AMP Traffic',
    app_traffic: 'App Traffic',

    // Social
    social_traffic_metrics: 'Social Traffic',
    social_conversion: 'Social Conversion',
    social_shares_metrics: 'Social Shares',
    social_engagement: 'Social Engagement',
    social_reach: 'Social Reach',
    social_impressions: 'Social Impressions',
    social_clicks: 'Social Clicks',
    social_followers: 'Social Followers',

    // Revenue
    total_revenue: 'Total Revenue',
    organic_revenue: 'Organic Revenue',
    paid_revenue: 'Paid Revenue',
    social_revenue: 'Social Revenue',
    referral_revenue: 'Referral Revenue',
    direct_revenue: 'Direct Revenue',
    revenue_per_session: 'Revenue per Session',
    revenue_per_user: 'Revenue per User',
    roi: 'Return on Investment',
    roas: 'Return on Ad Spend',
    ltv: 'Lifetime Value',
    cac: 'Customer Acquisition Cost',
  };
  return labels[metric] || metric;
}

export function getSEOAnalyticsMetricCategory(metric: string): string {
  const categories: Record<string, string> = {
    // Traffic
    sessions: 'Traffic',
    users: 'Traffic',
    new_users: 'Traffic',
    returning_users: 'Traffic',
    page_views: 'Traffic',
    unique_page_views: 'Traffic',
    bounce_rate: 'Traffic',
    exit_rate: 'Traffic',
    pages_per_session: 'Traffic',
    avg_session_duration: 'Traffic',
    avg_time_on_page: 'Traffic',

    // Acquisition
    organic_traffic: 'Acquisition',
    paid_traffic: 'Acquisition',
    social_traffic: 'Acquisition',
    referral_traffic: 'Acquisition',
    direct_traffic: 'Acquisition',
    email_traffic: 'Acquisition',
    organic_sessions: 'Acquisition',
    organic_users: 'Acquisition',
    organic_conversions: 'Acquisition',
    cost_per_acquisition: 'Acquisition',
    cost_per_click: 'Acquisition',
    click_through_rate: 'Acquisition',
    impressions: 'Acquisition',
    average_position: 'Acquisition',

    // Conversion
    conversion_rate: 'Conversion',
    goal_completions: 'Conversion',
    goal_value: 'Conversion',
    ecommerce_conversion: 'Conversion',
    revenue: 'Conversion',
    average_order_value: 'Conversion',
    transactions: 'Conversion',
    add_to_cart: 'Conversion',
    checkout_started: 'Conversion',
    purchase_completed: 'Conversion',
    micro_conversions: 'Conversion',
    macro_conversions: 'Conversion',

    // Engagement
    bounce_rate_engagement: 'Engagement',
    exit_rate_engagement: 'Engagement',
    time_on_page: 'Engagement',
    pages_per_session_engagement: 'Engagement',
    session_duration: 'Engagement',
    event_count: 'Engagement',
    social_shares_engagement: 'Engagement',
    comments: 'Engagement',
    likes: 'Engagement',
    replies: 'Engagement',
    retweets: 'Engagement',
    mentions: 'Engagement',

    // Technical
    page_speed: 'Technical',
    load_time: 'Technical',
    ttfb: 'Technical',
    fcp: 'Technical',
    lcp: 'Technical',
    cls: 'Technical',
    fid: 'Technical',
    time_to_interactive: 'Technical',
    dns_lookup_time: 'Technical',
    tcp_connect_time: 'Technical',
    ssl_handshake_time: 'Technical',
    dom_content_loaded: 'Technical',
    fully_loaded: 'Technical',
    page_size: 'Technical',
    requests: 'Technical',

    // Performance
    keyword_rankings: 'Performance',
    average_position_performance: 'Performance',
    impressions_performance: 'Performance',
    clicks: 'Performance',
    ctr: 'Performance',
    visibility: 'Performance',
    search_volume: 'Performance',
    keyword_difficulty: 'Performance',
    competition: 'Performance',
    estimated_traffic: 'Performance',
    estimated_value: 'Performance',
    share_of_voice: 'Performance',

    // Backlink
    total_backlinks: 'Backlink',
    unique_domains: 'Backlink',
    dofollow_backlinks: 'Backlink',
    nofollow_backlinks: 'Backlink',
    domain_authority: 'Backlink',
    page_authority: 'Backlink',
    spam_score: 'Backlink',
    trust_flow: 'Backlink',
    citation_flow: 'Backlink',
    referring_ips: 'Backlink',
    anchor_text_distribution: 'Backlink',

    // Content
    word_count: 'Content',
    readability: 'Content',
    unique_words: 'Content',
    avg_sentence_length: 'Content',
    avg_paragraph_length: 'Content',
    headings: 'Content',
    images: 'Content',
    internal_links_content: 'Content',
    external_links_content: 'Content',
    content_score: 'Content',
    freshness: 'Content',
    duplicate_content: 'Content',

    // Mobile
    mobile_traffic: 'Mobile',
    mobile_bounce_rate: 'Mobile',
    mobile_conversion: 'Mobile',
    mobile_page_speed: 'Mobile',
    mobile_friendly: 'Mobile',
    amp_traffic: 'Mobile',
    app_traffic: 'Mobile',

    // Social
    social_traffic_metrics: 'Social',
    social_conversion: 'Social',
    social_shares_metrics: 'Social',
    social_engagement: 'Social',
    social_reach: 'Social',
    social_impressions: 'Social',
    social_clicks: 'Social',
    social_followers: 'Social',

    // Revenue
    total_revenue: 'Revenue',
    organic_revenue: 'Revenue',
    paid_revenue: 'Revenue',
    social_revenue: 'Revenue',
    referral_revenue: 'Revenue',
    direct_revenue: 'Revenue',
    revenue_per_session: 'Revenue',
    revenue_per_user: 'Revenue',
    roi: 'Revenue',
    roas: 'Revenue',
    ltv: 'Revenue',
    cac: 'Revenue',
  };
  return categories[metric] || 'Unknown';
}
