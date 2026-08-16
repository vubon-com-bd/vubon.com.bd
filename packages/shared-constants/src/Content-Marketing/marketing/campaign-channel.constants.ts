/**
 * ক্যাম্পেইনের চ্যানেল সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ক্যাম্পেইনের সব চ্যানেল
 */
export const CAMPAIGN_CHANNELS = ['email', 'sms', 'push', 'in-app', 'social', 'display'] as const;

/**
 * প্রতিটি চ্যানেলের লেবেল (বাংলা এবং ইংরেজি)
 */
export const CAMPAIGN_CHANNEL_LABELS = {
  email: {
    en: 'Email',
    bn: 'ইমেইল',
  },
  sms: {
    en: 'SMS',
    bn: 'এসএমএস',
  },
  push: {
    en: 'Push Notification',
    bn: 'পুশ বিজ্ঞপ্তি',
  },
  'in-app': {
    en: 'In-App Message',
    bn: 'ইন-অ্যাপ বার্তা',
  },
  social: {
    en: 'Social Media',
    bn: 'সোশ্যাল মিডিয়া',
  },
  display: {
    en: 'Display Advertising',
    bn: 'ডিসপ্লে বিজ্ঞাপন',
  },
} as const satisfies Record<(typeof CAMPAIGN_CHANNELS)[number], { en: string; bn: string }>;

/**
 * ক্যাম্পেইন চ্যানেল টাইপ
 */
export type CampaignChannel = (typeof CAMPAIGN_CHANNELS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট চ্যানেলের লেবেল পাওয়ার ফাংশন
 */
export function getCampaignChannelLabel(channel: CampaignChannel, lang: Language = 'en'): string {
  return CAMPAIGN_CHANNEL_LABELS[channel][lang];
}

/**
 * সব ক্যাম্পেইন চ্যানেলের তালিকা পাওয়ার ফাংশন
 */
export function getAllCampaignChannels(): readonly CampaignChannel[] {
  return CAMPAIGN_CHANNELS;
}

/**
 * ক্যাম্পেইন চ্যানেল বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignChannel(channel: string): channel is CampaignChannel {
  return CAMPAIGN_CHANNELS.includes(channel as CampaignChannel);
}

/**
 * চ্যানেল ডিজিটাল কিনা চেক করার ফাংশন
 */
export function isDigitalChannel(channel: CampaignChannel): boolean {
  return ['email', 'sms', 'push', 'in-app', 'social', 'display'].includes(channel);
}

/**
 * চ্যানেল পুশ নোটিফিকেশন কিনা চেক করার ফাংশন
 */
export function isPushChannel(channel: CampaignChannel): boolean {
  return channel === 'push' || channel === 'in-app';
}

/**
 * চ্যানেল মেসেজিং কিনা চেক করার ফাংশন
 */
export function isMessagingChannel(channel: CampaignChannel): boolean {
  return ['email', 'sms', 'push', 'in-app'].includes(channel);
}

/**
 * চ্যানেল অ্যাডভারটাইজিং কিনা চেক করার ফাংশন
 */
export function isAdvertisingChannel(channel: CampaignChannel): boolean {
  return ['social', 'display'].includes(channel);
}

/**
 * ডিফল্ট ক্যাম্পেইন চ্যানেল পাওয়ার ফাংশন
 */
export function getDefaultCampaignChannel(): CampaignChannel {
  return 'email';
}

/**
 * চ্যানেলের আইকন নাম পাওয়ার ফাংশন
 */
export function getChannelIcon(channel: CampaignChannel): string {
  const icons: Record<CampaignChannel, string> = {
    email: '📧',
    sms: '💬',
    push: '🔔',
    'in-app': '📱',
    social: '🌐',
    display: '🖥️',
  };
  return icons[channel];
}

/**
 * চ্যানেলের রঙ পাওয়ার ফাংশন
 */
export function getChannelColor(channel: CampaignChannel): string {
  const colors: Record<CampaignChannel, string> = {
    email: '#4285F4',
    sms: '#34A853',
    push: '#FBBC04',
    'in-app': '#EA4335',
    social: '#1DA1F2',
    display: '#7B61FF',
  };
  return colors[channel];
}
