/**
 * SEO Types - Pure TypeScript type contracts for SEO
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/common/seo.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO SEO generation logic, meta tag rendering
 * ✅ NO functions, classes, enums
 * ✅ NO framework imports
 * ✅ Readonly modifiers for immutability
 */

// ============================================================
// Meta Tag Types
// ============================================================
export interface MetaTag {
  readonly name: string;
  readonly content: string;
  readonly property?: string;        // For Open Graph
  readonly httpEquiv?: string;       // For X-UA-Compatible, refresh, etc.
  readonly charset?: string;         // For character set
  readonly lang?: string;            // Language attribute
}

// ============================================================
// Open Graph Tags (Facebook, LinkedIn, etc.)
// ============================================================
export interface OpenGraphTags {
  readonly title?: string;
  readonly description?: string;
  readonly url?: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
  readonly type?: OgType;
  readonly siteName?: string;
  readonly locale?: string;
  readonly alternateLocales?: readonly string[];
  readonly seeAlso?: readonly string[];
  readonly video?: string;
  readonly audio?: string;
  readonly determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  
  // Bangladesh specific
  readonly localeAlternate?: {
    readonly 'bn_BD'?: string;      // Bengali (Bangladesh)
  };
}

// ============================================================
// Open Graph Types
// ============================================================
export type OgType = 
  | 'website'
  | 'article'
  | 'product'
  | 'profile'
  | 'book'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station';

// ============================================================
// Twitter Card Tags
// ============================================================
export interface TwitterCardTags {
  readonly card: TwitterCardType;
  readonly site?: string;            // Twitter username of website
  readonly creator?: string;         // Twitter username of content creator
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly player?: string;          // Video player URL
  readonly playerWidth?: number;
  readonly playerHeight?: number;
  readonly playerStream?: string;     // Live stream URL
  readonly appCountry?: string;
  readonly appNameIphone?: string;
  readonly appIdIphone?: string;
  readonly appUrlIphone?: string;
  readonly appNameIpad?: string;
  readonly appIdIpad?: string;
  readonly appUrlIpad?: string;
  readonly appNameGoogleplay?: string;
  readonly appIdGoogleplay?: string;
  readonly appUrlGoogleplay?: string;
  readonly label1?: string;           // Extra label for product
  readonly data1?: string;            // Extra data for product
  readonly label2?: string;
  readonly data2?: string;
}

// ============================================================
// Twitter Card Types
// ============================================================
export type TwitterCardType = 
  | 'summary'
  | 'summary_large_image'
  | 'app'
  | 'player'
  | 'product';                       // E-commerce specific

// ============================================================
// Structured Data (Schema.org) - Discriminated Union
// ============================================================
export type StructuredData = 
  | ProductStructuredData
  | ArticleStructuredData
  | BreadcrumbStructuredData
  | OrganizationStructuredData
  | PersonStructuredData
  | OfferStructuredData
  | ReviewStructuredData
  | FAQStructuredData
  | HowToStructuredData
  | LocalBusinessStructuredData    // Bangladesh specific
  | MerchantStructuredData;        // For sellers/vendors

// ============================================================
// Product Structured Data (E-commerce core)
// ============================================================
export interface ProductStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Product';
  readonly name: string;
  readonly description: string;
  readonly image: readonly string[];
  readonly sku?: string;
  readonly mpn?: string;
  readonly gtin8?: string;
  readonly gtin13?: string;
  readonly gtin14?: string;
  readonly brand?: {
    readonly '@type': 'Brand';
    readonly name: string;
    readonly logo?: string;
  };
  readonly offers?: OfferStructuredData | readonly OfferStructuredData[];
  readonly aggregateRating?: {
    readonly '@type': 'AggregateRating';
    readonly ratingValue: number;
    readonly reviewCount: number;
    readonly bestRating?: number;
    readonly worstRating?: number;
  };
  readonly review?: readonly ReviewStructuredData[];
  readonly category?: string;
  readonly productID?: string;
  readonly material?: string;
  readonly color?: string;
  readonly weight?: {
    readonly '@type': 'QuantitativeValue';
    readonly value: number;
    readonly unitCode: string;
  };
  readonly releaseDate?: string;
  readonly manufacturer?: {
    readonly '@type': 'Organization';
    readonly name: string;
  };
}

