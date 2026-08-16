/**
 * অটোমেশন অ্যাকশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অটোমেশন অ্যাকশনের ধরনসমূহ
 */
export const ACTION_TYPES = [
  'send-email',
  'send-sms',
  'send-push',
  'add-tag',
  'remove-tag',
  'add-points',
] as const;

/**
 * অ্যাকশন টাইপ টাইপ
 */
export type ActionType = (typeof ACTION_TYPES)[number];

/**
 * প্রতিটি অ্যাকশন টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const ACTION_TYPE_LABELS = {
  'send-email': {
    en: 'Send Email',
    bn: 'ইমেইল পাঠান',
  },
  'send-sms': {
    en: 'Send SMS',
    bn: 'এসএমএস পাঠান',
  },
  'send-push': {
    en: 'Send Push Notification',
    bn: 'পুশ বিজ্ঞপ্তি পাঠান',
  },
  'add-tag': {
    en: 'Add Tag',
    bn: 'ট্যাগ যোগ করুন',
  },
  'remove-tag': {
    en: 'Remove Tag',
    bn: 'ট্যাগ সরান',
  },
  'add-points': {
    en: 'Add Points',
    bn: 'পয়েন্ট যোগ করুন',
  },
} as const satisfies Record<ActionType, { en: string; bn: string }>;

/**
 * প্রতিটি অ্যাকশন টাইপের আইকন
 */
export const ACTION_TYPE_ICONS = {
  'send-email': '📧',
  'send-sms': '💬',
  'send-push': '🔔',
  'add-tag': '🏷️',
  'remove-tag': '🗑️',
  'add-points': '⭐',
} as const satisfies Record<ActionType, string>;

/**
 * প্রতিটি অ্যাকশন টাইপের রঙ
 */
export const ACTION_TYPE_COLORS = {
  'send-email': '#3B82F6',
  'send-sms': '#10B981',
  'send-push': '#8B5CF6',
  'add-tag': '#EC4899',
  'remove-tag': '#EF4444',
  'add-points': '#F59E0B',
} as const satisfies Record<ActionType, string>;

/**
 * প্রতিটি অ্যাকশন টাইপের ক্যাটাগরি
 */
export const ACTION_TYPE_CATEGORIES = {
  'send-email': 'communication',
  'send-sms': 'communication',
  'send-push': 'communication',
  'add-tag': 'tagging',
  'remove-tag': 'tagging',
  'add-points': 'points',
} as const satisfies Record<ActionType, string>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট অ্যাকশন টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getActionTypeLabel(type: ActionType, lang: Language = 'en'): string {
  return ACTION_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট অ্যাকশন টাইপের আইকন পাওয়ার ফাংশন
 */
export function getActionTypeIcon(type: ActionType): string {
  return ACTION_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট অ্যাকশন টাইপের রঙ পাওয়ার ফাংশন
 */
export function getActionTypeColor(type: ActionType): string {
  return ACTION_TYPE_COLORS[type];
}

/**
 * নির্দিষ্ট অ্যাকশন টাইপের ক্যাটাগরি পাওয়ার ফাংশন
 */
export function getActionTypeCategory(type: ActionType): string {
  return ACTION_TYPE_CATEGORIES[type];
}

/**
 * সব অ্যাকশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllActionTypes(): readonly ActionType[] {
  return ACTION_TYPES;
}

/**
 * অ্যাকশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidActionType(type: string): type is ActionType {
  return ACTION_TYPES.includes(type as ActionType);
}

/**
 * টাইপ কমিউনিকেশন (সেন্ড-ইমেইল, সেন্ড-এসএমএস, সেন্ড-পুশ) কিনা চেক করার ফাংশন
 */
export function isCommunicationActionType(type: ActionType): boolean {
  return type === 'send-email' || type === 'send-sms' || type === 'send-push';
}

/**
 * টাইপ ট্যাগিং (অ্যাড-ট্যাগ, রিমুভ-ট্যাগ) কিনা চেক করার ফাংশন
 */
export function isTaggingActionType(type: ActionType): boolean {
  return type === 'add-tag' || type === 'remove-tag';
}

/**
 * টাইপ পয়েন্টস (অ্যাড-পয়েন্টস) কিনা চেক করার ফাংশন
 */
export function isPointsActionType(type: ActionType): boolean {
  return type === 'add-points';
}

/**
 * টাইপ ইমেইল কিনা চেক করার ফাংশন
 */
export function isSendEmailActionType(type: ActionType): boolean {
  return type === 'send-email';
}

/**
 * টাইপ এসএমএস কিনা চেক করার ফাংশন
 */
export function isSendSmsActionType(type: ActionType): boolean {
  return type === 'send-sms';
}

/**
 * টাইপ পুশ কিনা চেক করার ফাংশন
 */
export function isSendPushActionType(type: ActionType): boolean {
  return type === 'send-push';
}

/**
 * টাইপ অ্যাড-ট্যাগ কিনা চেক করার ফাংশন
 */
export function isAddTagActionType(type: ActionType): boolean {
  return type === 'add-tag';
}

/**
 * টাইপ রিমুভ-ট্যাগ কিনা চেক করার ফাংশন
 */
export function isRemoveTagActionType(type: ActionType): boolean {
  return type === 'remove-tag';
}

/**
 * টাইপ অ্যাড-পয়েন্টস কিনা চেক করার ফাংশন
 */
export function isAddPointsActionType(type: ActionType): boolean {
  return type === 'add-points';
}

/**
 * অ্যাকশন টাইপ যোগ বা বিয়োগ (ট্যাগ) কিনা চেক করার ফাংশন
 */
export function isTagModificationActionType(type: ActionType): boolean {
  return type === 'add-tag' || type === 'remove-tag';
}

/**
 * ডিফল্ট অ্যাকশন টাইপ পাওয়ার ফাংশন
 */
export function getDefaultActionType(): ActionType {
  return 'send-email';
}

/**
 * অ্যাকশন টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getActionTypeDescription(type: ActionType, lang: Language = 'en'): string {
  const descriptions: Record<ActionType, { en: string; bn: string }> = {
    'send-email': {
      en: 'Send an email to the user',
      bn: 'ব্যবহারকারীকে একটি ইমেইল পাঠান',
    },
    'send-sms': {
      en: 'Send an SMS to the user',
      bn: 'ব্যবহারকারীকে একটি এসএমএস পাঠান',
    },
    'send-push': {
      en: 'Send a push notification to the user',
      bn: 'ব্যবহারকারীকে একটি পুশ বিজ্ঞপ্তি পাঠান',
    },
    'add-tag': {
      en: 'Add a tag to the user profile',
      bn: 'ব্যবহারকারীর প্রোফাইলে একটি ট্যাগ যোগ করুন',
    },
    'remove-tag': {
      en: 'Remove a tag from the user profile',
      bn: 'ব্যবহারকারীর প্রোফাইল থেকে একটি ট্যাগ সরান',
    },
    'add-points': {
      en: 'Add loyalty points to the user account',
      bn: 'ব্যবহারকারীর অ্যাকাউন্টে লয়্যালটি পয়েন্ট যোগ করুন',
    },
  };
  return descriptions[type][lang];
}
