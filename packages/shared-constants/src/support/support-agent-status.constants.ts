/**
 * সাপোর্ট এজেন্টের বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * এজেন্ট স্ট্যাটাস
 */
export const AGENT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
  AWAY: 'away',
  ON_LEAVE: 'on_leave',
  IN_MEETING: 'in_meeting',
  TRAINING: 'training',
  BREAK: 'break',
  ON_CALL: 'on_call',
  DO_NOT_DISTURB: 'do_not_disturb',
  AVAILABLE: 'available',
  LUNCH: 'lunch',
  SICK: 'sick',
  EMERGENCY: 'emergency',
  OVERTIME: 'overtime',
  SHIFT_END: 'shift_end',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const AGENT_STATUS_DISPLAY_NAMES = {
  [AGENT_STATUS.ONLINE]: 'অনলাইন',
  [AGENT_STATUS.OFFLINE]: 'অফলাইন',
  [AGENT_STATUS.BUSY]: 'ব্যস্ত',
  [AGENT_STATUS.AWAY]: 'দূরে',
  [AGENT_STATUS.ON_LEAVE]: 'ছুটিতে',
  [AGENT_STATUS.IN_MEETING]: 'মিটিংয়ে',
  [AGENT_STATUS.TRAINING]: 'প্রশিক্ষণে',
  [AGENT_STATUS.BREAK]: 'বিরতি',
  [AGENT_STATUS.ON_CALL]: 'কলরত',
  [AGENT_STATUS.DO_NOT_DISTURB]: 'বিরক্ত করবেন না',
  [AGENT_STATUS.AVAILABLE]: 'উপলব্ধ',
  [AGENT_STATUS.LUNCH]: 'লাঞ্চ',
  [AGENT_STATUS.SICK]: 'অসুস্থ',
  [AGENT_STATUS.EMERGENCY]: 'জরুরি',
  [AGENT_STATUS.OVERTIME]: 'অতিরিক্ত সময়',
  [AGENT_STATUS.SHIFT_END]: 'শিফট শেষ',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const AGENT_STATUS_COLORS = {
  [AGENT_STATUS.ONLINE]: '#2ecc71',
  [AGENT_STATUS.OFFLINE]: '#95a5a6',
  [AGENT_STATUS.BUSY]: '#e74c3c',
  [AGENT_STATUS.AWAY]: '#f39c12',
  [AGENT_STATUS.ON_LEAVE]: '#e67e22',
  [AGENT_STATUS.IN_MEETING]: '#9b59b6',
  [AGENT_STATUS.TRAINING]: '#3498db',
  [AGENT_STATUS.BREAK]: '#f1c40f',
  [AGENT_STATUS.ON_CALL]: '#1abc9c',
  [AGENT_STATUS.DO_NOT_DISTURB]: '#c0392b',
  [AGENT_STATUS.AVAILABLE]: '#27ae60',
  [AGENT_STATUS.LUNCH]: '#f39c12',
  [AGENT_STATUS.SICK]: '#e74c3c',
  [AGENT_STATUS.EMERGENCY]: '#c0392b',
  [AGENT_STATUS.OVERTIME]: '#e67e22',
  [AGENT_STATUS.SHIFT_END]: '#7f8c8d',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const AGENT_STATUS_ICONS = {
  [AGENT_STATUS.ONLINE]: 'wifi',
  [AGENT_STATUS.OFFLINE]: 'wifi-off',
  [AGENT_STATUS.BUSY]: 'slash',
  [AGENT_STATUS.AWAY]: 'clock',
  [AGENT_STATUS.ON_LEAVE]: 'calendar',
  [AGENT_STATUS.IN_MEETING]: 'users',
  [AGENT_STATUS.TRAINING]: 'book',
  [AGENT_STATUS.BREAK]: 'coffee',
  [AGENT_STATUS.ON_CALL]: 'phone',
  [AGENT_STATUS.DO_NOT_DISTURB]: 'bell-off',
  [AGENT_STATUS.AVAILABLE]: 'check-circle',
  [AGENT_STATUS.LUNCH]: 'utensils',
  [AGENT_STATUS.SICK]: 'thermometer',
  [AGENT_STATUS.EMERGENCY]: 'alert-circle',
  [AGENT_STATUS.OVERTIME]: 'clock',
  [AGENT_STATUS.SHIFT_END]: 'sunset',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের ক্যাটাগরি
 */
export const AGENT_STATUS_CATEGORIES = {
  [AGENT_STATUS.ONLINE]: 'available',
  [AGENT_STATUS.OFFLINE]: 'unavailable',
  [AGENT_STATUS.BUSY]: 'unavailable',
  [AGENT_STATUS.AWAY]: 'unavailable',
  [AGENT_STATUS.ON_LEAVE]: 'unavailable',
  [AGENT_STATUS.IN_MEETING]: 'unavailable',
  [AGENT_STATUS.TRAINING]: 'unavailable',
  [AGENT_STATUS.BREAK]: 'unavailable',
  [AGENT_STATUS.ON_CALL]: 'unavailable',
  [AGENT_STATUS.DO_NOT_DISTURB]: 'unavailable',
  [AGENT_STATUS.AVAILABLE]: 'available',
  [AGENT_STATUS.LUNCH]: 'unavailable',
  [AGENT_STATUS.SICK]: 'unavailable',
  [AGENT_STATUS.EMERGENCY]: 'unavailable',
  [AGENT_STATUS.OVERTIME]: 'available',
  [AGENT_STATUS.SHIFT_END]: 'unavailable',
} as const;

/**
 * এজেন্ট স্ট্যাটাস গ্রুপ
 */
export const AGENT_STATUS_GROUPS = {
  AVAILABLE: ['online', 'available', 'overtime'],
  UNAVAILABLE: [
    'offline',
    'busy',
    'away',
    'on_leave',
    'in_meeting',
    'training',
    'break',
    'on_call',
    'do_not_disturb',
    'lunch',
    'sick',
    'emergency',
    'shift_end',
  ],
  PAUSED: ['break', 'lunch'],
  AWAY: ['away', 'on_leave'],
  BUSY: ['busy', 'in_meeting', 'on_call'],
  INACTIVE: ['offline', 'sick', 'emergency', 'shift_end'],
} as const;

/**
 * এজেন্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AGENT_STATUS_TRANSITIONS = {
  [AGENT_STATUS.ONLINE]: [
    'busy',
    'away',
    'break',
    'in_meeting',
    'training',
    'on_call',
    'do_not_disturb',
    'offline',
    'lunch',
    'overtime',
  ],
  [AGENT_STATUS.OFFLINE]: ['online', 'available'],
  [AGENT_STATUS.BUSY]: ['online', 'available', 'away', 'break', 'offline', 'do_not_disturb'],
  [AGENT_STATUS.AWAY]: ['online', 'available', 'busy', 'offline', 'on_leave'],
  [AGENT_STATUS.ON_LEAVE]: ['online', 'available', 'offline', 'sick', 'emergency'],
  [AGENT_STATUS.IN_MEETING]: ['online', 'available', 'busy', 'offline'],
  [AGENT_STATUS.TRAINING]: ['online', 'available', 'offline'],
  [AGENT_STATUS.BREAK]: ['online', 'available', 'busy', 'offline', 'lunch'],
  [AGENT_STATUS.ON_CALL]: ['online', 'available', 'busy', 'offline', 'break'],
  [AGENT_STATUS.DO_NOT_DISTURB]: ['online', 'available', 'busy', 'offline'],
  [AGENT_STATUS.AVAILABLE]: [
    'busy',
    'away',
    'break',
    'in_meeting',
    'training',
    'on_call',
    'offline',
    'lunch',
    'on_leave',
    'do_not_disturb',
  ],
  [AGENT_STATUS.LUNCH]: ['online', 'available', 'busy', 'offline', 'break'],
  [AGENT_STATUS.SICK]: ['online', 'available', 'offline', 'emergency'],
  [AGENT_STATUS.EMERGENCY]: ['offline', 'available'],
  [AGENT_STATUS.OVERTIME]: ['offline', 'available', 'shift_end'],
  [AGENT_STATUS.SHIFT_END]: ['offline', 'available'],
} as const;

/**
 * এজেন্ট স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const AGENT_STATUS_DEFAULT_ACTIONS = {
  [AGENT_STATUS.ONLINE]: 'এজেন্ট অনলাইন, টিকেটের জন্য প্রস্তুত',
  [AGENT_STATUS.OFFLINE]: 'এজেন্ট অফলাইন, সংযোগ বিচ্ছিন্ন',
  [AGENT_STATUS.BUSY]: 'এজেন্ট ব্যস্ত, টিকেট নিচ্ছেন না',
  [AGENT_STATUS.AWAY]: 'এজেন্ট দূরে, শীঘ্রই ফিরবেন',
  [AGENT_STATUS.ON_LEAVE]: 'এজেন্ট ছুটিতে, ফেরার তারিখ জানুন',
  [AGENT_STATUS.IN_MEETING]: 'এজেন্ট মিটিংয়ে, পরে যোগাযোগ করুন',
  [AGENT_STATUS.TRAINING]: 'এজেন্ট প্রশিক্ষণে, শীঘ্রই ফিরবেন',
  [AGENT_STATUS.BREAK]: 'এজেন্ট বিরতিতে, শীঘ্রই ফিরবেন',
  [AGENT_STATUS.ON_CALL]: 'এজেন্ট কলরত, পরে যোগাযোগ করুন',
  [AGENT_STATUS.DO_NOT_DISTURB]: 'এজেন্ট বিরক্ত করবেন না, জরুরি ছাড়া',
  [AGENT_STATUS.AVAILABLE]: 'এজেন্ট উপলব্ধ, টিকেট নিতে পারেন',
  [AGENT_STATUS.LUNCH]: 'এজেন্ট লাঞ্চ বিরতিতে, শীঘ্রই ফিরবেন',
  [AGENT_STATUS.SICK]: 'এজেন্ট অসুস্থ, বিশ্রাম নিচ্ছেন',
  [AGENT_STATUS.EMERGENCY]: 'এজেন্ট জরুরি কাজে, পরে যোগাযোগ করুন',
  [AGENT_STATUS.OVERTIME]: 'এজেন্ট অতিরিক্ত সময় কাজ করছেন',
  [AGENT_STATUS.SHIFT_END]: 'এজেন্টের শিফট শেষ, কাল আবার যোগাযোগ করুন',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের টাইমআউট (মিনিটে)
 */
export const AGENT_STATUS_TIME_LIMITS = {
  [AGENT_STATUS.ONLINE]: 0,
  [AGENT_STATUS.OFFLINE]: 0,
  [AGENT_STATUS.BUSY]: 30,
  [AGENT_STATUS.AWAY]: 15,
  [AGENT_STATUS.ON_LEAVE]: 0,
  [AGENT_STATUS.IN_MEETING]: 60,
  [AGENT_STATUS.TRAINING]: 120,
  [AGENT_STATUS.BREAK]: 15,
  [AGENT_STATUS.ON_CALL]: 20,
  [AGENT_STATUS.DO_NOT_DISTURB]: 30,
  [AGENT_STATUS.AVAILABLE]: 0,
  [AGENT_STATUS.LUNCH]: 30,
  [AGENT_STATUS.SICK]: 0,
  [AGENT_STATUS.EMERGENCY]: 0,
  [AGENT_STATUS.OVERTIME]: 0,
  [AGENT_STATUS.SHIFT_END]: 0,
} as const;

/**
 * এজেন্ট স্ট্যাটাসের অটো-ট্রানজিশন
 */
export const AGENT_STATUS_AUTO_TRANSITIONS = {
  [AGENT_STATUS.BUSY]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.BUSY],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.AWAY]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.AWAY],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.IN_MEETING]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.IN_MEETING],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.TRAINING]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.TRAINING],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.BREAK]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.BREAK],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.ON_CALL]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.ON_CALL],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.DO_NOT_DISTURB]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.DO_NOT_DISTURB],
    to: AGENT_STATUS.AVAILABLE,
  },
  [AGENT_STATUS.LUNCH]: {
    after: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.LUNCH],
    to: AGENT_STATUS.AVAILABLE,
  },
} as const;

