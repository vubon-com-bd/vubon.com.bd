/**
 * সাপোর্ট এজেন্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * এজেন্ট আইডি প্রিফিক্স
 */
export const AGENT_ID_PREFIX = 'AGT';

/**
 * এজেন্ট নম্বর ফরম্যাট
 */
export const AGENT_NUMBER_FORMAT = 'AGT-{department}-{sequence}';

/**
 * ডিফল্ট এজেন্ট স্ট্যাটাস
 */
export const DEFAULT_AGENT_STATUS = 'available';

/**
 * ম্যাক্সিমাম টিকেট পার এজেন্ট
 */
export const MAX_TICKETS_PER_AGENT = 10;

/**
 * ডিফল্ট এজেন্ট টাইমজোন
 */
export const DEFAULT_AGENT_TIMEZONE = 'Asia/Dhaka';

/**
 * এজেন্ট শিফ্ট রোটেশন রুলস
 */
export const AGENT_SHIFT_ROTATION_RULES = {
  MORNING: {
    start: '06:00',
    end: '14:00',
    breakStart: '10:00',
    breakEnd: '10:30',
  },
  AFTERNOON: {
    start: '14:00',
    end: '22:00',
    breakStart: '18:00',
    breakEnd: '18:30',
  },
  NIGHT: {
    start: '22:00',
    end: '06:00',
    breakStart: '02:00',
    breakEnd: '02:30',
  },
} as const;

/**
 * এজেন্ট স্কিল ম্যাপিং রুলস
 */
export const AGENT_SKILL_MAPPING_RULES = {
  MAX_SKILLS_PER_AGENT: 10,
  MIN_SKILL_LEVEL: 1,
  MAX_SKILL_LEVEL: 5,
  DEFAULT_SKILL_LEVEL: 3,
  SKILL_WEIGHTS: {
    TECHNICAL: 1.5,
    COMMUNICATION: 1.2,
    PROBLEM_SOLVING: 1.3,
    PRODUCT_KNOWLEDGE: 1.0,
    LANGUAGE: 0.8,
  },
} as const;

/**
 * এজেন্ট পারফরম্যান্স থ্রেশহোল্ড
 */
export const AGENT_PERFORMANCE_THRESHOLDS = {
  RESPONSE_TIME_GOOD: 30,
  RESPONSE_TIME_WARNING: 60,
  RESPONSE_TIME_CRITICAL: 120,
  RESOLUTION_TIME_GOOD: 24,
  RESOLUTION_TIME_WARNING: 48,
  RESOLUTION_TIME_CRITICAL: 72,
  SATISFACTION_GOOD: 80,
  SATISFACTION_WARNING: 70,
  SATISFACTION_CRITICAL: 60,
  PRODUCTIVITY_GOOD: 20,
  PRODUCTIVITY_WARNING: 15,
  PRODUCTIVITY_CRITICAL: 10,
} as const;

/**
 * এজেন্ট স্ট্যাটাস
 */
export const AGENT_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  AWAY: 'away',
  OFFLINE: 'offline',
  BREAK: 'break',
  MEETING: 'meeting',
  TRAINING: 'training',
  ON_CALL: 'on_call',
  DO_NOT_DISTURB: 'do_not_disturb',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const AGENT_STATUS_DISPLAY_NAMES = {
  [AGENT_STATUS.AVAILABLE]: 'উপলব্ধ',
  [AGENT_STATUS.BUSY]: 'ব্যস্ত',
  [AGENT_STATUS.AWAY]: 'দূরে',
  [AGENT_STATUS.OFFLINE]: 'অফলাইন',
  [AGENT_STATUS.BREAK]: 'বিরতি',
  [AGENT_STATUS.MEETING]: 'মিটিং',
  [AGENT_STATUS.TRAINING]: 'প্রশিক্ষণ',
  [AGENT_STATUS.ON_CALL]: 'কলরত',
  [AGENT_STATUS.DO_NOT_DISTURB]: 'বিরক্ত করবেন না',
} as const;

/**
 * এজেন্ট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const AGENT_STATUS_COLORS = {
  [AGENT_STATUS.AVAILABLE]: '#2ecc71',
  [AGENT_STATUS.BUSY]: '#e74c3c',
  [AGENT_STATUS.AWAY]: '#f39c12',
  [AGENT_STATUS.OFFLINE]: '#95a5a6',
  [AGENT_STATUS.BREAK]: '#e67e22',
  [AGENT_STATUS.MEETING]: '#9b59b6',
  [AGENT_STATUS.TRAINING]: '#3498db',
  [AGENT_STATUS.ON_CALL]: '#1abc9c',
  [AGENT_STATUS.DO_NOT_DISTURB]: '#c0392b',
} as const;

/**
 * এজেন্ট রোল
 */
export const AGENT_ROLE = {
  JUNIOR: 'junior',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
  MANAGER: 'manager',
  TRAINER: 'trainer',
  SPECIALIST: 'specialist',
} as const;

