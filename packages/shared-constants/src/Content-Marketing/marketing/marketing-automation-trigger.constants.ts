/**
 * অটোমেশন ট্রিগার সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ট্রিগারের ধরনসমূহ
 */
export const TRIGGER_TYPES = [
  'user-action',
  'date-based',
  'event-based',
  'condition-based',
] as const;

/**
 * ট্রিগার ইভেন্টসমূহ
 */
export const TRIGGER_EVENTS = [
  'signup',
  'purchase',
  'abandoned-cart',
  'birthday',
  'anniversary',
] as const;

/**
 * ট্রিগার টাইপ টাইপ
 */
export type TriggerType = (typeof TRIGGER_TYPES)[number];

/**
 * ট্রিগার ইভেন্ট টাইপ
 */
export type TriggerEvent = (typeof TRIGGER_EVENTS)[number];

/**
 * প্রতিটি ট্রিগার টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const TRIGGER_TYPE_LABELS = {
  'user-action': {
    en: 'User Action',
    bn: 'ব্যবহারকারীর কর্ম',
  },
  'date-based': {
    en: 'Date Based',
    bn: 'তারিখ ভিত্তিক',
  },
  'event-based': {
    en: 'Event Based',
    bn: 'ইভেন্ট ভিত্তিক',
  },
  'condition-based': {
    en: 'Condition Based',
    bn: 'শর্ত ভিত্তিক',
  },
} as const satisfies Record<TriggerType, { en: string; bn: string }>;

/**
 * প্রতিটি ট্রিগার ইভেন্টের লেবেল (বাংলা এবং ইংরেজি)
 */
export const TRIGGER_EVENT_LABELS = {
  signup: {
    en: 'User Signup',
    bn: 'ব্যবহারকারী নিবন্ধন',
  },
  purchase: {
    en: 'Purchase',
    bn: 'ক্রয়',
  },
  'abandoned-cart': {
    en: 'Abandoned Cart',
    bn: 'পরিত্যক্ত কার্ট',
  },
  birthday: {
    en: 'Birthday',
    bn: 'জন্মদিন',
  },
  anniversary: {
    en: 'Anniversary',
    bn: 'বার্ষিকী',
  },
} as const satisfies Record<TriggerEvent, { en: string; bn: string }>;

/**
 * প্রতিটি ট্রিগার টাইপের আইকন
 */
export const TRIGGER_TYPE_ICONS = {
  'user-action': '👤',
  'date-based': '📅',
  'event-based': '🎯',
  'condition-based': '🔍',
} as const satisfies Record<TriggerType, string>;

/**
 * প্রতিটি ট্রিগার ইভেন্টের আইকন
 */
export const TRIGGER_EVENT_ICONS = {
  signup: '📝',
  purchase: '🛒',
  'abandoned-cart': '🛍️',
  birthday: '🎂',
  anniversary: '🎉',
} as const satisfies Record<TriggerEvent, string>;

/**
 * প্রতিটি ট্রিগার টাইপের রঙ
 */
export const TRIGGER_TYPE_COLORS = {
  'user-action': '#3B82F6',
  'date-based': '#10B981',
  'event-based': '#8B5CF6',
  'condition-based': '#F59E0B',
} as const satisfies Record<TriggerType, string>;

/**
 * প্রতিটি ট্রিগার ইভেন্টের রঙ
 */
