import { httpClient } from '../../common/client/client.factory';
import { SEO_ENDPOINTS } from './seo.endpoints';
import type { RobotsConfig, SeoMeta, SitemapEntry } from './seo.types';

export const seoApi = {
  get: async (path: string, signal?: AbortSignal): Promise<SeoMeta> => {
    const res = await httpClient.get<SeoMeta>(SEO_ENDPOINTS.get(path), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  sitemap: async (signal?: AbortSignal): Promise<readonly SitemapEntry[]> => {
    const res = await httpClient.get<readonly SitemapEntry[]>(SEO_ENDPOINTS.sitemap, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },

  robots: async (signal?: AbortSignal): Promise<RobotsConfig> => {
    const res = await httpClient.get<RobotsConfig>(SEO_ENDPOINTS.robots, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
