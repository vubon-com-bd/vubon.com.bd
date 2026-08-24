/**
 * Support Constants
 * Configuration for support system
 */

export const SUPPORT = {
  // Support Types
  TYPES: {
    CUSTOMER: 'customer',
    VENDOR: 'vendor',
    ADMIN: 'admin',
    TECHNICAL: 'technical',
    GENERAL: 'general',
    BILLING: 'billing',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    INQUIRY: 'inquiry',
  } as const,

  // Support Channels
  CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    SOCIAL: 'social',
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    WEBSITE: 'website',
    APP: 'app',
    API: 'api',
  } as const,

  // Support Hours
  HOURS: {
    WEEKDAY_START: 9,
    WEEKDAY_END: 18,
    WEEKEND_START: 10,
    WEEKEND_END: 16,
    HOLIDAY_START: 10,
    HOLIDAY_END: 14,
  } as const,

  // Support SLAs (in hours)
  SLA: {
    CRITICAL: 1,
    HIGH: 4,
    MEDIUM: 8,
    LOW: 24,
    BACKGROUND: 48,
  } as const,

  // Support Rating
  RATING: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,

  // Support Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
  } as const,

  // Support Timezone
  TIMEZONE: 'Asia/Dhaka',
} as const;

// Support Types
export type SupportType = (typeof SUPPORT.TYPES)[keyof typeof SUPPORT.TYPES];

// Support Channels
export type SupportChannel = (typeof SUPPORT.CHANNELS)[keyof typeof SUPPORT.CHANNELS];

// Support SLA
export type SupportSLA = (typeof SUPPORT.SLA)[keyof typeof SUPPORT.SLA];

// Support Languages
export type SupportLanguage = (typeof SUPPORT.LANGUAGES)[keyof typeof SUPPORT.LANGUAGES];

// Utility Functions
export function supportGetSLAHours(priority: string): number {
  const slaMap: Record<string, number> = {
    critical: SUPPORT.SLA.CRITICAL,
    high: SUPPORT.SLA.HIGH,
    medium: SUPPORT.SLA.MEDIUM,
    low: SUPPORT.SLA.LOW,
    background: SUPPORT.SLA.BACKGROUND,
  };
  return slaMap[priority] || SUPPORT.SLA.MEDIUM;
}

export function supportIsWithinBusinessHours(date: Date): boolean {
  const hours = date.getHours();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const start = isWeekend ? SUPPORT.HOURS.WEEKEND_START : SUPPORT.HOURS.WEEKDAY_START;
  const end = isWeekend ? SUPPORT.HOURS.WEEKEND_END : SUPPORT.HOURS.WEEKDAY_END;
  return hours >= start && hours < end;
}

export function supportGetChannelLabel(channel: SupportChannel): string {
  const labels: Record<SupportChannel, string> = {
    [SUPPORT.CHANNELS.EMAIL]: 'Email',
    [SUPPORT.CHANNELS.PHONE]: 'Phone',
    [SUPPORT.CHANNELS.CHAT]: 'Live Chat',
    [SUPPORT.CHANNELS.SOCIAL]: 'Social Media',
    [SUPPORT.CHANNELS.WHATSAPP]: 'WhatsApp',
    [SUPPORT.CHANNELS.FACEBOOK]: 'Facebook',
    [SUPPORT.CHANNELS.TWITTER]: 'Twitter',
    [SUPPORT.CHANNELS.INSTAGRAM]: 'Instagram',
    [SUPPORT.CHANNELS.WEBSITE]: 'Website',
    [SUPPORT.CHANNELS.APP]: 'Mobile App',
    [SUPPORT.CHANNELS.API]: 'API',
  };
  return labels[channel] || 'Unknown';
}
