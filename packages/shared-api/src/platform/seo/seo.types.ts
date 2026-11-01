export interface SeoMeta {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
}

export interface SitemapEntry {
  readonly url: string;
  readonly lastModified: string;
  readonly changeFrequency?: string;
  readonly priority?: number;
}

export interface RobotsConfig {
  readonly rules: readonly {
    readonly userAgent: string;
    readonly allow?: readonly string[];
    readonly disallow?: readonly string[];
  }[];
  readonly sitemaps: readonly string[];
}
