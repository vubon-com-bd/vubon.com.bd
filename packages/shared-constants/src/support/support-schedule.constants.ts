/**
 * সাপোর্ট শিডিউল সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * শিডিউল আইডি প্রিফিক্স
 */
export const SCHEDULE_ID_PREFIX = 'SCH';

/**
 * শিডিউল নম্বর ফরম্যাট
 */
export const SCHEDULE_NUMBER_FORMAT = 'SCH-{year}{month}{day}-{sequence}';

/**
 * ডিফল্ট শিফট সময় (ঘন্টায়)
 */
export const DEFAULT_SHIFT_START = 9; // সকাল ৯টা
export const DEFAULT_SHIFT_END = 18; // সন্ধ্যা ৬টা

/**
 * শিফট ডিউরেশন (ঘন্টায়)
 */
export const SHIFT_DURATION = 9;

/**
 * ব্রেক সময় (মিনিটে)
 */
export const BREAK_TIME = {
  LUNCH: 60,
  TEA: 15,
  SHORT: 10,
} as const;

/**
 * শিফট রোটেশন পিরিয়ড (দিনে)
 */
export const SHIFT_ROTATION_PERIOD = 7;

/**
 * শিডিউল কনফ্লিক্ট রেজোলিউশন রুলস
 */
export const SCHEDULE_CONFLICT_RULES = {
  OVERLAP: 'overlap',
  ADJACENT: 'adjacent',
  MAX_SHIFTS: 'max_shifts',
  MIN_GAP: 'min_gap',
} as const;

/**
 * শিডিউল আর্কাইভ পিরিয়ড (দিনে)
 */
export const SCHEDULE_ARCHIVE_PERIOD = 90;

/**
 * শিফট টাইপ
 */
export const SHIFT_TYPE = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
  CUSTOM: 'custom',
} as const;

/**
 * শিফট টাইপের ডিসপ্লে নাম
 */
export const SHIFT_TYPE_DISPLAY_NAMES = {
  [SHIFT_TYPE.MORNING]: 'সকাল',
  [SHIFT_TYPE.AFTERNOON]: 'দুপুর',
  [SHIFT_TYPE.EVENING]: 'সন্ধ্যা',
  [SHIFT_TYPE.NIGHT]: 'রাত',
  [SHIFT_TYPE.CUSTOM]: 'কাস্টম',
} as const;

/**
 * শিফট টাইমস
 */
export const SHIFT_TIMES = {
  [SHIFT_TYPE.MORNING]: { start: 6, end: 14 },
  [SHIFT_TYPE.AFTERNOON]: { start: 10, end: 18 },
  [SHIFT_TYPE.EVENING]: { start: 14, end: 22 },
  [SHIFT_TYPE.NIGHT]: { start: 22, end: 6 },
  [SHIFT_TYPE.CUSTOM]: { start: DEFAULT_SHIFT_START, end: DEFAULT_SHIFT_END },
} as const;

/**
 * শিডিউল স্ট্যাটাস
 */
export const SCHEDULE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
} as const;

/**
 * শিডিউল স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SCHEDULE_STATUS_DISPLAY_NAMES = {
  [SCHEDULE_STATUS.DRAFT]: 'খসড়া',
  [SCHEDULE_STATUS.PUBLISHED]: 'প্রকাশিত',
  [SCHEDULE_STATUS.IN_PROGRESS]: 'চলমান',
  [SCHEDULE_STATUS.COMPLETED]: 'সমাপ্ত',
  [SCHEDULE_STATUS.CANCELLED]: 'বাতিল',
  [SCHEDULE_STATUS.ARCHIVED]: 'আর্কাইভড',
} as const;

/**
 * শিডিউল স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SCHEDULE_STATUS_COLORS = {
  [SCHEDULE_STATUS.DRAFT]: '#95a5a6',
  [SCHEDULE_STATUS.PUBLISHED]: '#2ecc71',
  [SCHEDULE_STATUS.IN_PROGRESS]: '#3498db',
  [SCHEDULE_STATUS.COMPLETED]: '#27ae60',
  [SCHEDULE_STATUS.CANCELLED]: '#e74c3c',
  [SCHEDULE_STATUS.ARCHIVED]: '#7f8c8d',
} as const;

/**
 * শিডিউল ডিফল্ট সেটিংস
 */