// ============================================================
// Offer Structured Data
// ============================================================
export interface OfferStructuredData {
  readonly '@type': 'Offer';
  readonly price: number;
  readonly priceCurrency: string;      // 'BDT' for Bangladesh
  readonly priceSpecification?: {
    readonly '@type': 'PriceSpecification';
    readonly price: number;
    readonly priceCurrency: string;
  };
  readonly availability: OfferAvailability;
  readonly url?: string;
  readonly validFrom?: string;
  readonly priceValidUntil?: string;
  readonly itemCondition?: OfferItemCondition;
  readonly shippingDetails?: {
    readonly '@type': 'OfferShippingDetails';
    readonly shippingRate?: {
      readonly '@type': 'MonetaryAmount';
      readonly value: number;
      readonly currency: string;
    };
    readonly shippingDestination?: {
      readonly '@type': 'DefinedRegion';
      readonly addressCountry: string;
    };
  };
  readonly hasMerchantReturnPolicy?: {
    readonly '@type': 'MerchantReturnPolicy';
    readonly applicableCountry: string;
    readonly returnPolicyCategory: 'MerchantReturnFiniteReturnWindow' | 'MerchantReturnNotPermitted';
    readonly returnDays?: number;
  };
}

// ============================================================
// Offer Availability Types
// ============================================================
export type OfferAvailability = 
  | 'InStock'
  | 'OutOfStock'
  | 'PreOrder'
  | 'BackOrder'
  | 'Discontinued'
  | 'InStoreOnly'
  | 'LimitedAvailability'
  | 'OnlineOnly';

// ============================================================
// Offer Item Condition Types
// ============================================================
export type OfferItemCondition = 
  | 'NewCondition'
  | 'UsedCondition'
  | 'RefurbishedCondition'
  | 'DamagedCondition';

// ============================================================
// Article Structured Data
// ============================================================
export interface ArticleStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Article';
  readonly headline: string;
  readonly description: string;
  readonly image: readonly string[];
  readonly datePublished: string;
  readonly dateModified: string;
  readonly author: PersonStructuredData | OrganizationStructuredData;
  readonly publisher: OrganizationStructuredData;
  readonly mainEntityOfPage?: string;
  readonly keywords?: string;
  readonly articleSection?: string;
  readonly wordCount?: number;
  readonly timeRequired?: string;
}

// ============================================================
// Breadcrumb Structured Data
// ============================================================
export interface BreadcrumbStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'BreadcrumbList';
  readonly itemListElement: readonly {
    readonly '@type': 'ListItem';
    readonly position: number;
    readonly name: string;
    readonly item: string;
  }[];
}

// ============================================================
// Organization Structured Data
// ============================================================
export interface OrganizationStructuredData {
  readonly '@type': 'Organization';
  readonly name: string;
  readonly url: string;
  readonly logo: string;
  readonly sameAs?: readonly string[];
  readonly contactPoint?: {
    readonly '@type': 'ContactPoint';
    readonly telephone: string;
    readonly contactType: string;
    readonly email?: string;
    readonly areaServed?: string;
    readonly availableLanguage?: readonly string[];
  };
  readonly address?: {
    readonly '@type': 'PostalAddress';
    readonly streetAddress: string;
    readonly addressLocality: string;
    readonly addressRegion?: string;
    readonly postalCode: string;
    readonly addressCountry: string;
  };
}

// ============================================================
// Person Structured Data
// ============================================================
export interface PersonStructuredData {
  readonly '@type': 'Person';
  readonly name: string;
  readonly url?: string;
  readonly email?: string;
  readonly sameAs?: readonly string[];
  readonly jobTitle?: string;
  readonly affiliation?: {
    readonly '@type': 'Organization';
    readonly name: string;
  };
}

