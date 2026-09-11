export interface SEORobotsRules {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
  sitemap?: string;
}

export const generateSEORobotsTxt = (rules: SEORobotsRules): string => {
  let txt = `User-agent: ${rules.userAgent}\n`;
  for (const path of rules.allow) {
    txt += `Allow: ${path}\n`;
  }
  for (const path of rules.disallow) {
    txt += `Disallow: ${path}\n`;
  }
  if (rules.crawlDelay) {
    txt += `Crawl-delay: ${rules.crawlDelay}\n`;
  }
  if (rules.sitemap) {
    txt += `Sitemap: ${rules.sitemap}\n`;
  }
  return txt;
};
