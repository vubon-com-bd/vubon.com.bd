/**
 * টিকেটের বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট স্ট্যাটাসের প্রকারভেদ
 */
export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
  ON_HOLD: 'on_hold',
  ESCALATED: 'escalated',
  WAITING_FOR_CUSTOMER: 'waiting_for_customer',
  WAITING_FOR_SUPPORT: 'waiting_for_support',
  DUPLICATE: 'duplicate',
  SPAM: 'spam',
  MERGED: 'merged',
} as const;

/**
 * টিকেট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const TICKET_STATUS_DISPLAY_NAMES = {
  [TICKET_STATUS.OPEN]: 'খোলা',
  [TICKET_STATUS.IN_PROGRESS]: 'প্রক্রিয়াধীন',
  [TICKET_STATUS.RESOLVED]: 'সমাধানকৃত',
  [TICKET_STATUS.CLOSED]: 'বন্ধ',
  [TICKET_STATUS.REOPENED]: 'পুনরায় খোলা',
  [TICKET_STATUS.ON_HOLD]: 'হোল্ডে',
  [TICKET_STATUS.ESCALATED]: 'এস্কেলেটেড',
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: 'গ্রাহকের অপেক্ষায়',
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: 'সাপোর্টের অপেক্ষায়',
  [TICKET_STATUS.DUPLICATE]: 'ডুপ্লিকেট',
  [TICKET_STATUS.SPAM]: 'স্প্যাম',
  [TICKET_STATUS.MERGED]: 'মার্জকৃত',
} as const;

/**
 * টিকেট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const TICKET_STATUS_COLORS = {
  [TICKET_STATUS.OPEN]: '#3498db', // নীল
  [TICKET_STATUS.IN_PROGRESS]: '#f39c12', // কমলা
  [TICKET_STATUS.RESOLVED]: '#2ecc71', // সবুজ
  [TICKET_STATUS.CLOSED]: '#95a5a6', // ধূসর
  [TICKET_STATUS.REOPENED]: '#e74c3c', // লাল
  [TICKET_STATUS.ON_HOLD]: '#f1c40f', // হলুদ
  [TICKET_STATUS.ESCALATED]: '#e67e22', // গাঢ় কমলা
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: '#9b59b6', // বেগুনি
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: '#1abc9c', // টিল
  [TICKET_STATUS.DUPLICATE]: '#7f8c8d', // স্লেট
  [TICKET_STATUS.SPAM]: '#c0392b', // গাঢ় লাল
  [TICKET_STATUS.MERGED]: '#34495e', // গাঢ় নীল
} as const;

/**
 * টিকেট স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const TICKET_STATUS_ICONS = {
  [TICKET_STATUS.OPEN]: 'inbox',
  [TICKET_STATUS.IN_PROGRESS]: 'clock',
  [TICKET_STATUS.RESOLVED]: 'check-circle',
  [TICKET_STATUS.CLOSED]: 'check-circle',
  [TICKET_STATUS.REOPENED]: 'refresh-cw',
  [TICKET_STATUS.ON_HOLD]: 'pause-circle',
  [TICKET_STATUS.ESCALATED]: 'alert-circle',
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: 'user',
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: 'users',
  [TICKET_STATUS.DUPLICATE]: 'copy',
  [TICKET_STATUS.SPAM]: 'alert-octagon',
  [TICKET_STATUS.MERGED]: 'git-merge',
} as const;

/**
 * টিকেট স্ট্যাটাসের বিবরণ
 */
