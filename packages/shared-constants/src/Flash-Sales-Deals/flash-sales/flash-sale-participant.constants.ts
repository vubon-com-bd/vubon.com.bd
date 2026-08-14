/**
 * Flash Sale Participant Constants
 * ফ্ল্যাশ সেল পার্টিসিপেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট পার্টিসিপেন্ট লিমিট
export const DEFAULT_PARTICIPANT_LIMIT = 100;

// মিনিমাম পার্টিসিপেন্ট
export const MINIMUM_PARTICIPANTS = 1;

// ম্যাক্সিমাম পার্টিসিপেন্ট
export const MAXIMUM_PARTICIPANTS = 10000;

// ডিফল্ট রেজিস্ট্রেশন টাইমআউট (মিনিটে)
export const DEFAULT_REGISTRATION_TIMEOUT = 30;

// ডিফল্ট রোল
export const DEFAULT_ROLE = 'participant';

// পার্টিসিপেন্ট প্রায়োরিটি
export const PARTICIPANT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VIP: 'vip',
} as const;

// ডিফল্ট পেজিনেশন সাইজ
export const PARTICIPANT_PAGINATION_SIZE = 10;

// ডিফল্ট সর্টিং
export const DEFAULT_PARTICIPANT_SORTING = {
  field: 'registeredAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const PARTICIPANT_API_RESPONSE_LIMIT = 100;

// ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const PARTICIPANT_CACHE_TIMEOUT = 300000;

// পার্টিসিপেন্ট স্ট্যাটাস
export const PARTICIPANT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
} as const;

// পার্টিসিপেন্ট রোল
export const PARTICIPANT_ROLE = {
  PARTICIPANT: 'participant',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  OWNER: 'owner',
} as const;

// পার্টিসিপেন্ট কনফিগারেশন ইন্টারফেস
export interface FlashSaleParticipantConfig {
  defaultLimit: number;
  minParticipants: number;
  maxParticipants: number;
  defaultRegistrationTimeout: number;
  defaultRole: string;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  paginationSize: number;
  apiResponseLimit: number;
  cacheTimeout: number;
}

// ডিফল্ট পার্টিসিপেন্ট কনফিগারেশন
export const DEFAULT_PARTICIPANT_CONFIG: FlashSaleParticipantConfig = {
  defaultLimit: DEFAULT_PARTICIPANT_LIMIT,
  minParticipants: MINIMUM_PARTICIPANTS,
  maxParticipants: MAXIMUM_PARTICIPANTS,
  defaultRegistrationTimeout: DEFAULT_REGISTRATION_TIMEOUT,
  defaultRole: DEFAULT_ROLE,
  defaultSorting: DEFAULT_PARTICIPANT_SORTING,
  paginationSize: PARTICIPANT_PAGINATION_SIZE,
  apiResponseLimit: PARTICIPANT_API_RESPONSE_LIMIT,
  cacheTimeout: PARTICIPANT_CACHE_TIMEOUT,
};

// পার্টিসিপেন্ট প্রায়োরিটির লেবেল
export const PARTICIPANT_PRIORITY_LABELS: Record<
  (typeof PARTICIPANT_PRIORITY)[keyof typeof PARTICIPANT_PRIORITY],
  string
> = {
  low: 'নিম্ন',
  medium: 'মাঝারি',
  high: 'উচ্চ',
  vip: 'ভিআইপি',
};

// পার্টিসিপেন্ট প্রায়োরিটির কালার
export const PARTICIPANT_PRIORITY_COLORS: Record<
  (typeof PARTICIPANT_PRIORITY)[keyof typeof PARTICIPANT_PRIORITY],
  string
> = {
  low: '#9CA3AF',
  medium: '#F59E0B',
  high: '#22C55E',
  vip: '#8B5CF6',
};

// পার্টিসিপেন্ট স্ট্যাটাসের লেবেল
export const PARTICIPANT_STATUS_LABELS: Record<
  (typeof PARTICIPANT_STATUS)[keyof typeof PARTICIPANT_STATUS],
  string
> = {
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  banned: 'নিষিদ্ধ',
};

// পার্টিসিপেন্ট স্ট্যাটাসের কালার
export const PARTICIPANT_STATUS_COLORS: Record<
  (typeof PARTICIPANT_STATUS)[keyof typeof PARTICIPANT_STATUS],
  string
> = {
  pending: '#FCD34D',
  approved: '#34D399',
  rejected: '#F87171',
  active: '#22C55E',
  inactive: '#9CA3AF',
  banned: '#DC2626',
};

// পার্টিসিপেন্ট রোলের লেবেল
export const PARTICIPANT_ROLE_LABELS: Record<
  (typeof PARTICIPANT_ROLE)[keyof typeof PARTICIPANT_ROLE],
  string
> = {
  participant: 'অংশগ্রহণকারী',
  moderator: 'মডারেটর',
  admin: 'অ্যাডমিন',
  owner: 'মালিক',
};

// পার্টিসিপেন্ট রোলের কালার
export const PARTICIPANT_ROLE_COLORS: Record<
  (typeof PARTICIPANT_ROLE)[keyof typeof PARTICIPANT_ROLE],
  string
> = {
  participant: '#3B82F6',
  moderator: '#F59E0B',
  admin: '#EF4444',
  owner: '#8B5CF6',
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট সংখ্যা ভ্যালিড কিনা চেক করুন
export const isValidParticipantCount = (count: number): boolean => {
  return count >= MINIMUM_PARTICIPANTS && count <= MAXIMUM_PARTICIPANTS;
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট প্রায়োরিটি ভ্যালিড কিনা চেক করুন
export const isValidParticipantPriority = (
  priority: string
): priority is (typeof PARTICIPANT_PRIORITY)[keyof typeof PARTICIPANT_PRIORITY] => {
  return Object.values(PARTICIPANT_PRIORITY).includes(
    priority as (typeof PARTICIPANT_PRIORITY)[keyof typeof PARTICIPANT_PRIORITY]
  );
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidParticipantStatus = (
  status: string
): status is (typeof PARTICIPANT_STATUS)[keyof typeof PARTICIPANT_STATUS] => {
  return Object.values(PARTICIPANT_STATUS).includes(
    status as (typeof PARTICIPANT_STATUS)[keyof typeof PARTICIPANT_STATUS]
  );
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট রোল ভ্যালিড কিনা চেক করুন
export const isValidParticipantRole = (
  role: string
): role is (typeof PARTICIPANT_ROLE)[keyof typeof PARTICIPANT_ROLE] => {
  return Object.values(PARTICIPANT_ROLE).includes(
    role as (typeof PARTICIPANT_ROLE)[keyof typeof PARTICIPANT_ROLE]
  );
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট প্রায়োরিটির লেবেল পান
export const getParticipantPriorityLabel = (priority: string): string => {
  return (
    PARTICIPANT_PRIORITY_LABELS[priority as keyof typeof PARTICIPANT_PRIORITY_LABELS] || priority
  );
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট প্রায়োরিটির কালার পান
export const getParticipantPriorityColor = (priority: string): string => {
  return (
    PARTICIPANT_PRIORITY_COLORS[priority as keyof typeof PARTICIPANT_PRIORITY_COLORS] || '#6B7280'
  );
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট স্ট্যাটাসের লেবেল পান
export const getParticipantStatusLabel = (status: string): string => {
  return PARTICIPANT_STATUS_LABELS[status as keyof typeof PARTICIPANT_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট স্ট্যাটাসের কালার পান
export const getParticipantStatusColor = (status: string): string => {
  return PARTICIPANT_STATUS_COLORS[status as keyof typeof PARTICIPANT_STATUS_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট রোলের লেবেল পান
export const getParticipantRoleLabel = (role: string): string => {
  return PARTICIPANT_ROLE_LABELS[role as keyof typeof PARTICIPANT_ROLE_LABELS] || role;
};

// হেল্পার ফাংশন: পার্টিসিপেন্ট রোলের কালার পান
export const getParticipantRoleColor = (role: string): string => {
  return PARTICIPANT_ROLE_COLORS[role as keyof typeof PARTICIPANT_ROLE_COLORS] || '#6B7280';
};