/**
 * এজেন্ট স্ট্যাটাসের পাবলিক ভিজিবিলিটি
 */
export const AGENT_STATUS_PUBLIC_VISIBILITY = {
  [AGENT_STATUS.ONLINE]: true,
  [AGENT_STATUS.OFFLINE]: false,
  [AGENT_STATUS.BUSY]: true,
  [AGENT_STATUS.AWAY]: true,
  [AGENT_STATUS.ON_LEAVE]: true,
  [AGENT_STATUS.IN_MEETING]: true,
  [AGENT_STATUS.TRAINING]: true,
  [AGENT_STATUS.BREAK]: true,
  [AGENT_STATUS.ON_CALL]: true,
  [AGENT_STATUS.DO_NOT_DISTURB]: true,
  [AGENT_STATUS.AVAILABLE]: true,
  [AGENT_STATUS.LUNCH]: true,
  [AGENT_STATUS.SICK]: false,
  [AGENT_STATUS.EMERGENCY]: false,
  [AGENT_STATUS.OVERTIME]: true,
  [AGENT_STATUS.SHIFT_END]: true,
} as const;

/**
 * এজেন্ট স্ট্যাটাসের অনুমোদিত কর্ম
 */
export const AGENT_STATUS_ALLOWED_ACTIONS = {
  [AGENT_STATUS.ONLINE]: [
    'set_busy',
    'set_away',
    'set_break',
    'set_meeting',
    'set_training',
    'set_call',
    'set_dnd',
    'set_lunch',
    'set_offline',
    'set_overtime',
  ] as string[],
  [AGENT_STATUS.OFFLINE]: ['set_online', 'set_available'] as string[],
  [AGENT_STATUS.BUSY]: [
    'set_online',
    'set_available',
    'set_break',
    'set_away',
    'set_offline',
  ] as string[],
  [AGENT_STATUS.AWAY]: [
    'set_online',
    'set_available',
    'set_busy',
    'set_offline',
    'set_leave',
  ] as string[],
  [AGENT_STATUS.ON_LEAVE]: [
    'set_online',
    'set_available',
    'set_offline',
    'set_sick',
    'set_emergency',
  ] as string[],
  [AGENT_STATUS.IN_MEETING]: ['set_online', 'set_available', 'set_busy', 'set_offline'] as string[],
  [AGENT_STATUS.TRAINING]: ['set_online', 'set_available', 'set_offline'] as string[],
  [AGENT_STATUS.BREAK]: [
    'set_online',
    'set_available',
    'set_busy',
    'set_offline',
    'set_lunch',
  ] as string[],
  [AGENT_STATUS.ON_CALL]: [
    'set_online',
    'set_available',
    'set_busy',
    'set_offline',
    'set_break',
  ] as string[],
  [AGENT_STATUS.DO_NOT_DISTURB]: [
    'set_online',
    'set_available',
    'set_busy',
    'set_offline',
  ] as string[],
  [AGENT_STATUS.AVAILABLE]: [
    'set_busy',
    'set_away',
    'set_break',
    'set_meeting',
    'set_training',
    'set_call',
    'set_offline',
    'set_lunch',
    'set_leave',
    'set_dnd',
  ] as string[],
  [AGENT_STATUS.LUNCH]: [
    'set_online',
    'set_available',
    'set_busy',
    'set_offline',
    'set_break',
  ] as string[],
  [AGENT_STATUS.SICK]: ['set_online', 'set_available', 'set_offline', 'set_emergency'] as string[],
  [AGENT_STATUS.EMERGENCY]: ['set_offline', 'set_available'] as string[],
  [AGENT_STATUS.OVERTIME]: ['set_offline', 'set_available', 'set_shift_end'] as string[],
  [AGENT_STATUS.SHIFT_END]: ['set_offline', 'set_available'] as string[],
} as const;

