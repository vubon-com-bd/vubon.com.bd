/**
 * টিকেটের প্রায়োরিটি লেভেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট প্রায়োরিটি লেভেল
 */
export const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  URGENT: 'urgent',
} as const;

/**
 * টিকেট প্রায়োরিটির ডিসপ্লে নাম
 */
export const TICKET_PRIORITY_DISPLAY_NAMES = {
  [TICKET_PRIORITY.LOW]: 'নিম্ন',
  [TICKET_PRIORITY.MEDIUM]: 'মাঝারি',
  [TICKET_PRIORITY.HIGH]: 'উচ্চ',
  [TICKET_PRIORITY.CRITICAL]: 'জটিল',
  [TICKET_PRIORITY.URGENT]: 'জরুরি',
} as const;

/**
 * টিকেট প্রায়োরিটির রঙের কোড (হেক্স)
 */
export const TICKET_PRIORITY_COLORS = {
  [TICKET_PRIORITY.LOW]: '#3498db', // নীল
  [TICKET_PRIORITY.MEDIUM]: '#f39c12', // কমলা
  [TICKET_PRIORITY.HIGH]: '#e67e22', // গাঢ় কমলা
  [TICKET_PRIORITY.CRITICAL]: '#e74c3c', // লাল
  [TICKET_PRIORITY.URGENT]: '#c0392b', // গাঢ় লাল
} as const;

/**
 * টিকেট প্রায়োরিটির আইকন (অনুষঙ্গিক নাম)
 */
export const TICKET_PRIORITY_ICONS = {
  [TICKET_PRIORITY.LOW]: 'arrow-down',
  [TICKET_PRIORITY.MEDIUM]: 'minus',
  [TICKET_PRIORITY.HIGH]: 'arrow-up',
  [TICKET_PRIORITY.CRITICAL]: 'alert-triangle',
  [TICKET_PRIORITY.URGENT]: 'alert-circle',
} as const;

/**
 * টিকেট প্রায়োরিটির বিবরণ
 */
export const TICKET_PRIORITY_DESCRIPTIONS = {
  [TICKET_PRIORITY.LOW]: 'কম গুরুত্বপূর্ণ, সময়সীমা নমনীয়',
  [TICKET_PRIORITY.MEDIUM]: 'মাঝারি গুরুত্বপূর্ণ, নির্ধারিত সময়সীমা অনুসরণ করুন',
  [TICKET_PRIORITY.HIGH]: 'অত্যন্ত গুরুত্বপূর্ণ, দ্রুত সমাধান প্রয়োজন',
  [TICKET_PRIORITY.CRITICAL]: 'সিস্টেম ক্র্যাশ বা গুরুতর সমস্যা, তাৎক্ষণিক সমাধান প্রয়োজন',
  [TICKET_PRIORITY.URGENT]: 'সর্বোচ্চ গুরুত্ব, অবিলম্বে পদক্ষেপ প্রয়োজন',
} as const;

/**
 * টিকেট প্রায়োরিটির রেসপন্স টাইম গোল (মিনিটে)
 */
export const TICKET_PRIORITY_RESPONSE_TIME = {
  [TICKET_PRIORITY.LOW]: 120, // 2 ঘন্টা
  [TICKET_PRIORITY.MEDIUM]: 60, // 1 ঘন্টা
  [TICKET_PRIORITY.HIGH]: 30, // 30 মিনিট
  [TICKET_PRIORITY.CRITICAL]: 15, // 15 মিনিট
  [TICKET_PRIORITY.URGENT]: 5, // 5 মিনিট
} as const;

/**
 * টিকেট প্রায়োরিটির রেজোলিউশন টাইম গোল (ঘন্টায়)
 */
export const TICKET_PRIORITY_RESOLUTION_TIME = {
  [TICKET_PRIORITY.LOW]: 72, // 3 দিন
  [TICKET_PRIORITY.MEDIUM]: 48, // 2 দিন
  [TICKET_PRIORITY.HIGH]: 24, // 1 দিন
  [TICKET_PRIORITY.CRITICAL]: 12, // 12 ঘন্টা
  [TICKET_PRIORITY.URGENT]: 6, // 6 ঘন্টা
} as const;

/**
 * টিকেট প্রায়োরিটির এস্কেলেশন থ্রেশহোল্ড (মিনিটে)
 */
