/**
 * টিকেট এস্কেলেশন প্রক্রিয়ার কনস্ট্যান্টসমূহ
 */

/**
 * এস্কেলেশন লেভেল
 */
export const ESCALATION_LEVEL = {
  LEVEL_1: 'level_1',
  LEVEL_2: 'level_2',
  LEVEL_3: 'level_3',
  LEVEL_4: 'level_4',
  LEVEL_5: 'level_5',
} as const;

/**
 * এস্কেলেশন লেভেলের ডিসপ্লে নাম
 */
export const ESCALATION_LEVEL_DISPLAY_NAMES = {
  [ESCALATION_LEVEL.LEVEL_1]: 'প্রথম স্তর',
  [ESCALATION_LEVEL.LEVEL_2]: 'দ্বিতীয় স্তর',
  [ESCALATION_LEVEL.LEVEL_3]: 'তৃতীয় স্তর',
  [ESCALATION_LEVEL.LEVEL_4]: 'চতুর্থ স্তর',
  [ESCALATION_LEVEL.LEVEL_5]: 'পঞ্চম স্তর',
} as const;

/**
 * এস্কেলেশন লেভেলের রঙের কোড (হেক্স)
 */
export const ESCALATION_LEVEL_COLORS = {
  [ESCALATION_LEVEL.LEVEL_1]: '#3498db',
  [ESCALATION_LEVEL.LEVEL_2]: '#f39c12',
  [ESCALATION_LEVEL.LEVEL_3]: '#e67e22',
  [ESCALATION_LEVEL.LEVEL_4]: '#e74c3c',
  [ESCALATION_LEVEL.LEVEL_5]: '#c0392b',
} as const;

/**
 * এস্কেলেশন লেভেলের টাইমআউট (মিনিটে)
 */
export const ESCALATION_LEVEL_TIMEOUT = {
  [ESCALATION_LEVEL.LEVEL_1]: 60,
  [ESCALATION_LEVEL.LEVEL_2]: 45,
  [ESCALATION_LEVEL.LEVEL_3]: 30,
  [ESCALATION_LEVEL.LEVEL_4]: 15,
  [ESCALATION_LEVEL.LEVEL_5]: 5,
} as const;

/**
 * এস্কেলেশন রিজন
 */
export const ESCALATION_REASON = {
  TIMEOUT: 'timeout',
  COMPLEXITY: 'complexity',
  CUSTOMER_REQUEST: 'customer_request',
  PRIORITY_CHANGE: 'priority_change',
  TECHNICAL_ISSUE: 'technical_issue',
  RESOURCE_UNAVAILABLE: 'resource_unavailable',
  APPROVAL_REQUIRED: 'approval_required',
  EXTERNAL_DEPENDENCY: 'external_dependency',
  RECURRING_ISSUE: 'recurring_issue',
  HIGH_IMPACT: 'high_impact',
  SECURITY_CONCERN: 'security_concern',
  LEGAL_REQUIREMENT: 'legal_requirement',
} as const;

/**
 * এস্কেলেশন রিজনের ডিসপ্লে নাম
 */
export const ESCALATION_REASON_DISPLAY_NAMES = {
  [ESCALATION_REASON.TIMEOUT]: 'সময়সীমা অতিক্রম',
  [ESCALATION_REASON.COMPLEXITY]: 'জটিল সমস্যা',
  [ESCALATION_REASON.CUSTOMER_REQUEST]: 'গ্রাহকের অনুরোধ',
  [ESCALATION_REASON.PRIORITY_CHANGE]: 'প্রায়োরিটি পরিবর্তন',
  [ESCALATION_REASON.TECHNICAL_ISSUE]: 'প্রযুক্তিগত সমস্যা',
  [ESCALATION_REASON.RESOURCE_UNAVAILABLE]: 'রিসোর্স অনুপলব্ধ',
  [ESCALATION_REASON.APPROVAL_REQUIRED]: 'অনুমোদন প্রয়োজন',
  [ESCALATION_REASON.EXTERNAL_DEPENDENCY]: 'বাহ্যিক নির্ভরতা',
  [ESCALATION_REASON.RECURRING_ISSUE]: 'পুনরাবৃত্ত সমস্যা',
  [ESCALATION_REASON.HIGH_IMPACT]: 'উচ্চ প্রভাব',
  [ESCALATION_REASON.SECURITY_CONCERN]: 'সিকিউরিটি উদ্বেগ',
  [ESCALATION_REASON.LEGAL_REQUIREMENT]: 'আইনি প্রয়োজনীয়তা',
} as const;

/**
 * এস্কেলেশন রিজনের আইকন (অনুষঙ্গিক নাম)
 */
