/**
 * SEO-related type definitions for the monorepo
 * All SEO types are centralized here for consistent metadata and structured data handling
 */

/**
 * Meta tag interface
 * Represents a single HTML meta tag
 */
export interface MetaTag {
  /** Name of the meta tag */
  name?: string;
  /** Property of the meta tag (for Open Graph) */
  property?: string;
  /** HTTP-equiv attribute */
  httpEquiv?: string;
  /** Content of the meta tag */
  content: string;
  /** Character set */
  charset?: string;
}

/**
 * Open Graph meta tags interface
 * Open Graph protocol metadata for social sharing
 */
export interface OpenGraphTags {
  /** The title of your object as it should appear within the graph */
  ogTitle?: string;
  /** The type of your object (e.g., 'website', 'article', 'product') */
  ogType?: 'website' | 'article' | 'product' | 'profile' | 'book' | 'music.song' | 'video.movie';
  /** The canonical URL of your object */
  ogUrl?: string;
  /** The image URL for your object */
  ogImage?: string | OpenGraphImage[];
  /** A one to two sentence description of your object */
  ogDescription?: string;
  /** The locale of the resource (e.g., 'en_US', 'bn_BD') */
  ogLocale?: string;
  /** An array of locales the resource is available in */
  ogLocaleAlternate?: string[];
  /** The name of your site */
  ogSiteName?: string;
  /** If your object is part of a larger web site, the name which should be displayed for the overall site */
  ogSiteNameShort?: string;
  /** The audio file URL to accompany this object */
  ogAudio?: string | OpenGraphAudio[];
  /** The video file URL to accompany this object */
  ogVideo?: string | OpenGraphVideo[];
  /** The determiner to be used for the title (e.g., 'a', 'an', 'the', '') */
  ogDeterminer?: 'a' | 'an' | 'the' | '';
  /** The time when the article was first published */
  articlePublishedTime?: string;
  /** The time when the article was last modified */
  articleModifiedTime?: string;
  /** The time when the article was first published in the user's timezone */
  articlePublishedTimeTimezone?: string;
  /** The section of the article */
  articleSection?: string;
  /** The tags for the article */
  articleTags?: string[];
  /** The authors of the article */
  articleAuthors?: string[];
  /** The product price */
  productPrice?: string;
  /** The product currency */
  productCurrency?: string;
  /** The product availability */
  productAvailability?: 'in_stock' | 'out_of_stock' | 'preorder' | 'available_for_order';
  /** The product brand */
  productBrand?: string;
  /** The product condition */
  productCondition?: 'new' | 'refurbished' | 'used';
  /** The product SKU */
  productSku?: string;
  /** The product category */
  productCategory?: string;
}

/**
 * Open Graph image interface
 * Represents an Open Graph image
 */
export interface OpenGraphImage {
  /** The image URL */
  url: string;
  /** The image width in pixels */
  width?: number;
  /** The image height in pixels */
  height?: number;
  /** The image alt text */
  alt?: string;
  /** The image type (e.g., 'image/jpeg') */
  type?: string;
  /** The image secure URL (HTTPS) */
  secureUrl?: string;
}

/**
 * Open Graph audio interface
 * Represents an Open Graph audio file
 */
export interface OpenGraphAudio {
  /** The audio URL */
  url: string;
  /** The audio type (e.g., 'audio/mpeg') */
  type?: string;
  /** The audio secure URL (HTTPS) */
  secureUrl?: string;
}

/**
 * Open Graph video interface
 * Represents an Open Graph video file
 */
export interface OpenGraphVideo {
  /** The video URL */
  url: string;
  /** The video width in pixels */
  width?: number;
  /** The video height in pixels */
  height?: number;
  /** The video type (e.g., 'video/mp4') */
  type?: string;
  /** The video secure URL (HTTPS) */
  secureUrl?: string;
}

/**
 * Twitter Card meta tags interface
 * Twitter Card metadata for Twitter sharing
 */
