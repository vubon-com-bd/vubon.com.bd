/**
 * Sitemap সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * Sitemap পরিবর্তন ফ্রিকোয়েন্সি
 */
export const SITEMAP_CHANGE_FREQUENCIES = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
] as const;

/**
 * ডিফল্ট পরিবর্তন ফ্রিকোয়েন্সি
 */
export const DEFAULT_CHANGE_FREQUENCY = 'weekly' as const;

/**
 * ডিফল্ট প্রায়োরিটি
 */
export const DEFAULT_PRIORITY = 0.5;

/**
 * Sitemap এ সর্বোচ্চ URL সংখ্যা
 */
export const MAX_SITEMAP_URLS = 50000;

/**
 * Sitemap ইন্ডেক্স পাথ
 */
export const SITEMAP_INDEX_PATH = '/sitemap-index.xml' as const;

/**
 * Sitemap পরিবর্তন ফ্রিকোয়েন্সি টাইপ
 */
export type SitemapChangeFrequency = (typeof SITEMAP_CHANGE_FREQUENCIES)[number];

/**
 * Sitemap URL ইন্টারফেস
 */
export interface SitemapUrl {
  loc: string;
  lastmod?: Date;
  changefreq?: SitemapChangeFrequency;
  priority?: number;
}

/**
 * Sitemap URL সেট ইন্টারফেস
 */
export interface SitemapUrlSet {
  urls: SitemapUrl[];
  xmlns?: string;
}

/**
 * Sitemap ইন্ডেক্স ইন্টারফেস
 */
export interface SitemapIndex {
  sitemaps: SitemapInfo[];
}

/**
 * Sitemap তথ্য ইন্টারফেস
 */
export interface SitemapInfo {
  loc: string;
  lastmod?: Date;
}

/**
 * Sitemap পরিবর্তন ফ্রিকোয়েন্সি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSitemapChangeFrequency(
  frequency: string
): frequency is SitemapChangeFrequency {
  return SITEMAP_CHANGE_FREQUENCIES.includes(frequency as SitemapChangeFrequency);
}

/**
 * Sitemap URL প্রায়োরিটি বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSitemapPriority(priority: number): boolean {
  return priority >= 0 && priority <= 1;
}

/**
 * Sitemap URL তৈরির ফাংশন
 */
export function createSitemapUrl(
  loc: string,
  options?: {
    lastmod?: Date;
    changefreq?: SitemapChangeFrequency;
    priority?: number;
  }
): SitemapUrl {
  const url: SitemapUrl = {
    loc,
  };

  if (options?.lastmod) {
    url.lastmod = options.lastmod;
  }

  if (options?.changefreq && isValidSitemapChangeFrequency(options.changefreq)) {
    url.changefreq = options.changefreq;
  }

  if (options?.priority && isValidSitemapPriority(options.priority)) {
    url.priority = options.priority;
  }

  return url;
}

/**
 * Sitemap URL সেট তৈরির ফাংশন
 */
export function createSitemapUrlSet(urls: SitemapUrl[], xmlns?: string): SitemapUrlSet {
  return {
    urls,
    xmlns: xmlns || 'http://www.sitemaps.org/schemas/sitemap/0.9',
  };
}

/**
 * Sitemap ইন্ডেক্স তৈরির ফাংশন
 */
export function createSitemapIndex(sitemaps: SitemapInfo[]): SitemapIndex {
  return {
    sitemaps,
  };
}

/**
 * Sitemap XML তৈরির ফাংশন
 */
export function generateSitemapXml(urlSet: SitemapUrlSet): string {
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(`<urlset xmlns="${urlSet.xmlns || 'http://www.sitemaps.org/schemas/sitemap/0.9'}">`);

  urlSet.urls.forEach((url) => {
    lines.push('  <url>');
    lines.push(`    <loc>${url.loc}</loc>`);

    if (url.lastmod) {
      const lastmod = url.lastmod.toISOString().split('T')[0];
      lines.push(`    <lastmod>${lastmod}</lastmod>`);
    }

    if (url.changefreq) {
      lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
    }

    if (url.priority !== undefined) {
      lines.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
    }

    lines.push('  </url>');
  });

  lines.push('</urlset>');
  return lines.join('\n');
}

/**
 * Sitemap ইন্ডেক্স XML তৈরির ফাংশন
 */
export function generateSitemapIndexXml(index: SitemapIndex): string {
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  index.sitemaps.forEach((sitemap) => {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${sitemap.loc}</loc>`);

    if (sitemap.lastmod) {
      const lastmod = sitemap.lastmod.toISOString().split('T')[0];
      lines.push(`    <lastmod>${lastmod}</lastmod>`);
    }

    lines.push('  </sitemap>');
  });

  lines.push('</sitemapindex>');
  return lines.join('\n');
}

/**
 * ডিফল্ট Sitemap URL তৈরির ফাংশন
 */
export function getDefaultSitemapUrl(loc: string): SitemapUrl {
  return {
    loc,
    changefreq: DEFAULT_CHANGE_FREQUENCY,
    priority: DEFAULT_PRIORITY,
  };
}

/**
 * ডিফল্ট Sitemap URL সেট তৈরির ফাংশন
 */
export function getDefaultSitemapUrlSet(urls: string[]): SitemapUrlSet {
  const sitemapUrls = urls.map((url) => getDefaultSitemapUrl(url));
  return createSitemapUrlSet(sitemapUrls);
}

/**
 * Sitemap URL গুলো বৈধ কিনা চেক করার ফাংশন
 */
export function areSitemapUrlsValid(urls: SitemapUrl[]): boolean {
  if (urls.length > MAX_SITEMAP_URLS) {
    return false;
  }

  return urls.every((url) => {
    if (!url.loc || typeof url.loc !== 'string') {
      return false;
    }
    if (url.priority !== undefined && !isValidSitemapPriority(url.priority)) {
      return false;
    }
    if (url.changefreq && !isValidSitemapChangeFrequency(url.changefreq)) {
      return false;
    }
    return true;
  });
}

/**
 * সব Sitemap পরিবর্তন ফ্রিকোয়েন্সি পাওয়ার ফাংশন
 */
export function getAllSitemapChangeFrequencies(): readonly SitemapChangeFrequency[] {
  return SITEMAP_CHANGE_FREQUENCIES;
}

/**
 * ডিফল্ট Sitemap পরিবর্তন ফ্রিকোয়েন্সি পাওয়ার ফাংশন
 */
export function getDefaultSitemapChangeFrequency(): SitemapChangeFrequency {
  return DEFAULT_CHANGE_FREQUENCY;
}

/**
 * Sitemap URL প্রায়োরিটি স্বাভাবিক করার ফাংশন
 */
export function normalizeSitemapPriority(priority: number): number {
  if (priority < 0) return 0;
  if (priority > 1) return 1;
  return Math.round(priority * 10) / 10;
}
