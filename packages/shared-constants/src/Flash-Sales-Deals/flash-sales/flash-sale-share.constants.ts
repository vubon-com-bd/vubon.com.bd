/**
 * Flash Sale Share Constants
 * শেয়ারিং সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট শেয়ার প্ল্যাটফর্ম
export const DEFAULT_SHARE_PLATFORMS = {
  facebook: 'facebook',
  twitter: 'twitter',
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  linkedin: 'linkedin',
  email: 'email',
  sms: 'sms',
  copyLink: 'copy_link',
};

// ডিফল্ট মেসেজ টেমপ্লেট
export const DEFAULT_SHARE_MESSAGE_TEMPLATE = {
  title: 'Check out this amazing deal!',
  description: "Don't miss this exclusive flash sale offer!",
  footer: 'Hurry up! Limited time offer.',
};

// ডিফল্ট ইমেজ সাইজ
export const DEFAULT_SHARE_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

// শেয়ার টাইমআউট (মিলিসেকেন্ডে)
export const SHARE_TIMEOUT = 30000; // ৩০ সেকেন্ড

// ক্যাশ সেটিংস
export const SHARE_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 500,
  enabled: true,
};

// ডিফল্ট পেজিনেশন
export const SHARE_PAGINATION_SIZE = 10;

// সোশ্যাল মিডিয়া সেটিংস
export const SOCIAL_MEDIA_SETTINGS = {
  facebook: {
    appId: '',
    apiVersion: 'v18.0',
    enabled: true,
  },
  twitter: {
    enabled: true,
    via: '',
    hashtags: [],
  },
  whatsapp: {
    enabled: true,
  },
  telegram: {
    enabled: true,
  },
  linkedin: {
    enabled: true,
  },
};

// ট্র্যাকিং সেটিংস
export const SHARE_TRACKING_SETTINGS = {
  enabled: true,
  utmSource: 'flash_sale_share',
  utmMedium: 'social',
  utmCampaign: 'flash_sale',
  trackClicks: true,
  trackConversions: true,
};

// ডিফল্ট সর্টিং
export const DEFAULT_SHARE_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const SHARE_API_RESPONSE_LIMIT = 100;

// শেয়ার স্ট্যাটাস
export const SHARE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// শেয়ার কনফিগারেশন ইন্টারফেস
export interface FlashSaleShareConfig {
  defaultPlatforms: {
    facebook: string;
    twitter: string;
    whatsapp: string;
    telegram: string;
    linkedin: string;
    email: string;
    sms: string;
    copyLink: string;
  };
  defaultMessageTemplate: {
    title: string;
    description: string;
    footer: string;
  };
  defaultImageSize: {
    width: number;
    height: number;
  };
  timeout: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  socialMediaSettings: {
    facebook: {
      appId: string;
      apiVersion: string;
      enabled: boolean;
    };
    twitter: {
      enabled: boolean;
      via: string;
      hashtags: string[];
    };
    whatsapp: {
      enabled: boolean;
    };
    telegram: {
      enabled: boolean;
    };
    linkedin: {
      enabled: boolean;
    };
  };
  trackingSettings: {
    enabled: boolean;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    trackClicks: boolean;
    trackConversions: boolean;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট শেয়ার কনফিগারেশন
export const DEFAULT_SHARE_CONFIG: FlashSaleShareConfig = {
  defaultPlatforms: DEFAULT_SHARE_PLATFORMS,
  defaultMessageTemplate: DEFAULT_SHARE_MESSAGE_TEMPLATE,
  defaultImageSize: DEFAULT_SHARE_IMAGE_SIZE,
  timeout: SHARE_TIMEOUT,
  cacheSettings: SHARE_CACHE_SETTINGS,
  paginationSize: SHARE_PAGINATION_SIZE,
  socialMediaSettings: SOCIAL_MEDIA_SETTINGS,
  trackingSettings: SHARE_TRACKING_SETTINGS,
  defaultSorting: DEFAULT_SHARE_SORTING,
  apiResponseLimit: SHARE_API_RESPONSE_LIMIT,
};

// শেয়ার প্ল্যাটফর্মের লেবেল
export const SHARE_PLATFORM_LABELS: Record<
  (typeof DEFAULT_SHARE_PLATFORMS)[keyof typeof DEFAULT_SHARE_PLATFORMS],
  string
> = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  linkedin: 'LinkedIn',
  email: 'ইমেইল',
  sms: 'এসএমএস',
  copy_link: 'লিংক কপি',
};

// শেয়ার প্ল্যাটফর্মের আইকন
export const SHARE_PLATFORM_ICONS: Record<
  (typeof DEFAULT_SHARE_PLATFORMS)[keyof typeof DEFAULT_SHARE_PLATFORMS],
  string
> = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  whatsapp: 'MessageCircle',
  telegram: 'Send',
  linkedin: 'Linkedin',
  email: 'Mail',
  sms: 'MessageSquare',
  copy_link: 'Link',
};

// শেয়ার প্ল্যাটফর্মের কালার
export const SHARE_PLATFORM_COLORS: Record<
  (typeof DEFAULT_SHARE_PLATFORMS)[keyof typeof DEFAULT_SHARE_PLATFORMS],
  string
> = {
  facebook: '#1877F2',
  twitter: '#000000',
  whatsapp: '#25D366',
  telegram: '#0088CC',
  linkedin: '#0A66C2',
  email: '#EA4335',
  sms: '#34B7F1',
  copy_link: '#6B7280',
};

// শেয়ার স্ট্যাটাসের লেবেল
export const SHARE_STATUS_LABELS: Record<(typeof SHARE_STATUS)[keyof typeof SHARE_STATUS], string> =
  {
    pending: 'অপেক্ষমান',
    completed: 'সম্পন্ন',
    failed: 'ব্যর্থ',
    cancelled: 'বাতিলকৃত',
  };

// শেয়ার স্ট্যাটাসের কালার
export const SHARE_STATUS_COLORS: Record<(typeof SHARE_STATUS)[keyof typeof SHARE_STATUS], string> =
  {
    pending: '#FCD34D',
    completed: '#22C55E',
    failed: '#EF4444',
    cancelled: '#6B7280',
  };

// হেল্পার ফাংশন: শেয়ার প্ল্যাটফর্ম ভ্যালিড কিনা চেক করুন
export const isValidSharePlatform = (
  platform: string
): platform is (typeof DEFAULT_SHARE_PLATFORMS)[keyof typeof DEFAULT_SHARE_PLATFORMS] => {
  return Object.values(DEFAULT_SHARE_PLATFORMS).includes(
    platform as (typeof DEFAULT_SHARE_PLATFORMS)[keyof typeof DEFAULT_SHARE_PLATFORMS]
  );
};

// হেল্পার ফাংশন: শেয়ার স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidShareStatus = (
  status: string
): status is (typeof SHARE_STATUS)[keyof typeof SHARE_STATUS] => {
  return Object.values(SHARE_STATUS).includes(
    status as (typeof SHARE_STATUS)[keyof typeof SHARE_STATUS]
  );
};

// হেল্পার ফাংশন: শেয়ার ইউআরএল জেনারেট করুন
export const generateShareUrl = (platform: string, url: string, message?: string): string => {
  const encodedUrl = encodeURIComponent(url);
  const encodedMessage = message ? encodeURIComponent(message) : '';

  const platformUrls: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=Check%20this%20out&body=${encodedMessage}%0A%0A${encodedUrl}`,
  };

  return platformUrls[platform] || url;
};

// হেল্পার ফাংশন: শেয়ার ট্র্যাকিং ইউআরএল জেনারেট করুন
export const generateTrackingUrl = (
  url: string,
  source?: string,
  medium?: string,
  campaign?: string
): string => {
  const trackingUrl = new URL(url);
  trackingUrl.searchParams.set('utm_source', source || SHARE_TRACKING_SETTINGS.utmSource);
  trackingUrl.searchParams.set('utm_medium', medium || SHARE_TRACKING_SETTINGS.utmMedium);
  trackingUrl.searchParams.set('utm_campaign', campaign || SHARE_TRACKING_SETTINGS.utmCampaign);
  return trackingUrl.toString();
};

// হেল্পার ফাংশন: শেয়ার প্ল্যাটফর্মের লেবেল পান
export const getSharePlatformLabel = (platform: string): string => {
  return SHARE_PLATFORM_LABELS[platform as keyof typeof SHARE_PLATFORM_LABELS] || platform;
};

// হেল্পার ফাংশন: শেয়ার প্ল্যাটফর্মের আইকন পান
export const getSharePlatformIcon = (platform: string): string => {
  return SHARE_PLATFORM_ICONS[platform as keyof typeof SHARE_PLATFORM_ICONS] || 'Share2';
};

// হেল্পার ফাংশন: শেয়ার প্ল্যাটফর্মের কালার পান
export const getSharePlatformColor = (platform: string): string => {
  return SHARE_PLATFORM_COLORS[platform as keyof typeof SHARE_PLATFORM_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: শেয়ার স্ট্যাটাসের লেবেল পান
export const getShareStatusLabel = (status: string): string => {
  return SHARE_STATUS_LABELS[status as keyof typeof SHARE_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: শেয়ার স্ট্যাটাসের কালার পান
export const getShareStatusColor = (status: string): string => {
  return SHARE_STATUS_COLORS[status as keyof typeof SHARE_STATUS_COLORS] || '#6B7280';
};
