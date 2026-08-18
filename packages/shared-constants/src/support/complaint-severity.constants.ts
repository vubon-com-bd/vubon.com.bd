/**
 * কমপ্লেইন্টের সিভেরিটি লেভেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * কমপ্লেইন্ট সিভেরিটি লেভেল
 */
export const COMPLAINT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  CATASTROPHIC: 'catastrophic',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির ডিসপ্লে নাম
 */
export const COMPLAINT_SEVERITY_DISPLAY_NAMES = {
  [COMPLAINT_SEVERITY.LOW]: 'নিম্ন',
  [COMPLAINT_SEVERITY.MEDIUM]: 'মাঝারি',
  [COMPLAINT_SEVERITY.HIGH]: 'উচ্চ',
  [COMPLAINT_SEVERITY.CRITICAL]: 'জটিল',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'বিপর্যয়কর',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির রঙের কোড (হেক্স)
 */
export const COMPLAINT_SEVERITY_COLORS = {
  [COMPLAINT_SEVERITY.LOW]: '#3498db',
  [COMPLAINT_SEVERITY.MEDIUM]: '#f39c12',
  [COMPLAINT_SEVERITY.HIGH]: '#e67e22',
  [COMPLAINT_SEVERITY.CRITICAL]: '#e74c3c',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: '#c0392b',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির আইকন (অনুষঙ্গিক নাম)
 */
export const COMPLAINT_SEVERITY_ICONS = {
  [COMPLAINT_SEVERITY.LOW]: 'arrow-down',
  [COMPLAINT_SEVERITY.MEDIUM]: 'minus',
  [COMPLAINT_SEVERITY.HIGH]: 'arrow-up',
  [COMPLAINT_SEVERITY.CRITICAL]: 'alert-triangle',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'alert-circle',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির বিবরণ
 */
export const COMPLAINT_SEVERITY_DESCRIPTIONS = {
  [COMPLAINT_SEVERITY.LOW]: 'সামান্য সমস্যা, তাৎক্ষণিক সমাধান প্রয়োজন নেই',
  [COMPLAINT_SEVERITY.MEDIUM]: 'মাঝারি সমস্যা, নির্ধারিত সময়সীমার মধ্যে সমাধান করুন',
  [COMPLAINT_SEVERITY.HIGH]: 'গুরুতর সমস্যা, দ্রুত সমাধান প্রয়োজন',
  [COMPLAINT_SEVERITY.CRITICAL]: 'অত্যন্ত গুরুতর সমস্যা, তাৎক্ষণিক পদক্ষেপ প্রয়োজন',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'সর্বোচ্চ গুরুত্বের সমস্যা, জরুরি পদক্ষেপ প্রয়োজন',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির রেসপন্স টাইম (ঘন্টায়)
 */
export const COMPLAINT_SEVERITY_RESPONSE_TIME = {
  [COMPLAINT_SEVERITY.LOW]: 48,
  [COMPLAINT_SEVERITY.MEDIUM]: 24,
  [COMPLAINT_SEVERITY.HIGH]: 12,
  [COMPLAINT_SEVERITY.CRITICAL]: 6,
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 2,
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির রেজোলিউশন টাইম (ঘন্টায়)
 */
export const COMPLAINT_SEVERITY_RESOLUTION_TIME = {
  [COMPLAINT_SEVERITY.LOW]: 168,
  [COMPLAINT_SEVERITY.MEDIUM]: 72,
  [COMPLAINT_SEVERITY.HIGH]: 48,
  [COMPLAINT_SEVERITY.CRITICAL]: 24,
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 12,
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির এসকেলেশন লেভেল
 */
export const COMPLAINT_SEVERITY_ESCALATION_LEVEL = {
  [COMPLAINT_SEVERITY.LOW]: 1,
  [COMPLAINT_SEVERITY.MEDIUM]: 2,
  [COMPLAINT_SEVERITY.HIGH]: 3,
  [COMPLAINT_SEVERITY.CRITICAL]: 4,
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 5,
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির এসকেলেশন থ্রেশহোল্ড (ঘন্টায়)
 */
export const COMPLAINT_SEVERITY_ESCALATION_THRESHOLD = {
  [COMPLAINT_SEVERITY.LOW]: 72,
  [COMPLAINT_SEVERITY.MEDIUM]: 48,
  [COMPLAINT_SEVERITY.HIGH]: 24,
  [COMPLAINT_SEVERITY.CRITICAL]: 12,
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 6,
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির এসকেলেশন পাথ
 */
export const COMPLAINT_SEVERITY_ESCALATION_PATH = {
  [COMPLAINT_SEVERITY.LOW]: ['support_agent', 'support_lead'] as string[],
  [COMPLAINT_SEVERITY.MEDIUM]: ['support_agent', 'support_lead', 'support_manager'] as string[],
  [COMPLAINT_SEVERITY.HIGH]: ['support_lead', 'support_manager', 'support_director'] as string[],
  [COMPLAINT_SEVERITY.CRITICAL]: ['support_manager', 'support_director', 'cto'] as string[],
  [COMPLAINT_SEVERITY.CATASTROPHIC]: ['support_director', 'cto', 'ceo'] as string[],
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির প্রয়োজনীয় দক্ষতা স্তর
 */
export const COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL = {
  [COMPLAINT_SEVERITY.LOW]: 'junior',
  [COMPLAINT_SEVERITY.MEDIUM]: 'mid',
  [COMPLAINT_SEVERITY.HIGH]: 'senior',
  [COMPLAINT_SEVERITY.CRITICAL]: 'expert',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'expert',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির নোটিফিকেশন সেটিংস
 */
export const COMPLAINT_SEVERITY_NOTIFICATIONS = {
  [COMPLAINT_SEVERITY.LOW]: {
    email: true,
    sms: false,
    push: false,
    slack: false,
    template: 'severity_low',
  },
  [COMPLAINT_SEVERITY.MEDIUM]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
    template: 'severity_medium',
  },
  [COMPLAINT_SEVERITY.HIGH]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'severity_high',
  },
  [COMPLAINT_SEVERITY.CRITICAL]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'severity_critical',
  },
  [COMPLAINT_SEVERITY.CATASTROPHIC]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
    template: 'severity_catastrophic',
  },
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির ওজন (স্কোরিং এর জন্য)
 */
export const COMPLAINT_SEVERITY_WEIGHT = {
  [COMPLAINT_SEVERITY.LOW]: 1,
  [COMPLAINT_SEVERITY.MEDIUM]: 2,
  [COMPLAINT_SEVERITY.HIGH]: 3,
  [COMPLAINT_SEVERITY.CRITICAL]: 4,
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 5,
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির অটো-অ্যাসাইনমেন্ট রুলস
 */
export const COMPLAINT_SEVERITY_AUTO_ASSIGNMENT = {
  [COMPLAINT_SEVERITY.LOW]: {
    enabled: true,
    minExperience: 0,
    maxTickets: 10,
  },
  [COMPLAINT_SEVERITY.MEDIUM]: {
    enabled: true,
    minExperience: 1,
    maxTickets: 8,
  },
  [COMPLAINT_SEVERITY.HIGH]: {
    enabled: true,
    minExperience: 2,
    maxTickets: 5,
  },
  [COMPLAINT_SEVERITY.CRITICAL]: {
    enabled: true,
    minExperience: 3,
    maxTickets: 3,
  },
  [COMPLAINT_SEVERITY.CATASTROPHIC]: {
    enabled: true,
    minExperience: 4,
    maxTickets: 2,
  },
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির SLA (Service Level Agreement) লেভেল
 */
export const COMPLAINT_SEVERITY_SLA_LEVEL = {
  [COMPLAINT_SEVERITY.LOW]: 'standard',
  [COMPLAINT_SEVERITY.MEDIUM]: 'standard',
  [COMPLAINT_SEVERITY.HIGH]: 'premium',
  [COMPLAINT_SEVERITY.CRITICAL]: 'enterprise',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'enterprise',
} as const;

/**
 * কমপ্লেইন্ট সিভেরিটির ব্যবসায়িক প্রভাব
 */
export const COMPLAINT_SEVERITY_BUSINESS_IMPACT = {
  [COMPLAINT_SEVERITY.LOW]: 'কম ব্যবসায়িক প্রভাব',
  [COMPLAINT_SEVERITY.MEDIUM]: 'মাঝারি ব্যবসায়িক প্রভাব',
  [COMPLAINT_SEVERITY.HIGH]: 'উচ্চ ব্যবসায়িক প্রভাব',
  [COMPLAINT_SEVERITY.CRITICAL]: 'গুরুতর ব্যবসায়িক প্রভাব',
  [COMPLAINT_SEVERITY.CATASTROPHIC]: 'মারাত্মক ব্যবসায়িক প্রভাব',
} as const;

export type ComplaintSeverity = (typeof COMPLAINT_SEVERITY)[keyof typeof COMPLAINT_SEVERITY];
export type ComplaintSeverityDisplayNames = typeof COMPLAINT_SEVERITY_DISPLAY_NAMES;
export type ComplaintSeverityColors = typeof COMPLAINT_SEVERITY_COLORS;
export type ComplaintSeverityIcons = typeof COMPLAINT_SEVERITY_ICONS;
export type ComplaintSeverityDescriptions = typeof COMPLAINT_SEVERITY_DESCRIPTIONS;
export type ComplaintSeverityResponseTime = typeof COMPLAINT_SEVERITY_RESPONSE_TIME;
export type ComplaintSeverityResolutionTime = typeof COMPLAINT_SEVERITY_RESOLUTION_TIME;
export type ComplaintSeverityEscalationLevel = typeof COMPLAINT_SEVERITY_ESCALATION_LEVEL;
export type ComplaintSeverityEscalationThreshold = typeof COMPLAINT_SEVERITY_ESCALATION_THRESHOLD;
export type ComplaintSeverityEscalationPath = typeof COMPLAINT_SEVERITY_ESCALATION_PATH;
export type ComplaintSeverityRequiredSkillLevel = typeof COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL;
export type ComplaintSeverityNotifications = typeof COMPLAINT_SEVERITY_NOTIFICATIONS;
export type ComplaintSeverityWeight = typeof COMPLAINT_SEVERITY_WEIGHT;
export type ComplaintSeverityAutoAssignment = typeof COMPLAINT_SEVERITY_AUTO_ASSIGNMENT;
export type ComplaintSeveritySlaLevel = typeof COMPLAINT_SEVERITY_SLA_LEVEL;
export type ComplaintSeverityBusinessImpact = typeof COMPLAINT_SEVERITY_BUSINESS_IMPACT;

export interface ComplaintSeverityConfig {
  severity: ComplaintSeverity;
  displayName: string;
  color: string;
  icon: string;
  description: string;
  responseTimeHours: number;
  resolutionTimeHours: number;
  escalationLevel: number;
  escalationThresholdHours: number;
  escalationPath: string[];
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
  slaLevel: 'standard' | 'premium' | 'enterprise';
  businessImpact: string;
}

/**
 * কমপ্লেইন্ট সিভেরিটি কনফিগারেশন অবজেক্ট
 */
export const COMPLAINT_SEVERITY_CONFIGS: Record<ComplaintSeverity, ComplaintSeverityConfig> = {
  [COMPLAINT_SEVERITY.LOW]: {
    severity: COMPLAINT_SEVERITY.LOW,
    displayName: COMPLAINT_SEVERITY_DISPLAY_NAMES[COMPLAINT_SEVERITY.LOW],
    color: COMPLAINT_SEVERITY_COLORS[COMPLAINT_SEVERITY.LOW],
    icon: COMPLAINT_SEVERITY_ICONS[COMPLAINT_SEVERITY.LOW],
    description: COMPLAINT_SEVERITY_DESCRIPTIONS[COMPLAINT_SEVERITY.LOW],
    responseTimeHours: COMPLAINT_SEVERITY_RESPONSE_TIME[COMPLAINT_SEVERITY.LOW],
    resolutionTimeHours: COMPLAINT_SEVERITY_RESOLUTION_TIME[COMPLAINT_SEVERITY.LOW],
    escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL[COMPLAINT_SEVERITY.LOW],
    escalationThresholdHours: COMPLAINT_SEVERITY_ESCALATION_THRESHOLD[COMPLAINT_SEVERITY.LOW],
    escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH[COMPLAINT_SEVERITY.LOW],
    requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL[COMPLAINT_SEVERITY.LOW] as 'junior',
    notification: COMPLAINT_SEVERITY_NOTIFICATIONS[COMPLAINT_SEVERITY.LOW],
    weight: COMPLAINT_SEVERITY_WEIGHT[COMPLAINT_SEVERITY.LOW],
    autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT[COMPLAINT_SEVERITY.LOW],
    slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL[COMPLAINT_SEVERITY.LOW] as 'standard',
    businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT[COMPLAINT_SEVERITY.LOW],
  },
  [COMPLAINT_SEVERITY.MEDIUM]: {
    severity: COMPLAINT_SEVERITY.MEDIUM,
    displayName: COMPLAINT_SEVERITY_DISPLAY_NAMES[COMPLAINT_SEVERITY.MEDIUM],
    color: COMPLAINT_SEVERITY_COLORS[COMPLAINT_SEVERITY.MEDIUM],
    icon: COMPLAINT_SEVERITY_ICONS[COMPLAINT_SEVERITY.MEDIUM],
    description: COMPLAINT_SEVERITY_DESCRIPTIONS[COMPLAINT_SEVERITY.MEDIUM],
    responseTimeHours: COMPLAINT_SEVERITY_RESPONSE_TIME[COMPLAINT_SEVERITY.MEDIUM],
    resolutionTimeHours: COMPLAINT_SEVERITY_RESOLUTION_TIME[COMPLAINT_SEVERITY.MEDIUM],
    escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL[COMPLAINT_SEVERITY.MEDIUM],
    escalationThresholdHours: COMPLAINT_SEVERITY_ESCALATION_THRESHOLD[COMPLAINT_SEVERITY.MEDIUM],
    escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH[COMPLAINT_SEVERITY.MEDIUM],
    requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL[COMPLAINT_SEVERITY.MEDIUM] as 'mid',
    notification: COMPLAINT_SEVERITY_NOTIFICATIONS[COMPLAINT_SEVERITY.MEDIUM],
    weight: COMPLAINT_SEVERITY_WEIGHT[COMPLAINT_SEVERITY.MEDIUM],
    autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT[COMPLAINT_SEVERITY.MEDIUM],
    slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL[COMPLAINT_SEVERITY.MEDIUM] as 'standard',
    businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT[COMPLAINT_SEVERITY.MEDIUM],
  },
  [COMPLAINT_SEVERITY.HIGH]: {
    severity: COMPLAINT_SEVERITY.HIGH,
    displayName: COMPLAINT_SEVERITY_DISPLAY_NAMES[COMPLAINT_SEVERITY.HIGH],
    color: COMPLAINT_SEVERITY_COLORS[COMPLAINT_SEVERITY.HIGH],
    icon: COMPLAINT_SEVERITY_ICONS[COMPLAINT_SEVERITY.HIGH],
    description: COMPLAINT_SEVERITY_DESCRIPTIONS[COMPLAINT_SEVERITY.HIGH],
    responseTimeHours: COMPLAINT_SEVERITY_RESPONSE_TIME[COMPLAINT_SEVERITY.HIGH],
    resolutionTimeHours: COMPLAINT_SEVERITY_RESOLUTION_TIME[COMPLAINT_SEVERITY.HIGH],
    escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL[COMPLAINT_SEVERITY.HIGH],
    escalationThresholdHours: COMPLAINT_SEVERITY_ESCALATION_THRESHOLD[COMPLAINT_SEVERITY.HIGH],
    escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH[COMPLAINT_SEVERITY.HIGH],
    requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL[
      COMPLAINT_SEVERITY.HIGH
    ] as 'senior',
    notification: COMPLAINT_SEVERITY_NOTIFICATIONS[COMPLAINT_SEVERITY.HIGH],
    weight: COMPLAINT_SEVERITY_WEIGHT[COMPLAINT_SEVERITY.HIGH],
    autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT[COMPLAINT_SEVERITY.HIGH],
    slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL[COMPLAINT_SEVERITY.HIGH] as 'premium',
    businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT[COMPLAINT_SEVERITY.HIGH],
  },
  [COMPLAINT_SEVERITY.CRITICAL]: {
    severity: COMPLAINT_SEVERITY.CRITICAL,
    displayName: COMPLAINT_SEVERITY_DISPLAY_NAMES[COMPLAINT_SEVERITY.CRITICAL],
    color: COMPLAINT_SEVERITY_COLORS[COMPLAINT_SEVERITY.CRITICAL],
    icon: COMPLAINT_SEVERITY_ICONS[COMPLAINT_SEVERITY.CRITICAL],
    description: COMPLAINT_SEVERITY_DESCRIPTIONS[COMPLAINT_SEVERITY.CRITICAL],
    responseTimeHours: COMPLAINT_SEVERITY_RESPONSE_TIME[COMPLAINT_SEVERITY.CRITICAL],
    resolutionTimeHours: COMPLAINT_SEVERITY_RESOLUTION_TIME[COMPLAINT_SEVERITY.CRITICAL],
    escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL[COMPLAINT_SEVERITY.CRITICAL],
    escalationThresholdHours: COMPLAINT_SEVERITY_ESCALATION_THRESHOLD[COMPLAINT_SEVERITY.CRITICAL],
    escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH[COMPLAINT_SEVERITY.CRITICAL],
    requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL[
      COMPLAINT_SEVERITY.CRITICAL
    ] as 'expert',
    notification: COMPLAINT_SEVERITY_NOTIFICATIONS[COMPLAINT_SEVERITY.CRITICAL],
    weight: COMPLAINT_SEVERITY_WEIGHT[COMPLAINT_SEVERITY.CRITICAL],
    autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT[COMPLAINT_SEVERITY.CRITICAL],
    slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL[COMPLAINT_SEVERITY.CRITICAL] as 'enterprise',
    businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT[COMPLAINT_SEVERITY.CRITICAL],
  },
  [COMPLAINT_SEVERITY.CATASTROPHIC]: {
    severity: COMPLAINT_SEVERITY.CATASTROPHIC,
    displayName: COMPLAINT_SEVERITY_DISPLAY_NAMES[COMPLAINT_SEVERITY.CATASTROPHIC],
    color: COMPLAINT_SEVERITY_COLORS[COMPLAINT_SEVERITY.CATASTROPHIC],
    icon: COMPLAINT_SEVERITY_ICONS[COMPLAINT_SEVERITY.CATASTROPHIC],
    description: COMPLAINT_SEVERITY_DESCRIPTIONS[COMPLAINT_SEVERITY.CATASTROPHIC],
    responseTimeHours: COMPLAINT_SEVERITY_RESPONSE_TIME[COMPLAINT_SEVERITY.CATASTROPHIC],
    resolutionTimeHours: COMPLAINT_SEVERITY_RESOLUTION_TIME[COMPLAINT_SEVERITY.CATASTROPHIC],
    escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL[COMPLAINT_SEVERITY.CATASTROPHIC],
    escalationThresholdHours:
      COMPLAINT_SEVERITY_ESCALATION_THRESHOLD[COMPLAINT_SEVERITY.CATASTROPHIC],
    escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH[COMPLAINT_SEVERITY.CATASTROPHIC],
    requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL[
      COMPLAINT_SEVERITY.CATASTROPHIC
    ] as 'expert',
    notification: COMPLAINT_SEVERITY_NOTIFICATIONS[COMPLAINT_SEVERITY.CATASTROPHIC],
    weight: COMPLAINT_SEVERITY_WEIGHT[COMPLAINT_SEVERITY.CATASTROPHIC],
    autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT[COMPLAINT_SEVERITY.CATASTROPHIC],
    slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL[COMPLAINT_SEVERITY.CATASTROPHIC] as 'enterprise',
    businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT[COMPLAINT_SEVERITY.CATASTROPHIC],
  },
};

/**
 * কমপ্লেইন্ট সিভেরিটি কনফিগারেশন
 */
export const COMPLAINT_SEVERITY_CONFIG = {
  severities: COMPLAINT_SEVERITY,
  displayNames: COMPLAINT_SEVERITY_DISPLAY_NAMES,
  colors: COMPLAINT_SEVERITY_COLORS,
  icons: COMPLAINT_SEVERITY_ICONS,
  descriptions: COMPLAINT_SEVERITY_DESCRIPTIONS,
  responseTime: COMPLAINT_SEVERITY_RESPONSE_TIME,
  resolutionTime: COMPLAINT_SEVERITY_RESOLUTION_TIME,
  escalationLevel: COMPLAINT_SEVERITY_ESCALATION_LEVEL,
  escalationThreshold: COMPLAINT_SEVERITY_ESCALATION_THRESHOLD,
  escalationPath: COMPLAINT_SEVERITY_ESCALATION_PATH,
  requiredSkillLevel: COMPLAINT_SEVERITY_REQUIRED_SKILL_LEVEL,
  notifications: COMPLAINT_SEVERITY_NOTIFICATIONS,
  weight: COMPLAINT_SEVERITY_WEIGHT,
  autoAssignment: COMPLAINT_SEVERITY_AUTO_ASSIGNMENT,
  slaLevel: COMPLAINT_SEVERITY_SLA_LEVEL,
  businessImpact: COMPLAINT_SEVERITY_BUSINESS_IMPACT,
  configs: COMPLAINT_SEVERITY_CONFIGS,
} as const;
