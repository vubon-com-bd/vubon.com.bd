/**
 * Flash Sale Participant Status Constants
 * ফ্ল্যাশ সেল পার্টিসিপেন্টের স্ট্যাটাসসমূহ
 */

// ফ্ল্যাশ সেল পার্টিসিপেন্ট স্ট্যাটাস এনাম
export const FLASH_SALE_PARTICIPANT_STATUS = {
  REGISTERED: 'registered',
  CONFIRMED: 'confirmed',
  ATTENDED: 'attended',
  ABSENT: 'absent',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WAITING: 'waiting',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
} as const;

// ফ্ল্যাশ সেল পার্টিসিপেন্ট স্ট্যাটাস টাইপ
export type FlashSaleParticipantStatus =
  (typeof FLASH_SALE_PARTICIPANT_STATUS)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS];

// স্ট্যাটাসের লেবেল
export const FLASH_SALE_PARTICIPANT_STATUS_LABELS: Record<FlashSaleParticipantStatus, string> = {
  registered: 'নিবন্ধিত',
  confirmed: 'নিশ্চিতকৃত',
  attended: 'উপস্থিত',
  absent: 'অনুপস্থিত',
  cancelled: 'বাতিলকৃত',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  waiting: 'অপেক্ষায়',
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  suspended: 'স্থগিত',
  banned: 'নিষিদ্ধ',
  completed: 'সম্পন্ন',
  expired: 'মেয়াদোত্তীর্ণ',
};

// স্ট্যাটাসের বিবরণ
export const FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS: Record<
  FlashSaleParticipantStatus,
  string
> = {
  registered: 'পার্টিসিপেন্ট সফলভাবে নিবন্ধিত হয়েছে',
  confirmed: 'পার্টিসিপেন্টের অংশগ্রহণ নিশ্চিত করা হয়েছে',
  attended: 'পার্টিসিপেন্ট ফ্ল্যাশ সেলে উপস্থিত ছিলেন',
  absent: 'পার্টিসিপেন্ট ফ্ল্যাশ সেলে উপস্থিত ছিলেন না',
  cancelled: 'পার্টিসিপেন্টের অংশগ্রহণ বাতিল করা হয়েছে',
  pending: 'পার্টিসিপেন্টের আবেদন অনুমোদনের অপেক্ষায়',
  approved: 'পার্টিসিপেন্টের আবেদন অনুমোদিত হয়েছে',
  rejected: 'পার্টিসিপেন্টের আবেদন প্রত্যাখ্যাত হয়েছে',
  waiting: 'পার্টিসিপেন্ট অপেক্ষমাণ তালিকায় রয়েছে',
  active: 'পার্টিসিপেন্ট বর্তমানে সক্রিয়',
  inactive: 'পার্টিসিপেন্ট নিষ্ক্রিয় অবস্থায় আছে',
  suspended: 'পার্টিসিপেন্ট সাময়িকভাবে স্থগিত',
  banned: 'পার্টিসিপেন্ট স্থায়ীভাবে নিষিদ্ধ',
  completed: 'পার্টিসিপেন্ট ফ্ল্যাশ সেল সম্পন্ন করেছেন',
  expired: 'পার্টিসিপেন্টের অংশগ্রহণের মেয়াদ শেষ হয়েছে',
};

// স্ট্যাটাসের কালার কোড
export const FLASH_SALE_PARTICIPANT_STATUS_COLORS: Record<FlashSaleParticipantStatus, string> = {
  registered: '#3B82F6', // Blue
  confirmed: '#22C55E', // Green
  attended: '#10B981', // Emerald
  absent: '#F97316', // Orange
  cancelled: '#EF4444', // Red
  pending: '#FCD34D', // Yellow
  approved: '#34D399', // Green
  rejected: '#F87171', // Red
  waiting: '#F59E0B', // Amber
  active: '#22C55E', // Green
  inactive: '#9CA3AF', // Gray
  suspended: '#F59E0B', // Amber
  banned: '#DC2626', // Dark Red
  completed: '#3B82F6', // Blue
  expired: '#F97316', // Orange
};

