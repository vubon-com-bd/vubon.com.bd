/**
 * Feature Config
 * ফিচার কনফিগারেশন
 */

export interface FeatureConfig {
  enabled: boolean;
  types: {
    basic: string;
    advanced: string;
    premium: string;
    enterprise: string;
  };
  maxFeatures: number;
  defaults: {
    maxFeatures: number;
  };
  features: Record<
    string,
    {
      name: string;
      nameBangla: string;
      description: string;
      isPaid: boolean;
      price: number;
      category: string;
    }
  >;
}

export const featureConfig: FeatureConfig = {
  enabled: true,

  types: {
    basic: 'basic',
    advanced: 'advanced',
    premium: 'premium',
    enterprise: 'enterprise',
  },

  maxFeatures: 50,

  defaults: {
    maxFeatures: 50,
  },

  features: {
    basic_listing: {
      name: 'Basic Listing',
      nameBangla: 'বেসিক লিস্টিং',
      description: 'List products with basic information',
      isPaid: false,
      price: 0,
      category: 'basic',
    },
    order_management: {
      name: 'Order Management',
      nameBangla: 'অর্ডার ম্যানেজমেন্ট',
      description: 'Manage orders and shipments',
      isPaid: false,
      price: 0,
      category: 'basic',
    },
    analytics_basic: {
      name: 'Basic Analytics',
      nameBangla: 'বেসিক অ্যানালিটিক্স',
      description: 'View basic sales analytics',
      isPaid: false,
      price: 0,
      category: 'basic',
    },
    analytics_advanced: {
      name: 'Advanced Analytics',
      nameBangla: 'অ্যাডভান্সড অ্যানালিটিক্স',
      description: 'View advanced analytics and insights',
      isPaid: true,
      price: 200,
      category: 'advanced',
    },
    promotion: {
      name: 'Promotion Tools',
      nameBangla: 'প্রমোশন টুলস',
      description: 'Create and manage promotions',
      isPaid: true,
      price: 300,
      category: 'advanced',
    },
    dedicated_support: {
      name: 'Dedicated Support',
      nameBangla: 'ডেডিকেটেড সাপোর্ট',
      description: 'Get dedicated support from our team',
      isPaid: true,
      price: 500,
      category: 'premium',
    },
    custom_branding: {
      name: 'Custom Branding',
      nameBangla: 'কাস্টম ব্র্যান্ডিং',
      description: 'Customize store with your branding',
      isPaid: true,
      price: 300,
      category: 'premium',
    },
    api_access: {
      name: 'API Access',
      nameBangla: 'এপিআই অ্যাক্সেস',
      description: 'Access our APIs for integration',
      isPaid: true,
      price: 500,
      category: 'enterprise',
    },
  },
} as const;

export type FeatureConfigType = typeof featureConfig;
