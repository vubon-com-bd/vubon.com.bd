/**
 * সাপোর্ট টিম সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * টিম আইডি প্রিফিক্স
 */
export const TEAM_ID_PREFIX = 'TM';

/**
 * টিম নম্বর ফরম্যাট
 */
export const TEAM_NUMBER_FORMAT = 'TM-{department}-{sequence}';

/**
 * ডিফল্ট টিম নাম
 */
export const DEFAULT_TEAM_NAME = 'সাপোর্ট টিম';

/**
 * টিম সাইজ লিমিট
 */
export const TEAM_SIZE_LIMIT = 15;

/**
 * টিম লিড রোল
 */
export const TEAM_LEAD_ROLE = 'team_lead';

/**
 * টিম ক্রিয়েশন রুলস
 */
export const TEAM_CREATION_RULES = {
  MIN_MEMBERS: 3,
  MAX_MEMBERS: TEAM_SIZE_LIMIT,
  REQUIRE_TEAM_LEAD: true,
  REQUIRE_DEPARTMENT: true,
  ALLOW_CROSS_DEPARTMENT: false,
  DEFAULT_TIMEZONE: 'Asia/Dhaka',
} as const;

/**
 * টিম আর্কাইভ পিরিয়ড (দিনে)
 */
export const TEAM_ARCHIVE_PERIOD = 90;

/**
 * টিম অ্যাসাইনমেন্ট স্ট্র্যাটেজি
 */
export const TEAM_ASSIGNMENT_STRATEGIES = {
  ROUND_ROBIN: 'round_robin',
  LEAST_LOADED: 'least_loaded',
  SKILL_BASED: 'skill_based',
  PRIORITY_BASED: 'priority_based',
  CUSTOM: 'custom',
} as const;

/**
 * টিম টাইপ
 */
export const TEAM_TYPE = {
  SUPPORT: 'support',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  SALES: 'sales',
  ONBOARDING: 'onboarding',
  RETENTION: 'retention',
  ESCALATION: 'escalation',
  QUALITY: 'quality',
  TRAINING: 'training',
  OPERATIONS: 'operations',
  MANAGEMENT: 'management',
  SPECIALIZED: 'specialized',
} as const;

/**
 * টিম টাইপের ডিসপ্লে নাম
 */
export const TEAM_TYPE_DISPLAY_NAMES = {
  [TEAM_TYPE.SUPPORT]: 'সাপোর্ট',
  [TEAM_TYPE.TECHNICAL]: 'প্রযুক্তিগত',
  [TEAM_TYPE.BILLING]: 'বিলিং',
  [TEAM_TYPE.SALES]: 'বিক্রয়',
  [TEAM_TYPE.ONBOARDING]: 'অনবোর্ডিং',
  [TEAM_TYPE.RETENTION]: 'রিটেনশন',
  [TEAM_TYPE.ESCALATION]: 'এস্কেলেশন',
  [TEAM_TYPE.QUALITY]: 'গুণমান',
  [TEAM_TYPE.TRAINING]: 'প্রশিক্ষণ',
  [TEAM_TYPE.OPERATIONS]: 'অপারেশনস',
  [TEAM_TYPE.MANAGEMENT]: 'ব্যবস্থাপনা',
  [TEAM_TYPE.SPECIALIZED]: 'বিশেষায়িত',
} as const;

/**
 * টিম স্ট্যাটাস
 */
export const TEAM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  DISBANDED: 'disbanded',
  RESTRUCTURING: 'restructuring',
} as const;

/**
 * টিম স্ট্যাটাসের ডিসপ্লে নাম
 */