export const ESCALATION_REASON_ICONS = {
  [ESCALATION_REASON.TIMEOUT]: 'clock',
  [ESCALATION_REASON.COMPLEXITY]: 'layers',
  [ESCALATION_REASON.CUSTOMER_REQUEST]: 'user',
  [ESCALATION_REASON.PRIORITY_CHANGE]: 'arrow-up',
  [ESCALATION_REASON.TECHNICAL_ISSUE]: 'cpu',
  [ESCALATION_REASON.RESOURCE_UNAVAILABLE]: 'server',
  [ESCALATION_REASON.APPROVAL_REQUIRED]: 'check-circle',
  [ESCALATION_REASON.EXTERNAL_DEPENDENCY]: 'link',
  [ESCALATION_REASON.RECURRING_ISSUE]: 'refresh-cw',
  [ESCALATION_REASON.HIGH_IMPACT]: 'alert-triangle',
  [ESCALATION_REASON.SECURITY_CONCERN]: 'shield',
  [ESCALATION_REASON.LEGAL_REQUIREMENT]: 'file-text',
} as const;

/**
 * এস্কেলেশন রিজনের গুরুত্ব স্তর
 */
export const ESCALATION_REASON_SEVERITY = {
  [ESCALATION_REASON.TIMEOUT]: 'medium',
  [ESCALATION_REASON.COMPLEXITY]: 'high',
  [ESCALATION_REASON.CUSTOMER_REQUEST]: 'medium',
  [ESCALATION_REASON.PRIORITY_CHANGE]: 'high',
  [ESCALATION_REASON.TECHNICAL_ISSUE]: 'high',
  [ESCALATION_REASON.RESOURCE_UNAVAILABLE]: 'critical',
  [ESCALATION_REASON.APPROVAL_REQUIRED]: 'medium',
  [ESCALATION_REASON.EXTERNAL_DEPENDENCY]: 'high',
  [ESCALATION_REASON.RECURRING_ISSUE]: 'high',
  [ESCALATION_REASON.HIGH_IMPACT]: 'critical',
  [ESCALATION_REASON.SECURITY_CONCERN]: 'critical',
  [ESCALATION_REASON.LEGAL_REQUIREMENT]: 'critical',
} as const;

/**
 * এস্কেলেশন থ্রেশহোল্ড (মিনিটে)
 */
export const ESCALATION_THRESHOLD = {
  LOW: 120,
  MEDIUM: 60,
  HIGH: 30,
  CRITICAL: 15,
} as const;

/**
 * এস্কেলেশন টাইমআউট (মিনিটে)
 */
export const ESCALATION_TIMEOUT = {
  LOW: 240,
  MEDIUM: 120,
  HIGH: 60,
  CRITICAL: 30,
} as const;

/**
 * এস্কেলেশন এজ
 */
export const ESCALATION_AGE = {
  NEW: 'new',
  RECENT: 'recent',
  OLD: 'old',
  STALE: 'stale',
} as const;

/**
 * এস্কেলেশন স্ট্যাটাস
 */
export const ESCALATION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

/**
 * এস্কেলেশন পাথে ডিফল্ট রোলস
 */
export const ESCALATION_DEFAULT_ROLES = {
  [ESCALATION_LEVEL.LEVEL_1]: ['support_agent'],
  [ESCALATION_LEVEL.LEVEL_2]: ['support_lead'],
  [ESCALATION_LEVEL.LEVEL_3]: ['support_manager'],
  [ESCALATION_LEVEL.LEVEL_4]: ['support_director'],
  [ESCALATION_LEVEL.LEVEL_5]: ['cto'],
} as const;

export type EscalationLevel = (typeof ESCALATION_LEVEL)[keyof typeof ESCALATION_LEVEL];
export type EscalationReason = (typeof ESCALATION_REASON)[keyof typeof ESCALATION_REASON];
export type EscalationThreshold = (typeof ESCALATION_THRESHOLD)[keyof typeof ESCALATION_THRESHOLD];
export type EscalationTimeout = (typeof ESCALATION_TIMEOUT)[keyof typeof ESCALATION_TIMEOUT];
export type EscalationAge = (typeof ESCALATION_AGE)[keyof typeof ESCALATION_AGE];
export type EscalationStatus = (typeof ESCALATION_STATUS)[keyof typeof ESCALATION_STATUS];

export type EscalationLevelDisplayNames = typeof ESCALATION_LEVEL_DISPLAY_NAMES;
export type EscalationLevelColors = typeof ESCALATION_LEVEL_COLORS;
export type EscalationLevelTimeout = typeof ESCALATION_LEVEL_TIMEOUT;
export type EscalationReasonDisplayNames = typeof ESCALATION_REASON_DISPLAY_NAMES;
export type EscalationReasonIcons = typeof ESCALATION_REASON_ICONS;
export type EscalationReasonSeverity = typeof ESCALATION_REASON_SEVERITY;
export type EscalationDefaultRoles = typeof ESCALATION_DEFAULT_ROLES;

