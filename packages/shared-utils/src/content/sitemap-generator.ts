export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    xml += `    <lastmod>${url.lastModified.toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${url.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
};