export const TEAM_STATUS_DISPLAY_NAMES = {
  [TEAM_STATUS.ACTIVE]: 'সক্রিয়',
  [TEAM_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [TEAM_STATUS.ARCHIVED]: 'আর্কাইভড',
  [TEAM_STATUS.PENDING]: 'মুলতুবি',
  [TEAM_STATUS.DISBANDED]: 'বিলুপ্ত',
  [TEAM_STATUS.RESTRUCTURING]: 'পুনর্গঠন',
} as const;

/**
 * টিম স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const TEAM_STATUS_COLORS = {
  [TEAM_STATUS.ACTIVE]: '#2ecc71',
  [TEAM_STATUS.INACTIVE]: '#95a5a6',
  [TEAM_STATUS.ARCHIVED]: '#7f8c8d',
  [TEAM_STATUS.PENDING]: '#f39c12',
  [TEAM_STATUS.DISBANDED]: '#e74c3c',
  [TEAM_STATUS.RESTRUCTURING]: '#e67e22',
} as const;

/**
 * টিম ডিফল্ট সেটিংস
 */
export const TEAM_DEFAULT_SETTINGS = {
  defaultName: DEFAULT_TEAM_NAME,
  sizeLimit: TEAM_SIZE_LIMIT,
  leadRole: TEAM_LEAD_ROLE,
  creationRules: TEAM_CREATION_RULES,
  archivePeriod: TEAM_ARCHIVE_PERIOD,
  assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.ROUND_ROBIN,
  defaultType: TEAM_TYPE.SUPPORT,
} as const;

/**
 * টিম ভ্যালিডেশন রুলস
 */
export const TEAM_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  description: {
    maxLength: 500,
    required: false,
  },
  members: {
    minCount: TEAM_CREATION_RULES.MIN_MEMBERS,
    maxCount: TEAM_SIZE_LIMIT,
    required: true,
  },
  department: {
    required: true,
  },
} as const;

/**
 * টিম ইভেন্ট টাইপ
 */
export const TEAM_EVENT_TYPES = {
  CREATED: 'team_created',
  UPDATED: 'team_updated',
  ACTIVATED: 'team_activated',
  DEACTIVATED: 'team_deactivated',
  ARCHIVED: 'team_archived',
  RESTORED: 'team_restored',
  DISBANDED: 'team_disbanded',
  MEMBER_ADDED: 'team_member_added',
  MEMBER_REMOVED: 'team_member_removed',
  LEAD_CHANGED: 'team_lead_changed',
  RESTRUCTURED: 'team_restructured',
} as const;

/**
 * টিম মেট্রিক্স
 */
export const TEAM_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  AVG_MEMBERS: 'avg_members',
  AVG_TICKETS: 'avg_tickets',
  AVG_RESPONSE_TIME: 'avg_response_time',
  AVG_RESOLUTION_TIME: 'avg_resolution_time',
  AVG_SATISFACTION: 'avg_satisfaction',
} as const;

export type TeamIdPrefix = typeof TEAM_ID_PREFIX;
export type TeamType = (typeof TEAM_TYPE)[keyof typeof TEAM_TYPE];
export type TeamStatus = (typeof TEAM_STATUS)[keyof typeof TEAM_STATUS];
export type TeamAssignmentStrategy =
  (typeof TEAM_ASSIGNMENT_STRATEGIES)[keyof typeof TEAM_ASSIGNMENT_STRATEGIES];
export type TeamEventType = (typeof TEAM_EVENT_TYPES)[keyof typeof TEAM_EVENT_TYPES];
export type TeamMetric = (typeof TEAM_METRICS)[keyof typeof TEAM_METRICS];

export interface TeamCreationRules {
  MIN_MEMBERS: number;
  MAX_MEMBERS: number;
  REQUIRE_TEAM_LEAD: boolean;
  REQUIRE_DEPARTMENT: boolean;
  ALLOW_CROSS_DEPARTMENT: boolean;
  DEFAULT_TIMEZONE: string;
}

export interface TeamDefaultSettings {
  defaultName: string;
  sizeLimit: number;
  leadRole: string;
  creationRules: TeamCreationRules;
  archivePeriod: number;
  assignmentStrategy: TeamAssignmentStrategy;
  defaultType: TeamType;
}

export interface TeamValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    maxLength: number;
    required: boolean;
  };
  members: {
    minCount: number;
    maxCount: number;
    required: boolean;
  };
  department: {
    required: boolean;
  };
}

