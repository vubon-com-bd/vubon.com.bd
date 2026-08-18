/**
 * টিকেট তৈরির চ্যানেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট চ্যানেল
 */
export const TICKET_CHANNEL = {
  EMAIL: 'email',
  WEB: 'web',
  PHONE: 'phone',
  LIVE_CHAT: 'live_chat',
  SOCIAL_MEDIA: 'social_media',
  MOBILE_APP: 'mobile_app',
  API: 'api',
  IN_APP: 'in_app',
  WHATSAPP: 'whatsapp',
  MESSENGER: 'messenger',
  SMS: 'sms',
  PORTAL: 'portal',
  WIDGET: 'widget',
  SLACK: 'slack',
  TEAMS: 'teams',
} as const;

/**
 * টিকেট চ্যানেলের ডিসপ্লে নাম
 */
export const TICKET_CHANNEL_DISPLAY_NAMES = {
  [TICKET_CHANNEL.EMAIL]: 'ইমেইল',
  [TICKET_CHANNEL.WEB]: 'ওয়েব',
  [TICKET_CHANNEL.PHONE]: 'ফোন',
  [TICKET_CHANNEL.LIVE_CHAT]: 'লাইভ চ্যাট',
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 'সোশ্যাল মিডিয়া',
  [TICKET_CHANNEL.MOBILE_APP]: 'মোবাইল অ্যাপ',
  [TICKET_CHANNEL.API]: 'এপিআই',
  [TICKET_CHANNEL.IN_APP]: 'ইন-অ্যাপ',
  [TICKET_CHANNEL.WHATSAPP]: 'হোয়াটসঅ্যাপ',
  [TICKET_CHANNEL.MESSENGER]: 'মেসেঞ্জার',
  [TICKET_CHANNEL.SMS]: 'এসএমএস',
  [TICKET_CHANNEL.PORTAL]: 'পোর্টাল',
  [TICKET_CHANNEL.WIDGET]: 'উইজেট',
  [TICKET_CHANNEL.SLACK]: 'স্ল্যাক',
  [TICKET_CHANNEL.TEAMS]: 'টিমস',
} as const;

/**
 * টিকেট চ্যানেলের আইকন (অনুষঙ্গিক নাম)
 */
export const TICKET_CHANNEL_ICONS = {
  [TICKET_CHANNEL.EMAIL]: 'mail',
  [TICKET_CHANNEL.WEB]: 'globe',
  [TICKET_CHANNEL.PHONE]: 'phone',
  [TICKET_CHANNEL.LIVE_CHAT]: 'message-circle',
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 'share-2',
  [TICKET_CHANNEL.MOBILE_APP]: 'smartphone',
  [TICKET_CHANNEL.API]: 'code',
  [TICKET_CHANNEL.IN_APP]: 'bell',
  [TICKET_CHANNEL.WHATSAPP]: 'message-square',
  [TICKET_CHANNEL.MESSENGER]: 'facebook',
  [TICKET_CHANNEL.SMS]: 'smartphone',
  [TICKET_CHANNEL.PORTAL]: 'layout',
  [TICKET_CHANNEL.WIDGET]: 'chrome',
  [TICKET_CHANNEL.SLACK]: 'slack',
  [TICKET_CHANNEL.TEAMS]: 'users',
} as const;

/**
 * টিকেট চ্যানেলের রঙের কোড (হেক্স)
 */
export const TICKET_CHANNEL_COLORS = {
  [TICKET_CHANNEL.EMAIL]: '#3498db', // নীল
  [TICKET_CHANNEL.WEB]: '#2ecc71', // সবুজ
  [TICKET_CHANNEL.PHONE]: '#e74c3c', // লাল
  [TICKET_CHANNEL.LIVE_CHAT]: '#1abc9c', // টিল
  [TICKET_CHANNEL.SOCIAL_MEDIA]: '#9b59b6', // বেগুনি
  [TICKET_CHANNEL.MOBILE_APP]: '#f39c12', // হলুদ
  [TICKET_CHANNEL.API]: '#34495e', // গাঢ় নীল
  [TICKET_CHANNEL.IN_APP]: '#2c3e50', // গাঢ় নীল
  [TICKET_CHANNEL.WHATSAPP]: '#25d366', // হোয়াটসঅ্যাপ গ্রিন
  [TICKET_CHANNEL.MESSENGER]: '#0084ff', // মেসেঞ্জার ব্লু
  [TICKET_CHANNEL.SMS]: '#7f8c8d', // ধূসর
  [TICKET_CHANNEL.PORTAL]: '#8e44ad', // বেগুনি
  [TICKET_CHANNEL.WIDGET]: '#e67e22', // কমলা
  [TICKET_CHANNEL.SLACK]: '#4a154b', // স্ল্যাক পার্পল
  [TICKET_CHANNEL.TEAMS]: '#464eb8', // টিমস ব্লু
} as const;