/**
 * এজেন্ট রোলের ডিসপ্লে নাম
 */
export const AGENT_ROLE_DISPLAY_NAMES = {
  [AGENT_ROLE.JUNIOR]: 'জুনিয়র',
  [AGENT_ROLE.MID]: 'মিড',
  [AGENT_ROLE.SENIOR]: 'সিনিয়র',
  [AGENT_ROLE.LEAD]: 'লিড',
  [AGENT_ROLE.MANAGER]: 'ম্যানেজার',
  [AGENT_ROLE.TRAINER]: 'ট্রেইনার',
  [AGENT_ROLE.SPECIALIST]: 'বিশেষজ্ঞ',
} as const;

/**
 * এজেন্ট স্কিল লেভেল
 */
export const AGENT_SKILL_LEVEL = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
  MASTER: 5,
} as const;

/**
 * এজেন্ট স্কিল লেভেলের ডিসপ্লে নাম
 */
export const AGENT_SKILL_LEVEL_DISPLAY_NAMES = {
  [AGENT_SKILL_LEVEL.BEGINNER]: 'শিক্ষানবিস',
  [AGENT_SKILL_LEVEL.INTERMEDIATE]: 'মধ্যম',
  [AGENT_SKILL_LEVEL.ADVANCED]: 'উন্নত',
  [AGENT_SKILL_LEVEL.EXPERT]: 'বিশেষজ্ঞ',
  [AGENT_SKILL_LEVEL.MASTER]: 'মাস্টার',
} as const;

/**
 * এজেন্ট ডিফল্ট সেটিংস
 */
export const AGENT_DEFAULT_SETTINGS = {
  defaultStatus: DEFAULT_AGENT_STATUS,
  maxTickets: MAX_TICKETS_PER_AGENT,
  timezone: DEFAULT_AGENT_TIMEZONE,
  shiftRules: AGENT_SHIFT_ROTATION_RULES,
  skillMapping: AGENT_SKILL_MAPPING_RULES,
  performanceThresholds: AGENT_PERFORMANCE_THRESHOLDS,
} as const;

/**
 * এজেন্ট ভ্যালিডেশন রুলস
 */
export const AGENT_VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  email: {
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    required: true,
  },
  phone: {
    pattern: '^\\+?[1-9]\\d{1,14}$',
    required: false,
  },
  skills: {
    maxCount: AGENT_SKILL_MAPPING_RULES.MAX_SKILLS_PER_AGENT,
    minLevel: AGENT_SKILL_MAPPING_RULES.MIN_SKILL_LEVEL,
    maxLevel: AGENT_SKILL_MAPPING_RULES.MAX_SKILL_LEVEL,
  },
} as const;

/**
 * এজেন্ট ইভেন্ট টাইপ
 */
export const AGENT_EVENT_TYPES = {
  CREATED: 'agent_created',
  UPDATED: 'agent_updated',
  STATUS_CHANGED: 'agent_status_changed',
  ASSIGNED: 'agent_assigned',
  UNASSIGNED: 'agent_unassigned',
  PERFORMANCE_UPDATED: 'agent_performance_updated',
  SKILL_UPDATED: 'agent_skill_updated',
  SHIFT_CHANGED: 'agent_shift_changed',
  DEACTIVATED: 'agent_deactivated',
  REACTIVATED: 'agent_reactivated',
} as const;

/**
 * এজেন্ট মেট্রিক্স
 */
export const AGENT_METRICS = {
  TOTAL: 'total',
  AVAILABLE: 'available',
  BUSY: 'busy',
  OFFLINE: 'offline',
  AVG_RESPONSE_TIME: 'avg_response_time',
  AVG_RESOLUTION_TIME: 'avg_resolution_time',
  AVG_SATISFACTION: 'avg_satisfaction',
  PRODUCTIVITY: 'productivity',
  TICKETS_RESOLVED: 'tickets_resolved',
} as const;

export type AgentIdPrefix = typeof AGENT_ID_PREFIX;
export type AgentStatus = (typeof AGENT_STATUS)[keyof typeof AGENT_STATUS];
export type AgentRole = (typeof AGENT_ROLE)[keyof typeof AGENT_ROLE];
export type AgentSkillLevel = (typeof AGENT_SKILL_LEVEL)[keyof typeof AGENT_SKILL_LEVEL];
export type AgentEventType = (typeof AGENT_EVENT_TYPES)[keyof typeof AGENT_EVENT_TYPES];
export type AgentMetric = (typeof AGENT_METRICS)[keyof typeof AGENT_METRICS];

export interface AgentShift {
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}

export interface AgentShiftRotationRules {
  MORNING: AgentShift;
  AFTERNOON: AgentShift;
  NIGHT: AgentShift;
}