// ============================================================
// Review Structured Data
// ============================================================
export interface ReviewStructuredData {
  readonly '@type': 'Review';
  readonly reviewRating: {
    readonly '@type': 'Rating';
    readonly ratingValue: number;
    readonly bestRating: number;
    readonly worstRating?: number;
  };
  readonly author: PersonStructuredData;
  readonly datePublished: string;
  readonly reviewBody: string;
  readonly name?: string;
  readonly publisher?: OrganizationStructuredData;
}

// ============================================================
// FAQ Structured Data
// ============================================================
export interface FAQStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'FAQPage';
  readonly mainEntity: readonly {
    readonly '@type': 'Question';
    readonly name: string;
    readonly acceptedAnswer: {
      readonly '@type': 'Answer';
      readonly text: string;
    };
  }[];
}

// ============================================================
// HowTo Structured Data
// ============================================================
export interface HowToStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'HowTo';
  readonly name: string;
  readonly description: string;
  readonly totalTime?: string;
  readonly step: readonly {
    readonly '@type': 'HowToStep';
    readonly name: string;
    readonly text: string;
    readonly image?: string;
    readonly url?: string;
  }[];
  readonly estimatedCost?: {
    readonly '@type': 'MonetaryAmount';
    readonly value: number;
    readonly currency: string;
  };
}

// ============================================================
// Local Business Structured Data (Bangladesh specific)
// ============================================================
export interface LocalBusinessStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'LocalBusiness';
  readonly name: string;
  readonly description: string;
  readonly image: readonly string[];
  readonly address: {
    readonly '@type': 'PostalAddress';
    readonly streetAddress: string;
    readonly addressLocality: string;
    readonly addressRegion: string;      // Division/District
    readonly postalCode: string;
    readonly addressCountry: 'BD';
  };
  readonly geo: {
    readonly '@type': 'GeoCoordinates';
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly openingHours: readonly string[];
  readonly telephone: string;
  readonly email: string;
  readonly priceRange: string;           // e.g., '৳৳'
}

// ============================================================
// Merchant Structured Data (For sellers/vendors)
// ============================================================
export interface MerchantStructuredData {
  readonly '@context': 'https://schema.org';
  readonly '@type': 'Merchant';
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly logo: string;
  readonly rating?: {
    readonly '@type': 'AggregateRating';
    readonly ratingValue: number;
    readonly reviewCount: number;
  };
  readonly makesOffer: readonly ProductStructuredData[];
}

// ============================================================
// SEO Metadata for Pages
// ============================================================
export interface SEOMetadata {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly robots?: readonly RobotDirective[];
  readonly metaTags?: readonly MetaTag[];
  readonly openGraph?: OpenGraphTags;
  readonly twitterCard?: TwitterCardTags;
  readonly structuredData?: readonly StructuredData[];
  readonly alternateLanguages?: readonly {
    readonly hreflang: string;
    readonly href: string;
  }[];
  readonly noIndex?: boolean;
  readonly noFollow?: boolean;
  readonly noArchive?: boolean;
  readonly noSnippet?: boolean;
  readonly noImageIndex?: boolean;
  
  // Bangladesh specific
  readonly banglaTitle?: string;
  readonly banglaDescription?: string;
  readonly regionSpecific?: 'dhaka' | 'chittagong' | 'others';
}

// ============================================================
// Robot Directives
// ============================================================
export type RobotDirective = 
  | 'index'
  | 'noindex'
  | 'follow'
  | 'nofollow'
  | 'noarchive'
  | 'nosnippet'
  | 'noimageindex'
  | 'nocache'
  | 'noindex,nofollow'
  | 'noimageindex'
  | 'max-snippet:-1'
  | 'max-image-preview:none';

// ============================================================
// Sitemap Entry
// ============================================================
export interface SitemapEntry {
  readonly url: string;
  readonly lastModified: Date;
  readonly changeFrequency: ChangeFrequency;
  readonly priority: number;              // 0.0 - 1.0
  readonly images?: readonly {
    readonly loc: string;
    readonly title?: string;
    readonly caption?: string;
    readonly geoLocation?: string;
    readonly license?: string;
  }[];
  readonly videos?: readonly SitemapVideo[];
  readonly alternateLanguages?: readonly {
    readonly language: string;
    readonly url: string;
  }[];
}