/**
 * টিকেট চ্যানেলের বিবরণ
 */
export const TICKET_CHANNEL_DESCRIPTIONS = {
  [TICKET_CHANNEL.EMAIL]: 'ইমেইলের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.WEB]: 'ওয়েবসাইটের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.PHONE]: 'ফোন কলের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.LIVE_CHAT]: 'লাইভ চ্যাটের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 'সোশ্যাল মিডিয়ার মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.MOBILE_APP]: 'মোবাইল অ্যাপের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.API]: 'এপিআই এর মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.IN_APP]: 'অ্যাপের ভিতর থেকে তৈরি টিকেট',
  [TICKET_CHANNEL.WHATSAPP]: 'হোয়াটসঅ্যাপের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.MESSENGER]: 'মেসেঞ্জারের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.SMS]: 'এসএমএস এর মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.PORTAL]: 'কাস্টমার পোর্টালের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.WIDGET]: 'ওয়েব উইজেটের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.SLACK]: 'স্ল্যাকের মাধ্যমে তৈরি টিকেট',
  [TICKET_CHANNEL.TEAMS]: 'মাইক্রোসফট টিমসের মাধ্যমে তৈরি টিকেট',
} as const;

/**
 * টিকেট চ্যানেলের ক্যাটাগরি
 */
export const TICKET_CHANNEL_CATEGORIES = {
  [TICKET_CHANNEL.EMAIL]: 'digital',
  [TICKET_CHANNEL.WEB]: 'digital',
  [TICKET_CHANNEL.PHONE]: 'voice',
  [TICKET_CHANNEL.LIVE_CHAT]: 'chat',
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 'social',
  [TICKET_CHANNEL.MOBILE_APP]: 'mobile',
  [TICKET_CHANNEL.API]: 'digital',
  [TICKET_CHANNEL.IN_APP]: 'mobile',
  [TICKET_CHANNEL.WHATSAPP]: 'social',
  [TICKET_CHANNEL.MESSENGER]: 'social',
  [TICKET_CHANNEL.SMS]: 'digital',
  [TICKET_CHANNEL.PORTAL]: 'digital',
  [TICKET_CHANNEL.WIDGET]: 'digital',
  [TICKET_CHANNEL.SLACK]: 'collaboration',
  [TICKET_CHANNEL.TEAMS]: 'collaboration',
} as const;

/**
 * টিকেট চ্যানেলের ডিফল্ট প্রায়োরিটি
 */
export const TICKET_CHANNEL_DEFAULT_PRIORITY = {
  [TICKET_CHANNEL.EMAIL]: 'medium',
  [TICKET_CHANNEL.WEB]: 'medium',
  [TICKET_CHANNEL.PHONE]: 'high',
  [TICKET_CHANNEL.LIVE_CHAT]: 'medium',
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 'low',
  [TICKET_CHANNEL.MOBILE_APP]: 'medium',
  [TICKET_CHANNEL.API]: 'high',
  [TICKET_CHANNEL.IN_APP]: 'medium',
  [TICKET_CHANNEL.WHATSAPP]: 'medium',
  [TICKET_CHANNEL.MESSENGER]: 'low',
  [TICKET_CHANNEL.SMS]: 'high',
  [TICKET_CHANNEL.PORTAL]: 'medium',
  [TICKET_CHANNEL.WIDGET]: 'medium',
  [TICKET_CHANNEL.SLACK]: 'high',
  [TICKET_CHANNEL.TEAMS]: 'high',
} as const;

/**
 * টিকেট চ্যানেলের প্রত্যাশিত রেসপন্স টাইম (মিনিটে)
 */
