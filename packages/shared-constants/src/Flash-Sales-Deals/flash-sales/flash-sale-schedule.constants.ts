/**
 * Flash Sale Schedule Constants
 * ফ্ল্যাশ সেল শিডিউল সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট শিডিউল টাইম
export const DEFAULT_SCHEDULE_TIME = '09:00';

// মিনিমাম শিডিউল গ্যাপ (মিনিটে)
export const MINIMUM_SCHEDULE_GAP = 30;

// ম্যাক্সিমাম শিডিউল গ্যাপ (মিনিটে)
export const MAXIMUM_SCHEDULE_GAP = 1440;

// ডিফল্ট ডিউরেশন (মিনিটে)
export const DEFAULT_SCHEDULE_DURATION = 60;

// শিডিউল স্লট সাইজ (মিনিটে)
export const SCHEDULE_SLOT_SIZE = 15;

// ডিফল্ট টাইমজোন
export const DEFAULT_TIMEZONE = 'Asia/Dhaka';

// ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const SCHEDULE_CACHE_TIMEOUT = 300000;

// ডিফল্ট রিকারিং প্যাটার্ন
export const DEFAULT_RECURRING_PATTERN = {
  type: 'daily',
  interval: 1,
} as const;

// পেজিনেশন সাইজ
export const SCHEDULE_PAGINATION_SIZE = 10;

// ডিফল্ট সর্টিং
export const DEFAULT_SCHEDULE_SORTING = {
  field: 'startTime',
  order: 'asc' as const,
};

// API রেসপন্স লিমিট
export const SCHEDULE_API_RESPONSE_LIMIT = 100;

// শিডিউল স্ট্যাটাস
export const SCHEDULE_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// রিকারিং টাইপ
export const RECURRING_TYPE = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
} as const;

// শিডিউল কনফিগারেশন ইন্টারফেস
export interface FlashSaleScheduleConfig {
  defaultScheduleTime: string;
  minScheduleGap: number;
  maxScheduleGap: number;
  defaultDuration: number;
  scheduleSlotSize: number;
  defaultTimezone: string;
  cacheTimeout: number;
  defaultRecurringPattern: {
    type: string;
    interval: number;
  };
  paginationSize: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট শিডিউল কনফিগারেশন
export const DEFAULT_SCHEDULE_CONFIG: FlashSaleScheduleConfig = {
  defaultScheduleTime: DEFAULT_SCHEDULE_TIME,
  minScheduleGap: MINIMUM_SCHEDULE_GAP,
  maxScheduleGap: MAXIMUM_SCHEDULE_GAP,
  defaultDuration: DEFAULT_SCHEDULE_DURATION,
  scheduleSlotSize: SCHEDULE_SLOT_SIZE,
  defaultTimezone: DEFAULT_TIMEZONE,
  cacheTimeout: SCHEDULE_CACHE_TIMEOUT,
  defaultRecurringPattern: DEFAULT_RECURRING_PATTERN,
  paginationSize: SCHEDULE_PAGINATION_SIZE,
  defaultSorting: DEFAULT_SCHEDULE_SORTING,
  apiResponseLimit: SCHEDULE_API_RESPONSE_LIMIT,
};

// শিডিউল স্ট্যাটাসের লেবেল
export const SCHEDULE_STATUS_LABELS: Record<
  (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS],
  string
> = {
  pending: 'অপেক্ষমান',
  active: 'সক্রিয়',
  completed: 'সম্পন্ন',
  cancelled: 'বাতিলকৃত',
  expired: 'মেয়াদোত্তীর্ণ',
};

// শিডিউল স্ট্যাটাসের কালার
export const SCHEDULE_STATUS_COLORS: Record<
  (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS],
  string
> = {
  pending: '#FCD34D',
  active: '#22C55E',
  completed: '#3B82F6',
  cancelled: '#EF4444',
  expired: '#F97316',
};

// রিকারিং টাইপের লেবেল
export const RECURRING_TYPE_LABELS: Record<
  (typeof RECURRING_TYPE)[keyof typeof RECURRING_TYPE],
  string
> = {
  none: 'কোনোটিই নয়',
  daily: 'দৈনিক',
  weekly: 'সাপ্তাহিক',
  monthly: 'মাসিক',
  custom: 'কাস্টম',
};

// হেল্পার ফাংশন: শিডিউল গ্যাপ ভ্যালিড কিনা চেক করুন
export const isValidScheduleGap = (gap: number): boolean => {
  return gap >= MINIMUM_SCHEDULE_GAP && gap <= MAXIMUM_SCHEDULE_GAP;
};

// হেল্পার ফাংশন: শিডিউল ডিউরেশন ভ্যালিড কিনা চেক করুন
export const isValidScheduleDuration = (duration: number): boolean => {
  return duration >= 30 && duration <= 1440;
};

// হেল্পার ফাংশন: শিডিউল স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidScheduleStatus = (
  status: string
): status is (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS] => {
  return Object.values(SCHEDULE_STATUS).includes(
    status as (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS]
  );
};

// হেল্পার ফাংশন: রিকারিং টাইপ ভ্যালিড কিনা চেক করুন
export const isValidRecurringType = (
  type: string
): type is (typeof RECURRING_TYPE)[keyof typeof RECURRING_TYPE] => {
  return Object.values(RECURRING_TYPE).includes(
    type as (typeof RECURRING_TYPE)[keyof typeof RECURRING_TYPE]
  );
};

// হেল্পার ফাংশন: শিডিউল সময় ফরম্যাট চেক করুন
export const isValidScheduleTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// হেল্পার ফাংশন: শিডিউল স্লট গণনা করুন
export const calculateScheduleSlots = (startTime: string, endTime: string): number => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const diff = (end.getTime() - start.getTime()) / (1000 * 60);
  return Math.floor(diff / SCHEDULE_SLOT_SIZE);
};

// হেল্পার ফাংশন: শিডিউল স্ট্যাটাসের লেবেল পান
export const getScheduleStatusLabel = (status: string): string => {
  return SCHEDULE_STATUS_LABELS[status as keyof typeof SCHEDULE_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: শিডিউল স্ট্যাটাসের কালার পান
export const getScheduleStatusColor = (status: string): string => {
  return SCHEDULE_STATUS_COLORS[status as keyof typeof SCHEDULE_STATUS_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: রিকারিং টাইপের লেবেল পান
export const getRecurringTypeLabel = (type: string): string => {
  return RECURRING_TYPE_LABELS[type as keyof typeof RECURRING_TYPE_LABELS] || type;
};
