/**
 * SLA (Service Level Agreement) সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * SLA আইডি প্রিফিক্স
 */
export const SLA_ID_PREFIX = 'SLA';

/**
 * SLA নম্বর ফরম্যাট
 */
export const SLA_NUMBER_FORMAT = 'SLA-{tier}-{sequence}';

/**
 * ডিফল্ট SLA নাম
 */
export const DEFAULT_SLA_NAME = 'স্ট্যান্ডার্ড SLA';

/**
 * ডিফল্ট রেসপন্স টাইম (ঘন্টায়)
 */
export const SLA_DEFAULT_RESPONSE_TIMES = {
  CRITICAL: 1,
  HIGH: 4,
  MEDIUM: 8,
  LOW: 24,
} as const;

/**
 * ডিফল্ট রেজোলিউশন টাইম (ঘন্টায়)
 */
export const SLA_DEFAULT_RESOLUTION_TIMES = {
  CRITICAL: 4,
  HIGH: 24,
  MEDIUM: 48,
  LOW: 72,
} as const;

/**
 * SLA ব্রিচ থ্রেশহোল্ড (%)
 */
export const SLA_BREACH_THRESHOLD = 80;

/**
 * SLA উইন্ডো
 */
export const SLA_WINDOW = {
  BUSINESS_HOURS: 'business_hours',
  TWENTY_FOUR_SEVEN: '24_7',
  CUSTOM: 'custom',
} as const;

/**
 * SLA টিয়ার
 */
export const SLA_TIER = {
  PREMIUM: 'premium',
  STANDARD: 'standard',
  BASIC: 'basic',
  ENTERPRISE: 'enterprise',
} as const;

/**
 * SLA টিয়ারের ডিসপ্লে নাম
 */
export const SLA_TIER_DISPLAY_NAMES = {
  [SLA_TIER.PREMIUM]: 'প্রিমিয়াম',
  [SLA_TIER.STANDARD]: 'স্ট্যান্ডার্ড',
  [SLA_TIER.BASIC]: 'বেসিক',
  [SLA_TIER.ENTERPRISE]: 'এন্টারপ্রাইজ',
} as const;

/**
 * SLA টিয়ারের রঙের কোড (হেক্স)
 */
export const SLA_TIER_COLORS = {
  [SLA_TIER.PREMIUM]: '#9b59b6',
  [SLA_TIER.STANDARD]: '#3498db',
  [SLA_TIER.BASIC]: '#2ecc71',
  [SLA_TIER.ENTERPRISE]: '#e67e22',
} as const;

/**
 * SLA স্ট্যাটাস
 */
export const SLA_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  EXPIRED: 'expired',
  SUSPENDED: 'suspended',
  BREACHED: 'breached',
} as const;

/**
 * SLA স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SLA_STATUS_DISPLAY_NAMES = {
  [SLA_STATUS.ACTIVE]: 'সক্রিয়',
  [SLA_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [SLA_STATUS.PENDING]: 'মুলতুবি',
  [SLA_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [SLA_STATUS.SUSPENDED]: 'স্থগিত',
  [SLA_STATUS.BREACHED]: 'লঙ্ঘিত',
} as const;

/**
 * SLA স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SLA_STATUS_COLORS = {
  [SLA_STATUS.ACTIVE]: '#2ecc71',
  [SLA_STATUS.INACTIVE]: '#95a5a6',
  [SLA_STATUS.PENDING]: '#f39c12',
  [SLA_STATUS.EXPIRED]: '#e74c3c',
  [SLA_STATUS.SUSPENDED]: '#e67e22',
  [SLA_STATUS.BREACHED]: '#c0392b',
} as const;

/**
 * SLA মেট্রিক টাইপ
 */
export const SLA_METRIC_TYPE = {
  RESPONSE_TIME: 'response_time',
  RESOLUTION_TIME: 'resolution_time',
  FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
  SATISFACTION_SCORE: 'satisfaction_score',
  AVAILABILITY: 'availability',
} as const;

/**
 * SLA মেট্রিক টাইপের ডিসপ্লে নাম
 */
export const SLA_METRIC_TYPE_DISPLAY_NAMES = {
  [SLA_METRIC_TYPE.RESPONSE_TIME]: 'রেসপন্স টাইম',
  [SLA_METRIC_TYPE.RESOLUTION_TIME]: 'রেজোলিউশন টাইম',
  [SLA_METRIC_TYPE.FIRST_CONTACT_RESOLUTION]: 'প্রথম যোগাযোগে সমাধান',
  [SLA_METRIC_TYPE.SATISFACTION_SCORE]: 'সন্তুষ্টি স্কোর',
  [SLA_METRIC_TYPE.AVAILABILITY]: 'প্রাপ্যতা',
} as const;

/**
 * SLA ক্যালেন্ডার টাইপ
 */
export const SLA_CALENDAR_TYPE = {
  BUSINESS: 'business',
  TWENTY_FOUR_SEVEN: '24_7',
  CUSTOM: 'custom',
} as const;