export const TICKET_PRIORITY_ESCALATION_THRESHOLD = {
  [TICKET_PRIORITY.LOW]: 240, // 4 ঘন্টা
  [TICKET_PRIORITY.MEDIUM]: 120, // 2 ঘন্টা
  [TICKET_PRIORITY.HIGH]: 60, // 1 ঘন্টা
  [TICKET_PRIORITY.CRITICAL]: 30, // 30 মিনিট
  [TICKET_PRIORITY.URGENT]: 15, // 15 মিনিট
} as const;

/**
 * টিকেট প্রায়োরিটির এস্কেলেশন লেভেল
 */
export const TICKET_PRIORITY_ESCALATION_LEVEL = {
  [TICKET_PRIORITY.LOW]: 1,
  [TICKET_PRIORITY.MEDIUM]: 2,
  [TICKET_PRIORITY.HIGH]: 3,
  [TICKET_PRIORITY.CRITICAL]: 4,
  [TICKET_PRIORITY.URGENT]: 5,
} as const;

/**
 * টিকেট প্রায়োরিটির স্লা (Service Level Agreement) লেভেল
 */
export const TICKET_PRIORITY_SLA_LEVEL = {
  [TICKET_PRIORITY.LOW]: 'standard',
  [TICKET_PRIORITY.MEDIUM]: 'standard',
  [TICKET_PRIORITY.HIGH]: 'premium',
  [TICKET_PRIORITY.CRITICAL]: 'enterprise',
  [TICKET_PRIORITY.URGENT]: 'enterprise',
} as const;

/**
 * টিকেট প্রায়োরিটির ব্যবসায়িক প্রভাব
 */
export const TICKET_PRIORITY_BUSINESS_IMPACT = {
  [TICKET_PRIORITY.LOW]: 'কম ব্যবসায়িক প্রভাব',
  [TICKET_PRIORITY.MEDIUM]: 'মাঝারি ব্যবসায়িক প্রভাব',
  [TICKET_PRIORITY.HIGH]: 'উচ্চ ব্যবসায়িক প্রভাব',
  [TICKET_PRIORITY.CRITICAL]: 'গুরুতর ব্যবসায়িক প্রভাব',
  [TICKET_PRIORITY.URGENT]: 'মারাত্মক ব্যবসায়িক প্রভাব',
} as const;

/**
 * টিকেট প্রায়োরিটির প্রয়োজনীয় দক্ষতা স্তর
 */
export const TICKET_PRIORITY_REQUIRED_SKILL_LEVEL = {
  [TICKET_PRIORITY.LOW]: 'junior',
  [TICKET_PRIORITY.MEDIUM]: 'mid',
  [TICKET_PRIORITY.HIGH]: 'senior',
  [TICKET_PRIORITY.CRITICAL]: 'expert',
  [TICKET_PRIORITY.URGENT]: 'expert',
} as const;

/**
 * টিকেট প্রায়োরিটির নোটিফিকেশন সেটিংস
 */
export const TICKET_PRIORITY_NOTIFICATIONS = {
  [TICKET_PRIORITY.LOW]: {
    email: true,
    sms: false,
    push: false,
    slack: false,
    template: 'priority_low',
  },
  [TICKET_PRIORITY.MEDIUM]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
    template: 'priority_medium',
  },
  [TICKET_PRIORITY.HIGH]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'priority_high',
  },
  [TICKET_PRIORITY.CRITICAL]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'priority_critical',
  },
  [TICKET_PRIORITY.URGENT]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'priority_urgent',
  },
} as const;

/**
 * টিকেট প্রায়োরিটির ওজন (স্কোরিং এর জন্য)
 */
export const TICKET_PRIORITY_WEIGHT = {
  [TICKET_PRIORITY.LOW]: 1,
  [TICKET_PRIORITY.MEDIUM]: 2,
  [TICKET_PRIORITY.HIGH]: 3,
  [TICKET_PRIORITY.CRITICAL]: 4,
  [TICKET_PRIORITY.URGENT]: 5,
} as const;

/**
 * টিকেট প্রায়োরিটির অটো-অ্যাসাইনমেন্ট রুলস
 */
export const TICKET_PRIORITY_AUTO_ASSIGNMENT = {
  [TICKET_PRIORITY.LOW]: {
    enabled: true,
    minExperience: 0,
    maxTickets: 10,
  },
  [TICKET_PRIORITY.MEDIUM]: {
    enabled: true,
    minExperience: 1,
    maxTickets: 8,
  },
  [TICKET_PRIORITY.HIGH]: {
    enabled: true,
    minExperience: 2,
    maxTickets: 5,
  },
  [TICKET_PRIORITY.CRITICAL]: {
    enabled: true,
    minExperience: 3,
    maxTickets: 3,
  },
  [TICKET_PRIORITY.URGENT]: {
    enabled: true,
    minExperience: 4,
    maxTickets: 2,
  },
} as const;