export interface TwitterCardTags {
  /** Twitter card type */
  card:
    | 'summary'
    | 'summary_large_image'
    | 'app'
    | 'player'
    | 'summary_large_image_app'
    | 'summary_app';
  /** Twitter site handle (e.g., '@username') */
  site?: string;
  /** Twitter site ID */
  siteId?: string;
  /** Twitter creator handle (e.g., '@username') */
  creator?: string;
  /** Twitter creator ID */
  creatorId?: string;
  /** Twitter card title */
  title?: string;
  /** Twitter card description */
  description?: string;
  /** Twitter card image URL */
  image?: string;
  /** Twitter card image alt text */
  imageAlt?: string;
  /** Twitter app name for iPhone */
  appNameIphone?: string;
  /** Twitter app ID for iPhone */
  appIdIphone?: string;
  /** Twitter app URL for iPhone */
  appUrlIphone?: string;
  /** Twitter app name for iPad */
  appNameIpad?: string;
  /** Twitter app ID for iPad */
  appIdIpad?: string;
  /** Twitter app URL for iPad */
  appUrlIpad?: string;
  /** Twitter app name for Google Play */
  appNameGooglePlay?: string;
  /** Twitter app ID for Google Play */
  appIdGooglePlay?: string;
  /** Twitter app URL for Google Play */
  appUrlGooglePlay?: string;
  /** Twitter player URL */
  player?: string;
  /** Twitter player width */
  playerWidth?: number;
  /** Twitter player height */
  playerHeight?: number;
  /** Twitter player stream URL */
  playerStream?: string;
}

/**
 * JSON-LD structured data interface
 * Schema.org structured data for search engines
 */
export interface JsonLdData {
  /** Schema.org context */
  '@context': 'https://schema.org';
  /** Schema.org type */
  '@type': string;
  /** Schema.org ID */
  '@id'?: string;
  /** Additional schema properties */
  [key: string]: unknown;
}

/**
 * SEO data interface
 * Complete SEO data for a page
 */
export interface SeoData {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Page canonical URL */
  canonical?: string;
  /** Page keywords */
  keywords?: string[];
  /** Robots meta directives */
  robots?: string | RobotsDirectives;
  /** Meta tags */
  metaTags?: MetaTag[];
  /** Open Graph tags */
  openGraph?: OpenGraphTags;
  /** Twitter Card tags */
  twitterCard?: TwitterCardTags;
  /** JSON-LD structured data */
  jsonLd?: JsonLdData | JsonLdData[];
  /** Alternate language URLs */
  alternates?: AlternateLink[];
  /** Viewport settings */
  viewport?: string;
  /** Theme color */
  themeColor?: string;
  /** Verification tokens (Google, Bing, etc.) */
  verification?: VerificationTags;
}

/**
 * Robots directives interface
 * Robots meta tag directives
 */
export interface RobotsDirectives {
  /** Whether to index the page */
  index?: boolean;
  /** Whether to follow links on the page */
  follow?: boolean;
  /** Whether to allow indexing of images */
  imageIndex?: boolean;
  /** Whether to allow archive/caching */
  archive?: boolean;
  /** Whether to allow snippet in search results */
  snippet?: boolean;
  /** Whether to allow ODP/Open Directory Project listing */
  odp?: boolean;
  /** Whether to allow translation */
  translate?: boolean;
  /** Max snippet length in characters */
  maxSnippet?: number;
  /** Max image preview size */
  maxImagePreview?: 'none' | 'standard' | 'large';
  /** Max video preview seconds */
  maxVideoPreview?: number;
  /** Whether to allow site links search box */
  siteLinksSearchBox?: boolean;
  /** Whether to allow Google Site Search */
  googleSiteSearch?: boolean;
  /** Whether to allow Google Adsense */
  googleAdsense?: boolean;
}

/**
 * Alternate link interface
 * Alternate language or device URLs
 */
export interface AlternateLink {
  /** The URL of the alternate page */
  href: string;
  /** The language code (e.g., 'en', 'bn') */
  hreflang?: string;
  /** The media type (e.g., 'only screen and (max-width: 640px)') */
  media?: string;
  /** The type of alternate (e.g., 'amphtml', 'mobile') */
  type?: 'amphtml' | 'mobile' | 'pwa';
}

/**
 * Verification tags interface
 * Verification tokens for search engines and services
 */