export interface EscalationLevelConfig {
  level: EscalationLevel;
  displayName: string;
  color: string;
  timeoutMinutes: number;
  roles: readonly string[];
}

export interface EscalationReasonConfig {
  reason: EscalationReason;
  displayName: string;
  icon: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface EscalationConfig {
  level: EscalationLevel;
  reason: EscalationReason;
  thresholdMinutes: number;
  timeoutMinutes: number;
  requiresApproval: boolean;
  notificationChannels: readonly string[];
}

/**
 * এস্কেলেশন লেভেল কনফিগারেশন অবজেক্ট
 */
export const ESCALATION_LEVEL_CONFIGS: Record<EscalationLevel, EscalationLevelConfig> = {
  [ESCALATION_LEVEL.LEVEL_1]: {
    level: ESCALATION_LEVEL.LEVEL_1,
    displayName: ESCALATION_LEVEL_DISPLAY_NAMES[ESCALATION_LEVEL.LEVEL_1],
    color: ESCALATION_LEVEL_COLORS[ESCALATION_LEVEL.LEVEL_1],
    timeoutMinutes: ESCALATION_LEVEL_TIMEOUT[ESCALATION_LEVEL.LEVEL_1],
    roles: ESCALATION_DEFAULT_ROLES[ESCALATION_LEVEL.LEVEL_1],
  },
  [ESCALATION_LEVEL.LEVEL_2]: {
    level: ESCALATION_LEVEL.LEVEL_2,
    displayName: ESCALATION_LEVEL_DISPLAY_NAMES[ESCALATION_LEVEL.LEVEL_2],
    color: ESCALATION_LEVEL_COLORS[ESCALATION_LEVEL.LEVEL_2],
    timeoutMinutes: ESCALATION_LEVEL_TIMEOUT[ESCALATION_LEVEL.LEVEL_2],
    roles: ESCALATION_DEFAULT_ROLES[ESCALATION_LEVEL.LEVEL_2],
  },
  [ESCALATION_LEVEL.LEVEL_3]: {
    level: ESCALATION_LEVEL.LEVEL_3,
    displayName: ESCALATION_LEVEL_DISPLAY_NAMES[ESCALATION_LEVEL.LEVEL_3],
    color: ESCALATION_LEVEL_COLORS[ESCALATION_LEVEL.LEVEL_3],
    timeoutMinutes: ESCALATION_LEVEL_TIMEOUT[ESCALATION_LEVEL.LEVEL_3],
    roles: ESCALATION_DEFAULT_ROLES[ESCALATION_LEVEL.LEVEL_3],
  },
  [ESCALATION_LEVEL.LEVEL_4]: {
    level: ESCALATION_LEVEL.LEVEL_4,
    displayName: ESCALATION_LEVEL_DISPLAY_NAMES[ESCALATION_LEVEL.LEVEL_4],
    color: ESCALATION_LEVEL_COLORS[ESCALATION_LEVEL.LEVEL_4],
    timeoutMinutes: ESCALATION_LEVEL_TIMEOUT[ESCALATION_LEVEL.LEVEL_4],
    roles: ESCALATION_DEFAULT_ROLES[ESCALATION_LEVEL.LEVEL_4],
  },
  [ESCALATION_LEVEL.LEVEL_5]: {
    level: ESCALATION_LEVEL.LEVEL_5,
    displayName: ESCALATION_LEVEL_DISPLAY_NAMES[ESCALATION_LEVEL.LEVEL_5],
    color: ESCALATION_LEVEL_COLORS[ESCALATION_LEVEL.LEVEL_5],
    timeoutMinutes: ESCALATION_LEVEL_TIMEOUT[ESCALATION_LEVEL.LEVEL_5],
    roles: ESCALATION_DEFAULT_ROLES[ESCALATION_LEVEL.LEVEL_5],
  },
};

/**
 * এস্কেলেশন রিজন কনফিগারেশন অবজেক্ট
 */
export const ESCALATION_REASON_CONFIGS: Record<EscalationReason, EscalationReasonConfig> = {
  [ESCALATION_REASON.TIMEOUT]: {
    reason: ESCALATION_REASON.TIMEOUT,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.TIMEOUT],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.TIMEOUT],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.TIMEOUT] as 'medium',
  },
  [ESCALATION_REASON.COMPLEXITY]: {
    reason: ESCALATION_REASON.COMPLEXITY,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.COMPLEXITY],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.COMPLEXITY],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.COMPLEXITY] as 'high',
  },
  [ESCALATION_REASON.CUSTOMER_REQUEST]: {
    reason: ESCALATION_REASON.CUSTOMER_REQUEST,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.CUSTOMER_REQUEST],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.CUSTOMER_REQUEST],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.CUSTOMER_REQUEST] as 'medium',
  },
  [ESCALATION_REASON.PRIORITY_CHANGE]: {
    reason: ESCALATION_REASON.PRIORITY_CHANGE,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.PRIORITY_CHANGE],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.PRIORITY_CHANGE],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.PRIORITY_CHANGE] as 'high',
  },
  [ESCALATION_REASON.TECHNICAL_ISSUE]: {
    reason: ESCALATION_REASON.TECHNICAL_ISSUE,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.TECHNICAL_ISSUE],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.TECHNICAL_ISSUE],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.TECHNICAL_ISSUE] as 'high',
  },
  [ESCALATION_REASON.RESOURCE_UNAVAILABLE]: {
    reason: ESCALATION_REASON.RESOURCE_UNAVAILABLE,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.RESOURCE_UNAVAILABLE],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.RESOURCE_UNAVAILABLE],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.RESOURCE_UNAVAILABLE] as 'critical',
  },
  [ESCALATION_REASON.APPROVAL_REQUIRED]: {
    reason: ESCALATION_REASON.APPROVAL_REQUIRED,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.APPROVAL_REQUIRED],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.APPROVAL_REQUIRED],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.APPROVAL_REQUIRED] as 'medium',
  },
  [ESCALATION_REASON.EXTERNAL_DEPENDENCY]: {
    reason: ESCALATION_REASON.EXTERNAL_DEPENDENCY,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.EXTERNAL_DEPENDENCY],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.EXTERNAL_DEPENDENCY],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.EXTERNAL_DEPENDENCY] as 'high',
  },
  [ESCALATION_REASON.RECURRING_ISSUE]: {
    reason: ESCALATION_REASON.RECURRING_ISSUE,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.RECURRING_ISSUE],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.RECURRING_ISSUE],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.RECURRING_ISSUE] as 'high',
  },
  [ESCALATION_REASON.HIGH_IMPACT]: {
    reason: ESCALATION_REASON.HIGH_IMPACT,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.HIGH_IMPACT],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.HIGH_IMPACT],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.HIGH_IMPACT] as 'critical',
  },
  [ESCALATION_REASON.SECURITY_CONCERN]: {
    reason: ESCALATION_REASON.SECURITY_CONCERN,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.SECURITY_CONCERN],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.SECURITY_CONCERN],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.SECURITY_CONCERN] as 'critical',
  },
  [ESCALATION_REASON.LEGAL_REQUIREMENT]: {
    reason: ESCALATION_REASON.LEGAL_REQUIREMENT,
    displayName: ESCALATION_REASON_DISPLAY_NAMES[ESCALATION_REASON.LEGAL_REQUIREMENT],
    icon: ESCALATION_REASON_ICONS[ESCALATION_REASON.LEGAL_REQUIREMENT],
    severity: ESCALATION_REASON_SEVERITY[ESCALATION_REASON.LEGAL_REQUIREMENT] as 'critical',
  },
};

