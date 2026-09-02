/**
 * SEO Configuration
 * এসইও কনফিগারেশন
 */
export interface SEOConfig {
  enabled: boolean;
  metadata: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    defaultImage: string;
  };
  social: {
    facebook: {
      enabled: boolean;
      appId: string;
    };
    twitter: {
      enabled: boolean;
      handle: string;
    };
    instagram: {
      enabled: boolean;
      handle: string;
    };
  };
  structuredData: {
    enabled: boolean;
    types: string[];
    autoGenerate: boolean;
  };
  sitemap: {
    enabled: boolean;
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  };
}

export const createSEOConfig = (): SEOConfig => ({
  enabled: true,
  metadata: {
    titleTemplate: '%s | Vubon Platform',
    defaultTitle: 'Vubon Platform - Online Shopping in Bangladesh',
    defaultDescription:
      'Shop online from Vubon Platform with secure payment and fast delivery in Bangladesh.',
    defaultKeywords: 'online shopping, bangladesh, ecommerce, vubon',
    defaultImage: 'https://vubon.com.bd/images/og-image.jpg',
  },
  social: {
    facebook: {
      enabled: true,
      appId: process.env.FACEBOOK_APP_ID || '',
    },
    twitter: {
      enabled: true,
      handle: '@vubon',
    },
    instagram: {
      enabled: true,
      handle: '@vubon',
    },
  },
  structuredData: {
    enabled: true,
    types: ['product', 'breadcrumb', 'organization', 'website'],
    autoGenerate: true,
  },
  sitemap: {
    enabled: true,
    priority: 0.8,
    changefreq: 'daily',
  },
});