export interface TeamMember {
  id: string;
  userId: string;
  role: string;
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  type: TeamType;
  status: TeamStatus;
  department: string;
  leadId: string;
  members: TeamMember[];
  assignmentStrategy: TeamAssignmentStrategy;
  maxTickets?: number;
  timezone: string;
  workingHours?: {
    start: string;
    end: string;
  };
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export interface TeamAssignment {
  id: string;
  teamId: string;
  ticketId: string;
  assignedAt: Date;
  assignedBy: string;
  strategy: TeamAssignmentStrategy;
  metadata?: Record<string, unknown>;
}

export interface TeamAnalytics {
  teamId: string;
  period: string;
  totalTickets: number;
  resolvedTickets: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  memberCount: number;
  activeMembers: number;
  productivityRate: number;
}

/**
 * টিম কনফিগারেশন
 */
export const TEAM_CONFIG = {
  idPrefix: TEAM_ID_PREFIX,
  numberFormat: TEAM_NUMBER_FORMAT,
  defaultSettings: TEAM_DEFAULT_SETTINGS,
  validationRules: TEAM_VALIDATION_RULES,
  types: TEAM_TYPE,
  statuses: TEAM_STATUS,
  assignmentStrategies: TEAM_ASSIGNMENT_STRATEGIES,
  statusColors: TEAM_STATUS_COLORS,
  eventTypes: TEAM_EVENT_TYPES,
  metrics: TEAM_METRICS,
} as const;

/**
 * টিম স্ট্যাটাস ট্রানজিশন রুলস
 */
export const TEAM_STATUS_TRANSITIONS = {
  [TEAM_STATUS.PENDING]: ['active', 'inactive', 'disbanded'],
  [TEAM_STATUS.ACTIVE]: ['inactive', 'restructuring', 'archived', 'disbanded'],
  [TEAM_STATUS.INACTIVE]: ['active', 'archived', 'disbanded'],
  [TEAM_STATUS.RESTRUCTURING]: ['active', 'inactive', 'disbanded'],
  [TEAM_STATUS.ARCHIVED]: ['active', 'disbanded'],
  [TEAM_STATUS.DISBANDED]: ['archived'],
} as const;

/**
 * টিম টাইপ ডিফল্ট সেটিংস
 */
export const TEAM_TYPE_DEFAULTS = {
  [TEAM_TYPE.SUPPORT]: {
    maxTickets: 100,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.ROUND_ROBIN,
    requiredSkills: ['communication', 'problem_solving'],
  },
  [TEAM_TYPE.TECHNICAL]: {
    maxTickets: 80,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.SKILL_BASED,
    requiredSkills: ['technical', 'troubleshooting'],
  },
  [TEAM_TYPE.BILLING]: {
    maxTickets: 60,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.LEAST_LOADED,
    requiredSkills: ['billing', 'financial'],
  },
  [TEAM_TYPE.SALES]: {
    maxTickets: 50,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.PRIORITY_BASED,
    requiredSkills: ['sales', 'communication'],
  },
  [TEAM_TYPE.ONBOARDING]: {
    maxTickets: 40,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.CUSTOM,
    requiredSkills: ['onboarding', 'training'],
  },
  [TEAM_TYPE.RETENTION]: {
    maxTickets: 30,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.PRIORITY_BASED,
    requiredSkills: ['retention', 'communication'],
  },
  [TEAM_TYPE.ESCALATION]: {
    maxTickets: 20,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.SKILL_BASED,
    requiredSkills: ['escalation', 'problem_solving'],
  },
  [TEAM_TYPE.QUALITY]: {
    maxTickets: 0,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.CUSTOM,
    requiredSkills: ['quality_analysis', 'auditing'],
  },
  [TEAM_TYPE.TRAINING]: {
    maxTickets: 0,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.CUSTOM,
    requiredSkills: ['training', 'mentoring'],
  },
  [TEAM_TYPE.OPERATIONS]: {
    maxTickets: 0,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.CUSTOM,
    requiredSkills: ['operations', 'management'],
  },
  [TEAM_TYPE.MANAGEMENT]: {
    maxTickets: 0,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.CUSTOM,
    requiredSkills: ['management', 'leadership'],
  },
  [TEAM_TYPE.SPECIALIZED]: {
    maxTickets: 30,
    assignmentStrategy: TEAM_ASSIGNMENT_STRATEGIES.SKILL_BASED,
    requiredSkills: ['specialized', 'expert'],
  },
} as const;

export type TeamTypeDefaults = typeof TEAM_TYPE_DEFAULTS;