/**
 * ডিফল্ট এস্কেলেশন কনফিগারেশন টেমপ্লেট
 */
export const ESCALATION_CONFIG_TEMPLATE = {
  requiresApproval: false,
  notificationChannels: ['email', 'slack'],
} as const;

/**
 * এস্কেলেশন টাইমলাইন ইভেন্ট
 */
export const ESCALATION_TIMELINE_EVENTS = {
  CREATED: 'escalation_created',
  UPDATED: 'escalation_updated',
  APPROVED: 'escalation_approved',
  REJECTED: 'escalation_rejected',
  COMPLETED: 'escalation_completed',
  CANCELLED: 'escalation_cancelled',
  ASSIGNED: 'escalation_assigned',
  REASSIGNED: 'escalation_reassigned',
  STATUS_CHANGED: 'escalation_status_changed',
  LEVEL_CHANGED: 'escalation_level_changed',
} as const;

export type EscalationTimelineEvent =
  (typeof ESCALATION_TIMELINE_EVENTS)[keyof typeof ESCALATION_TIMELINE_EVENTS];

/**
 * এস্কেলেশন টাইপ
 */
export const ESCALATION_TYPE = {
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
  CUSTOMER_INITIATED: 'customer_initiated',
  SYSTEM_INITIATED: 'system_initiated',
} as const;

export type EscalationType = (typeof ESCALATION_TYPE)[keyof typeof ESCALATION_TYPE];

/**
 * এস্কেলেশন মেট্রিক্স
 */
export const ESCALATION_METRICS = {
  RESPONSE_TIME: 'response_time',
  RESOLUTION_TIME: 'resolution_time',
  ESCALATION_COUNT: 'escalation_count',
  AVG_ESCALATION_LEVEL: 'avg_escalation_level',
  ESCALATION_RATE: 'escalation_rate',
  FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
} as const;

export type EscalationMetric = (typeof ESCALATION_METRICS)[keyof typeof ESCALATION_METRICS];