/**
 * টিকেট প্রায়োরিটির এসকালেশন পাথ (মিউটেবল অ্যারে হিসেবে কনভার্ট করা হয়েছে)
 */
export const TICKET_PRIORITY_ESCALATION_PATH = {
  [TICKET_PRIORITY.LOW]: ['support_agent', 'support_lead'] as string[],
  [TICKET_PRIORITY.MEDIUM]: ['support_agent', 'support_lead', 'support_manager'] as string[],
  [TICKET_PRIORITY.HIGH]: ['support_lead', 'support_manager', 'support_director'] as string[],
  [TICKET_PRIORITY.CRITICAL]: ['support_manager', 'support_director', 'cto'] as string[],
  [TICKET_PRIORITY.URGENT]: ['support_director', 'cto', 'ceo'] as string[],
} as const;

export type TicketPriority = (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY];
export type TicketPriorityDisplayNames = typeof TICKET_PRIORITY_DISPLAY_NAMES;
export type TicketPriorityColors = typeof TICKET_PRIORITY_COLORS;
export type TicketPriorityIcons = typeof TICKET_PRIORITY_ICONS;
export type TicketPriorityDescriptions = typeof TICKET_PRIORITY_DESCRIPTIONS;
export type TicketPriorityResponseTime = typeof TICKET_PRIORITY_RESPONSE_TIME;
export type TicketPriorityResolutionTime = typeof TICKET_PRIORITY_RESOLUTION_TIME;
export type TicketPriorityEscalationThreshold = typeof TICKET_PRIORITY_ESCALATION_THRESHOLD;
export type TicketPriorityEscalationLevel = typeof TICKET_PRIORITY_ESCALATION_LEVEL;
export type TicketPrioritySlaLevel = typeof TICKET_PRIORITY_SLA_LEVEL;
export type TicketPriorityBusinessImpact = typeof TICKET_PRIORITY_BUSINESS_IMPACT;
export type TicketPriorityRequiredSkillLevel = typeof TICKET_PRIORITY_REQUIRED_SKILL_LEVEL;
export type TicketPriorityNotifications = typeof TICKET_PRIORITY_NOTIFICATIONS;
export type TicketPriorityWeight = typeof TICKET_PRIORITY_WEIGHT;
export type TicketPriorityAutoAssignment = typeof TICKET_PRIORITY_AUTO_ASSIGNMENT;
export type TicketPriorityEscalationPath = typeof TICKET_PRIORITY_ESCALATION_PATH;

export interface TicketPriorityConfig {
  priority: TicketPriority;
  displayName: string;
  color: string;
  icon: string;
  description: string;
  responseTimeMinutes: number;
  resolutionTimeHours: number;
  escalationThresholdMinutes: number;
  escalationLevel: number;
  slaLevel: 'standard' | 'premium' | 'enterprise';
  businessImpact: string;
  requiredSkillLevel: 'junior' | 'mid' | 'senior' | 'expert';
  notification: {
    email: boolean;
    sms: boolean;
    push: boolean;
    slack: boolean;
    template: string;
  };
  weight: number;
  autoAssignment: {
    enabled: boolean;
    minExperience: number;
    maxTickets: number;
  };
  escalationPath: readonly string[];
}

/**
 * টিকেট প্রায়োরিটি কনফিগারেশন অবজেক্ট
 */
