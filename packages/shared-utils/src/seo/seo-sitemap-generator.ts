export interface SEOSitemapInput {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

export interface SEOSitemapData {
  sitemapId: string;
  seoId: string;
  type: string;
  url: string;
  changeFrequency: string;
  priority: number;
  lastModified: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const generateSEOSitemap = (urls: SEOSitemapInput[]): SEOSitemapData[] => {
  return urls.map((url) => ({
    sitemapId: crypto.randomUUID(),
    seoId: '',
    type: 'xml',
    url: url.url,
    changeFrequency: url.changeFrequency,
    priority: url.priority,
    lastModified: url.lastModified,
    isActive: true,
    metadata: {},
  }));
};

export const generateSEOSitemapXML = (sitemaps: SEOSitemapData[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const sitemap of sitemaps) {
    xml += '  <url>\n';
    xml += `    <loc>${sitemap.url}</loc>\n`;
    xml += `    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${sitemap.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${sitemap.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
};
