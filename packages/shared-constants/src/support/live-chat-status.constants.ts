/**
 * লাইভ চ্যাটের বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * লাইভ চ্যাট স্ট্যাটাস
 */
export const LIVE_CHAT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
  AWAY: 'away',
  MAINTENANCE: 'maintenance',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected',
  RECONNECTING: 'reconnecting',
  PAUSED: 'paused',
  CLOSED: 'closed',
  INITIATING: 'initiating',
  WAITING: 'waiting',
  ACTIVE: 'active',
  TIMED_OUT: 'timed_out',
  TRANSFERRING: 'transferring',
  ARCHIVED: 'archived',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const LIVE_CHAT_STATUS_DISPLAY_NAMES = {
  [LIVE_CHAT_STATUS.ONLINE]: 'অনলাইন',
  [LIVE_CHAT_STATUS.OFFLINE]: 'অফলাইন',
  [LIVE_CHAT_STATUS.BUSY]: 'ব্যস্ত',
  [LIVE_CHAT_STATUS.AWAY]: 'দূরে',
  [LIVE_CHAT_STATUS.MAINTENANCE]: 'রক্ষণাবেক্ষণ',
  [LIVE_CHAT_STATUS.CONNECTING]: 'সংযোগ স্থাপন হচ্ছে',
  [LIVE_CHAT_STATUS.DISCONNECTED]: 'সংযোগ বিচ্ছিন্ন',
  [LIVE_CHAT_STATUS.RECONNECTING]: 'পুনরায় সংযোগ স্থাপন হচ্ছে',
  [LIVE_CHAT_STATUS.PAUSED]: 'বিরতিপ্রাপ্ত',
  [LIVE_CHAT_STATUS.CLOSED]: 'বন্ধ',
  [LIVE_CHAT_STATUS.INITIATING]: 'শুরু হচ্ছে',
  [LIVE_CHAT_STATUS.WAITING]: 'অপেক্ষমান',
  [LIVE_CHAT_STATUS.ACTIVE]: 'সক্রিয়',
  [LIVE_CHAT_STATUS.TIMED_OUT]: 'সময় শেষ',
  [LIVE_CHAT_STATUS.TRANSFERRING]: 'স্থানান্তর হচ্ছে',
  [LIVE_CHAT_STATUS.ARCHIVED]: 'আর্কাইভড',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const LIVE_CHAT_STATUS_COLORS = {
  [LIVE_CHAT_STATUS.ONLINE]: '#2ecc71',
  [LIVE_CHAT_STATUS.OFFLINE]: '#95a5a6',
  [LIVE_CHAT_STATUS.BUSY]: '#e74c3c',
  [LIVE_CHAT_STATUS.AWAY]: '#f39c12',
  [LIVE_CHAT_STATUS.MAINTENANCE]: '#e67e22',
  [LIVE_CHAT_STATUS.CONNECTING]: '#3498db',
  [LIVE_CHAT_STATUS.DISCONNECTED]: '#e74c3c',
  [LIVE_CHAT_STATUS.RECONNECTING]: '#3498db',
  [LIVE_CHAT_STATUS.PAUSED]: '#f39c12',
  [LIVE_CHAT_STATUS.CLOSED]: '#7f8c8d',
  [LIVE_CHAT_STATUS.INITIATING]: '#1abc9c',
  [LIVE_CHAT_STATUS.WAITING]: '#9b59b6',
  [LIVE_CHAT_STATUS.ACTIVE]: '#2ecc71',
  [LIVE_CHAT_STATUS.TIMED_OUT]: '#c0392b',
  [LIVE_CHAT_STATUS.TRANSFERRING]: '#e67e22',
  [LIVE_CHAT_STATUS.ARCHIVED]: '#95a5a6',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const LIVE_CHAT_STATUS_ICONS = {
  [LIVE_CHAT_STATUS.ONLINE]: 'wifi',
  [LIVE_CHAT_STATUS.OFFLINE]: 'wifi-off',
  [LIVE_CHAT_STATUS.BUSY]: 'slash',
  [LIVE_CHAT_STATUS.AWAY]: 'clock',
  [LIVE_CHAT_STATUS.MAINTENANCE]: 'wrench',
  [LIVE_CHAT_STATUS.CONNECTING]: 'loader',
  [LIVE_CHAT_STATUS.DISCONNECTED]: 'x-circle',
  [LIVE_CHAT_STATUS.RECONNECTING]: 'refresh-cw',
  [LIVE_CHAT_STATUS.PAUSED]: 'pause-circle',
  [LIVE_CHAT_STATUS.CLOSED]: 'x-circle',
  [LIVE_CHAT_STATUS.INITIATING]: 'circle',
  [LIVE_CHAT_STATUS.WAITING]: 'clock',
  [LIVE_CHAT_STATUS.ACTIVE]: 'check-circle',
  [LIVE_CHAT_STATUS.TIMED_OUT]: 'clock',
  [LIVE_CHAT_STATUS.TRANSFERRING]: 'arrow-right-circle',
  [LIVE_CHAT_STATUS.ARCHIVED]: 'archive',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের ক্যাটাগরি
 */
export const LIVE_CHAT_STATUS_CATEGORIES = {
  [LIVE_CHAT_STATUS.ONLINE]: 'available',
  [LIVE_CHAT_STATUS.OFFLINE]: 'unavailable',
  [LIVE_CHAT_STATUS.BUSY]: 'unavailable',
  [LIVE_CHAT_STATUS.AWAY]: 'unavailable',
  [LIVE_CHAT_STATUS.MAINTENANCE]: 'unavailable',
  [LIVE_CHAT_STATUS.CONNECTING]: 'pending',
  [LIVE_CHAT_STATUS.DISCONNECTED]: 'error',
  [LIVE_CHAT_STATUS.RECONNECTING]: 'pending',
  [LIVE_CHAT_STATUS.PAUSED]: 'inactive',
  [LIVE_CHAT_STATUS.CLOSED]: 'completed',
  [LIVE_CHAT_STATUS.INITIATING]: 'pending',
  [LIVE_CHAT_STATUS.WAITING]: 'pending',
  [LIVE_CHAT_STATUS.ACTIVE]: 'available',
  [LIVE_CHAT_STATUS.TIMED_OUT]: 'error',
  [LIVE_CHAT_STATUS.TRANSFERRING]: 'pending',
  [LIVE_CHAT_STATUS.ARCHIVED]: 'inactive',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাস গ্রুপ
 */
export const LIVE_CHAT_STATUS_GROUPS = {
  AVAILABLE: ['online', 'active'] as const,
  UNAVAILABLE: ['offline', 'busy', 'away', 'maintenance'] as const,
  PENDING: ['initiating', 'connecting', 'waiting', 'reconnecting', 'transferring'] as const,
  INACTIVE: ['paused', 'archived'] as const,
  COMPLETED: ['closed'] as const,
  ERROR: ['disconnected', 'timed_out'] as const,
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const LIVE_CHAT_STATUS_TRANSITIONS = {
  [LIVE_CHAT_STATUS.ONLINE]: ['offline', 'busy', 'away', 'maintenance'] as const,
  [LIVE_CHAT_STATUS.OFFLINE]: ['online', 'connecting'] as const,
  [LIVE_CHAT_STATUS.BUSY]: ['online', 'offline', 'away'] as const,
  [LIVE_CHAT_STATUS.AWAY]: ['online', 'offline', 'busy'] as const,
  [LIVE_CHAT_STATUS.MAINTENANCE]: ['online', 'offline'] as const,
  [LIVE_CHAT_STATUS.CONNECTING]: ['online', 'disconnected', 'timed_out'] as const,
  [LIVE_CHAT_STATUS.DISCONNECTED]: ['reconnecting', 'offline', 'closed'] as const,
  [LIVE_CHAT_STATUS.RECONNECTING]: ['online', 'disconnected', 'timed_out'] as const,
  [LIVE_CHAT_STATUS.PAUSED]: ['active', 'closed', 'timed_out'] as const,
  [LIVE_CHAT_STATUS.CLOSED]: ['archived'] as const,
  [LIVE_CHAT_STATUS.INITIATING]: ['connecting', 'waiting', 'closed'] as const,
  [LIVE_CHAT_STATUS.WAITING]: ['active', 'timed_out', 'closed'] as const,
  [LIVE_CHAT_STATUS.ACTIVE]: ['paused', 'transferring', 'closed', 'timed_out'] as const,
  [LIVE_CHAT_STATUS.TIMED_OUT]: ['closed'] as const,
  [LIVE_CHAT_STATUS.TRANSFERRING]: ['active', 'closed', 'timed_out'] as const,
  [LIVE_CHAT_STATUS.ARCHIVED]: [] as const,
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const LIVE_CHAT_STATUS_DEFAULT_ACTIONS = {
  [LIVE_CHAT_STATUS.ONLINE]: 'চ্যাট সার্ভিস অনলাইন, সংযোগের জন্য প্রস্তুত',
  [LIVE_CHAT_STATUS.OFFLINE]: 'চ্যাট সার্ভিস অফলাইন, পরে আবার চেষ্টা করুন',
  [LIVE_CHAT_STATUS.BUSY]: 'এজেন্ট ব্যস্ত, অনুগ্রহ করে অপেক্ষা করুন',
  [LIVE_CHAT_STATUS.AWAY]: 'এজেন্ট দূরে, শীঘ্রই ফিরে আসবেন',
  [LIVE_CHAT_STATUS.MAINTENANCE]: 'চ্যাট সার্ভিস রক্ষণাবেক্ষণে, পরে আবার চেষ্টা করুন',
  [LIVE_CHAT_STATUS.CONNECTING]: 'সংযোগ স্থাপন হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন',
  [LIVE_CHAT_STATUS.DISCONNECTED]: 'সংযোগ বিচ্ছিন্ন হয়েছে, পুনরায় সংযোগ করুন',
  [LIVE_CHAT_STATUS.RECONNECTING]: 'পুনরায় সংযোগ স্থাপন করা হচ্ছে',
  [LIVE_CHAT_STATUS.PAUSED]: 'চ্যাট বিরতিপ্রাপ্ত, পুনরায় শুরু করতে ক্লিক করুন',
  [LIVE_CHAT_STATUS.CLOSED]: 'চ্যাট বন্ধ করা হয়েছে',
  [LIVE_CHAT_STATUS.INITIATING]: 'চ্যাট শুরু হচ্ছে',
  [LIVE_CHAT_STATUS.WAITING]: 'এজেন্টের সাথে সংযোগের অপেক্ষায়',
  [LIVE_CHAT_STATUS.ACTIVE]: 'চ্যাট সক্রিয়, মেসেজ পাঠান',
  [LIVE_CHAT_STATUS.TIMED_OUT]: 'সংযোগের সময় শেষ হয়েছে',
  [LIVE_CHAT_STATUS.TRANSFERRING]: 'চ্যাট অন্য এজেন্টে স্থানান্তর হচ্ছে',
  [LIVE_CHAT_STATUS.ARCHIVED]: 'চ্যাট আর্কাইভ করা হয়েছে',
} as const;

/**
 * লাইভ চ্যাট স্ট্যাটাসের অনুমোদিত কর্ম (মিউটেবল অ্যারে হিসেবে)
 */
export const LIVE_CHAT_STATUS_ALLOWED_ACTIONS = {
  [LIVE_CHAT_STATUS.ONLINE]: ['start_chat', 'set_offline', 'set_busy', 'set_away'] as string[],
  [LIVE_CHAT_STATUS.OFFLINE]: ['set_online'] as string[],
  [LIVE_CHAT_STATUS.BUSY]: ['set_online', 'set_away'] as string[],
  [LIVE_CHAT_STATUS.AWAY]: ['set_online', 'set_busy'] as string[],
  [LIVE_CHAT_STATUS.MAINTENANCE]: ['set_online', 'set_offline'] as string[],
  [LIVE_CHAT_STATUS.CONNECTING]: ['cancel', 'retry'] as string[],
  [LIVE_CHAT_STATUS.DISCONNECTED]: ['reconnect', 'close'] as string[],
  [LIVE_CHAT_STATUS.RECONNECTING]: ['cancel', 'retry'] as string[],
  [LIVE_CHAT_STATUS.PAUSED]: ['resume', 'close'] as string[],
  [LIVE_CHAT_STATUS.CLOSED]: ['archive', 'reopen'] as string[],
  [LIVE_CHAT_STATUS.INITIATING]: ['cancel'] as string[],
  [LIVE_CHAT_STATUS.WAITING]: ['cancel', 'close'] as string[],
  [LIVE_CHAT_STATUS.ACTIVE]: ['pause', 'transfer', 'close', 'end'] as string[],
  [LIVE_CHAT_STATUS.TIMED_OUT]: ['close', 'retry'] as string[],
  [LIVE_CHAT_STATUS.TRANSFERRING]: ['cancel_transfer'] as string[],
  [LIVE_CHAT_STATUS.ARCHIVED]: ['restore', 'delete'] as string[],
} as const;

export type LiveChatStatus = (typeof LIVE_CHAT_STATUS)[keyof typeof LIVE_CHAT_STATUS];
export type LiveChatStatusDisplayNames = typeof LIVE_CHAT_STATUS_DISPLAY_NAMES;
export type LiveChatStatusColors = typeof LIVE_CHAT_STATUS_COLORS;
export type LiveChatStatusIcons = typeof LIVE_CHAT_STATUS_ICONS;
export type LiveChatStatusCategories = typeof LIVE_CHAT_STATUS_CATEGORIES;
export type LiveChatStatusGroups = typeof LIVE_CHAT_STATUS_GROUPS;
export type LiveChatStatusTransitions = typeof LIVE_CHAT_STATUS_TRANSITIONS;
export type LiveChatStatusDefaultActions = typeof LIVE_CHAT_STATUS_DEFAULT_ACTIONS;
export type LiveChatStatusAllowedActions = typeof LIVE_CHAT_STATUS_ALLOWED_ACTIONS;

export interface LiveChatStatusConfig {
  status: LiveChatStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'available' | 'unavailable' | 'pending' | 'inactive' | 'completed' | 'error';
  defaultAction: string;
  allowedActions: string[];
}

/**
 * লাইভ চ্যাট স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const LIVE_CHAT_STATUS_CONFIGS: Record<LiveChatStatus, LiveChatStatusConfig> = {
  [LIVE_CHAT_STATUS.ONLINE]: {
    status: LIVE_CHAT_STATUS.ONLINE,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.ONLINE],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.ONLINE],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.ONLINE],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.ONLINE] as 'available',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.ONLINE],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.ONLINE],
  },
  [LIVE_CHAT_STATUS.OFFLINE]: {
    status: LIVE_CHAT_STATUS.OFFLINE,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.OFFLINE],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.OFFLINE],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.OFFLINE],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.OFFLINE] as 'unavailable',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.OFFLINE],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.OFFLINE],
  },
  [LIVE_CHAT_STATUS.BUSY]: {
    status: LIVE_CHAT_STATUS.BUSY,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.BUSY],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.BUSY],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.BUSY],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.BUSY] as 'unavailable',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.BUSY],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.BUSY],
  },
  [LIVE_CHAT_STATUS.AWAY]: {
    status: LIVE_CHAT_STATUS.AWAY,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.AWAY],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.AWAY],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.AWAY],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.AWAY] as 'unavailable',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.AWAY],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.AWAY],
  },
  [LIVE_CHAT_STATUS.MAINTENANCE]: {
    status: LIVE_CHAT_STATUS.MAINTENANCE,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.MAINTENANCE],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.MAINTENANCE],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.MAINTENANCE],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.MAINTENANCE] as 'unavailable',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.MAINTENANCE],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.MAINTENANCE],
  },
  [LIVE_CHAT_STATUS.CONNECTING]: {
    status: LIVE_CHAT_STATUS.CONNECTING,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.CONNECTING],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.CONNECTING],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.CONNECTING],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.CONNECTING] as 'pending',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.CONNECTING],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.CONNECTING],
  },
  [LIVE_CHAT_STATUS.DISCONNECTED]: {
    status: LIVE_CHAT_STATUS.DISCONNECTED,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.DISCONNECTED],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.DISCONNECTED],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.DISCONNECTED],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.DISCONNECTED] as 'error',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.DISCONNECTED],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.DISCONNECTED],
  },
  [LIVE_CHAT_STATUS.RECONNECTING]: {
    status: LIVE_CHAT_STATUS.RECONNECTING,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.RECONNECTING],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.RECONNECTING],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.RECONNECTING],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.RECONNECTING] as 'pending',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.RECONNECTING],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.RECONNECTING],
  },
  [LIVE_CHAT_STATUS.PAUSED]: {
    status: LIVE_CHAT_STATUS.PAUSED,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.PAUSED],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.PAUSED],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.PAUSED],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.PAUSED] as 'inactive',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.PAUSED],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.PAUSED],
  },
  [LIVE_CHAT_STATUS.CLOSED]: {
    status: LIVE_CHAT_STATUS.CLOSED,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.CLOSED],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.CLOSED],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.CLOSED],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.CLOSED] as 'completed',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.CLOSED],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.CLOSED],
  },
  [LIVE_CHAT_STATUS.INITIATING]: {
    status: LIVE_CHAT_STATUS.INITIATING,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.INITIATING],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.INITIATING],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.INITIATING],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.INITIATING] as 'pending',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.INITIATING],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.INITIATING],
  },
  [LIVE_CHAT_STATUS.WAITING]: {
    status: LIVE_CHAT_STATUS.WAITING,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.WAITING],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.WAITING],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.WAITING],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.WAITING] as 'pending',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.WAITING],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.WAITING],
  },
  [LIVE_CHAT_STATUS.ACTIVE]: {
    status: LIVE_CHAT_STATUS.ACTIVE,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.ACTIVE],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.ACTIVE],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.ACTIVE],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.ACTIVE] as 'available',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.ACTIVE],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.ACTIVE],
  },
  [LIVE_CHAT_STATUS.TIMED_OUT]: {
    status: LIVE_CHAT_STATUS.TIMED_OUT,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.TIMED_OUT],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.TIMED_OUT],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.TIMED_OUT],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.TIMED_OUT] as 'error',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.TIMED_OUT],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.TIMED_OUT],
  },
  [LIVE_CHAT_STATUS.TRANSFERRING]: {
    status: LIVE_CHAT_STATUS.TRANSFERRING,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.TRANSFERRING],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.TRANSFERRING],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.TRANSFERRING],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.TRANSFERRING] as 'pending',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.TRANSFERRING],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.TRANSFERRING],
  },
  [LIVE_CHAT_STATUS.ARCHIVED]: {
    status: LIVE_CHAT_STATUS.ARCHIVED,
    displayName: LIVE_CHAT_STATUS_DISPLAY_NAMES[LIVE_CHAT_STATUS.ARCHIVED],
    color: LIVE_CHAT_STATUS_COLORS[LIVE_CHAT_STATUS.ARCHIVED],
    icon: LIVE_CHAT_STATUS_ICONS[LIVE_CHAT_STATUS.ARCHIVED],
    category: LIVE_CHAT_STATUS_CATEGORIES[LIVE_CHAT_STATUS.ARCHIVED] as 'inactive',
    defaultAction: LIVE_CHAT_STATUS_DEFAULT_ACTIONS[LIVE_CHAT_STATUS.ARCHIVED],
    allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS[LIVE_CHAT_STATUS.ARCHIVED],
  },
};

/**
 * লাইভ চ্যাট স্ট্যাটাস কনফিগারেশন
 */
export const LIVE_CHAT_STATUS_CONFIG = {
  statuses: LIVE_CHAT_STATUS,
  displayNames: LIVE_CHAT_STATUS_DISPLAY_NAMES,
  colors: LIVE_CHAT_STATUS_COLORS,
  icons: LIVE_CHAT_STATUS_ICONS,
  categories: LIVE_CHAT_STATUS_CATEGORIES,
  groups: LIVE_CHAT_STATUS_GROUPS,
  transitions: LIVE_CHAT_STATUS_TRANSITIONS,
  defaultActions: LIVE_CHAT_STATUS_DEFAULT_ACTIONS,
  allowedActions: LIVE_CHAT_STATUS_ALLOWED_ACTIONS,
  configs: LIVE_CHAT_STATUS_CONFIGS,
} as const;
