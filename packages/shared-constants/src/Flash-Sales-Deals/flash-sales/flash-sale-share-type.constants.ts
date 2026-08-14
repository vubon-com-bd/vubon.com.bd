/**
 * Flash Sale Share Type Constants
 * শেয়ার টাইপসমূহ
 */

// শেয়ার টাইপ এনাম
export const SHARE_TYPE = {
  SOCIAL_MEDIA: 'social_media',
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  LINK: 'link',
  QR_CODE: 'qr_code',
  EMBED: 'embed',
  WIDGET: 'widget',
  API: 'api',
  IFRAME: 'iframe',
  DEEPLINK: 'deeplink',
  REFERRAL: 'referral',
  PROMOTIONAL: 'promotional',
  INVITATION: 'invitation',
  PUBLIC: 'public',
  PRIVATE: 'private',
  CUSTOM: 'custom',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  PINTEREST: 'pinterest',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
} as const;

// শেয়ার টাইপ টাইপ
export type ShareType = (typeof SHARE_TYPE)[keyof typeof SHARE_TYPE];

// টাইপের লেবেল
export const SHARE_TYPE_LABELS: Record<ShareType, string> = {
  social_media: 'সোশ্যাল মিডিয়া',
  email: 'ইমেইল',
  sms: 'এসএমএস',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  link: 'লিংক',
  qr_code: 'QR কোড',
  embed: 'এম্বেড',
  widget: 'উইজেট',
  api: 'API',
  iframe: 'IFrame',
  deeplink: 'ডিপলিংক',
  referral: 'রেফারেল',
  promotional: 'প্রচারমূলক',
  invitation: 'আমন্ত্রণ',
  public: 'পাবলিক',
  private: 'প্রাইভেট',
  custom: 'কাস্টম',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

// টাইপের বিবরণ
export const SHARE_TYPE_DESCRIPTIONS: Record<ShareType, string> = {
  social_media: 'সোশ্যাল মিডিয়া প্ল্যাটফর্মে শেয়ার',
  email: 'ইমেইলের মাধ্যমে শেয়ার',
  sms: 'এসএমএসের মাধ্যমে শেয়ার',
  whatsapp: 'WhatsApp এ শেয়ার',
  telegram: 'Telegram এ শেয়ার',
  link: 'লিংক শেয়ার',
  qr_code: 'QR কোড জেনারেট',
  embed: 'এম্বেড কোড',
  widget: 'উইজেট শেয়ার',
  api: 'API এর মাধ্যমে শেয়ার',
  iframe: 'IFrame এম্বেড',
  deeplink: 'ডিপলিংক শেয়ার',
  referral: 'রেফারেল লিংক',
  promotional: 'প্রচারমূলক শেয়ার',
  invitation: 'আমন্ত্রণ পাঠান',
  public: 'সবার জন্য উন্মুক্ত',
  private: 'নির্দিষ্ট ব্যক্তিদের জন্য',
  custom: 'কাস্টমাইজড শেয়ার',
  facebook: 'Facebook এ শেয়ার',
  instagram: 'Instagram এ শেয়ার',
  twitter: 'Twitter এ শেয়ার',
  linkedin: 'LinkedIn এ শেয়ার',
  pinterest: 'Pinterest এ শেয়ার',
  youtube: 'YouTube এ শেয়ার',
  tiktok: 'TikTok এ শেয়ার',
};

// টাইপের আইকন
export const SHARE_TYPE_ICONS: Record<ShareType, string> = {
  social_media: 'Share2',
  email: 'Mail',
  sms: 'MessageSquare',
  whatsapp: 'MessageCircle',
  telegram: 'Send',
  link: 'Link',
  qr_code: 'QrCode',
  embed: 'Code',
  widget: 'Layout',
  api: 'Server',
  iframe: 'FileCode',
  deeplink: 'Link2',
  referral: 'Users',
  promotional: 'Megaphone',
  invitation: 'Mail',
  public: 'Globe',
  private: 'Lock',
  custom: 'Settings',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  linkedin: 'Linkedin',
  pinterest: 'Pinterest',
  youtube: 'Youtube',
  tiktok: 'Tiktok',
};

// টাইপের কালার
export const SHARE_TYPE_COLORS: Record<ShareType, string> = {
  social_media: '#3B82F6',
  email: '#EA4335',
  sms: '#34B7F1',
  whatsapp: '#25D366',
  telegram: '#0088CC',
  link: '#6B7280',
  qr_code: '#1F2937',
  embed: '#8B5CF6',
  widget: '#EC4899',
  api: '#14B8A6',
  iframe: '#F59E0B',
  deeplink: '#3B82F6',
  referral: '#22C55E',
  promotional: '#EC4899',
  invitation: '#8B5CF6',
  public: '#3B82F6',
  private: '#6B7280',
  custom: '#6366F1',
  facebook: '#1877F2',
  instagram: '#E4405F',
  twitter: '#000000',
  linkedin: '#0A66C2',
  pinterest: '#E60023',
  youtube: '#FF0000',
  tiktok: '#000000',
};

// টাইপ গ্রুপ
export const SHARE_TYPE_GROUPS = {
  SOCIAL_PLATFORMS: [
    'facebook',
    'instagram',
    'twitter',
    'linkedin',
    'pinterest',
    'youtube',
    'tiktok',
  ] as ShareType[],
  COMMUNICATION: ['email', 'sms', 'whatsapp', 'telegram'] as ShareType[],
  TECHNICAL: ['link', 'qr_code', 'embed', 'widget', 'api', 'iframe', 'deeplink'] as ShareType[],
  MARKETING: ['referral', 'promotional', 'invitation'] as ShareType[],
  VISIBILITY: ['public', 'private'] as ShareType[],
  OTHER: ['social_media', 'custom'] as ShareType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface ShareTypeConfig {
  type: ShareType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const SHARE_TYPE_CONFIGS: Record<ShareType, ShareTypeConfig> = {
  social_media: {
    type: 'social_media',
    label: SHARE_TYPE_LABELS.social_media,
    description: SHARE_TYPE_DESCRIPTIONS.social_media,
    icon: SHARE_TYPE_ICONS.social_media,
    color: SHARE_TYPE_COLORS.social_media,
    isActive: true,
  },
  email: {
    type: 'email',
    label: SHARE_TYPE_LABELS.email,
    description: SHARE_TYPE_DESCRIPTIONS.email,
    icon: SHARE_TYPE_ICONS.email,
    color: SHARE_TYPE_COLORS.email,
    isActive: true,
  },
  sms: {
    type: 'sms',
    label: SHARE_TYPE_LABELS.sms,
    description: SHARE_TYPE_DESCRIPTIONS.sms,
    icon: SHARE_TYPE_ICONS.sms,
    color: SHARE_TYPE_COLORS.sms,
    isActive: true,
  },
  whatsapp: {
    type: 'whatsapp',
    label: SHARE_TYPE_LABELS.whatsapp,
    description: SHARE_TYPE_DESCRIPTIONS.whatsapp,
    icon: SHARE_TYPE_ICONS.whatsapp,
    color: SHARE_TYPE_COLORS.whatsapp,
    isActive: true,
  },
  telegram: {
    type: 'telegram',
    label: SHARE_TYPE_LABELS.telegram,
    description: SHARE_TYPE_DESCRIPTIONS.telegram,
    icon: SHARE_TYPE_ICONS.telegram,
    color: SHARE_TYPE_COLORS.telegram,
    isActive: true,
  },
  link: {
    type: 'link',
    label: SHARE_TYPE_LABELS.link,
    description: SHARE_TYPE_DESCRIPTIONS.link,
    icon: SHARE_TYPE_ICONS.link,
    color: SHARE_TYPE_COLORS.link,
    isActive: true,
  },
  qr_code: {
    type: 'qr_code',
    label: SHARE_TYPE_LABELS.qr_code,
    description: SHARE_TYPE_DESCRIPTIONS.qr_code,
    icon: SHARE_TYPE_ICONS.qr_code,
    color: SHARE_TYPE_COLORS.qr_code,
    isActive: true,
  },
  embed: {
    type: 'embed',
    label: SHARE_TYPE_LABELS.embed,
    description: SHARE_TYPE_DESCRIPTIONS.embed,
    icon: SHARE_TYPE_ICONS.embed,
    color: SHARE_TYPE_COLORS.embed,
    isActive: true,
  },
  widget: {
    type: 'widget',
    label: SHARE_TYPE_LABELS.widget,
    description: SHARE_TYPE_DESCRIPTIONS.widget,
    icon: SHARE_TYPE_ICONS.widget,
    color: SHARE_TYPE_COLORS.widget,
    isActive: true,
  },
  api: {
    type: 'api',
    label: SHARE_TYPE_LABELS.api,
    description: SHARE_TYPE_DESCRIPTIONS.api,
    icon: SHARE_TYPE_ICONS.api,
    color: SHARE_TYPE_COLORS.api,
    isActive: true,
  },
  iframe: {
    type: 'iframe',
    label: SHARE_TYPE_LABELS.iframe,
    description: SHARE_TYPE_DESCRIPTIONS.iframe,
    icon: SHARE_TYPE_ICONS.iframe,
    color: SHARE_TYPE_COLORS.iframe,
    isActive: true,
  },
  deeplink: {
    type: 'deeplink',
    label: SHARE_TYPE_LABELS.deeplink,
    description: SHARE_TYPE_DESCRIPTIONS.deeplink,
    icon: SHARE_TYPE_ICONS.deeplink,
    color: SHARE_TYPE_COLORS.deeplink,
    isActive: true,
  },
  referral: {
    type: 'referral',
    label: SHARE_TYPE_LABELS.referral,
    description: SHARE_TYPE_DESCRIPTIONS.referral,
    icon: SHARE_TYPE_ICONS.referral,
    color: SHARE_TYPE_COLORS.referral,
    isActive: true,
  },
  promotional: {
    type: 'promotional',
    label: SHARE_TYPE_LABELS.promotional,
    description: SHARE_TYPE_DESCRIPTIONS.promotional,
    icon: SHARE_TYPE_ICONS.promotional,
    color: SHARE_TYPE_COLORS.promotional,
    isActive: true,
  },
  invitation: {
    type: 'invitation',
    label: SHARE_TYPE_LABELS.invitation,
    description: SHARE_TYPE_DESCRIPTIONS.invitation,
    icon: SHARE_TYPE_ICONS.invitation,
    color: SHARE_TYPE_COLORS.invitation,
    isActive: true,
  },
  public: {
    type: 'public',
    label: SHARE_TYPE_LABELS.public,
    description: SHARE_TYPE_DESCRIPTIONS.public,
    icon: SHARE_TYPE_ICONS.public,
    color: SHARE_TYPE_COLORS.public,
    isActive: true,
  },
  private: {
    type: 'private',
    label: SHARE_TYPE_LABELS.private,
    description: SHARE_TYPE_DESCRIPTIONS.private,
    icon: SHARE_TYPE_ICONS.private,
    color: SHARE_TYPE_COLORS.private,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: SHARE_TYPE_LABELS.custom,
    description: SHARE_TYPE_DESCRIPTIONS.custom,
    icon: SHARE_TYPE_ICONS.custom,
    color: SHARE_TYPE_COLORS.custom,
    isActive: true,
  },
  facebook: {
    type: 'facebook',
    label: SHARE_TYPE_LABELS.facebook,
    description: SHARE_TYPE_DESCRIPTIONS.facebook,
    icon: SHARE_TYPE_ICONS.facebook,
    color: SHARE_TYPE_COLORS.facebook,
    isActive: true,
  },
  instagram: {
    type: 'instagram',
    label: SHARE_TYPE_LABELS.instagram,
    description: SHARE_TYPE_DESCRIPTIONS.instagram,
    icon: SHARE_TYPE_ICONS.instagram,
    color: SHARE_TYPE_COLORS.instagram,
    isActive: true,
  },
  twitter: {
    type: 'twitter',
    label: SHARE_TYPE_LABELS.twitter,
    description: SHARE_TYPE_DESCRIPTIONS.twitter,
    icon: SHARE_TYPE_ICONS.twitter,
    color: SHARE_TYPE_COLORS.twitter,
    isActive: true,
  },
  linkedin: {
    type: 'linkedin',
    label: SHARE_TYPE_LABELS.linkedin,
    description: SHARE_TYPE_DESCRIPTIONS.linkedin,
    icon: SHARE_TYPE_ICONS.linkedin,
    color: SHARE_TYPE_COLORS.linkedin,
    isActive: true,
  },
  pinterest: {
    type: 'pinterest',
    label: SHARE_TYPE_LABELS.pinterest,
    description: SHARE_TYPE_DESCRIPTIONS.pinterest,
    icon: SHARE_TYPE_ICONS.pinterest,
    color: SHARE_TYPE_COLORS.pinterest,
    isActive: true,
  },
  youtube: {
    type: 'youtube',
    label: SHARE_TYPE_LABELS.youtube,
    description: SHARE_TYPE_DESCRIPTIONS.youtube,
    icon: SHARE_TYPE_ICONS.youtube,
    color: SHARE_TYPE_COLORS.youtube,
    isActive: true,
  },
  tiktok: {
    type: 'tiktok',
    label: SHARE_TYPE_LABELS.tiktok,
    description: SHARE_TYPE_DESCRIPTIONS.tiktok,
    icon: SHARE_TYPE_ICONS.tiktok,
    color: SHARE_TYPE_COLORS.tiktok,
    isActive: true,
  },
};

// হেল্পার ফাংশন: শেয়ার টাইপ ভ্যালিড কিনা চেক করুন
export const isValidShareType = (type: string): type is ShareType => {
  return Object.values(SHARE_TYPE).includes(type as ShareType);
};

// হেল্পার ফাংশন: সক্রিয় শেয়ার টাইপ গুলো পান
export const getActiveShareTypes = (): ShareType[] => {
  return Object.values(SHARE_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: শেয়ার টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getShareTypesByGroup = (group: keyof typeof SHARE_TYPE_GROUPS): ShareType[] => {
  return SHARE_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: শেয়ার টাইপের লেবেল পান
export const getShareTypeLabel = (type: ShareType): string => {
  return SHARE_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: শেয়ার টাইপের বিবরণ পান
export const getShareTypeDescription = (type: ShareType): string => {
  return SHARE_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: শেয়ার টাইপের কালার পান
export const getShareTypeColor = (type: ShareType): string => {
  return SHARE_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: শেয়ার টাইপের আইকন পান
export const getShareTypeIcon = (type: ShareType): string => {
  return SHARE_TYPE_ICONS[type] || 'Share2';
};

// হেল্পার ফাংশন: শেয়ার টাইপ সোশ্যাল মিডিয়া কিনা চেক করুন
export const isSocialMediaShare = (type: ShareType): boolean => {
  const socialTypes: ShareType[] = [
    'facebook',
    'instagram',
    'twitter',
    'linkedin',
    'pinterest',
    'youtube',
    'tiktok',
  ];
  return socialTypes.includes(type);
};

// হেল্পার ফাংশন: শেয়ার টাইপ কমিউনিকেশন কিনা চেক করুন
export const isCommunicationShare = (type: ShareType): boolean => {
  const communicationTypes: ShareType[] = ['email', 'sms', 'whatsapp', 'telegram'];
  return communicationTypes.includes(type);
};

// হেল্পার ফাংশন: শেয়ার টাইপ পাবলিক কিনা চেক করুন
export const isPublicShare = (type: ShareType): boolean => {
  return type === 'public';
};