// ============================================================
// Sitemap Change Frequency
// ============================================================
export type ChangeFrequency = 
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

// ============================================================
// Sitemap Video
// ============================================================
export interface SitemapVideo {
  readonly thumbnail: string;            // Thumbnail image URL
  readonly title: string;
  readonly description: string;
  readonly contentUrl: string;
  readonly duration?: number;            // In seconds
  readonly rating?: number;              // 0-5
  readonly viewCount?: number;
  readonly publicationDate?: Date;
  readonly familyFriendly?: boolean;
  readonly restriction?: {
    readonly relationship: 'allow' | 'deny';
    readonly territories: readonly string[];
  };
  readonly platform?: {
    readonly relationship: 'allow' | 'deny';
    readonly platforms: readonly ('web' | 'mobile' | 'tv')[];
  };
}

// ============================================================
// SEO Analysis Result
// ============================================================
export interface SEOAnalysisResult {
  readonly score: number;                // 0-100
  readonly issues: readonly SEOIssue[];
  readonly suggestions: readonly string[];
  readonly keywords: readonly string[];
  readonly readability: number;          // 0-100
  readonly seoTitle: {
    readonly current: string;
    readonly length: number;
    readonly optimalLength: boolean;
    readonly suggestion?: string;
  };
  readonly metaDescription: {
    readonly current: string;
    readonly length: number;
    readonly optimalLength: boolean;
    readonly suggestion?: string;
  };
  readonly headings: {
    readonly h1: readonly string[];
    readonly h2: readonly string[];
    readonly h3: readonly string[];
  };
  readonly imagesWithMissingAlt: number;
  readonly brokenLinks: number;
  readonly wordCount: number;
}

export interface SEOIssue {
  readonly severity: 'error' | 'warning' | 'info';
  readonly message: string;
  readonly recommendation?: string;
  readonly location?: string;            // URL or field where issue occurs
}

// ============================================================
// SEO Settings for Product
// ============================================================
export interface ProductSEOSettings {
  readonly metaTitle?: string;
  readonly metaDescription?: string;
  readonly metaKeywords?: readonly string[];
  readonly ogImage?: string;
  readonly canonicalUrl?: string;
  readonly customSchema?: StructuredData;
  readonly productSchemaOverride?: Partial<ProductStructuredData>;
  readonly noIndex?: boolean;
}

// ============================================================
// SEO Settings for Category
// ============================================================
export interface CategorySEOSettings {
  readonly metaTitle?: string;
  readonly metaDescription?: string;
  readonly metaKeywords?: readonly string[];
  readonly breadcrumbTitle?: string;
  readonly additionalStructuredData?: StructuredData;
  readonly categorySchema?: Partial<BreadcrumbStructuredData>;
  readonly noIndex?: boolean;
}

// ============================================================
// SEO Settings for Page (Generic)
// ============================================================
export interface PageSEOSettings {
  readonly slug: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly metaKeywords?: readonly string[];
  readonly ogImage?: string;
  readonly canonicalUrl?: string;
  readonly structuredData?: StructuredData;
  readonly priority?: number;            // For sitemap
  readonly changeFrequency?: ChangeFrequency;
  readonly noIndex?: boolean;
  readonly noFollow?: boolean;
}

// ============================================================
// Robots.txt Configuration
// ============================================================
export interface RobotsTxtConfig {
  readonly userAgent: string;
  readonly allow?: readonly string[];
  readonly disallow?: readonly string[];
  readonly crawlDelay?: number;          // In seconds
  readonly sitemap?: readonly string[];
}

// ============================================================
// SEO Performance Metrics (For monitoring)
// ============================================================
export interface SEOPerformanceMetrics {
  readonly averagePageLoadTime: number;
  readonly averageFirstContentfulPaint: number;
  readonly coreWebVitals: {
    readonly lcp: number;               // Largest Contentful Paint
    readonly fid: number;               // First Input Delay
    readonly cls: number;               // Cumulative Layout Shift
  };
  readonly searchImpressions: number;
  readonly searchClicks: number;
  readonly averagePosition: number;
  readonly clickThroughRate: number;
  readonly indexedPages: number;
  readonly pagesWithErrors: number;
}