export const TICKET_CHANNEL_EXPECTED_RESPONSE_TIME = {
  [TICKET_CHANNEL.EMAIL]: 120,
  [TICKET_CHANNEL.WEB]: 60,
  [TICKET_CHANNEL.PHONE]: 5,
  [TICKET_CHANNEL.LIVE_CHAT]: 2,
  [TICKET_CHANNEL.SOCIAL_MEDIA]: 180,
  [TICKET_CHANNEL.MOBILE_APP]: 45,
  [TICKET_CHANNEL.API]: 15,
  [TICKET_CHANNEL.IN_APP]: 30,
  [TICKET_CHANNEL.WHATSAPP]: 10,
  [TICKET_CHANNEL.MESSENGER]: 15,
  [TICKET_CHANNEL.SMS]: 5,
  [TICKET_CHANNEL.PORTAL]: 60,
  [TICKET_CHANNEL.WIDGET]: 30,
  [TICKET_CHANNEL.SLACK]: 10,
  [TICKET_CHANNEL.TEAMS]: 10,
} as const;

/**
 * টিকেট চ্যানেলের অটো-রেসপন্স সেটিংস
 */
export const TICKET_CHANNEL_AUTO_RESPONSE = {
  [TICKET_CHANNEL.EMAIL]: {
    enabled: true,
    template: 'email_auto_response',
  },
  [TICKET_CHANNEL.WEB]: {
    enabled: true,
    template: 'web_auto_response',
  },
  [TICKET_CHANNEL.PHONE]: {
    enabled: false,
    template: '',
  },
  [TICKET_CHANNEL.LIVE_CHAT]: {
    enabled: true,
    template: 'chat_auto_response',
  },
  [TICKET_CHANNEL.SOCIAL_MEDIA]: {
    enabled: true,
    template: 'social_auto_response',
  },
  [TICKET_CHANNEL.MOBILE_APP]: {
    enabled: true,
    template: 'mobile_auto_response',
  },
  [TICKET_CHANNEL.API]: {
    enabled: false,
    template: '',
  },
  [TICKET_CHANNEL.IN_APP]: {
    enabled: true,
    template: 'in_app_auto_response',
  },
  [TICKET_CHANNEL.WHATSAPP]: {
    enabled: true,
    template: 'whatsapp_auto_response',
  },
  [TICKET_CHANNEL.MESSENGER]: {
    enabled: true,
    template: 'messenger_auto_response',
  },
  [TICKET_CHANNEL.SMS]: {
    enabled: true,
    template: 'sms_auto_response',
  },
  [TICKET_CHANNEL.PORTAL]: {
    enabled: true,
    template: 'portal_auto_response',
  },
  [TICKET_CHANNEL.WIDGET]: {
    enabled: true,
    template: 'widget_auto_response',
  },
  [TICKET_CHANNEL.SLACK]: {
    enabled: true,
    template: 'slack_auto_response',
  },
  [TICKET_CHANNEL.TEAMS]: {
    enabled: true,
    template: 'teams_auto_response',
  },
} as const;

/**
 * টিকেট চ্যানেলের নোটিফিকেশন সেটিংস
 */
export const TICKET_CHANNEL_NOTIFICATIONS = {
  [TICKET_CHANNEL.EMAIL]: {
    email: true,
    sms: false,
    push: false,
    slack: false,
  },
  [TICKET_CHANNEL.WEB]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CHANNEL.PHONE]: {
    email: false,
    sms: true,
    push: false,
    slack: true,
  },
  [TICKET_CHANNEL.LIVE_CHAT]: {
    email: false,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CHANNEL.SOCIAL_MEDIA]: {
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CHANNEL.MOBILE_APP]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CHANNEL.API]: {
    email: true,
    sms: false,
    push: false,
    slack: true,
  },
  [TICKET_CHANNEL.IN_APP]: {
    email: false,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CHANNEL.WHATSAPP]: {
    email: false,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CHANNEL.MESSENGER]: {
    email: false,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CHANNEL.SMS]: {
    email: false,
    sms: true,
    push: false,
    slack: true,
  },
  [TICKET_CHANNEL.PORTAL]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CHANNEL.WIDGET]: {
    email: false,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CHANNEL.SLACK]: {
    email: false,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CHANNEL.TEAMS]: {
    email: false,
    sms: false,
    push: true,
    slack: false,
  },
} as const;

/**
 * টিকেট চ্যানেলের ট্র্যাকিং তথ্য
 */