export const TICKET_PRIORITY_CONFIGS: Record<TicketPriority, TicketPriorityConfig> = {
  [TICKET_PRIORITY.LOW]: {
    priority: TICKET_PRIORITY.LOW,
    displayName: TICKET_PRIORITY_DISPLAY_NAMES[TICKET_PRIORITY.LOW],
    color: TICKET_PRIORITY_COLORS[TICKET_PRIORITY.LOW],
    icon: TICKET_PRIORITY_ICONS[TICKET_PRIORITY.LOW],
    description: TICKET_PRIORITY_DESCRIPTIONS[TICKET_PRIORITY.LOW],
    responseTimeMinutes: TICKET_PRIORITY_RESPONSE_TIME[TICKET_PRIORITY.LOW],
    resolutionTimeHours: TICKET_PRIORITY_RESOLUTION_TIME[TICKET_PRIORITY.LOW],
    escalationThresholdMinutes: TICKET_PRIORITY_ESCALATION_THRESHOLD[TICKET_PRIORITY.LOW],
    escalationLevel: TICKET_PRIORITY_ESCALATION_LEVEL[TICKET_PRIORITY.LOW],
    slaLevel: TICKET_PRIORITY_SLA_LEVEL[TICKET_PRIORITY.LOW] as 'standard',
    businessImpact: TICKET_PRIORITY_BUSINESS_IMPACT[TICKET_PRIORITY.LOW],
    requiredSkillLevel: TICKET_PRIORITY_REQUIRED_SKILL_LEVEL[TICKET_PRIORITY.LOW] as 'junior',
    notification: TICKET_PRIORITY_NOTIFICATIONS[TICKET_PRIORITY.LOW],
    weight: TICKET_PRIORITY_WEIGHT[TICKET_PRIORITY.LOW],
    autoAssignment: TICKET_PRIORITY_AUTO_ASSIGNMENT[TICKET_PRIORITY.LOW],
    escalationPath: TICKET_PRIORITY_ESCALATION_PATH[TICKET_PRIORITY.LOW],
  },
  [TICKET_PRIORITY.MEDIUM]: {
    priority: TICKET_PRIORITY.MEDIUM,
    displayName: TICKET_PRIORITY_DISPLAY_NAMES[TICKET_PRIORITY.MEDIUM],
    color: TICKET_PRIORITY_COLORS[TICKET_PRIORITY.MEDIUM],
    icon: TICKET_PRIORITY_ICONS[TICKET_PRIORITY.MEDIUM],
    description: TICKET_PRIORITY_DESCRIPTIONS[TICKET_PRIORITY.MEDIUM],
    responseTimeMinutes: TICKET_PRIORITY_RESPONSE_TIME[TICKET_PRIORITY.MEDIUM],
    resolutionTimeHours: TICKET_PRIORITY_RESOLUTION_TIME[TICKET_PRIORITY.MEDIUM],
    escalationThresholdMinutes: TICKET_PRIORITY_ESCALATION_THRESHOLD[TICKET_PRIORITY.MEDIUM],
    escalationLevel: TICKET_PRIORITY_ESCALATION_LEVEL[TICKET_PRIORITY.MEDIUM],
    slaLevel: TICKET_PRIORITY_SLA_LEVEL[TICKET_PRIORITY.MEDIUM] as 'standard',
    businessImpact: TICKET_PRIORITY_BUSINESS_IMPACT[TICKET_PRIORITY.MEDIUM],
    requiredSkillLevel: TICKET_PRIORITY_REQUIRED_SKILL_LEVEL[TICKET_PRIORITY.MEDIUM] as 'mid',
    notification: TICKET_PRIORITY_NOTIFICATIONS[TICKET_PRIORITY.MEDIUM],
    weight: TICKET_PRIORITY_WEIGHT[TICKET_PRIORITY.MEDIUM],
    autoAssignment: TICKET_PRIORITY_AUTO_ASSIGNMENT[TICKET_PRIORITY.MEDIUM],
    escalationPath: TICKET_PRIORITY_ESCALATION_PATH[TICKET_PRIORITY.MEDIUM],
  },
  [TICKET_PRIORITY.HIGH]: {
    priority: TICKET_PRIORITY.HIGH,
    displayName: TICKET_PRIORITY_DISPLAY_NAMES[TICKET_PRIORITY.HIGH],
    color: TICKET_PRIORITY_COLORS[TICKET_PRIORITY.HIGH],
    icon: TICKET_PRIORITY_ICONS[TICKET_PRIORITY.HIGH],
    description: TICKET_PRIORITY_DESCRIPTIONS[TICKET_PRIORITY.HIGH],
    responseTimeMinutes: TICKET_PRIORITY_RESPONSE_TIME[TICKET_PRIORITY.HIGH],
    resolutionTimeHours: TICKET_PRIORITY_RESOLUTION_TIME[TICKET_PRIORITY.HIGH],
    escalationThresholdMinutes: TICKET_PRIORITY_ESCALATION_THRESHOLD[TICKET_PRIORITY.HIGH],
    escalationLevel: TICKET_PRIORITY_ESCALATION_LEVEL[TICKET_PRIORITY.HIGH],
    slaLevel: TICKET_PRIORITY_SLA_LEVEL[TICKET_PRIORITY.HIGH] as 'premium',
    businessImpact: TICKET_PRIORITY_BUSINESS_IMPACT[TICKET_PRIORITY.HIGH],
    requiredSkillLevel: TICKET_PRIORITY_REQUIRED_SKILL_LEVEL[TICKET_PRIORITY.HIGH] as 'senior',
    notification: TICKET_PRIORITY_NOTIFICATIONS[TICKET_PRIORITY.HIGH],
    weight: TICKET_PRIORITY_WEIGHT[TICKET_PRIORITY.HIGH],
    autoAssignment: TICKET_PRIORITY_AUTO_ASSIGNMENT[TICKET_PRIORITY.HIGH],
    escalationPath: TICKET_PRIORITY_ESCALATION_PATH[TICKET_PRIORITY.HIGH],
  },
  [TICKET_PRIORITY.CRITICAL]: {
    priority: TICKET_PRIORITY.CRITICAL,
    displayName: TICKET_PRIORITY_DISPLAY_NAMES[TICKET_PRIORITY.CRITICAL],
    color: TICKET_PRIORITY_COLORS[TICKET_PRIORITY.CRITICAL],
    icon: TICKET_PRIORITY_ICONS[TICKET_PRIORITY.CRITICAL],
    description: TICKET_PRIORITY_DESCRIPTIONS[TICKET_PRIORITY.CRITICAL],
    responseTimeMinutes: TICKET_PRIORITY_RESPONSE_TIME[TICKET_PRIORITY.CRITICAL],
    resolutionTimeHours: TICKET_PRIORITY_RESOLUTION_TIME[TICKET_PRIORITY.CRITICAL],
    escalationThresholdMinutes: TICKET_PRIORITY_ESCALATION_THRESHOLD[TICKET_PRIORITY.CRITICAL],
    escalationLevel: TICKET_PRIORITY_ESCALATION_LEVEL[TICKET_PRIORITY.CRITICAL],
    slaLevel: TICKET_PRIORITY_SLA_LEVEL[TICKET_PRIORITY.CRITICAL] as 'enterprise',
    businessImpact: TICKET_PRIORITY_BUSINESS_IMPACT[TICKET_PRIORITY.CRITICAL],
    requiredSkillLevel: TICKET_PRIORITY_REQUIRED_SKILL_LEVEL[TICKET_PRIORITY.CRITICAL] as 'expert',
    notification: TICKET_PRIORITY_NOTIFICATIONS[TICKET_PRIORITY.CRITICAL],
    weight: TICKET_PRIORITY_WEIGHT[TICKET_PRIORITY.CRITICAL],
    autoAssignment: TICKET_PRIORITY_AUTO_ASSIGNMENT[TICKET_PRIORITY.CRITICAL],
    escalationPath: TICKET_PRIORITY_ESCALATION_PATH[TICKET_PRIORITY.CRITICAL],
  },
  [TICKET_PRIORITY.URGENT]: {
    priority: TICKET_PRIORITY.URGENT,
    displayName: TICKET_PRIORITY_DISPLAY_NAMES[TICKET_PRIORITY.URGENT],
    color: TICKET_PRIORITY_COLORS[TICKET_PRIORITY.URGENT],
    icon: TICKET_PRIORITY_ICONS[TICKET_PRIORITY.URGENT],
    description: TICKET_PRIORITY_DESCRIPTIONS[TICKET_PRIORITY.URGENT],
    responseTimeMinutes: TICKET_PRIORITY_RESPONSE_TIME[TICKET_PRIORITY.URGENT],
    resolutionTimeHours: TICKET_PRIORITY_RESOLUTION_TIME[TICKET_PRIORITY.URGENT],
    escalationThresholdMinutes: TICKET_PRIORITY_ESCALATION_THRESHOLD[TICKET_PRIORITY.URGENT],
    escalationLevel: TICKET_PRIORITY_ESCALATION_LEVEL[TICKET_PRIORITY.URGENT],
    slaLevel: TICKET_PRIORITY_SLA_LEVEL[TICKET_PRIORITY.URGENT] as 'enterprise',
    businessImpact: TICKET_PRIORITY_BUSINESS_IMPACT[TICKET_PRIORITY.URGENT],
    requiredSkillLevel: TICKET_PRIORITY_REQUIRED_SKILL_LEVEL[TICKET_PRIORITY.URGENT] as 'expert',
    notification: TICKET_PRIORITY_NOTIFICATIONS[TICKET_PRIORITY.URGENT],
    weight: TICKET_PRIORITY_WEIGHT[TICKET_PRIORITY.URGENT],
    autoAssignment: TICKET_PRIORITY_AUTO_ASSIGNMENT[TICKET_PRIORITY.URGENT],
    escalationPath: TICKET_PRIORITY_ESCALATION_PATH[TICKET_PRIORITY.URGENT],
  },
};