export const TICKET_STATUS_DESCRIPTIONS = {
  [TICKET_STATUS.OPEN]: 'টিকেটটি খোলা হয়েছে এবং এখনও কাজ শুরু হয়নি',
  [TICKET_STATUS.IN_PROGRESS]: 'টিকেটটিতে কাজ চলছে',
  [TICKET_STATUS.RESOLVED]: 'টিকেটটির সমাধান হয়েছে',
  [TICKET_STATUS.CLOSED]: 'টিকেটটি বন্ধ করা হয়েছে',
  [TICKET_STATUS.REOPENED]: 'টিকেটটি পুনরায় খোলা হয়েছে',
  [TICKET_STATUS.ON_HOLD]: 'টিকেটটি সাময়িকভাবে হোল্ডে রাখা হয়েছে',
  [TICKET_STATUS.ESCALATED]: 'টিকেটটি উচ্চতর স্তরে পাঠানো হয়েছে',
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: 'গ্রাহকের কাছ থেকে উত্তর awaited',
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: 'সাপোর্ট টিমের কাছ থেকে উত্তর awaited',
  [TICKET_STATUS.DUPLICATE]: 'টিকেটটি ডুপ্লিকেট হিসেবে চিহ্নিত',
  [TICKET_STATUS.SPAM]: 'টিকেটটি স্প্যাম হিসেবে চিহ্নিত',
  [TICKET_STATUS.MERGED]: 'টিকেটটি অন্য টিকেটের সাথে মার্জ করা হয়েছে',
} as const;

/**
 * টিকেট স্ট্যাটাস গ্রুপ
 */
export const TICKET_STATUS_GROUPS = {
  ACTIVE: ['open', 'in_progress', 'reopened'],
  WAITING: ['waiting_for_customer', 'waiting_for_support'],
  PAUSED: ['on_hold', 'escalated'],
  RESOLVED: ['resolved'],
  CLOSED: ['closed', 'merged', 'duplicate', 'spam'],
} as const;

/**
 * টিকেট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const TICKET_STATUS_TRANSITIONS = {
  [TICKET_STATUS.OPEN]: ['in_progress', 'on_hold', 'escalated', 'closed', 'duplicate', 'spam'],
  [TICKET_STATUS.IN_PROGRESS]: ['resolved', 'on_hold', 'escalated', 'closed', 'reopened'],
  [TICKET_STATUS.RESOLVED]: ['closed', 'reopened'],
  [TICKET_STATUS.CLOSED]: ['reopened'],
  [TICKET_STATUS.REOPENED]: ['in_progress', 'resolved', 'closed'],
  [TICKET_STATUS.ON_HOLD]: ['open', 'in_progress', 'escalated', 'closed'],
  [TICKET_STATUS.ESCALATED]: ['in_progress', 'resolved', 'closed'],
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: ['in_progress', 'resolved', 'closed'],
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: ['in_progress', 'resolved', 'closed'],
  [TICKET_STATUS.DUPLICATE]: ['closed', 'merged'],
  [TICKET_STATUS.SPAM]: ['closed'],
  [TICKET_STATUS.MERGED]: ['closed'],
} as const;

/**
 * টিকেট স্ট্যাটাসের জন্য প্রয়োজনীয় অ্যাকশন
 */
export const TICKET_STATUS_REQUIRED_ACTIONS = {
  [TICKET_STATUS.OPEN]: 'টিকেটটি পর্যালোচনা করে কাজ শুরু করুন',
  [TICKET_STATUS.IN_PROGRESS]: 'টিকেটটির সমাধানের দিকে কাজ চালিয়ে যান',
  [TICKET_STATUS.RESOLVED]: 'গ্রাহককে জানান এবং প্রতিক্রিয়া সংগ্রহ করুন',
  [TICKET_STATUS.CLOSED]: 'টিকেটটি সম্পূর্ণভাবে বন্ধ করা হয়েছে',
  [TICKET_STATUS.REOPENED]: 'টিকেটটি পুনরায় খোলা হয়েছে, পর্যালোচনা করুন',
  [TICKET_STATUS.ON_HOLD]: 'টিকেটটি হোল্ডে আছে, প্রয়োজনীয় তথ্য সংগ্রহ করুন',
  [TICKET_STATUS.ESCALATED]: 'টিকেটটি এস্কেলেটেড, মনিটর করুন',
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: 'গ্রাহকের প্রতিক্রিয়ার অপেক্ষায়',
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: 'সাপোর্ট টিমের প্রতিক্রিয়ার অপেক্ষায়',
  [TICKET_STATUS.DUPLICATE]: 'ডুপ্লিকেট টিকেটটি মার্জ করুন',
  [TICKET_STATUS.SPAM]: 'স্প্যাম টিকেটটি ডিলিট করুন',
  [TICKET_STATUS.MERGED]: 'মার্জকৃত টিকেটটি পর্যবেক্ষণ করুন',
} as const;

