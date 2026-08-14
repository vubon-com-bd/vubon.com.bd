/**
 * Flash Sale Rule Status Constants
 * রুলের স্ট্যাটাসসমূহ
 */

// রুল স্ট্যাটাস এনাম
export const RULE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  EXPIRED: 'expired',
  TESTING: 'testing',
  DEPRECATED: 'deprecated',
  OBSOLETE: 'obsolete',
  SUSPENDED: 'suspended',
  SCHEDULED: 'scheduled',
  EXECUTING: 'executing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// রুল স্ট্যাটাস টাইপ
export type RuleStatus = (typeof RULE_STATUS)[keyof typeof RULE_STATUS];

// স্ট্যাটাসের লেবেল
export const RULE_STATUS_LABELS: Record<RuleStatus, string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  expired: 'মেয়াদোত্তীর্ণ',
  testing: 'পরীক্ষামূলক',
  deprecated: 'অপ্রচলিত',
  obsolete: 'অব্যবহৃত',
  suspended: 'স্থগিত',
  scheduled: 'নির্ধারিত',
  executing: 'চলমান',
  completed: 'সম্পন্ন',
  failed: 'ব্যর্থ',
};

// স্ট্যাটাসের বিবরণ
export const RULE_STATUS_DESCRIPTIONS: Record<RuleStatus, string> = {
  active: 'রুলটি বর্তমানে সক্রিয় এবং কার্যকর',
  inactive: 'রুলটি নিষ্ক্রিয় করা হয়েছে',
  draft: 'রুলটি খসড়া অবস্থায় আছে',
  published: 'রুলটি প্রকাশিত হয়েছে',
  pending: 'রুলটি অনুমোদনের অপেক্ষায়',
  approved: 'রুলটি অনুমোদিত হয়েছে',
  rejected: 'রুলটি প্রত্যাখ্যাত হয়েছে',
  archived: 'রুলটি আর্কাইভ করা হয়েছে',
  deleted: 'রুলটি মুছে ফেলা হয়েছে',
  expired: 'রুলটির মেয়াদ শেষ হয়েছে',
  testing: 'রুলটি পরীক্ষামূলক পর্যায়ে আছে',
  deprecated: 'রুলটি অপ্রচলিত হিসেবে চিহ্নিত',
  obsolete: 'রুলটি অপ্রয়োজনীয়',
  suspended: 'রুলটি সাময়িকভাবে স্থগিত',
  scheduled: 'রুলটি নির্ধারিত সময়ে কার্যকর হবে',
  executing: 'রুলটি বর্তমানে কার্যকর হচ্ছে',
  completed: 'রুলটি সফলভাবে সম্পন্ন হয়েছে',
  failed: 'রুলটি কার্যকর করতে ব্যর্থ হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const RULE_STATUS_COLORS: Record<RuleStatus, string> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  draft: '#FCD34D',
  published: '#3B82F6',
  pending: '#F59E0B',
  approved: '#34D399',
  rejected: '#F87171',
  archived: '#6B7280',
  deleted: '#DC2626',
  expired: '#F97316',
  testing: '#8B5CF6',
  deprecated: '#9CA3AF',
  obsolete: '#6B7280',
  suspended: '#F59E0B',
  scheduled: '#6366F1',
  executing: '#06B6D4',
  completed: '#10B981',
  failed: '#EF4444',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const RULE_STATUS_ICONS: Record<RuleStatus, string> = {
  active: 'CheckCircle',
  inactive: 'XCircle',
  draft: 'FileText',
  published: 'Globe',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  archived: 'Archive',
  deleted: 'Trash2',
  expired: 'AlertCircle',
  testing: 'Flask',
  deprecated: 'AlertTriangle',
  obsolete: 'XOctagon',
  suspended: 'Pause',
  scheduled: 'CalendarClock',
  executing: 'Activity',
  completed: 'CheckCheck',
  failed: 'AlertTriangle',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const RULE_STATUS_DISPLAY_ORDER: Record<RuleStatus, number> = {
  draft: 1,
  pending: 2,
  approved: 3,
  published: 4,
  scheduled: 5,
  testing: 6,
  active: 7,
  executing: 8,
  completed: 9,
  suspended: 10,
  inactive: 11,
  archived: 12,
  deleted: 13,
  expired: 14,
  failed: 15,
  rejected: 16,
  deprecated: 17,
  obsolete: 18,
};

// স্ট্যাটাস গ্রুপ
export const RULE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'executing', 'published', 'approved'] as RuleStatus[],
  INACTIVE_STATUSES: ['inactive', 'archived', 'deleted', 'deprecated', 'obsolete'] as RuleStatus[],
  PENDING_STATUSES: ['draft', 'pending', 'scheduled', 'testing'] as RuleStatus[],
  COMPLETED_STATUSES: ['completed', 'expired'] as RuleStatus[],
  ISSUE_STATUSES: ['failed', 'rejected', 'suspended'] as RuleStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const RULE_STATUS_TRANSITIONS: Record<RuleStatus, RuleStatus[]> = {
  draft: ['published', 'pending', 'scheduled', 'testing', 'archived', 'deleted'],
  published: ['active', 'pending', 'scheduled', 'archived', 'deleted'],
  pending: ['approved', 'rejected', 'draft', 'archived', 'deleted'],
  approved: ['published', 'active', 'scheduled', 'archived', 'deleted'],
  rejected: ['draft', 'archived', 'deleted'],
  active: ['executing', 'suspended', 'completed', 'inactive', 'archived', 'deleted'],
  inactive: ['active', 'archived', 'deleted'],
  scheduled: ['active', 'executing', 'pending', 'archived', 'deleted'],
  executing: ['completed', 'failed', 'suspended', 'inactive'],
  completed: ['archived', 'deleted', 'inactive'],
  failed: ['draft', 'pending', 'scheduled', 'archived', 'deleted'],
  suspended: ['active', 'inactive', 'archived', 'deleted'],
  archived: ['deleted', 'inactive'],
  deleted: [],
  expired: ['archived', 'deleted', 'inactive'],
  testing: ['active', 'published', 'archived', 'deleted'],
  deprecated: ['archived', 'deleted', 'inactive'],
  obsolete: ['archived', 'deleted', 'inactive'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface RuleStatusConfig {
  status: RuleStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: RuleStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const RULE_STATUS_CONFIGS: Record<RuleStatus, RuleStatusConfig> = {
  active: {
    status: 'active',
    label: RULE_STATUS_LABELS.active,
    description: RULE_STATUS_DESCRIPTIONS.active,
    color: RULE_STATUS_COLORS.active,
    icon: RULE_STATUS_ICONS.active,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: RULE_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: RULE_STATUS_LABELS.inactive,
    description: RULE_STATUS_DESCRIPTIONS.inactive,
    color: RULE_STATUS_COLORS.inactive,
    icon: RULE_STATUS_ICONS.inactive,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.inactive,
  },
  draft: {
    status: 'draft',
    label: RULE_STATUS_LABELS.draft,
    description: RULE_STATUS_DESCRIPTIONS.draft,
    color: RULE_STATUS_COLORS.draft,
    icon: RULE_STATUS_ICONS.draft,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: RULE_STATUS_LABELS.published,
    description: RULE_STATUS_DESCRIPTIONS.published,
    color: RULE_STATUS_COLORS.published,
    icon: RULE_STATUS_ICONS.published,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: RULE_STATUS_TRANSITIONS.published,
  },
  pending: {
    status: 'pending',
    label: RULE_STATUS_LABELS.pending,
    description: RULE_STATUS_DESCRIPTIONS.pending,
    color: RULE_STATUS_COLORS.pending,
    icon: RULE_STATUS_ICONS.pending,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: RULE_STATUS_LABELS.approved,
    description: RULE_STATUS_DESCRIPTIONS.approved,
    color: RULE_STATUS_COLORS.approved,
    icon: RULE_STATUS_ICONS.approved,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: RULE_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: RULE_STATUS_LABELS.rejected,
    description: RULE_STATUS_DESCRIPTIONS.rejected,
    color: RULE_STATUS_COLORS.rejected,
    icon: RULE_STATUS_ICONS.rejected,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.rejected,
  },
  archived: {
    status: 'archived',
    label: RULE_STATUS_LABELS.archived,
    description: RULE_STATUS_DESCRIPTIONS.archived,
    color: RULE_STATUS_COLORS.archived,
    icon: RULE_STATUS_ICONS.archived,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: RULE_STATUS_LABELS.deleted,
    description: RULE_STATUS_DESCRIPTIONS.deleted,
    color: RULE_STATUS_COLORS.deleted,
    icon: RULE_STATUS_ICONS.deleted,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.deleted,
  },
  expired: {
    status: 'expired',
    label: RULE_STATUS_LABELS.expired,
    description: RULE_STATUS_DESCRIPTIONS.expired,
    color: RULE_STATUS_COLORS.expired,
    icon: RULE_STATUS_ICONS.expired,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.expired,
  },
  testing: {
    status: 'testing',
    label: RULE_STATUS_LABELS.testing,
    description: RULE_STATUS_DESCRIPTIONS.testing,
    color: RULE_STATUS_COLORS.testing,
    icon: RULE_STATUS_ICONS.testing,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.testing,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.testing,
  },
  deprecated: {
    status: 'deprecated',
    label: RULE_STATUS_LABELS.deprecated,
    description: RULE_STATUS_DESCRIPTIONS.deprecated,
    color: RULE_STATUS_COLORS.deprecated,
    icon: RULE_STATUS_ICONS.deprecated,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.deprecated,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.deprecated,
  },
  obsolete: {
    status: 'obsolete',
    label: RULE_STATUS_LABELS.obsolete,
    description: RULE_STATUS_DESCRIPTIONS.obsolete,
    color: RULE_STATUS_COLORS.obsolete,
    icon: RULE_STATUS_ICONS.obsolete,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.obsolete,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.obsolete,
  },
  suspended: {
    status: 'suspended',
    label: RULE_STATUS_LABELS.suspended,
    description: RULE_STATUS_DESCRIPTIONS.suspended,
    color: RULE_STATUS_COLORS.suspended,
    icon: RULE_STATUS_ICONS.suspended,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.suspended,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.suspended,
  },
  scheduled: {
    status: 'scheduled',
    label: RULE_STATUS_LABELS.scheduled,
    description: RULE_STATUS_DESCRIPTIONS.scheduled,
    color: RULE_STATUS_COLORS.scheduled,
    icon: RULE_STATUS_ICONS.scheduled,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.scheduled,
  },
  executing: {
    status: 'executing',
    label: RULE_STATUS_LABELS.executing,
    description: RULE_STATUS_DESCRIPTIONS.executing,
    color: RULE_STATUS_COLORS.executing,
    icon: RULE_STATUS_ICONS.executing,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.executing,
    isActive: true,
    canTransitionTo: RULE_STATUS_TRANSITIONS.executing,
  },
  completed: {
    status: 'completed',
    label: RULE_STATUS_LABELS.completed,
    description: RULE_STATUS_DESCRIPTIONS.completed,
    color: RULE_STATUS_COLORS.completed,
    icon: RULE_STATUS_ICONS.completed,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.completed,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.completed,
  },
  failed: {
    status: 'failed',
    label: RULE_STATUS_LABELS.failed,
    description: RULE_STATUS_DESCRIPTIONS.failed,
    color: RULE_STATUS_COLORS.failed,
    icon: RULE_STATUS_ICONS.failed,
    displayOrder: RULE_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: RULE_STATUS_TRANSITIONS.failed,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidRuleStatus = (status: string): status is RuleStatus => {
  return Object.values(RULE_STATUS).includes(status as RuleStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveRuleStatuses = (): RuleStatus[] => {
  return Object.values(RULE_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getRuleStatusesByOrder = (): RuleStatus[] => {
  return Object.values(RULE_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getRuleStatusesByGroup = (group: keyof typeof RULE_STATUS_GROUPS): RuleStatus[] => {
  return RULE_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getRuleStatusLabel = (status: RuleStatus): string => {
  return RULE_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getRuleStatusDescription = (status: RuleStatus): string => {
  return RULE_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getRuleStatusColor = (status: RuleStatus): string => {
  return RULE_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getRuleStatusIcon = (status: RuleStatus): string => {
  return RULE_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToRuleStatus = (from: RuleStatus, to: RuleStatus): boolean => {
  return RULE_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalRuleStatus = (status: RuleStatus): boolean => {
  const terminalStatuses: RuleStatus[] = ['completed', 'failed', 'deleted', 'archived', 'expired'];
  return terminalStatuses.includes(status);
};