export const TICKET_CHANNEL_TRACKING = {
  [TICKET_CHANNEL.EMAIL]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.WEB]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: false,
  },
  [TICKET_CHANNEL.PHONE]: {
    trackOpen: false,
    trackClick: false,
    trackAttachment: false,
  },
  [TICKET_CHANNEL.LIVE_CHAT]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.SOCIAL_MEDIA]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: false,
  },
  [TICKET_CHANNEL.MOBILE_APP]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.API]: {
    trackOpen: false,
    trackClick: false,
    trackAttachment: false,
  },
  [TICKET_CHANNEL.IN_APP]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.WHATSAPP]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.MESSENGER]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.SMS]: {
    trackOpen: false,
    trackClick: false,
    trackAttachment: false,
  },
  [TICKET_CHANNEL.PORTAL]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.WIDGET]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.SLACK]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
  [TICKET_CHANNEL.TEAMS]: {
    trackOpen: true,
    trackClick: true,
    trackAttachment: true,
  },
} as const;

export type TicketChannel = (typeof TICKET_CHANNEL)[keyof typeof TICKET_CHANNEL];
export type TicketChannelDisplayNames = typeof TICKET_CHANNEL_DISPLAY_NAMES;
export type TicketChannelIcons = typeof TICKET_CHANNEL_ICONS;
export type TicketChannelColors = typeof TICKET_CHANNEL_COLORS;
export type TicketChannelDescriptions = typeof TICKET_CHANNEL_DESCRIPTIONS;
export type TicketChannelCategories = typeof TICKET_CHANNEL_CATEGORIES;
export type TicketChannelDefaultPriority = typeof TICKET_CHANNEL_DEFAULT_PRIORITY;
export type TicketChannelExpectedResponseTime = typeof TICKET_CHANNEL_EXPECTED_RESPONSE_TIME;
export type TicketChannelAutoResponse = typeof TICKET_CHANNEL_AUTO_RESPONSE;
export type TicketChannelNotifications = typeof TICKET_CHANNEL_NOTIFICATIONS;
export type TicketChannelTracking = typeof TICKET_CHANNEL_TRACKING;

export interface TicketChannelConfig {
  channel: TicketChannel;
  displayName: string;
  icon: string;
  color: string;
  description: string;
  category: string;
  defaultPriority: 'low' | 'medium' | 'high' | 'critical';
  expectedResponseTimeMinutes: number;
  autoResponse: {
    enabled: boolean;
    template: string;
  };
  notification: {
    email: boolean;
    sms: boolean;
    push: boolean;
    slack: boolean;
  };
  tracking: {
    trackOpen: boolean;
    trackClick: boolean;
    trackAttachment: boolean;
  };
}

/**
 * টিকেট চ্যানেল কনফিগারেশন অবজেক্ট
 */