/**
 * টিকেট স্ট্যাটাসের সময়সীমা (ঘন্টায়)
 */
export const TICKET_STATUS_TIME_LIMITS = {
  [TICKET_STATUS.OPEN]: 24,
  [TICKET_STATUS.IN_PROGRESS]: 48,
  [TICKET_STATUS.RESOLVED]: 72,
  [TICKET_STATUS.CLOSED]: 0,
  [TICKET_STATUS.REOPENED]: 24,
  [TICKET_STATUS.ON_HOLD]: 168,
  [TICKET_STATUS.ESCALATED]: 12,
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: 48,
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: 24,
  [TICKET_STATUS.DUPLICATE]: 0,
  [TICKET_STATUS.SPAM]: 0,
  [TICKET_STATUS.MERGED]: 0,
} as const;

/**
 * টিকেট স্ট্যাটাসের নোটিফিকেশন সেটিংস
 */
export const TICKET_STATUS_NOTIFICATIONS = {
  [TICKET_STATUS.OPEN]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_created',
  },
  [TICKET_STATUS.IN_PROGRESS]: {
    sendToCustomer: false,
    sendToAgent: true,
    template: 'ticket_updated',
  },
  [TICKET_STATUS.RESOLVED]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_resolved',
  },
  [TICKET_STATUS.CLOSED]: {
    sendToCustomer: true,
    sendToAgent: false,
    template: 'ticket_closed',
  },
  [TICKET_STATUS.REOPENED]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_reopened',
  },
  [TICKET_STATUS.ON_HOLD]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_on_hold',
  },
  [TICKET_STATUS.ESCALATED]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_escalated',
  },
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'waiting_for_customer',
  },
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: {
    sendToCustomer: false,
    sendToAgent: true,
    template: 'waiting_for_support',
  },
  [TICKET_STATUS.DUPLICATE]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_duplicate',
  },
  [TICKET_STATUS.SPAM]: {
    sendToCustomer: false,
    sendToAgent: true,
    template: 'ticket_spam',
  },
  [TICKET_STATUS.MERGED]: {
    sendToCustomer: true,
    sendToAgent: true,
    template: 'ticket_merged',
  },
} as const;

/**
 * টিকেট স্ট্যাটাসের ওয়ার্কফ্লো অর্ডার
 */
export const TICKET_STATUS_WORKFLOW_ORDER = [
  TICKET_STATUS.OPEN,
  TICKET_STATUS.IN_PROGRESS,
  TICKET_STATUS.WAITING_FOR_CUSTOMER,
  TICKET_STATUS.WAITING_FOR_SUPPORT,
  TICKET_STATUS.ON_HOLD,
  TICKET_STATUS.ESCALATED,
  TICKET_STATUS.RESOLVED,
  TICKET_STATUS.REOPENED,
  TICKET_STATUS.CLOSED,
  TICKET_STATUS.DUPLICATE,
  TICKET_STATUS.SPAM,
  TICKET_STATUS.MERGED,
] as const;

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
export type TicketStatusDisplayNames = typeof TICKET_STATUS_DISPLAY_NAMES;
export type TicketStatusColors = typeof TICKET_STATUS_COLORS;
export type TicketStatusIcons = typeof TICKET_STATUS_ICONS;
export type TicketStatusDescriptions = typeof TICKET_STATUS_DESCRIPTIONS;
export type TicketStatusGroups = typeof TICKET_STATUS_GROUPS;
export type TicketStatusTransitions = typeof TICKET_STATUS_TRANSITIONS;
export type TicketStatusRequiredActions = typeof TICKET_STATUS_REQUIRED_ACTIONS;
export type TicketStatusTimeLimits = typeof TICKET_STATUS_TIME_LIMITS;
export type TicketStatusNotifications = typeof TICKET_STATUS_NOTIFICATIONS;
export type TicketStatusWorkflowOrder = typeof TICKET_STATUS_WORKFLOW_ORDER;

export interface TicketStatusConfig {
  status: TicketStatus;
  displayName: string;
  color: string;
  icon: string;
  description: string;
  timeLimitHours: number;
  requiredAction: string;
  notification: {
    sendToCustomer: boolean;
    sendToAgent: boolean;
    template: string;
  };
}

