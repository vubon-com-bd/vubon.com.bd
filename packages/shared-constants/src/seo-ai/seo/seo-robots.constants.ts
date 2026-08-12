/**
 * ডিফল্ট ইউজার এজেন্ট (*)
 */
export const SEO_ROBOTS_DEFAULT_USER_AGENT = '*' as const;

/**
 * সর্বোচ্চ রুল সংখ্যা (১০০)
 */
export const SEO_ROBOTS_MAX_RULES = 100 as const;

/**
 * ডিফল্ট সাইটম্যাপ লোকেশন
 */
export const SEO_ROBOTS_DEFAULT_SITEMAP = '/sitemap.xml' as const;

/**
 * রোবটস ডিরেক্টিভ এনাম
 */
export const SEO_ROBOTS_DIRECTIVE = {
  ALLOW: 'allow',
  DISALLOW: 'disallow',
  USER_AGENT: 'user-agent',
  SITEMAP: 'sitemap',
  CRAWL_DELAY: 'crawl-delay',
  HOST: 'host',
  NOINDEX: 'noindex',
  NOFOLLOW: 'nofollow',
  NOARCHIVE: 'noarchive',
  NOSNIPPET: 'nosnippet',
  NOODP: 'noodp',
  NONE: 'none',
} as const;

/**
 * SEO_ROBOTS_DIRECTIVE থেকে টাইপ
 */
export type SEORobotsDirective = (typeof SEO_ROBOTS_DIRECTIVE)[keyof typeof SEO_ROBOTS_DIRECTIVE];

/**
 * রোবটস ডিরেক্টিভ লেবেল
 */
export const SEO_ROBOTS_DIRECTIVE_LABELS: Record<SEORobotsDirective, string> = {
  [SEO_ROBOTS_DIRECTIVE.ALLOW]: 'Allow',
  [SEO_ROBOTS_DIRECTIVE.DISALLOW]: 'Disallow',
  [SEO_ROBOTS_DIRECTIVE.USER_AGENT]: 'User-agent',
  [SEO_ROBOTS_DIRECTIVE.SITEMAP]: 'Sitemap',
  [SEO_ROBOTS_DIRECTIVE.CRAWL_DELAY]: 'Crawl-delay',
  [SEO_ROBOTS_DIRECTIVE.HOST]: 'Host',
  [SEO_ROBOTS_DIRECTIVE.NOINDEX]: 'Noindex',
  [SEO_ROBOTS_DIRECTIVE.NOFOLLOW]: 'Nofollow',
  [SEO_ROBOTS_DIRECTIVE.NOARCHIVE]: 'Noarchive',
  [SEO_ROBOTS_DIRECTIVE.NOSNIPPET]: 'Nosnippet',
  [SEO_ROBOTS_DIRECTIVE.NOODP]: 'Noodp',
  [SEO_ROBOTS_DIRECTIVE.NONE]: 'None',
} as const;

/**
 * রোবটস ডিরেক্টিভ বিবরণ
 */
export const SEO_ROBOTS_DIRECTIVE_DESCRIPTIONS: Record<SEORobotsDirective, string> = {
  [SEO_ROBOTS_DIRECTIVE.ALLOW]: 'Allows crawling of specified paths',
  [SEO_ROBOTS_DIRECTIVE.DISALLOW]: 'Disallows crawling of specified paths',
  [SEO_ROBOTS_DIRECTIVE.USER_AGENT]: 'Specifies which crawler the rules apply to',
  [SEO_ROBOTS_DIRECTIVE.SITEMAP]: 'Location of the sitemap file',
  [SEO_ROBOTS_DIRECTIVE.CRAWL_DELAY]: 'Delay between crawler requests in seconds',
  [SEO_ROBOTS_DIRECTIVE.HOST]: 'Preferred domain for the website',
  [SEO_ROBOTS_DIRECTIVE.NOINDEX]: 'Prevents indexing of the page',
  [SEO_ROBOTS_DIRECTIVE.NOFOLLOW]: 'Prevents following links on the page',
  [SEO_ROBOTS_DIRECTIVE.NOARCHIVE]: 'Prevents caching of the page',
  [SEO_ROBOTS_DIRECTIVE.NOSNIPPET]: 'Prevents showing snippet in search results',
  [SEO_ROBOTS_DIRECTIVE.NOODP]: 'Prevents using ODP description',
  [SEO_ROBOTS_DIRECTIVE.NONE]: 'No specific directive',
} as const;

/**
 * রোবটস ইউজার এজেন্ট
 */
export const SEO_ROBOTS_USER_AGENT = {
  GOOGLEBOT: 'googlebot',
  BINGBOT: 'bingbot',
  SLURP: 'slurp',
  DUCKDUCKGOBOT: 'duckduckbot',
  BAIDUSPIDER: 'baiduspider',
  YANDEXBOT: 'yandexbot',
  FACEBOOKBOT: 'facebookbot',
  TWITTERBOT: 'twitterbot',
  PINTERESTBOT: 'pinterestbot',
  ALL: '*',
} as const;

/**
 * SEO_ROBOTS_USER_AGENT থেকে টাইপ
 */
export type SEORobotsUserAgent = (typeof SEO_ROBOTS_USER_AGENT)[keyof typeof SEO_ROBOTS_USER_AGENT];

/**
 * রোবটস ইউজার এজেন্ট লেবেল
 */