/**
 * SLA ডিফল্ট সেটিংস
 */
export const SLA_DEFAULT_SETTINGS = {
  defaultName: DEFAULT_SLA_NAME,
  defaultTier: SLA_TIER.STANDARD,
  defaultWindow: SLA_WINDOW.BUSINESS_HOURS,
  breachThreshold: SLA_BREACH_THRESHOLD,
  responseTimes: SLA_DEFAULT_RESPONSE_TIMES,
  resolutionTimes: SLA_DEFAULT_RESOLUTION_TIMES,
} as const;

/**
 * SLA ভ্যালিডেশন রুলস
 */
export const SLA_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  description: {
    maxLength: 500,
    required: false,
  },
  responseTime: {
    min: 0,
    max: 168,
    required: true,
  },
  resolutionTime: {
    min: 0,
    max: 720,
    required: true,
  },
  businessHours: {
    start: '09:00',
    end: '18:00',
    timezone: 'Asia/Dhaka',
  },
} as const;

/**
 * SLA ইভেন্ট টাইপ
 */
export const SLA_EVENT_TYPES = {
  CREATED: 'sla_created',
  UPDATED: 'sla_updated',
  ACTIVATED: 'sla_activated',
  SUSPENDED: 'sla_suspended',
  EXPIRED: 'sla_expired',
  BREACHED: 'sla_breached',
  MET: 'sla_met',
  ESCALATED: 'sla_escalated',
} as const;

/**
 * SLA মেট্রিক্স
 */
export const SLA_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  BREACHED: 'breached',
  EXPIRED: 'expired',
  COMPLIANCE_RATE: 'compliance_rate',
  AVG_RESPONSE_TIME: 'avg_response_time',
  AVG_RESOLUTION_TIME: 'avg_resolution_time',
} as const;

export type SlaIdPrefix = typeof SLA_ID_PREFIX;
export type SlaTier = (typeof SLA_TIER)[keyof typeof SLA_TIER];
export type SlaStatus = (typeof SLA_STATUS)[keyof typeof SLA_STATUS];
export type SlaWindow = (typeof SLA_WINDOW)[keyof typeof SLA_WINDOW];
export type SlaMetricType = (typeof SLA_METRIC_TYPE)[keyof typeof SLA_METRIC_TYPE];
export type SlaCalendarType = (typeof SLA_CALENDAR_TYPE)[keyof typeof SLA_CALENDAR_TYPE];
export type SlaEventType = (typeof SLA_EVENT_TYPES)[keyof typeof SLA_EVENT_TYPES];
export type SlaMetric = (typeof SLA_METRICS)[keyof typeof SLA_METRICS];

export interface SlaDefaultSettings {
  defaultName: string;
  defaultTier: SlaTier;
  defaultWindow: SlaWindow;
  breachThreshold: number;
  responseTimes: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
  resolutionTimes: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
}

export interface SlaValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    maxLength: number;
    required: boolean;
  };
  responseTime: {
    min: number;
    max: number;
    required: boolean;
  };
  resolutionTime: {
    min: number;
    max: number;
    required: boolean;
  };
  businessHours: {
    start: string;
    end: string;
    timezone: string;
  };
}

export interface SlaBusinessHours {
  start: string;
  end: string;
  timezone: string;
  days?: number[];
  holidays?: Date[];
}

export interface SlaMetricConfig {
  type: SlaMetricType;
  target: number;
  warningThreshold: number;
  criticalThreshold: number;
  window: SlaWindow;
  businessHours?: SlaBusinessHours;
  weight: number;
}

