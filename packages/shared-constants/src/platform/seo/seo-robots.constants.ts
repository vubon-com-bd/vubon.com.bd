export const SEO_ROBOTS_DIRECTIVE = {
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
} as const;

export const SEO_ROBOTS_USER_AGENT = {
  ALL: '*',
  GOOGLEBOT: 'Googlebot',
  BINGBOT: 'Bingbot',
  YANDEXBOT: 'YandexBot',
  DUCKDUCKBOT: 'DuckDuckBot',
  BAIDUSPIDER: 'Baiduspider',
  FACEBOOKBOT: 'facebookexternalhit',
  TWITTERBOT: 'Twitterbot',
} as const;

export const SEO_ROBOTS = {
  ALLOW_ALL_DEFAULT: true,
  DISALLOW_ADMIN: true,
  DISALLOW_API: true,
  DISALLOW_CART: true,
  DISALLOW_CHECKOUT: true,
  DISALLOW_SEARCH: false,
  CRAWL_DELAY: 1,
  SITEMAP_URL: '/sitemap.xml',
} as const;

export type SeoRobotsDirectiveType =
  (typeof SEO_ROBOTS_DIRECTIVE)[keyof typeof SEO_ROBOTS_DIRECTIVE];
export type SeoRobotsUserAgentType =
  (typeof SEO_ROBOTS_USER_AGENT)[keyof typeof SEO_ROBOTS_USER_AGENT];