// স্ট্যাটাসের আইকন (আইকন নাম)
export const FLASH_SALE_PARTICIPANT_STATUS_ICONS: Record<FlashSaleParticipantStatus, string> = {
  registered: 'UserPlus',
  confirmed: 'CheckCircle',
  attended: 'UserCheck',
  absent: 'UserX',
  cancelled: 'XCircle',
  pending: 'Clock',
  approved: 'Check',
  rejected: 'X',
  waiting: 'Clock',
  active: 'User',
  inactive: 'UserMinus',
  suspended: 'Pause',
  banned: 'Ban',
  completed: 'CheckCheck',
  expired: 'AlertCircle',
};

// স্ট্যাটাসের ডিসপ্লে অর্ডার
export const FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER: Record<
  FlashSaleParticipantStatus,
  number
> = {
  registered: 1,
  confirmed: 2,
  active: 3,
  attended: 4,
  completed: 5,
  pending: 6,
  waiting: 7,
  approved: 8,
  rejected: 9,
  cancelled: 10,
  absent: 11,
  expired: 12,
  suspended: 13,
  inactive: 14,
  banned: 15,
};

// স্ট্যাটাস গ্রুপ
export const FLASH_SALE_PARTICIPANT_STATUS_GROUPS = {
  ACTIVE_STATUSES: [
    'registered',
    'confirmed',
    'active',
    'attended',
    'approved',
  ] as FlashSaleParticipantStatus[],
  INACTIVE_STATUSES: ['inactive', 'expired', 'cancelled'] as FlashSaleParticipantStatus[],
  PENDING_STATUSES: ['pending', 'waiting'] as FlashSaleParticipantStatus[],
  ISSUE_STATUSES: ['rejected', 'absent', 'suspended', 'banned'] as FlashSaleParticipantStatus[],
  COMPLETED_STATUSES: ['completed'] as FlashSaleParticipantStatus[],
} as const;

// স্ট্যাটাস ট্রানজিশন
export const FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS: Record<
  FlashSaleParticipantStatus,
  FlashSaleParticipantStatus[]
> = {
  registered: ['confirmed', 'pending', 'waiting', 'cancelled', 'expired'],
  confirmed: ['attended', 'active', 'cancelled', 'expired'],
  attended: ['completed', 'active', 'expired'],
  absent: ['cancelled', 'expired'],
  cancelled: ['inactive', 'expired'],
  pending: ['approved', 'rejected', 'cancelled', 'expired'],
  approved: ['confirmed', 'active', 'cancelled', 'expired'],
  rejected: ['cancelled', 'expired'],
  waiting: ['confirmed', 'cancelled', 'expired'],
  active: ['completed', 'suspended', 'inactive', 'expired'],
  inactive: ['active', 'suspended', 'expired'],
  suspended: ['active', 'banned', 'expired'],
  banned: ['expired'],
  completed: ['expired'],
  expired: [],
};

// স্ট্যাটাস কনফিগারেশন ইন্টারফেস
export interface FlashSaleParticipantStatusConfig {
  status: FlashSaleParticipantStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  canTransitionTo: FlashSaleParticipantStatus[];
}

// সম্পূর্ণ স্ট্যাটাস কনফিগারেশন
export const FLASH_SALE_PARTICIPANT_STATUS_CONFIGS: Record<
  FlashSaleParticipantStatus,
  FlashSaleParticipantStatusConfig
