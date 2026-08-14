/**
 * Flash Sale Share Status Constants
 * শেয়ারের স্ট্যাটাসসমূহ
 */

// শেয়ার স্ট্যাটাস এনাম
export const SHARE_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  SCHEDULED: 'scheduled',
  PROCESSING: 'processing',
  QUEUED: 'queued',
  RETRYING: 'retrying',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CLICKED: 'clicked',
  CONVERTED: 'converted',
} as const;

// শেয়ার স্ট্যাটাস টাইপ
export type ShareStatus = (typeof SHARE_STATUS)[keyof typeof SHARE_STATUS];

// স্ট্যাটাসের লেবেল
export const SHARE_STATUS_LABELS: Record<ShareStatus, string> = {
  pending: 'অপেক্ষমান',
  sent: 'প্রেরিত',
  delivered: 'পৌঁছেছে',
  read: 'পঠিত',
  failed: 'ব্যর্থ',
  cancelled: 'বাতিলকৃত',
  scheduled: 'নির্ধারিত',
  processing: 'প্রক্রিয়াকরণ',
  queued: 'কিউভুক্ত',
  retrying: 'পুনরায় চেষ্টা',
  expired: 'মেয়াদোত্তীর্ণ',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
  draft: 'খসড়া',
  published: 'প্রকাশিত',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  clicked: 'ক্লিককৃত',
  converted: 'রূপান্তরিত',
};