export const TICKET_CHANNEL_CONFIGS: Record<TicketChannel, TicketChannelConfig> = {
  [TICKET_CHANNEL.EMAIL]: {
    channel: TICKET_CHANNEL.EMAIL,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.EMAIL],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.EMAIL],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.EMAIL],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.EMAIL],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.EMAIL],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.EMAIL] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.EMAIL],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.EMAIL],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.EMAIL],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.EMAIL],
  },
  [TICKET_CHANNEL.WEB]: {
    channel: TICKET_CHANNEL.WEB,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.WEB],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.WEB],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.WEB],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.WEB],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.WEB],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.WEB] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.WEB],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.WEB],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.WEB],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.WEB],
  },
  [TICKET_CHANNEL.PHONE]: {
    channel: TICKET_CHANNEL.PHONE,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.PHONE],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.PHONE],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.PHONE],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.PHONE],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.PHONE],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.PHONE] as 'high',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.PHONE],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.PHONE],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.PHONE],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.PHONE],
  },
  [TICKET_CHANNEL.LIVE_CHAT]: {
    channel: TICKET_CHANNEL.LIVE_CHAT,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.LIVE_CHAT],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.LIVE_CHAT],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.LIVE_CHAT],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.LIVE_CHAT],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.LIVE_CHAT],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.LIVE_CHAT] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.LIVE_CHAT],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.LIVE_CHAT],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.LIVE_CHAT],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.LIVE_CHAT],
  },
  [TICKET_CHANNEL.SOCIAL_MEDIA]: {
    channel: TICKET_CHANNEL.SOCIAL_MEDIA,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.SOCIAL_MEDIA],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.SOCIAL_MEDIA],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.SOCIAL_MEDIA],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.SOCIAL_MEDIA],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.SOCIAL_MEDIA],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.SOCIAL_MEDIA] as 'low',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.SOCIAL_MEDIA],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.SOCIAL_MEDIA],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.SOCIAL_MEDIA],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.SOCIAL_MEDIA],
  },
  [TICKET_CHANNEL.MOBILE_APP]: {
    channel: TICKET_CHANNEL.MOBILE_APP,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.MOBILE_APP],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.MOBILE_APP],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.MOBILE_APP],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.MOBILE_APP],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.MOBILE_APP],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.MOBILE_APP] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.MOBILE_APP],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.MOBILE_APP],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.MOBILE_APP],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.MOBILE_APP],
  },
  [TICKET_CHANNEL.API]: {
    channel: TICKET_CHANNEL.API,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.API],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.API],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.API],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.API],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.API],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.API] as 'high',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.API],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.API],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.API],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.API],
  },
  [TICKET_CHANNEL.IN_APP]: {
    channel: TICKET_CHANNEL.IN_APP,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.IN_APP],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.IN_APP],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.IN_APP],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.IN_APP],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.IN_APP],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.IN_APP] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.IN_APP],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.IN_APP],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.IN_APP],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.IN_APP],
  },
  [TICKET_CHANNEL.WHATSAPP]: {
    channel: TICKET_CHANNEL.WHATSAPP,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.WHATSAPP],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.WHATSAPP],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.WHATSAPP],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.WHATSAPP],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.WHATSAPP],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.WHATSAPP] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.WHATSAPP],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.WHATSAPP],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.WHATSAPP],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.WHATSAPP],
  },
  [TICKET_CHANNEL.MESSENGER]: {
    channel: TICKET_CHANNEL.MESSENGER,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.MESSENGER],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.MESSENGER],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.MESSENGER],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.MESSENGER],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.MESSENGER],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.MESSENGER] as 'low',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.MESSENGER],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.MESSENGER],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.MESSENGER],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.MESSENGER],
  },
  [TICKET_CHANNEL.SMS]: {
    channel: TICKET_CHANNEL.SMS,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.SMS],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.SMS],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.SMS],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.SMS],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.SMS],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.SMS] as 'high',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.SMS],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.SMS],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.SMS],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.SMS],
  },
  [TICKET_CHANNEL.PORTAL]: {
    channel: TICKET_CHANNEL.PORTAL,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.PORTAL],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.PORTAL],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.PORTAL],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.PORTAL],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.PORTAL],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.PORTAL] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.PORTAL],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.PORTAL],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.PORTAL],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.PORTAL],
  },
  [TICKET_CHANNEL.WIDGET]: {
    channel: TICKET_CHANNEL.WIDGET,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.WIDGET],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.WIDGET],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.WIDGET],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.WIDGET],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.WIDGET],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.WIDGET] as 'medium',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.WIDGET],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.WIDGET],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.WIDGET],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.WIDGET],
  },
  [TICKET_CHANNEL.SLACK]: {
    channel: TICKET_CHANNEL.SLACK,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.SLACK],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.SLACK],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.SLACK],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.SLACK],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.SLACK],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.SLACK] as 'high',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.SLACK],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.SLACK],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.SLACK],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.SLACK],
  },
  [TICKET_CHANNEL.TEAMS]: {
    channel: TICKET_CHANNEL.TEAMS,
    displayName: TICKET_CHANNEL_DISPLAY_NAMES[TICKET_CHANNEL.TEAMS],
    icon: TICKET_CHANNEL_ICONS[TICKET_CHANNEL.TEAMS],
    color: TICKET_CHANNEL_COLORS[TICKET_CHANNEL.TEAMS],
    description: TICKET_CHANNEL_DESCRIPTIONS[TICKET_CHANNEL.TEAMS],
    category: TICKET_CHANNEL_CATEGORIES[TICKET_CHANNEL.TEAMS],
    defaultPriority: TICKET_CHANNEL_DEFAULT_PRIORITY[TICKET_CHANNEL.TEAMS] as 'high',
    expectedResponseTimeMinutes: TICKET_CHANNEL_EXPECTED_RESPONSE_TIME[TICKET_CHANNEL.TEAMS],
    autoResponse: TICKET_CHANNEL_AUTO_RESPONSE[TICKET_CHANNEL.TEAMS],
    notification: TICKET_CHANNEL_NOTIFICATIONS[TICKET_CHANNEL.TEAMS],
    tracking: TICKET_CHANNEL_TRACKING[TICKET_CHANNEL.TEAMS],
  },
};