export interface Sla {
  id: string;
  name: string;
  description?: string;
  tier: SlaTier;
  status: SlaStatus;
  window: SlaWindow;
  businessHours?: SlaBusinessHours;
  metrics: SlaMetricConfig[];
  breachThreshold: number;
  escalationLevel: number;
  priority: number;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface SlaBreach {
  id: string;
  slaId: string;
  ticketId: string;
  metricType: SlaMetricType;
  target: number;
  actual: number;
  breachTime: Date;
  detectedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  severity: 'warning' | 'critical';
  status: 'open' | 'acknowledged' | 'resolved' | 'escalated';
  metadata?: Record<string, unknown>;
}

export interface SlaCompliance {
  slaId: string;
  period: string;
  totalTickets: number;
  compliantTickets: number;
  nonCompliantTickets: number;
  complianceRate: number;
  metrics: {
    type: SlaMetricType;
    compliant: number;
    nonCompliant: number;
    rate: number;
  }[];
  breaches: SlaBreach[];
}

/**
 * SLA কনফিগারেশন
 */
export const SLA_CONFIG = {
  idPrefix: SLA_ID_PREFIX,
  numberFormat: SLA_NUMBER_FORMAT,
  defaultSettings: SLA_DEFAULT_SETTINGS,
  validationRules: SLA_VALIDATION_RULES,
  tiers: SLA_TIER,
  statuses: SLA_STATUS,
  windows: SLA_WINDOW,
  metricTypes: SLA_METRIC_TYPE,
  calendarTypes: SLA_CALENDAR_TYPE,
  tierColors: SLA_TIER_COLORS,
  statusColors: SLA_STATUS_COLORS,
} as const;

/**
 * SLA টিয়ার ডিফল্ট কনফিগারেশন
 */
export const SLA_TIER_CONFIGS: Record<
  SlaTier,
  {
    tier: SlaTier;
    displayName: string;
    color: string;
    responseTime: number;
    resolutionTime: number;
    priority: number;
    escalationLevel: number;
    breachThreshold: number;
  }
> = {
  [SLA_TIER.PREMIUM]: {
    tier: SLA_TIER.PREMIUM,
    displayName: SLA_TIER_DISPLAY_NAMES[SLA_TIER.PREMIUM],
    color: SLA_TIER_COLORS[SLA_TIER.PREMIUM],
    responseTime: SLA_DEFAULT_RESPONSE_TIMES.CRITICAL,
    resolutionTime: SLA_DEFAULT_RESOLUTION_TIMES.CRITICAL,
    priority: 1,
    escalationLevel: 3,
    breachThreshold: SLA_BREACH_THRESHOLD,
  },
  [SLA_TIER.STANDARD]: {
    tier: SLA_TIER.STANDARD,
    displayName: SLA_TIER_DISPLAY_NAMES[SLA_TIER.STANDARD],
    color: SLA_TIER_COLORS[SLA_TIER.STANDARD],
    responseTime: SLA_DEFAULT_RESPONSE_TIMES.HIGH,
    resolutionTime: SLA_DEFAULT_RESOLUTION_TIMES.HIGH,
    priority: 2,
    escalationLevel: 2,
    breachThreshold: SLA_BREACH_THRESHOLD,
  },
  [SLA_TIER.BASIC]: {
    tier: SLA_TIER.BASIC,
    displayName: SLA_TIER_DISPLAY_NAMES[SLA_TIER.BASIC],
    color: SLA_TIER_COLORS[SLA_TIER.BASIC],
    responseTime: SLA_DEFAULT_RESPONSE_TIMES.MEDIUM,
    resolutionTime: SLA_DEFAULT_RESOLUTION_TIMES.MEDIUM,
    priority: 3,
    escalationLevel: 1,
    breachThreshold: SLA_BREACH_THRESHOLD,
  },
  [SLA_TIER.ENTERPRISE]: {
    tier: SLA_TIER.ENTERPRISE,
    displayName: SLA_TIER_DISPLAY_NAMES[SLA_TIER.ENTERPRISE],
    color: SLA_TIER_COLORS[SLA_TIER.ENTERPRISE],
    responseTime: SLA_DEFAULT_RESPONSE_TIMES.CRITICAL,
    resolutionTime: SLA_DEFAULT_RESOLUTION_TIMES.CRITICAL,
    priority: 0,
    escalationLevel: 4,
    breachThreshold: 90,
  },
};

/**
 * SLA স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SLA_STATUS_TRANSITIONS = {
  [SLA_STATUS.PENDING]: ['active', 'expired'],
  [SLA_STATUS.ACTIVE]: ['suspended', 'expired', 'breached'],
  [SLA_STATUS.SUSPENDED]: ['active', 'expired'],
  [SLA_STATUS.BREACHED]: ['active', 'expired', 'suspended'],
  [SLA_STATUS.EXPIRED]: ['active', 'inactive'],
  [SLA_STATUS.INACTIVE]: ['pending'],
} as const;

/**
 * SLA মেট্রিক টাইপ ডিফল্ট ওজন
 */
export const SLA_METRIC_WEIGHTS = {
  [SLA_METRIC_TYPE.RESPONSE_TIME]: 0.35,
  [SLA_METRIC_TYPE.RESOLUTION_TIME]: 0.3,
  [SLA_METRIC_TYPE.FIRST_CONTACT_RESOLUTION]: 0.15,
  [SLA_METRIC_TYPE.SATISFACTION_SCORE]: 0.15,
  [SLA_METRIC_TYPE.AVAILABILITY]: 0.05,
} as const;

/**
 * SLA মেট্রিক টাইপ থ্রেশহোল্ড
 */
export const SLA_METRIC_THRESHOLDS = {
  [SLA_METRIC_TYPE.RESPONSE_TIME]: {
    warning: 0.8,
    critical: 1.0,
  },
  [SLA_METRIC_TYPE.RESOLUTION_TIME]: {
    warning: 0.8,
    critical: 1.0,
  },
  [SLA_METRIC_TYPE.FIRST_CONTACT_RESOLUTION]: {
    warning: 0.7,
    critical: 0.6,
  },
  [SLA_METRIC_TYPE.SATISFACTION_SCORE]: {
    warning: 0.7,
    critical: 0.6,
  },
  [SLA_METRIC_TYPE.AVAILABILITY]: {
    warning: 0.9,
    critical: 0.85,
  },
} as const;
