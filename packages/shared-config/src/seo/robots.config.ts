// packages/shared-config/src/seo/robots.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Robots Configuration Interfaces
// ============================================================================

/**
 * Robots.txt configuration interface
 */
export interface RobotsTxtConfig {
  /** Base URL of the site */
  baseUrl: string;
  /** Sitemap URLs */
  sitemaps: string[];
  /** Host directive */
  host?: string;
  /** Default crawl delay in seconds */
  defaultCrawlDelay?: number;
  /** User agent rules */
  userAgents: RobotsUserAgent[];
  /** Clean-param directives */
  cleanParams: CleanParamRule[];
  /** Whether to enable robots.txt */
  enabled: boolean;
}

/**
 * User agent rules for robots.txt
 */
export interface RobotsUserAgent {
  /** User agent name (e.g., '*', 'Googlebot', 'Bingbot') */
  userAgent: string;
  /** Allowed paths */
  allow: string[];
  /** Disallowed paths */
  disallow: string[];
  /** Crawl delay in seconds */
  crawlDelay?: number;
  /** Clean-param rules for this user agent */
  cleanParams?: CleanParamRule[];
  /** Noindex directories */
  noindex?: string[];
}

/**
 * Clean-param rule for removing tracking parameters
 */
export interface CleanParamRule {
  /** URL path pattern */
  path: string;
  /** Parameter names to clean */
  params: string[];
  /** User agent this rule applies to (optional) */
  userAgent?: string;
}

/**
 * Meta robots configuration
 */
export interface MetaRobotsConfig {
  /** Whether to enable meta robots */
  enabled: boolean;
  /** Default directives */
  defaultDirectives: MetaRobotDirectives;
  /** Page-specific overrides */
  overrides: Record<string, MetaRobotDirectives>;
}

/**
 * Meta robot directives
 */
export interface MetaRobotDirectives {
  /** Whether to index the page */
  index: boolean;
  /** Whether to follow links */
  follow: boolean;
  /** Whether to allow indexing of images */
  imageIndex: boolean;
  /** Whether to allow archive/caching */
  archive: boolean;
  /** Whether to allow snippet in search results */
  snippet: boolean;
  /** Whether to allow ODP/ODP listing */
  odp: boolean;
  /** Whether to allow translation */
  translate: boolean;
  /** Max snippet length in characters */
  maxSnippet?: number;
  /** Max image preview size */
  maxImagePreview?: 'none' | 'standard' | 'large';
  /** Max video preview seconds */
  maxVideoPreview?: number;
  /** Whether to allow site links search box */
  siteLinksSearchBox: boolean;
}

// ============================================================================
// Robots Constants
// ============================================================================

/**
 * Common user agents
 */
export const ROBOTS_USER_AGENTS = {
  ALL: '*',
  GOOGLEBOT: 'Googlebot',
  BINGBOT: 'Bingbot',
  SLURP: 'Slurp', // Yahoo
  DUCKDUCKBOT: 'DuckDuckBot',
  BAIDUSPIDER: 'Baiduspider',
  YANDEXBOT: 'YandexBot',
  MSNBOT: 'msnbot',
  APPLEBOT: 'Applebot',
  FACEBOOKBOT: 'facebookexternalhit',
  TWITTERBOT: 'Twitterbot',
  LINKEDINBOT: 'LinkedInBot',
  PINTERESTBOT: 'Pinterestbot',
  TELEGRAMBOT: 'TelegramBot',
  WHATSAPP: 'WhatsApp',
};

/**
 * Default paths to disallow for all bots
 */
export const DEFAULT_DISALLOW_PATHS = [
  '/admin',
  '/api',
  '/auth',
  '/private',
  '/tmp',
  '/draft',
  '/preview',
  '/_next',
  '/static',
  '/assets',
];

/**
 * Default paths to allow for all bots
 */
export const DEFAULT_ALLOW_PATHS = [
  '/',
  '/products',
  '/categories',
  '/blog',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
];

/**
 * Disallowed paths for specific bots
 */