export type AgentStatus = (typeof AGENT_STATUS)[keyof typeof AGENT_STATUS];
export type AgentStatusDisplayNames = typeof AGENT_STATUS_DISPLAY_NAMES;
export type AgentStatusColors = typeof AGENT_STATUS_COLORS;
export type AgentStatusIcons = typeof AGENT_STATUS_ICONS;
export type AgentStatusCategories = typeof AGENT_STATUS_CATEGORIES;
export type AgentStatusGroups = typeof AGENT_STATUS_GROUPS;
export type AgentStatusTransitions = typeof AGENT_STATUS_TRANSITIONS;
export type AgentStatusDefaultActions = typeof AGENT_STATUS_DEFAULT_ACTIONS;
export type AgentStatusTimeLimits = typeof AGENT_STATUS_TIME_LIMITS;
export type AgentStatusAutoTransitions = typeof AGENT_STATUS_AUTO_TRANSITIONS;
export type AgentStatusPublicVisibility = typeof AGENT_STATUS_PUBLIC_VISIBILITY;
export type AgentStatusAllowedActions = typeof AGENT_STATUS_ALLOWED_ACTIONS;

export interface AgentStatusConfig {
  status: AgentStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'available' | 'unavailable';
  defaultAction: string;
  timeLimitMinutes: number;
  publicVisibility: boolean;
  allowedActions: string[];
  autoTransition?: {
    after: number;
    to: AgentStatus;
  };
}