/**
 * টিকেট স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const TICKET_STATUS_CONFIGS: Record<TicketStatus, TicketStatusConfig> = {
  [TICKET_STATUS.OPEN]: {
    status: TICKET_STATUS.OPEN,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.OPEN],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.OPEN],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.OPEN],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.OPEN],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.OPEN],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.OPEN],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.OPEN],
  },
  [TICKET_STATUS.IN_PROGRESS]: {
    status: TICKET_STATUS.IN_PROGRESS,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.IN_PROGRESS],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.IN_PROGRESS],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.IN_PROGRESS],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.IN_PROGRESS],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.IN_PROGRESS],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.IN_PROGRESS],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.IN_PROGRESS],
  },
  [TICKET_STATUS.RESOLVED]: {
    status: TICKET_STATUS.RESOLVED,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.RESOLVED],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.RESOLVED],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.RESOLVED],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.RESOLVED],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.RESOLVED],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.RESOLVED],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.RESOLVED],
  },
  [TICKET_STATUS.CLOSED]: {
    status: TICKET_STATUS.CLOSED,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.CLOSED],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.CLOSED],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.CLOSED],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.CLOSED],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.CLOSED],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.CLOSED],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.CLOSED],
  },
  [TICKET_STATUS.REOPENED]: {
    status: TICKET_STATUS.REOPENED,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.REOPENED],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.REOPENED],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.REOPENED],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.REOPENED],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.REOPENED],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.REOPENED],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.REOPENED],
  },
  [TICKET_STATUS.ON_HOLD]: {
    status: TICKET_STATUS.ON_HOLD,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.ON_HOLD],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.ON_HOLD],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.ON_HOLD],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.ON_HOLD],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.ON_HOLD],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.ON_HOLD],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.ON_HOLD],
  },
  [TICKET_STATUS.ESCALATED]: {
    status: TICKET_STATUS.ESCALATED,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.ESCALATED],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.ESCALATED],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.ESCALATED],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.ESCALATED],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.ESCALATED],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.ESCALATED],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.ESCALATED],
  },
  [TICKET_STATUS.WAITING_FOR_CUSTOMER]: {
    status: TICKET_STATUS.WAITING_FOR_CUSTOMER,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.WAITING_FOR_CUSTOMER],
  },
  [TICKET_STATUS.WAITING_FOR_SUPPORT]: {
    status: TICKET_STATUS.WAITING_FOR_SUPPORT,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.WAITING_FOR_SUPPORT],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.WAITING_FOR_SUPPORT],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.WAITING_FOR_SUPPORT],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.WAITING_FOR_SUPPORT],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.WAITING_FOR_SUPPORT],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.WAITING_FOR_SUPPORT],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.WAITING_FOR_SUPPORT],
  },
  [TICKET_STATUS.DUPLICATE]: {
    status: TICKET_STATUS.DUPLICATE,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.DUPLICATE],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.DUPLICATE],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.DUPLICATE],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.DUPLICATE],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.DUPLICATE],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.DUPLICATE],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.DUPLICATE],
  },
  [TICKET_STATUS.SPAM]: {
    status: TICKET_STATUS.SPAM,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.SPAM],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.SPAM],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.SPAM],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.SPAM],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.SPAM],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.SPAM],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.SPAM],
  },
  [TICKET_STATUS.MERGED]: {
    status: TICKET_STATUS.MERGED,
    displayName: TICKET_STATUS_DISPLAY_NAMES[TICKET_STATUS.MERGED],
    color: TICKET_STATUS_COLORS[TICKET_STATUS.MERGED],
    icon: TICKET_STATUS_ICONS[TICKET_STATUS.MERGED],
    description: TICKET_STATUS_DESCRIPTIONS[TICKET_STATUS.MERGED],
    timeLimitHours: TICKET_STATUS_TIME_LIMITS[TICKET_STATUS.MERGED],
    requiredAction: TICKET_STATUS_REQUIRED_ACTIONS[TICKET_STATUS.MERGED],
    notification: TICKET_STATUS_NOTIFICATIONS[TICKET_STATUS.MERGED],
  },
};