export const TRIGGER_EVENT_COLORS = {
  signup: '#3B82F6',
  purchase: '#10B981',
  'abandoned-cart': '#EF4444',
  birthday: '#EC4899',
  anniversary: '#8B5CF6',
} as const satisfies Record<TriggerEvent, string>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট ট্রিগার টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getTriggerTypeLabel(type: TriggerType, lang: Language = 'en'): string {
  return TRIGGER_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট ট্রিগার ইভেন্টের লেবেল পাওয়ার ফাংশন
 */
export function getTriggerEventLabel(event: TriggerEvent, lang: Language = 'en'): string {
  return TRIGGER_EVENT_LABELS[event][lang];
}

/**
 * নির্দিষ্ট ট্রিগার টাইপের আইকন পাওয়ার ফাংশন
 */
export function getTriggerTypeIcon(type: TriggerType): string {
  return TRIGGER_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট ট্রিগার ইভেন্টের আইকন পাওয়ার ফাংশন
 */
export function getTriggerEventIcon(event: TriggerEvent): string {
  return TRIGGER_EVENT_ICONS[event];
}

/**
 * নির্দিষ্ট ট্রিগার টাইপের রঙ পাওয়ার ফাংশন
 */
export function getTriggerTypeColor(type: TriggerType): string {
  return TRIGGER_TYPE_COLORS[type];
}

/**
 * নির্দিষ্ট ট্রিগার ইভেন্টের রঙ পাওয়ার ফাংশন
 */
export function getTriggerEventColor(event: TriggerEvent): string {
  return TRIGGER_EVENT_COLORS[event];
}

/**
 * সব ট্রিগার টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllTriggerTypes(): readonly TriggerType[] {
  return TRIGGER_TYPES;
}

/**
 * সব ট্রিগার ইভেন্টের তালিকা পাওয়ার ফাংশন
 */
export function getAllTriggerEvents(): readonly TriggerEvent[] {
  return TRIGGER_EVENTS;
}

/**
 * ট্রিগার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTriggerType(type: string): type is TriggerType {
  return TRIGGER_TYPES.includes(type as TriggerType);
}

/**
 * ট্রিগার ইভেন্ট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTriggerEvent(event: string): event is TriggerEvent {
  return TRIGGER_EVENTS.includes(event as TriggerEvent);
}

/**
 * টাইপ ইউজার-অ্যাকশন কিনা চেক করার ফাংশন
 */
export function isUserActionTriggerType(type: TriggerType): boolean {
  return type === 'user-action';
}

/**
 * টাইপ ডেট-বেসড কিনা চেক করার ফাংশন
 */
export function isDateBasedTriggerType(type: TriggerType): boolean {
  return type === 'date-based';
}

/**
 * টাইপ ইভেন্ট-বেসড কিনা চেক করার ফাংশন
 */
export function isEventBasedTriggerType(type: TriggerType): boolean {
  return type === 'event-based';
}

/**
 * টাইপ কন্ডিশন-বেসড কিনা চেক করার ফাংশন
 */
export function isConditionBasedTriggerType(type: TriggerType): boolean {
  return type === 'condition-based';
}

/**
 * ইভেন্ট সাইনআপ কিনা চেক করার ফাংশন
 */
export function isSignupTriggerEvent(event: TriggerEvent): boolean {
  return event === 'signup';
}

/**
 * ইভেন্ট পার্চেজ কিনা চেক করার ফাংশন
 */
export function isPurchaseTriggerEvent(event: TriggerEvent): boolean {
  return event === 'purchase';
}

/**
 * ইভেন্ট অ্যাব্যান্ডনড-কার্ট কিনা চেক করার ফাংশন
 */
export function isAbandonedCartTriggerEvent(event: TriggerEvent): boolean {
  return event === 'abandoned-cart';
}

/**
 * ইভেন্ট বার্থডে কিনা চেক করার ফাংশন
 */
export function isBirthdayTriggerEvent(event: TriggerEvent): boolean {
  return event === 'birthday';
}

/**
 * ইভেন্ট অ্যানিভার্সারি কিনা চেক করার ফাংশন
 */
export function isAnniversaryTriggerEvent(event: TriggerEvent): boolean {
  return event === 'anniversary';
}

/**
 * ইভেন্ট ট্রানজেকশনাল (পার্চেজ, অ্যাব্যান্ডনড-কার্ট) কিনা চেক করার ফাংশন
 */
export function isTransactionalTriggerEvent(event: TriggerEvent): boolean {
  return event === 'purchase' || event === 'abandoned-cart';
}

/**
 * ইভেন্ট পার্সোনাল (বার্থডে, অ্যানিভার্সারি) কিনা চেক করার ফাংশন
 */
export function isPersonalTriggerEvent(event: TriggerEvent): boolean {
  return event === 'birthday' || event === 'anniversary';
}

/**
 * ইভেন্ট অ্যাকুইজিশন (সাইনআপ) কিনা চেক করার ফাংশন
 */
export function isAcquisitionTriggerEvent(event: TriggerEvent): boolean {
  return event === 'signup';
}

/**
 * ডিফল্ট ট্রিগার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultTriggerType(): TriggerType {
  return 'user-action';
}

/**
 * ডিফল্ট ট্রিগার ইভেন্ট পাওয়ার ফাংশন
 */
export function getDefaultTriggerEvent(): TriggerEvent {
  return 'signup';
}

/**
 * ট্রিগার টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getTriggerTypeDescription(type: TriggerType, lang: Language = 'en'): string {
  const descriptions: Record<TriggerType, { en: string; bn: string }> = {
    'user-action': {
      en: 'Triggers based on user actions and behaviors',
      bn: 'ব্যবহারকারীর কর্ম এবং আচরণের ভিত্তিতে ট্রিগার হয়',
    },
    'date-based': {
      en: 'Triggers based on specific dates or schedules',
      bn: 'নির্দিষ্ট তারিখ বা সময়সূচীর ভিত্তিতে ট্রিগার হয়',
    },
    'event-based': {
      en: 'Triggers based on specific events',
      bn: 'নির্দিষ্ট ইভেন্টের ভিত্তিতে ট্রিগার হয়',
    },
    'condition-based': {
      en: 'Triggers based on specific conditions being met',
      bn: 'নির্দিষ্ট শর্ত পূরণ হলে ট্রিগার হয়',
    },
  };
  return descriptions[type][lang];
}

/**
 * ট্রিগার ইভেন্টের বিবরণ পাওয়ার ফাংশন
 */
export function getTriggerEventDescription(event: TriggerEvent, lang: Language = 'en'): string {
  const descriptions: Record<TriggerEvent, { en: string; bn: string }> = {
    signup: {
      en: 'Triggers when a user signs up',
      bn: 'যখন একজন ব্যবহারকারী নিবন্ধন করে তখন ট্রিগার হয়',
    },
    purchase: {
      en: 'Triggers when a purchase is made',
      bn: 'যখন একটি ক্রয় করা হয় তখন ট্রিগার হয়',
    },
    'abandoned-cart': {
      en: 'Triggers when a cart is abandoned',
      bn: 'যখন একটি কার্ট পরিত্যাগ করা হয় তখন ট্রিগার হয়',
    },
    birthday: {
      en: "Triggers on user's birthday",
      bn: 'ব্যবহারকারীর জন্মদিনে ট্রিগার হয়',
    },
    anniversary: {
      en: "Triggers on user's anniversary",
      bn: 'ব্যবহারকারীর বার্ষিকীতে ট্রিগার হয়',
    },
  };
  return descriptions[event][lang];
}