export const SEO_ROBOTS_USER_AGENT_LABELS: Record<SEORobotsUserAgent, string> = {
  [SEO_ROBOTS_USER_AGENT.GOOGLEBOT]: 'Googlebot',
  [SEO_ROBOTS_USER_AGENT.BINGBOT]: 'Bingbot',
  [SEO_ROBOTS_USER_AGENT.SLURP]: 'Slurp (Yahoo)',
  [SEO_ROBOTS_USER_AGENT.DUCKDUCKGOBOT]: 'DuckDuckBot',
  [SEO_ROBOTS_USER_AGENT.BAIDUSPIDER]: 'Baiduspider',
  [SEO_ROBOTS_USER_AGENT.YANDEXBOT]: 'Yandexbot',
  [SEO_ROBOTS_USER_AGENT.FACEBOOKBOT]: 'Facebookbot',
  [SEO_ROBOTS_USER_AGENT.TWITTERBOT]: 'Twitterbot',
  [SEO_ROBOTS_USER_AGENT.PINTERESTBOT]: 'Pinterestbot',
  [SEO_ROBOTS_USER_AGENT.ALL]: 'All Crawlers',
} as const;

/**
 * রোবটস ডিরেক্টিভ ক্যাটাগরি
 */
export const SEO_ROBOTS_DIRECTIVE_CATEGORY = {
  CRAWL: 'crawl',
  INDEX: 'index',
  FOLLOW: 'follow',
  META: 'meta',
  SITEMAP: 'sitemap',
} as const;

/**
 * SEO_ROBOTS_DIRECTIVE_CATEGORY থেকে টাইপ
 */
export type SEORobotsDirectiveCategory =
  (typeof SEO_ROBOTS_DIRECTIVE_CATEGORY)[keyof typeof SEO_ROBOTS_DIRECTIVE_CATEGORY];

/**
 * রোবটস ডিরেক্টিভ ক্যাটাগরি লেবেল
 */
export const SEO_ROBOTS_DIRECTIVE_CATEGORY_LABELS: Record<SEORobotsDirectiveCategory, string> = {
  [SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL]: 'Crawl Control',
  [SEO_ROBOTS_DIRECTIVE_CATEGORY.INDEX]: 'Index Control',
  [SEO_ROBOTS_DIRECTIVE_CATEGORY.FOLLOW]: 'Follow Control',
  [SEO_ROBOTS_DIRECTIVE_CATEGORY.META]: 'Meta Control',
  [SEO_ROBOTS_DIRECTIVE_CATEGORY.SITEMAP]: 'Sitemap',
} as const;

/**
 * রোবটস ডিরেক্টিভ ক্যাটাগরি ম্যাপিং
 */
export const SEO_ROBOTS_DIRECTIVE_CATEGORY_MAP: Record<
  SEORobotsDirective,
  SEORobotsDirectiveCategory
> = {
  [SEO_ROBOTS_DIRECTIVE.ALLOW]: SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL,
  [SEO_ROBOTS_DIRECTIVE.DISALLOW]: SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL,
  [SEO_ROBOTS_DIRECTIVE.USER_AGENT]: SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL,
  [SEO_ROBOTS_DIRECTIVE.SITEMAP]: SEO_ROBOTS_DIRECTIVE_CATEGORY.SITEMAP,
  [SEO_ROBOTS_DIRECTIVE.CRAWL_DELAY]: SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL,
  [SEO_ROBOTS_DIRECTIVE.HOST]: SEO_ROBOTS_DIRECTIVE_CATEGORY.CRAWL,
  [SEO_ROBOTS_DIRECTIVE.NOINDEX]: SEO_ROBOTS_DIRECTIVE_CATEGORY.INDEX,
  [SEO_ROBOTS_DIRECTIVE.NOFOLLOW]: SEO_ROBOTS_DIRECTIVE_CATEGORY.FOLLOW,
  [SEO_ROBOTS_DIRECTIVE.NOARCHIVE]: SEO_ROBOTS_DIRECTIVE_CATEGORY.META,
  [SEO_ROBOTS_DIRECTIVE.NOSNIPPET]: SEO_ROBOTS_DIRECTIVE_CATEGORY.META,
  [SEO_ROBOTS_DIRECTIVE.NOODP]: SEO_ROBOTS_DIRECTIVE_CATEGORY.META,
  [SEO_ROBOTS_DIRECTIVE.NONE]: SEO_ROBOTS_DIRECTIVE_CATEGORY.META,
} as const;

/**
 * রোবটস কনফিগারেশন
 */
export interface SEORobotsConfig {
  defaultUserAgent: string;
  maxRules: number;
  defaultSitemap: string;
  includeHost: boolean;
  includeCrawlDelay: boolean;
}

/**
 * রোবটস ডিফল্ট কনফিগারেশন
 */
export const SEO_ROBOTS_DEFAULT_CONFIG: SEORobotsConfig = {
  defaultUserAgent: SEO_ROBOTS_DEFAULT_USER_AGENT,
  maxRules: SEO_ROBOTS_MAX_RULES,
  defaultSitemap: SEO_ROBOTS_DEFAULT_SITEMAP,
  includeHost: true,
  includeCrawlDelay: true,
} as const;

/**
 * রোবটস রুল
 */
export interface SEORobotsRule {
  directive: SEORobotsDirective;
  value: string;
  userAgent?: SEORobotsUserAgent;
  comment?: string;
}

/**
 * রোবটস ডেটা
 */
export interface SEORobotsData {
  rules: SEORobotsRule[];
  sitemaps: string[];
  host?: string;
  crawlDelay?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * রোবটস ফিল্টার
 */
export interface SEORobotsFilter {
  userAgent?: SEORobotsUserAgent;
  directive?: SEORobotsDirective;
  search?: string;
  page?: number;
  limit?: number;
}