export const SCHEDULE_DEFAULT_SETTINGS = {
  defaultShiftStart: DEFAULT_SHIFT_START,
  defaultShiftEnd: DEFAULT_SHIFT_END,
  shiftDuration: SHIFT_DURATION,
  breakTime: BREAK_TIME,
  rotationPeriod: SHIFT_ROTATION_PERIOD,
  archivePeriod: SCHEDULE_ARCHIVE_PERIOD,
} as const;

/**
 * শিডিউল ভ্যালিডেশন রুলস
 */
export const SCHEDULE_VALIDATION_RULES = {
  shift: {
    minDuration: 4,
    maxDuration: 12,
    maxConsecutiveDays: 5,
    minRestBetweenShifts: 8,
  },
  break: {
    minBreak: 10,
    maxBreak: 120,
  },
  schedule: {
    maxOverlap: 0,
    maxShiftsPerDay: 2,
    minGapBetweenShifts: 2,
  },
} as const;

export type ScheduleIdPrefix = typeof SCHEDULE_ID_PREFIX;
export type ShiftType = (typeof SHIFT_TYPE)[keyof typeof SHIFT_TYPE];
export type ScheduleStatus = (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS];
export type ScheduleConflictRule =
  (typeof SCHEDULE_CONFLICT_RULES)[keyof typeof SCHEDULE_CONFLICT_RULES];

export interface BreakTime {
  LUNCH: number;
  TEA: number;
  SHORT: number;
}

export interface ShiftTimes {
  start: number;
  end: number;
}

export interface ScheduleDefaultSettings {
  defaultShiftStart: number;
  defaultShiftEnd: number;
  shiftDuration: number;
  breakTime: BreakTime;
  rotationPeriod: number;
  archivePeriod: number;
}

export interface ScheduleValidationRules {
  shift: {
    minDuration: number;
    maxDuration: number;
    maxConsecutiveDays: number;
    minRestBetweenShifts: number;
  };
  break: {
    minBreak: number;
    maxBreak: number;
  };
  schedule: {
    maxOverlap: number;
    maxShiftsPerDay: number;
    minGapBetweenShifts: number;
  };
}

export interface Shift {
  id: string;
  type: ShiftType;
  date: Date;
  startTime: string;
  endTime: string;
  agentId?: string;
  role?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface Schedule {
  id: string;
  title: string;
  description?: string;
  status: ScheduleStatus;
  shifts: Shift[];
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface ScheduleConflict {
  id: string;
  scheduleId: string;
  shiftId: string;
  type: ScheduleConflictRule;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolution?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
}

/**
 * শিডিউল কনফিগারেশন
 */
export const SCHEDULE_CONFIG = {
  idPrefix: SCHEDULE_ID_PREFIX,
  numberFormat: SCHEDULE_NUMBER_FORMAT,
  defaultSettings: SCHEDULE_DEFAULT_SETTINGS,
  validationRules: SCHEDULE_VALIDATION_RULES,
  shiftTypes: SHIFT_TYPE,
  statuses: SCHEDULE_STATUS,
  conflictRules: SCHEDULE_CONFLICT_RULES,
  statusColors: SCHEDULE_STATUS_COLORS,
} as const;

/**
 * শিডিউল ইভেন্ট টাইপ
 */
export const SCHEDULE_EVENT_TYPES = {
  CREATED: 'schedule_created',
  UPDATED: 'schedule_updated',
  PUBLISHED: 'schedule_published',
  CANCELLED: 'schedule_cancelled',
  ARCHIVED: 'schedule_archived',
  SHIFT_ASSIGNED: 'shift_assigned',
  SHIFT_UNASSIGNED: 'shift_unassigned',
  CONFLICT_DETECTED: 'conflict_detected',
  CONFLICT_RESOLVED: 'conflict_resolved',
} as const;

export type ScheduleEventType = (typeof SCHEDULE_EVENT_TYPES)[keyof typeof SCHEDULE_EVENT_TYPES];

/**
 * শিডিউল মেট্রিক্স
 */
export const SCHEDULE_METRICS = {
  TOTAL_SHIFTS: 'total_shifts',
  ASSIGNED_SHIFTS: 'assigned_shifts',
  UNASSIGNED_SHIFTS: 'unassigned_shifts',
  CONFLICT_COUNT: 'conflict_count',
  AVG_SHIFTS_PER_AGENT: 'avg_shifts_per_agent',
  COVERAGE_RATE: 'coverage_rate',
} as const;

export type ScheduleMetric = (typeof SCHEDULE_METRICS)[keyof typeof SCHEDULE_METRICS];