export const BOT_SPECIFIC_DISALLOW: Record<string, string[]> = {
  [ROBOTS_USER_AGENTS.GOOGLEBOT]: [
    '/admin',
    '/api',
    '/auth',
    '/private',
    '/draft',
    '/preview',
    '/_next',
  ],
  [ROBOTS_USER_AGENTS.BINGBOT]: [
    '/admin',
    '/api',
    '/auth',
    '/private',
    '/draft',
    '/preview',
    '/_next',
  ],
  [ROBOTS_USER_AGENTS.DUCKDUCKBOT]: ['/admin', '/api', '/auth', '/private', '/draft', '/preview'],
};

/**
 * Clean parameter rules for removing tracking parameters
 */
export const DEFAULT_CLEAN_PARAMS: CleanParamRule[] = [
  {
    path: '/*',
    params: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
  },
  {
    path: '/*',
    params: ['fbclid', 'gclid', 'ref', 'source', 'si', 's'],
  },
];

// ============================================================================
// Robots Configuration Factory
// ============================================================================

/**
 * Creates robots.txt configuration
 * @param envConfig - The environment configuration
 * @returns Robots.txt configuration
 */
export function createRobotsTxtConfig(envConfig: EnvConfig = env): RobotsTxtConfig {
  const { server } = envConfig;
  const baseUrl = server.API_URL || 'https://vubon.com';
  const isProduction = server.NODE_ENV === 'production';

  // In production, allow bots; in other environments, restrict
  const userAgents: RobotsUserAgent[] = [];

  // Default user agent for all bots
  const allBotRules: RobotsUserAgent = {
    userAgent: ROBOTS_USER_AGENTS.ALL,
    allow: isProduction ? DEFAULT_ALLOW_PATHS : ['/'],
    disallow: isProduction ? DEFAULT_DISALLOW_PATHS : ['/'],
    crawlDelay: isProduction ? 0.5 : 0,
  };

  userAgents.push(allBotRules);

  // Add specific bot rules for production
  if (isProduction) {
    // Googlebot rules
    userAgents.push({
      userAgent: ROBOTS_USER_AGENTS.GOOGLEBOT,
      allow: ['/'],
      disallow: BOT_SPECIFIC_DISALLOW[ROBOTS_USER_AGENTS.GOOGLEBOT] || [],
      crawlDelay: 0.3,
    });

    // Bingbot rules
    userAgents.push({
      userAgent: ROBOTS_USER_AGENTS.BINGBOT,
      allow: ['/'],
      disallow: BOT_SPECIFIC_DISALLOW[ROBOTS_USER_AGENTS.BINGBOT] || [],
      crawlDelay: 0.3,
    });
  }

  return {
    baseUrl,
    sitemaps: [`${baseUrl}/sitemap.xml`],
    host: baseUrl.replace(/^https?:\/\//, ''),
    defaultCrawlDelay: isProduction ? 0.5 : 0,
    userAgents,
    cleanParams: DEFAULT_CLEAN_PARAMS,
    enabled: isProduction,
  };
}

/**
 * Creates meta robots configuration
 * @param envConfig - The environment configuration
 * @returns Meta robots configuration
 */
export function createMetaRobotsConfig(envConfig: EnvConfig = env): MetaRobotsConfig {
  const { server } = envConfig;
  const isProduction = server.NODE_ENV === 'production';

  const defaultDirectives: MetaRobotDirectives = {
    index: isProduction,
    follow: isProduction,
    imageIndex: isProduction,
    archive: isProduction,
    snippet: true,
    odp: true,
    translate: true,
    maxSnippet: 160,
    maxImagePreview: 'large',
    maxVideoPreview: 60,
    siteLinksSearchBox: true,
  };

  return {
    enabled: true,
    defaultDirectives,
    overrides: {
      '/admin': {
        index: false,
        follow: false,
        imageIndex: false,
        archive: false,
        snippet: false,
        odp: false,
        translate: false,
        maxSnippet: 0,
        maxImagePreview: 'none',
        maxVideoPreview: 0,
        siteLinksSearchBox: false,
      },
      '/auth': {
        index: false,
        follow: false,
        imageIndex: false,
        archive: false,
        snippet: false,
        odp: false,
        translate: false,
        maxSnippet: 0,
        maxImagePreview: 'none',
        maxVideoPreview: 0,
        siteLinksSearchBox: false,
      },
      '/private': {
        index: false,
        follow: false,
        imageIndex: false,
        archive: false,
        snippet: false,
        odp: false,
        translate: false,
        maxSnippet: 0,
        maxImagePreview: 'none',
        maxVideoPreview: 0,
        siteLinksSearchBox: false,
      },
      '/draft': {
        index: false,
        follow: false,
        imageIndex: false,
        archive: false,
        snippet: false,
        odp: false,
        translate: false,
        maxSnippet: 0,
        maxImagePreview: 'none',
        maxVideoPreview: 0,
        siteLinksSearchBox: false,
      },
      '/preview': {
        index: false,
        follow: false,
        imageIndex: false,
        archive: false,
        snippet: false,
        odp: false,
        translate: false,
        maxSnippet: 0,
        maxImagePreview: 'none',
        maxVideoPreview: 0,
        siteLinksSearchBox: false,
      },
    },
  };
}

// ============================================================================
// Robots Configuration Instances
// ============================================================================

/**
 * Robots.txt configuration instance
 */
export const robotsTxtConfig: RobotsTxtConfig = createRobotsTxtConfig();

/**
 * Meta robots configuration instance
 */
export const metaRobotsConfig: MetaRobotsConfig = createMetaRobotsConfig();

// ============================================================================
// Robots Helper Functions
// ============================================================================

/**
 * Gets the robots.txt configuration
 * @param envConfig - The environment configuration (optional)
 * @returns Robots.txt configuration
 *
 * @example
 * const config = getRobotsTxtConfig();
 */
export function getRobotsTxtConfig(envConfig: EnvConfig = env): RobotsTxtConfig {
  return createRobotsTxtConfig(envConfig);
}

/**
 * Gets the meta robots directives for a specific path
 * @param path - The page path
 * @param config - The meta robots configuration (optional)
 * @returns Meta robot directives for the path
 *
 * @example
 * const directives = getMetaRobotsForPath('/admin');
 */
export function getMetaRobotsForPath(
  path: string,
  config: MetaRobotsConfig = metaRobotsConfig
): MetaRobotDirectives {
  if (!path || typeof path !== 'string') {
    return config.defaultDirectives;
  }

  // Check exact match
  if (config.overrides[path]) {
    return config.overrides[path];
  }

  // Check path prefix matches
  for (const [key, directives] of Object.entries(config.overrides)) {
    if (path.startsWith(key)) {
      return directives;
    }
  }

  return config.defaultDirectives;
}

/**
 * Generates robots.txt content
 * @param config - The robots.txt configuration (optional)
 * @returns The robots.txt content string
 *
 * @example
 * const robotsTxt = generateRobotsTxt();
 */
export function generateRobotsTxt(config: RobotsTxtConfig = robotsTxtConfig): string {
  if (!config.enabled) {
    return 'User-agent: *\nDisallow: /';
  }

  const lines: string[] = [];

  // Add host directive
  if (config.host) {
    lines.push(`Host: ${config.host}`);
    lines.push('');
  }

  // Add sitemap directives
  if (config.sitemaps && config.sitemaps.length > 0) {
    for (const sitemap of config.sitemaps) {
      lines.push(`Sitemap: ${sitemap}`);
    }
    lines.push('');
  }

  // Add user agent rules
  for (const userAgent of config.userAgents) {
    lines.push(`User-agent: ${userAgent.userAgent}`);

    // Add allow rules
    if (userAgent.allow && userAgent.allow.length > 0) {
      for (const path of userAgent.allow) {
        lines.push(`Allow: ${path}`);
      }
    }

    // Add disallow rules
    if (userAgent.disallow && userAgent.disallow.length > 0) {
      for (const path of userAgent.disallow) {
        lines.push(`Disallow: ${path}`);
      }
    }

    // Add crawl delay
    if (userAgent.crawlDelay !== undefined) {
      lines.push(`Crawl-delay: ${userAgent.crawlDelay}`);
    }

    // Add clean-param rules for this user agent
    if (userAgent.cleanParams && userAgent.cleanParams.length > 0) {
      for (const rule of userAgent.cleanParams) {
        const paramList = rule.params.join(',');
        lines.push(`Clean-param: ${paramList} ${rule.path}`);
      }
    }

    // Add noindex directives
    if (userAgent.noindex && userAgent.noindex.length > 0) {
      for (const path of userAgent.noindex) {
        lines.push(`Noindex: ${path}`);
      }
    }

    lines.push('');
  }

  // Add global clean-param rules
  if (config.cleanParams && config.cleanParams.length > 0) {
    for (const rule of config.cleanParams) {
      const paramList = rule.params.join(',');
      lines.push(`Clean-param: ${paramList} ${rule.path}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generates meta robots tag for a specific path
 * @param path - The page path
 * @param config - The meta robots configuration (optional)
 * @returns The meta robots tag string
 *
 * @example
 * const tag = generateMetaRobotsTag('/products');
 */
export function generateMetaRobotsTag(
  path: string,
  config: MetaRobotsConfig = metaRobotsConfig
): string {
  const directives = getMetaRobotsForPath(path, config);

  const parts: string[] = [];

  if (directives.index) {
    parts.push('index');
  } else {
    parts.push('noindex');
  }

  if (directives.follow) {
    parts.push('follow');
  } else {
    parts.push('nofollow');
  }

  if (!directives.imageIndex) {
    parts.push('noimageindex');
  }

  if (!directives.archive) {
    parts.push('noarchive');
  }

  if (!directives.snippet) {
    parts.push('nosnippet');
  }

  if (!directives.odp) {
    parts.push('noodp');
  }

  if (!directives.translate) {
    parts.push('notranslate');
  }

  if (directives.maxSnippet !== undefined && directives.maxSnippet > 0) {
    parts.push(`max-snippet:${directives.maxSnippet}`);
  }

  if (directives.maxImagePreview && directives.maxImagePreview !== 'large') {
    parts.push(`max-image-preview:${directives.maxImagePreview}`);
  }

  if (directives.maxVideoPreview !== undefined && directives.maxVideoPreview > 0) {
    parts.push(`max-video-preview:${directives.maxVideoPreview}`);
  }

  if (!directives.siteLinksSearchBox) {
    parts.push('nositelinkssearchbox');
  }

  return parts.join(', ');
}

/**
 * Generates a complete robots meta tag HTML
 * @param path - The page path
 * @param config - The meta robots configuration (optional)
 * @returns The robots meta tag HTML
 *
 * @example
 * const html = generateMetaRobotsHtml('/admin');
 */
export function generateMetaRobotsHtml(
  path: string,
  config: MetaRobotsConfig = metaRobotsConfig
): string {
  const content = generateMetaRobotsTag(path, config);
  return `<meta name="robots" content="${content}" />`;
}

/**
 * Adds a clean-param rule
 * @param path - The URL path pattern
 * @param params - The parameter names to clean
 * @param config - The robots.txt configuration (optional)
 * @returns Updated robots.txt configuration
 *
 * @example
 * const config = addCleanParam('/products/*', ['utm_source', 'utm_medium']);
 */
export function addCleanParam(
  path: string,
  params: string[],
  config: RobotsTxtConfig = robotsTxtConfig
): RobotsTxtConfig {
  const newConfig = { ...config };
  newConfig.cleanParams = [...config.cleanParams, { path, params }];
  return newConfig;
}

/**
 * Removes a clean-param rule
 * @param path - The URL path pattern to remove
 * @param config - The robots.txt configuration (optional)
 * @returns Updated robots.txt configuration
 *
 * @example
 * const config = removeCleanParam('/products/*');
 */
export function removeCleanParam(
  path: string,
  config: RobotsTxtConfig = robotsTxtConfig
): RobotsTxtConfig {
  const newConfig = { ...config };
  newConfig.cleanParams = config.cleanParams.filter((rule) => rule.path !== path);
  return newConfig;
}

/**
 * Adds a disallow rule for a specific user agent
 * @param userAgent - The user agent
 * @param path - The path to disallow
 * @param config - The robots.txt configuration (optional)
 * @returns Updated robots.txt configuration
 *
 * @example
 * const config = addDisallow('Googlebot', '/admin/*');
 */
export function addDisallow(
  userAgent: string,
  path: string,
  config: RobotsTxtConfig = robotsTxtConfig
): RobotsTxtConfig {
  const newConfig = { ...config };
  const agentIndex = newConfig.userAgents.findIndex((ua) => ua.userAgent === userAgent);

  if (agentIndex >= 0) {
    const agent = newConfig.userAgents[agentIndex];
    if (!agent.disallow) {
      agent.disallow = [];
    }
    if (!agent.disallow.includes(path)) {
      agent.disallow.push(path);
    }
  } else {
    newConfig.userAgents.push({
      userAgent,
      allow: [],
      disallow: [path],
    });
  }

  return newConfig;
}

/**
 * Removes a disallow rule for a specific user agent
 * @param userAgent - The user agent
 * @param path - The path to allow
 * @param config - The robots.txt configuration (optional)
 * @returns Updated robots.txt configuration
 *
 * @example
 * const config = removeDisallow('Googlebot', '/admin/*');
 */
export function removeDisallow(
  userAgent: string,
  path: string,
  config: RobotsTxtConfig = robotsTxtConfig
): RobotsTxtConfig {
  const newConfig = { ...config };
  const agentIndex = newConfig.userAgents.findIndex((ua) => ua.userAgent === userAgent);

  if (agentIndex >= 0) {
    const agent = newConfig.userAgents[agentIndex];
    if (agent.disallow) {
      agent.disallow = agent.disallow.filter((p) => p !== path);
    }
  }

  return newConfig;
}

/**
 * Validates a robots.txt configuration
 * @param config - The robots.txt configuration to validate
 * @returns True if the configuration is valid, false otherwise
 *
 * @example
 * const isValid = validateRobotsTxtConfig(config);
 */
export function validateRobotsTxtConfig(config: RobotsTxtConfig): boolean {
  if (!config || typeof config !== 'object') {
    return false;
  }

  // Check user agents
  if (!config.userAgents || config.userAgents.length === 0) {
    return false;
  }

  for (const userAgent of config.userAgents) {
    if (!userAgent.userAgent || typeof userAgent.userAgent !== 'string') {
      return false;
    }

    // Check allow paths
    if (userAgent.allow) {
      for (const path of userAgent.allow) {
        if (typeof path !== 'string' || !path.startsWith('/')) {
          return false;
        }
      }
    }

    // Check disallow paths
    if (userAgent.disallow) {
      for (const path of userAgent.disallow) {
        if (typeof path !== 'string' || !path.startsWith('/')) {
          return false;
        }
      }
    }

    // Check crawl delay
    if (userAgent.crawlDelay !== undefined) {
      if (typeof userAgent.crawlDelay !== 'number' || userAgent.crawlDelay < 0) {
        return false;
      }
    }
  }

  // Check sitemaps
  if (config.sitemaps) {
    for (const sitemap of config.sitemaps) {
      if (typeof sitemap !== 'string' || !sitemap.startsWith('http')) {
        return false;
      }
    }
  }

  // Check clean params
  if (config.cleanParams) {
    for (const rule of config.cleanParams) {
      if (!rule.path || typeof rule.path !== 'string') {
        return false;
      }
      if (!rule.params || rule.params.length === 0) {
        return false;
      }
    }
  }

  return true;
}