// স্ট্যাটাসের বিবরণ
export const SHARE_STATUS_DESCRIPTIONS: Record<ShareStatus, string> = {
  pending: 'শেয়ারটি প্রেরণের অপেক্ষায়',
  sent: 'শেয়ারটি প্রেরণ করা হয়েছে',
  delivered: 'শেয়ারটি প্রাপকের কাছে পৌঁছেছে',
  read: 'শেয়ারটি প্রাপক পড়েছেন',
  failed: 'শেয়ারটি প্রেরণ ব্যর্থ হয়েছে',
  cancelled: 'শেয়ারটি বাতিল করা হয়েছে',
  scheduled: 'শেয়ারটি নির্ধারিত সময়ে প্রেরণ হবে',
  processing: 'শেয়ারটি প্রক্রিয়াকরণ চলছে',
  queued: 'শেয়ারটি প্রেরণের জন্য কিউতে রয়েছে',
  retrying: 'শেয়ারটি পুনরায় প্রেরণের চেষ্টা চলছে',
  expired: 'শেয়ারটির মেয়াদ শেষ হয়েছে',
  archived: 'শেয়ারটি আর্কাইভ করা হয়েছে',
  deleted: 'শেয়ারটি মুছে ফেলা হয়েছে',
  draft: 'শেয়ারটি খসড়া অবস্থায় আছে',
  published: 'শেয়ারটি প্রকাশিত হয়েছে',
  approved: 'শেয়ারটি অনুমোদিত হয়েছে',
  rejected: 'শেয়ারটি প্রত্যাখ্যাত হয়েছে',
  active: 'শেয়ারটি বর্তমানে সক্রিয়',
  inactive: 'শেয়ারটি নিষ্ক্রিয়',
  clicked: 'শেয়ার লিংকে ক্লিক করা হয়েছে',
  converted: 'শেয়ার থেকে রূপান্তর হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const SHARE_STATUS_COLORS: Record<ShareStatus, string> = {
  pending: '#FCD34D',
  sent: '#3B82F6',
  delivered: '#22C55E',
  read: '#10B981',
  failed: '#EF4444',
  cancelled: '#6B7280',
  scheduled: '#8B5CF6',
  processing: '#06B6D4',
  queued: '#F59E0B',
  retrying: '#F97316',
  expired: '#F97316',
  archived: '#9CA3AF',
  deleted: '#DC2626',
  draft: '#9CA3AF',
  published: '#3B82F6',
  approved: '#34D399',
  rejected: '#F87171',
  active: '#22C55E',
  inactive: '#9CA3AF',
  clicked: '#8B5CF6',
  converted: '#10B981',
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const SHARE_STATUS_ICONS: Record<ShareStatus, string> = {
  pending: 'Clock',
  sent: 'Send',
  delivered: 'CheckCircle',
  read: 'Eye',
  failed: 'XCircle',
  cancelled: 'X',
  scheduled: 'CalendarClock',
  processing: 'Loader',
  queued: 'List',
  retrying: 'RefreshCw',
  expired: 'AlertCircle',
  archived: 'Archive',
  deleted: 'Trash2',
  draft: 'FileText',
  published: 'Globe',
  approved: 'Check',
  rejected: 'XOctagon',
  active: 'CheckCircle',
  inactive: 'XCircle',
  clicked: 'MousePointer',
  converted: 'UserCheck',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const SHARE_STATUS_DISPLAY_ORDER: Record<ShareStatus, number> = {
  draft: 1,
  pending: 2,
  queued: 3,
  scheduled: 4,
  processing: 5,
  sent: 6,
  delivered: 7,
  read: 8,
  clicked: 9,
  converted: 10,
  approved: 11,
  published: 12,
  active: 13,
  retrying: 14,
  failed: 15,
  cancelled: 16,
  expired: 17,
  rejected: 18,
  archived: 19,
  deleted: 20,
  inactive: 21,
};

// স্ট্যাটাস গ্রুপ
export const SHARE_STATUS_GROUPS = {
  ACTIVE_STATUSES: [
    'sent',
    'delivered',
    'read',
    'clicked',
    'converted',
    'published',
    'approved',
    'active',
  ] as ShareStatus[],
  INACTIVE_STATUSES: ['archived', 'deleted', 'expired', 'cancelled', 'inactive'] as ShareStatus[],
  PENDING_STATUSES: ['pending', 'queued', 'scheduled', 'draft'] as ShareStatus[],
  PROCESSING_STATUSES: ['processing', 'retrying'] as ShareStatus[],
  ISSUE_STATUSES: ['failed', 'rejected'] as ShareStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const SHARE_STATUS_TRANSITIONS: Record<ShareStatus, ShareStatus[]> = {
  draft: ['published', 'scheduled', 'pending', 'archived', 'deleted'],
  pending: ['queued', 'processing', 'sent', 'cancelled', 'archived', 'deleted'],
  queued: ['processing', 'scheduled', 'cancelled', 'archived', 'deleted'],
  scheduled: ['processing', 'pending', 'sent', 'cancelled', 'archived', 'deleted'],
  processing: ['sent', 'failed', 'retrying', 'cancelled'],
  sent: ['delivered', 'failed', 'cancelled', 'archived', 'deleted'],
  delivered: ['read', 'clicked', 'expired', 'archived', 'deleted'],
  read: ['clicked', 'archived', 'deleted'],
  clicked: ['converted', 'archived', 'deleted'],
  converted: ['archived', 'deleted'],
  approved: ['published', 'sent', 'scheduled', 'active', 'archived', 'deleted'],
  published: ['sent', 'scheduled', 'active', 'archived', 'deleted'],
  active: ['inactive', 'archived', 'deleted'],
  retrying: ['processing', 'sent', 'failed', 'cancelled'],
  failed: ['pending', 'retrying', 'cancelled', 'archived', 'deleted'],
  cancelled: ['archived', 'deleted'],
  expired: ['archived', 'deleted'],
  rejected: ['draft', 'archived', 'deleted'],
  archived: ['deleted'],
  deleted: [],
  inactive: ['active', 'archived', 'deleted'],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface ShareStatusConfig {
  status: ShareStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: ShareStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const SHARE_STATUS_CONFIGS: Record<ShareStatus, ShareStatusConfig> = {
  pending: {
    status: 'pending',
    label: SHARE_STATUS_LABELS.pending,
    description: SHARE_STATUS_DESCRIPTIONS.pending,
    color: SHARE_STATUS_COLORS.pending,
    icon: SHARE_STATUS_ICONS.pending,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.pending,
  },
  sent: {
    status: 'sent',
    label: SHARE_STATUS_LABELS.sent,
    description: SHARE_STATUS_DESCRIPTIONS.sent,
    color: SHARE_STATUS_COLORS.sent,
    icon: SHARE_STATUS_ICONS.sent,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.sent,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.sent,
  },
  delivered: {
    status: 'delivered',
    label: SHARE_STATUS_LABELS.delivered,
    description: SHARE_STATUS_DESCRIPTIONS.delivered,
    color: SHARE_STATUS_COLORS.delivered,
    icon: SHARE_STATUS_ICONS.delivered,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.delivered,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.delivered,
  },
  read: {
    status: 'read',
    label: SHARE_STATUS_LABELS.read,
    description: SHARE_STATUS_DESCRIPTIONS.read,
    color: SHARE_STATUS_COLORS.read,
    icon: SHARE_STATUS_ICONS.read,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.read,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.read,
  },
  failed: {
    status: 'failed',
    label: SHARE_STATUS_LABELS.failed,
    description: SHARE_STATUS_DESCRIPTIONS.failed,
    color: SHARE_STATUS_COLORS.failed,
    icon: SHARE_STATUS_ICONS.failed,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.failed,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.failed,
  },
  cancelled: {
    status: 'cancelled',
    label: SHARE_STATUS_LABELS.cancelled,
    description: SHARE_STATUS_DESCRIPTIONS.cancelled,
    color: SHARE_STATUS_COLORS.cancelled,
    icon: SHARE_STATUS_ICONS.cancelled,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.cancelled,
  },
  scheduled: {
    status: 'scheduled',
    label: SHARE_STATUS_LABELS.scheduled,
    description: SHARE_STATUS_DESCRIPTIONS.scheduled,
    color: SHARE_STATUS_COLORS.scheduled,
    icon: SHARE_STATUS_ICONS.scheduled,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.scheduled,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.scheduled,
  },
  processing: {
    status: 'processing',
    label: SHARE_STATUS_LABELS.processing,
    description: SHARE_STATUS_DESCRIPTIONS.processing,
    color: SHARE_STATUS_COLORS.processing,
    icon: SHARE_STATUS_ICONS.processing,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.processing,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.processing,
  },
  queued: {
    status: 'queued',
    label: SHARE_STATUS_LABELS.queued,
    description: SHARE_STATUS_DESCRIPTIONS.queued,
    color: SHARE_STATUS_COLORS.queued,
    icon: SHARE_STATUS_ICONS.queued,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.queued,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.queued,
  },
  retrying: {
    status: 'retrying',
    label: SHARE_STATUS_LABELS.retrying,
    description: SHARE_STATUS_DESCRIPTIONS.retrying,
    color: SHARE_STATUS_COLORS.retrying,
    icon: SHARE_STATUS_ICONS.retrying,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.retrying,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.retrying,
  },
  expired: {
    status: 'expired',
    label: SHARE_STATUS_LABELS.expired,
    description: SHARE_STATUS_DESCRIPTIONS.expired,
    color: SHARE_STATUS_COLORS.expired,
    icon: SHARE_STATUS_ICONS.expired,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.expired,
  },
  archived: {
    status: 'archived',
    label: SHARE_STATUS_LABELS.archived,
    description: SHARE_STATUS_DESCRIPTIONS.archived,
    color: SHARE_STATUS_COLORS.archived,
    icon: SHARE_STATUS_ICONS.archived,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.archived,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.archived,
  },
  deleted: {
    status: 'deleted',
    label: SHARE_STATUS_LABELS.deleted,
    description: SHARE_STATUS_DESCRIPTIONS.deleted,
    color: SHARE_STATUS_COLORS.deleted,
    icon: SHARE_STATUS_ICONS.deleted,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.deleted,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.deleted,
  },
  draft: {
    status: 'draft',
    label: SHARE_STATUS_LABELS.draft,
    description: SHARE_STATUS_DESCRIPTIONS.draft,
    color: SHARE_STATUS_COLORS.draft,
    icon: SHARE_STATUS_ICONS.draft,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.draft,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.draft,
  },
  published: {
    status: 'published',
    label: SHARE_STATUS_LABELS.published,
    description: SHARE_STATUS_DESCRIPTIONS.published,
    color: SHARE_STATUS_COLORS.published,
    icon: SHARE_STATUS_ICONS.published,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.published,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.published,
  },
  approved: {
    status: 'approved',
    label: SHARE_STATUS_LABELS.approved,
    description: SHARE_STATUS_DESCRIPTIONS.approved,
    color: SHARE_STATUS_COLORS.approved,
    icon: SHARE_STATUS_ICONS.approved,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: SHARE_STATUS_LABELS.rejected,
    description: SHARE_STATUS_DESCRIPTIONS.rejected,
    color: SHARE_STATUS_COLORS.rejected,
    icon: SHARE_STATUS_ICONS.rejected,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.rejected,
  },
  active: {
    status: 'active',
    label: SHARE_STATUS_LABELS.active,
    description: SHARE_STATUS_DESCRIPTIONS.active,
    color: SHARE_STATUS_COLORS.active,
    icon: SHARE_STATUS_ICONS.active,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: SHARE_STATUS_LABELS.inactive,
    description: SHARE_STATUS_DESCRIPTIONS.inactive,
    color: SHARE_STATUS_COLORS.inactive,
    icon: SHARE_STATUS_ICONS.inactive,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.inactive,
  },
  clicked: {
    status: 'clicked',
    label: SHARE_STATUS_LABELS.clicked,
    description: SHARE_STATUS_DESCRIPTIONS.clicked,
    color: SHARE_STATUS_COLORS.clicked,
    icon: SHARE_STATUS_ICONS.clicked,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.clicked,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.clicked,
  },
  converted: {
    status: 'converted',
    label: SHARE_STATUS_LABELS.converted,
    description: SHARE_STATUS_DESCRIPTIONS.converted,
    color: SHARE_STATUS_COLORS.converted,
    icon: SHARE_STATUS_ICONS.converted,
    displayOrder: SHARE_STATUS_DISPLAY_ORDER.converted,
    isActive: true,
    canTransitionTo: SHARE_STATUS_TRANSITIONS.converted,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidShareStatus = (status: string): status is ShareStatus => {
  return Object.values(SHARE_STATUS).includes(status as ShareStatus);
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveShareStatuses = (): ShareStatus[] => {
  return Object.values(SHARE_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getShareStatusesByOrder = (): ShareStatus[] => {
  return Object.values(SHARE_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getShareStatusesByGroup = (group: keyof typeof SHARE_STATUS_GROUPS): ShareStatus[] => {
  return SHARE_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getShareStatusLabel = (status: ShareStatus): string => {
  return SHARE_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের বিবরণ পান
export const getShareStatusDescription = (status: ShareStatus): string => {
  return SHARE_STATUS_DESCRIPTIONS[status] || '';
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getShareStatusColor = (status: ShareStatus): string => {
  return SHARE_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getShareStatusIcon = (status: ShareStatus): string => {
  return SHARE_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToShareStatus = (from: ShareStatus, to: ShareStatus): boolean => {
  return SHARE_STATUS_TRANSITIONS[from]?.includes(to) || false;
};

// হেল্পার ফাংশন: স্ট্যাটাস টার্মিনাল কিনা চেক করুন
export const isTerminalShareStatus = (status: ShareStatus): boolean => {
  const terminalStatuses: ShareStatus[] = [
    'converted',
    'failed',
    'cancelled',
    'expired',
    'rejected',
    'archived',
    'deleted',
    'inactive',
  ];
  return terminalStatuses.includes(status);
};

// হেল্পার ফাংশন: স্ট্যাটাস ডেলিভারি সফল কিনা চেক করুন
export const isDeliverySuccessful = (status: ShareStatus): boolean => {
  const successfulStatuses: ShareStatus[] = ['sent', 'delivered', 'read', 'clicked', 'converted'];
  return successfulStatuses.includes(status);
};
