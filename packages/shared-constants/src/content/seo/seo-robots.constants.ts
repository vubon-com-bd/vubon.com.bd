/**
 * SEO Robots Constants
 * Configuration for robots meta tags and directives
 */

export const CONTENT_SEO_ROBOTS = {
  // Robots Directives
  DIRECTIVES: {
    INDEX: 'index',
    NOINDEX: 'noindex',
    FOLLOW: 'follow',
    NOFOLLOW: 'nofollow',
    NOARCHIVE: 'noarchive',
    NOSNIPPET: 'nosnippet',
    NOODP: 'noodp',
    NOYDIR: 'noydir',
    NONE: 'none',
    ALL: 'all',
  } as const,

  // Robots Actions
  ACTIONS: {
    ALLOW: 'allow',
    DISALLOW: 'disallow',
    BLOCK: 'block',
    NO_BLOCK: 'no_block',
  } as const,

  // Robots Rules
  RULES: {
    INDEX_FOLLOW: 'index, follow',
    INDEX_NOFOLLOW: 'index, nofollow',
    NOINDEX_FOLLOW: 'noindex, follow',
    NOINDEX_NOFOLLOW: 'noindex, nofollow',
    NONE: 'none',
    ALL: 'all',
  } as const,

  // Robots Defaults
  DEFAULTS: {
    RULE: 'index, follow',
    SITEMAP_PRIORITY: 0.5,
    CRAWL_DELAY: 1,
    MAX_URLS_PER_SITEMAP: 50000,
  } as const,

  // Robots User Agents
  USER_AGENTS: {
    ALL: '*',
    GOOGLE: 'Googlebot',
    BING: 'bingbot',
    YAHOO: 'Slurp',
    BAIDU: 'Baiduspider',
    YANDEX: 'YandexBot',
    DUCKDUCKGO: 'DuckDuckBot',
    CUSTOM: 'custom',
  } as const,
} as const;

// Robots Directives
export type ContentSEORobotsDirective =
  (typeof CONTENT_SEO_ROBOTS.DIRECTIVES)[keyof typeof CONTENT_SEO_ROBOTS.DIRECTIVES];

// Robots Actions
export type ContentSEORobotsAction =
  (typeof CONTENT_SEO_ROBOTS.ACTIONS)[keyof typeof CONTENT_SEO_ROBOTS.ACTIONS];

// Robots Rules
export type ContentSEORobotsRule =
  (typeof CONTENT_SEO_ROBOTS.RULES)[keyof typeof CONTENT_SEO_ROBOTS.RULES];

// Robots User Agents
export type ContentSEORobotsUserAgent =
  (typeof CONTENT_SEO_ROBOTS.USER_AGENTS)[keyof typeof CONTENT_SEO_ROBOTS.USER_AGENTS];

// Utility Functions
export function contentSeoRobotsGetDirectiveLabel(directive: ContentSEORobotsDirective): string {
  const labels: Record<ContentSEORobotsDirective, string> = {
    [CONTENT_SEO_ROBOTS.DIRECTIVES.INDEX]: 'Index',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOINDEX]: 'No Index',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.FOLLOW]: 'Follow',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOFOLLOW]: 'No Follow',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOARCHIVE]: 'No Archive',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOSNIPPET]: 'No Snippet',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOODP]: 'No ODP',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NOYDIR]: 'No YDIR',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.NONE]: 'None',
    [CONTENT_SEO_ROBOTS.DIRECTIVES.ALL]: 'All',
  };
  return labels[directive] || 'Unknown Directive';
}

export function contentSeoRobotsGetRuleLabel(rule: ContentSEORobotsRule): string {
  const labels: Record<ContentSEORobotsRule, string> = {
    [CONTENT_SEO_ROBOTS.RULES.INDEX_FOLLOW]: 'Index, Follow',
    [CONTENT_SEO_ROBOTS.RULES.INDEX_NOFOLLOW]: 'Index, No Follow',
    [CONTENT_SEO_ROBOTS.RULES.NOINDEX_FOLLOW]: 'No Index, Follow',
    [CONTENT_SEO_ROBOTS.RULES.NOINDEX_NOFOLLOW]: 'No Index, No Follow',
    [CONTENT_SEO_ROBOTS.RULES.NONE]: 'None',
    [CONTENT_SEO_ROBOTS.RULES.ALL]: 'All',
  };
  return labels[rule] || 'Unknown Rule';
}

export function contentSeoRobotsGetActionLabel(action: ContentSEORobotsAction): string {
  const labels: Record<ContentSEORobotsAction, string> = {
    [CONTENT_SEO_ROBOTS.ACTIONS.ALLOW]: 'Allow',
    [CONTENT_SEO_ROBOTS.ACTIONS.DISALLOW]: 'Disallow',
    [CONTENT_SEO_ROBOTS.ACTIONS.BLOCK]: 'Block',
    [CONTENT_SEO_ROBOTS.ACTIONS.NO_BLOCK]: 'No Block',
  };
  return labels[action] || 'Unknown Action';
}

export function contentSeoRobotsGetUserAgentLabel(userAgent: ContentSEORobotsUserAgent): string {
  const labels: Record<ContentSEORobotsUserAgent, string> = {
    [CONTENT_SEO_ROBOTS.USER_AGENTS.ALL]: 'All Crawlers',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.GOOGLE]: 'Googlebot',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.BING]: 'bingbot',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.YAHOO]: 'Slurp',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.BAIDU]: 'Baiduspider',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.YANDEX]: 'YandexBot',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.DUCKDUCKGO]: 'DuckDuckBot',
    [CONTENT_SEO_ROBOTS.USER_AGENTS.CUSTOM]: 'Custom Crawler',
  };
  return labels[userAgent] || 'Unknown User Agent';
}

export function contentSeoRobotsGetDefaultRule(): ContentSEORobotsRule {
  return CONTENT_SEO_ROBOTS.DEFAULTS.RULE as ContentSEORobotsRule;
}

export function contentSeoRobotsGetDefaultSitemapPriority(): number {
  return CONTENT_SEO_ROBOTS.DEFAULTS.SITEMAP_PRIORITY;
}

export function contentSeoRobotsGetDefaultCrawlDelay(): number {
  return CONTENT_SEO_ROBOTS.DEFAULTS.CRAWL_DELAY;
}

export function contentSeoRobotsIsValidDirective(
  directive: string
): directive is ContentSEORobotsDirective {
  return Object.values(CONTENT_SEO_ROBOTS.DIRECTIVES).includes(
    directive as ContentSEORobotsDirective
  );
}

export function contentSeoRobotsIsValidRule(rule: string): rule is ContentSEORobotsRule {
  return Object.values(CONTENT_SEO_ROBOTS.RULES).includes(rule as ContentSEORobotsRule);
}