export interface AgentSkillMappingRules {
  MAX_SKILLS_PER_AGENT: number;
  MIN_SKILL_LEVEL: number;
  MAX_SKILL_LEVEL: number;
  DEFAULT_SKILL_LEVEL: number;
  SKILL_WEIGHTS: {
    TECHNICAL: number;
    COMMUNICATION: number;
    PROBLEM_SOLVING: number;
    PRODUCT_KNOWLEDGE: number;
    LANGUAGE: number;
  };
}

export interface AgentPerformanceThresholds {
  RESPONSE_TIME_GOOD: number;
  RESPONSE_TIME_WARNING: number;
  RESPONSE_TIME_CRITICAL: number;
  RESOLUTION_TIME_GOOD: number;
  RESOLUTION_TIME_WARNING: number;
  RESOLUTION_TIME_CRITICAL: number;
  SATISFACTION_GOOD: number;
  SATISFACTION_WARNING: number;
  SATISFACTION_CRITICAL: number;
  PRODUCTIVITY_GOOD: number;
  PRODUCTIVITY_WARNING: number;
  PRODUCTIVITY_CRITICAL: number;
}

export interface AgentDefaultSettings {
  defaultStatus: AgentStatus;
  maxTickets: number;
  timezone: string;
  shiftRules: AgentShiftRotationRules;
  skillMapping: AgentSkillMappingRules;
  performanceThresholds: AgentPerformanceThresholds;
}

export interface AgentValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  email: {
    pattern: string;
    required: boolean;
  };
  phone: {
    pattern: string;
    required: boolean;
  };
  skills: {
    maxCount: number;
    minLevel: number;
    maxLevel: number;
  };
}

export interface AgentSkill {
  name: string;
  level: AgentSkillLevel;
  category: string;
  verified: boolean;
  acquiredAt: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: AgentStatus;
  role: AgentRole;
  department: string;
  timezone: string;
  skills: AgentSkill[];
  currentTickets: number;
  maxTickets: number;
  shift: keyof AgentShiftRotationRules;
  performance: {
    avgResponseTime: number;
    avgResolutionTime: number;
    satisfactionScore: number;
    productivity: number;
    ticketsResolved: number;
    lastUpdated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export interface AgentShiftAssignment {
  id: string;
  agentId: string;
  date: Date;
  shift: keyof AgentShiftRotationRules;
  startTime: Date;
  endTime: Date;
  breakStart?: Date;
  breakEnd?: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentAnalytics {
  agentId: string;
  period: string;
  totalTickets: number;
  resolvedTickets: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  productivityRate: number;
  escalations: number;
  transfers: number;
  firstContactResolutionRate: number;
}

/**
 * এজেন্ট কনফিগারেশন
 */
export const AGENT_CONFIG = {
  idPrefix: AGENT_ID_PREFIX,
  numberFormat: AGENT_NUMBER_FORMAT,
  defaultSettings: AGENT_DEFAULT_SETTINGS,
  validationRules: AGENT_VALIDATION_RULES,
  statuses: AGENT_STATUS,
  roles: AGENT_ROLE,
  skillLevels: AGENT_SKILL_LEVEL,
  statusColors: AGENT_STATUS_COLORS,
  eventTypes: AGENT_EVENT_TYPES,
  metrics: AGENT_METRICS,
} as const;

/**
 * এজেন্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AGENT_STATUS_TRANSITIONS = {
  [AGENT_STATUS.AVAILABLE]: ['busy', 'away', 'break', 'meeting', 'training', 'offline'],
  [AGENT_STATUS.BUSY]: ['available', 'away', 'break', 'offline'],
  [AGENT_STATUS.AWAY]: ['available', 'busy', 'offline'],
  [AGENT_STATUS.OFFLINE]: ['available'],
  [AGENT_STATUS.BREAK]: ['available', 'busy'],
  [AGENT_STATUS.MEETING]: ['available', 'busy'],
  [AGENT_STATUS.TRAINING]: ['available', 'busy'],
  [AGENT_STATUS.ON_CALL]: ['available', 'busy'],
  [AGENT_STATUS.DO_NOT_DISTURB]: ['available', 'busy'],
} as const;

/**
 * এজেন্ট রোল ডিফল্ট পারমিশন
 */
export const AGENT_ROLE_PERMISSIONS = {
  [AGENT_ROLE.JUNIOR]: ['view_tickets', 'reply_tickets', 'view_knowledge_base'],
  [AGENT_ROLE.MID]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
  ],
  [AGENT_ROLE.SENIOR]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
  ],
  [AGENT_ROLE.LEAD]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'assign_tickets',
    'manage_team',
  ],
  [AGENT_ROLE.MANAGER]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'assign_tickets',
    'manage_team',
    'manage_sla',
    'generate_reports',
  ],
  [AGENT_ROLE.TRAINER]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
    'manage_training',
  ],
  [AGENT_ROLE.SPECIALIST]: [
    'view_tickets',
    'reply_tickets',
    'view_knowledge_base',
    'create_knowledge_base',
    'escalate_tickets',
    'expert_access',
  ],
} as const;

export type AgentRolePermissions = typeof AGENT_ROLE_PERMISSIONS;