export interface VerificationTags {
  /** Google Search Console verification */
  google?: string;
  /** Bing Webmaster Tools verification */
  bing?: string;
  /** Yandex Webmaster verification */
  yandex?: string;
  /** Alexa verification */
  alexa?: string;
  /** Pinterest verification */
  pinterest?: string;
  /** Facebook Domain Verification */
  facebook?: string;
  /** Google Tag Manager ID */
  gtm?: string;
  /** Google Analytics ID */
  ga?: string;
}

/**
 * Breadcrumb item interface
 * Breadcrumb structured data
 */
export interface BreadcrumbItem {
  /** The name of the breadcrumb */
  name: string;
  /** The URL of the breadcrumb */
  url: string;
  /** The position in the breadcrumb list */
  position: number;
}

/**
 * Sitemap interface
 * Sitemap configuration for SEO
 */
export interface SitemapConfig {
  /** The URL of the page */
  url: string;
  /** The last modified date */
  lastModified?: Date;
  /** The change frequency */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** The priority (0.0 to 1.0) */
  priority?: number;
  /** Additional images in the sitemap */
  images?: SitemapImage[];
}

/**
 * Sitemap image interface
 * Image entry in sitemap
 */
export interface SitemapImage {
  /** The image URL */
  url: string;
  /** The image caption */
  caption?: string;
  /** The image title */
  title?: string;
  /** The image geolocation */
  geoLocation?: string;
  /** The image license */
  license?: string;
}

/**
 * SEO metadata interface
 * SEO metadata for content items
 */
export interface SeoMetadata {
  /** SEO title (separate from page title) */
  seoTitle?: string;
  /** SEO description */
  seoDescription?: string;
  /** SEO keywords */
  seoKeywords?: string[];
  /** SEO canonical URL */
  seoCanonical?: string;
  /** SEO image URL */
  seoImage?: string;
  /** SEO image alt text */
  seoImageAlt?: string;
  /** Focus keyphrase */
  focusKeyphrase?: string;
  /** SEO score (0-100) */
  seoScore?: number;
  /** Readability score (0-100) */
  readabilityScore?: number;
}

/**
 * SEO configuration interface
 * Configuration for SEO
 */
export interface SeoConfig {
  /** Default site title */
  defaultTitle: string;
  /** Default site description */
  defaultDescription: string;
  /** Default site image */
  defaultImage: string;
  /** Site name */
  siteName: string;
  /** Site URL */
  siteUrl: string;
  /** Site locale */
  locale: string;
  /** Twitter handle */
  twitterHandle?: string;
  /** Facebook app ID */
  facebookAppId?: string;
  /** Google Analytics ID */
  googleAnalyticsId?: string;
  /** Google Tag Manager ID */
  googleTagManagerId?: string;
  /** Whether to enable structured data */
  enableStructuredData: boolean;
  /** Whether to enable Open Graph */
  enableOpenGraph: boolean;
  /** Whether to enable Twitter Cards */
  enableTwitterCards: boolean;
  /** Whether to generate sitemap */
  generateSitemap: boolean;
}

/**
 * SEO analysis result interface
 * Result of SEO analysis for content
 */
export interface SeoAnalysisResult {
  /** SEO score (0-100) */
  score: number;
  /** SEO issues found */
  issues: SeoIssue[];
  /** SEO suggestions */
  suggestions: string[];
  /** Readability score (0-100) */
  readabilityScore: number;
  /** Readability issues */
  readabilityIssues: string[];
  /** Keyphrase density */
  keyphraseDensity: number;
  /** Keyphrase positions */
  keyphrasePositions: string[];
}

/**
 * SEO issue interface
 * Individual SEO issue
 */
export interface SeoIssue {
  /** Issue type */
  type: 'error' | 'warning' | 'suggestion';
  /** Issue message */
  message: string;
  /** Issue field */
  field?: string;
  /** Suggested fix */
  fix?: string;
}

/**
 * SEO event interface
 * Used for SEO-related events
 */
export interface SeoEvent {
  /** Type of SEO event */
  type: 'analyzed' | 'generated' | 'updated' | 'validated';
  /** Page URL */
  url: string;
  /** Additional data */
  data: {
    success: boolean;
    score?: number;
    issues?: SeoIssue[];
    metadata?: Record<string, unknown>;
  };
  /** Timestamp of the event */
  timestamp: Date;
}
