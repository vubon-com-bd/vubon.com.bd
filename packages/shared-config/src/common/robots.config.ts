/**
 * Robots Configuration
 * রোবটস কনফিগারেশন
 */
export interface RobotsConfig {
  enabled: boolean;
  userAgents: {
    name: string;
    allow: string[];
    disallow: string[];
    crawlDelay: number;
  }[];
  sitemaps: string[];
  rules: {
    allow: string[];
    disallow: string[];
  };
}

export const createRobotsConfig = (): RobotsConfig => ({
  enabled: true,
  userAgents: [
    {
      name: '*',
      allow: ['/'],
      disallow: ['/admin/*', '/dashboard/*', '/profile/*', '/api/*', '/auth/*'],
      crawlDelay: 1,
    },
    {
      name: 'Googlebot',
      allow: ['/'],
      disallow: ['/admin/*', '/dashboard/*', '/profile/*', '/api/*'],
      crawlDelay: 1,
    },
  ],
  sitemaps: ['https://vubon.com.bd/sitemap.xml'],
  rules: {
    allow: ['/'],
    disallow: ['/admin/*', '/dashboard/*', '/profile/*', '/api/*', '/auth/*'],
  },
});