/**
 * এজেন্ট স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const AGENT_STATUS_CONFIGS: Record<AgentStatus, AgentStatusConfig> = {
  [AGENT_STATUS.ONLINE]: {
    status: AGENT_STATUS.ONLINE,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.ONLINE],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.ONLINE],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.ONLINE],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.ONLINE] as 'available',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.ONLINE],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.ONLINE],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.ONLINE],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.ONLINE],
  },
  [AGENT_STATUS.OFFLINE]: {
    status: AGENT_STATUS.OFFLINE,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.OFFLINE],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.OFFLINE],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.OFFLINE],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.OFFLINE] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.OFFLINE],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.OFFLINE],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.OFFLINE],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.OFFLINE],
  },
  [AGENT_STATUS.BUSY]: {
    status: AGENT_STATUS.BUSY,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.BUSY],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.BUSY],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.BUSY],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.BUSY] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.BUSY],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.BUSY],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.BUSY],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.BUSY],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.BUSY],
  },
  [AGENT_STATUS.AWAY]: {
    status: AGENT_STATUS.AWAY,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.AWAY],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.AWAY],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.AWAY],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.AWAY] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.AWAY],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.AWAY],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.AWAY],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.AWAY],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.AWAY],
  },
  [AGENT_STATUS.ON_LEAVE]: {
    status: AGENT_STATUS.ON_LEAVE,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.ON_LEAVE],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.ON_LEAVE],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.ON_LEAVE],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.ON_LEAVE] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.ON_LEAVE],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.ON_LEAVE],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.ON_LEAVE],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.ON_LEAVE],
  },
  [AGENT_STATUS.IN_MEETING]: {
    status: AGENT_STATUS.IN_MEETING,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.IN_MEETING],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.IN_MEETING],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.IN_MEETING],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.IN_MEETING] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.IN_MEETING],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.IN_MEETING],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.IN_MEETING],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.IN_MEETING],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.IN_MEETING],
  },
  [AGENT_STATUS.TRAINING]: {
    status: AGENT_STATUS.TRAINING,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.TRAINING],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.TRAINING],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.TRAINING],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.TRAINING] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.TRAINING],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.TRAINING],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.TRAINING],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.TRAINING],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.TRAINING],
  },
  [AGENT_STATUS.BREAK]: {
    status: AGENT_STATUS.BREAK,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.BREAK],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.BREAK],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.BREAK],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.BREAK] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.BREAK],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.BREAK],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.BREAK],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.BREAK],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.BREAK],
  },
  [AGENT_STATUS.ON_CALL]: {
    status: AGENT_STATUS.ON_CALL,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.ON_CALL],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.ON_CALL],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.ON_CALL],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.ON_CALL] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.ON_CALL],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.ON_CALL],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.ON_CALL],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.ON_CALL],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.ON_CALL],
  },
  [AGENT_STATUS.DO_NOT_DISTURB]: {
    status: AGENT_STATUS.DO_NOT_DISTURB,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.DO_NOT_DISTURB],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.DO_NOT_DISTURB],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.DO_NOT_DISTURB],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.DO_NOT_DISTURB] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.DO_NOT_DISTURB],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.DO_NOT_DISTURB],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.DO_NOT_DISTURB],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.DO_NOT_DISTURB],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.DO_NOT_DISTURB],
  },
  [AGENT_STATUS.AVAILABLE]: {
    status: AGENT_STATUS.AVAILABLE,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.AVAILABLE],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.AVAILABLE],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.AVAILABLE],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.AVAILABLE] as 'available',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.AVAILABLE],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.AVAILABLE],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.AVAILABLE],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.AVAILABLE],
  },
  [AGENT_STATUS.LUNCH]: {
    status: AGENT_STATUS.LUNCH,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.LUNCH],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.LUNCH],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.LUNCH],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.LUNCH] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.LUNCH],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.LUNCH],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.LUNCH],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.LUNCH],
    autoTransition: AGENT_STATUS_AUTO_TRANSITIONS[AGENT_STATUS.LUNCH],
  },
  [AGENT_STATUS.SICK]: {
    status: AGENT_STATUS.SICK,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.SICK],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.SICK],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.SICK],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.SICK] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.SICK],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.SICK],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.SICK],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.SICK],
  },
  [AGENT_STATUS.EMERGENCY]: {
    status: AGENT_STATUS.EMERGENCY,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.EMERGENCY],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.EMERGENCY],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.EMERGENCY],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.EMERGENCY] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.EMERGENCY],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.EMERGENCY],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.EMERGENCY],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.EMERGENCY],
  },
  [AGENT_STATUS.OVERTIME]: {
    status: AGENT_STATUS.OVERTIME,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.OVERTIME],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.OVERTIME],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.OVERTIME],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.OVERTIME] as 'available',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.OVERTIME],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.OVERTIME],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.OVERTIME],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.OVERTIME],
  },
  [AGENT_STATUS.SHIFT_END]: {
    status: AGENT_STATUS.SHIFT_END,
    displayName: AGENT_STATUS_DISPLAY_NAMES[AGENT_STATUS.SHIFT_END],
    color: AGENT_STATUS_COLORS[AGENT_STATUS.SHIFT_END],
    icon: AGENT_STATUS_ICONS[AGENT_STATUS.SHIFT_END],
    category: AGENT_STATUS_CATEGORIES[AGENT_STATUS.SHIFT_END] as 'unavailable',
    defaultAction: AGENT_STATUS_DEFAULT_ACTIONS[AGENT_STATUS.SHIFT_END],
    timeLimitMinutes: AGENT_STATUS_TIME_LIMITS[AGENT_STATUS.SHIFT_END],
    publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY[AGENT_STATUS.SHIFT_END],
    allowedActions: AGENT_STATUS_ALLOWED_ACTIONS[AGENT_STATUS.SHIFT_END],
  },
};

/**
 * এজেন্ট স্ট্যাটাস কনফিগারেশন
 */
export const AGENT_STATUS_CONFIG = {
  statuses: AGENT_STATUS,
  displayNames: AGENT_STATUS_DISPLAY_NAMES,
  colors: AGENT_STATUS_COLORS,
  icons: AGENT_STATUS_ICONS,
  categories: AGENT_STATUS_CATEGORIES,
  groups: AGENT_STATUS_GROUPS,
  transitions: AGENT_STATUS_TRANSITIONS,
  defaultActions: AGENT_STATUS_DEFAULT_ACTIONS,
  timeLimits: AGENT_STATUS_TIME_LIMITS,
  autoTransitions: AGENT_STATUS_AUTO_TRANSITIONS,
  publicVisibility: AGENT_STATUS_PUBLIC_VISIBILITY,
  allowedActions: AGENT_STATUS_ALLOWED_ACTIONS,
  configs: AGENT_STATUS_CONFIGS,
} as const;