> = {
  registered: {
    status: 'registered',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.registered,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.registered,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.registered,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.registered,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.registered,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.registered,
  },
  confirmed: {
    status: 'confirmed',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.confirmed,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.confirmed,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.confirmed,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.confirmed,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.confirmed,
    isActive: true,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.confirmed,
  },
  attended: {
    status: 'attended',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.attended,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.attended,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.attended,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.attended,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.attended,
    isActive: true,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.attended,
  },
  absent: {
    status: 'absent',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.absent,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.absent,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.absent,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.absent,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.absent,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.absent,
  },
  cancelled: {
    status: 'cancelled',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.cancelled,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.cancelled,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.cancelled,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.cancelled,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.cancelled,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.cancelled,
  },
  pending: {
    status: 'pending',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.pending,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.pending,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.pending,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.pending,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.pending,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.pending,
  },
  approved: {
    status: 'approved',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.approved,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.approved,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.approved,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.approved,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.approved,
    isActive: true,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.approved,
  },
  rejected: {
    status: 'rejected',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.rejected,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.rejected,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.rejected,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.rejected,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.rejected,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.rejected,
  },
  waiting: {
    status: 'waiting',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.waiting,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.waiting,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.waiting,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.waiting,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.waiting,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.waiting,
  },
  active: {
    status: 'active',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.active,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.active,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.active,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.active,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.active,
    isActive: true,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.active,
  },
  inactive: {
    status: 'inactive',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.inactive,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.inactive,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.inactive,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.inactive,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.inactive,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.inactive,
  },
  suspended: {
    status: 'suspended',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.suspended,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.suspended,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.suspended,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.suspended,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.suspended,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.suspended,
  },
  banned: {
    status: 'banned',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.banned,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.banned,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.banned,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.banned,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.banned,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.banned,
  },
  completed: {
    status: 'completed',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.completed,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.completed,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.completed,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.completed,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.completed,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.completed,
  },
  expired: {
    status: 'expired',
    label: FLASH_SALE_PARTICIPANT_STATUS_LABELS.expired,
    description: FLASH_SALE_PARTICIPANT_STATUS_DESCRIPTIONS.expired,
    color: FLASH_SALE_PARTICIPANT_STATUS_COLORS.expired,
    icon: FLASH_SALE_PARTICIPANT_STATUS_ICONS.expired,
    displayOrder: FLASH_SALE_PARTICIPANT_STATUS_DISPLAY_ORDER.expired,
    isActive: false,
    canTransitionTo: FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS.expired,
  },
};

// হেল্পার ফাংশন: স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidFlashSaleParticipantStatus = (
  status: string
): status is FlashSaleParticipantStatus => {
  return Object.values(FLASH_SALE_PARTICIPANT_STATUS).includes(
    status as FlashSaleParticipantStatus
  );
};

// হেল্পার ফাংশন: সক্রিয় স্ট্যাটাস গুলো পান
export const getActiveFlashSaleParticipantStatuses = (): FlashSaleParticipantStatus[] => {
  return Object.values(FLASH_SALE_PARTICIPANT_STATUS_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getFlashSaleParticipantStatusesByOrder = (): FlashSaleParticipantStatus[] => {
  return Object.values(FLASH_SALE_PARTICIPANT_STATUS_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.status);
};

// হেল্পার ফাংশন: স্ট্যাটাস গ্রুপ অনুযায়ী ফিল্টার
export const getFlashSaleParticipantStatusesByGroup = (
  group: keyof typeof FLASH_SALE_PARTICIPANT_STATUS_GROUPS
): FlashSaleParticipantStatus[] => {
  return FLASH_SALE_PARTICIPANT_STATUS_GROUPS[group] || [];
};

// হেল্পার ফাংশন: স্ট্যাটাসের লেবেল পান
export const getFlashSaleParticipantStatusLabel = (status: FlashSaleParticipantStatus): string => {
  return FLASH_SALE_PARTICIPANT_STATUS_LABELS[status] || status;
};

// হেল্পার ফাংশন: স্ট্যাটাসের কালার পান
export const getFlashSaleParticipantStatusColor = (status: FlashSaleParticipantStatus): string => {
  return FLASH_SALE_PARTICIPANT_STATUS_COLORS[status] || '#6B7280';
};

// হেল্পার ফাংশন: স্ট্যাটাসের আইকন পান
export const getFlashSaleParticipantStatusIcon = (status: FlashSaleParticipantStatus): string => {
  return FLASH_SALE_PARTICIPANT_STATUS_ICONS[status] || 'Circle';
};

// হেল্পার ফাংশন: স্ট্যাটাস ট্রানজিশন সম্ভব কিনা চেক করুন
export const canTransitionToFlashSaleParticipantStatus = (
  from: FlashSaleParticipantStatus,
  to: FlashSaleParticipantStatus
): boolean => {
  return FLASH_SALE_PARTICIPANT_STATUS_TRANSITIONS[from]?.includes(to) || false;
};
