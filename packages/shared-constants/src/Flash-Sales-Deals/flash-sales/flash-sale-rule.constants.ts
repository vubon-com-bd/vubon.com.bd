/**
 * Flash Sale Rule Constants
 * ফ্ল্যাশ সেল রুল সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট রুল টাইপ
export const DEFAULT_RULE_TYPE = {
  discount: 'discount',
  quantity: 'quantity',
  time: 'time',
  user: 'user',
  product: 'product',
  category: 'category',
  bundle: 'bundle',
  coupon: 'coupon',
};

// মিনিমাম রুল কন্ডিশন
export const MINIMUM_RULE_CONDITIONS = 1;

// ম্যাক্সিমাম রুল কন্ডিশন
export const MAXIMUM_RULE_CONDITIONS = 10;

// ডিফল্ট রুল প্রায়োরিটি
export const DEFAULT_RULE_PRIORITY = 1;

// ক্যাশ সেটিংস
export const RULE_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 1000,
  enabled: true,
};

// রুল ভ্যালিডেশন টাইমআউট (মিলিসেকেন্ডে)
export const RULE_VALIDATION_TIMEOUT = 5000; // ৫ সেকেন্ড

// ডিফল্ট পেজিনেশন
export const RULE_PAGINATION_SIZE = 10;

// রুল এক্সিকিউশন মোড
export const RULE_EXECUTION_MODE = {
  sync: 'sync',
  async: 'async',
  batch: 'batch',
};

// ডিফল্ট সর্টিং
export const DEFAULT_RULE_SORTING = {
  field: 'priority',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const RULE_API_RESPONSE_LIMIT = 100;

// রুল স্ট্যাটাস
export const RULE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// রুল কন্ডিশন অপারেটর
export const RULE_CONDITION_OPERATOR = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  GREATER_THAN_OR_EQUALS: 'greater_than_or_equals',
  LESS_THAN_OR_EQUALS: 'less_than_or_equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
  STARTS_WITH: 'starts_with',
  ENDS_WITH: 'ends_with',
  BETWEEN: 'between',
  IN: 'in',
  NOT_IN: 'not_in',
} as const;

// রুল কনফিগারেশন ইন্টারফেস
export interface FlashSaleRuleConfig {
  defaultRuleTypes: {
    discount: string;
    quantity: string;
    time: string;
    user: string;
    product: string;
    category: string;
    bundle: string;
    coupon: string;
  };
  minConditions: number;
  maxConditions: number;
  defaultPriority: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  validationTimeout: number;
  paginationSize: number;
  executionModes: {
    sync: string;
    async: string;
    batch: string;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট রুল কনফিগারেশন
export const DEFAULT_RULE_CONFIG: FlashSaleRuleConfig = {
  defaultRuleTypes: DEFAULT_RULE_TYPE,
  minConditions: MINIMUM_RULE_CONDITIONS,
  maxConditions: MAXIMUM_RULE_CONDITIONS,
  defaultPriority: DEFAULT_RULE_PRIORITY,
  cacheSettings: RULE_CACHE_SETTINGS,
  validationTimeout: RULE_VALIDATION_TIMEOUT,
  paginationSize: RULE_PAGINATION_SIZE,
  executionModes: RULE_EXECUTION_MODE,
  defaultSorting: DEFAULT_RULE_SORTING,
  apiResponseLimit: RULE_API_RESPONSE_LIMIT,
};

// রুল টাইপের লেবেল
export const RULE_TYPE_LABELS: Record<
  (typeof DEFAULT_RULE_TYPE)[keyof typeof DEFAULT_RULE_TYPE],
  string
> = {
  discount: 'ডিসকাউন্ট রুল',
  quantity: 'পরিমাণ রুল',
  time: 'সময় রুল',
  user: 'ব্যবহারকারী রুল',
  product: 'পণ্য রুল',
  category: 'ক্যাটাগরি রুল',
  bundle: 'বান্ডেল রুল',
  coupon: 'কুপন রুল',
};

// রুল টাইপের আইকন
export const RULE_TYPE_ICONS: Record<
  (typeof DEFAULT_RULE_TYPE)[keyof typeof DEFAULT_RULE_TYPE],
  string
> = {
  discount: 'Percent',
  quantity: 'Package',
  time: 'Clock',
  user: 'User',
  product: 'Box',
  category: 'Folder',
  bundle: 'Layers',
  coupon: 'Ticket',
};

// রুল স্ট্যাটাসের লেবেল
export const RULE_STATUS_LABELS: Record<(typeof RULE_STATUS)[keyof typeof RULE_STATUS], string> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  draft: 'খসড়া',
  archived: 'আর্কাইভড',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
};

// রুল স্ট্যাটাসের কালার
export const RULE_STATUS_COLORS: Record<(typeof RULE_STATUS)[keyof typeof RULE_STATUS], string> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  draft: '#FCD34D',
  archived: '#6B7280',
  pending: '#F59E0B',
  approved: '#34D399',
  rejected: '#F87171',
};

// কন্ডিশন অপারেটরের লেবেল
export const CONDITION_OPERATOR_LABELS: Record<
  (typeof RULE_CONDITION_OPERATOR)[keyof typeof RULE_CONDITION_OPERATOR],
  string
> = {
  equals: 'সমান',
  not_equals: 'সমান নয়',
  greater_than: 'এর চেয়ে বড়',
  less_than: 'এর চেয়ে ছোট',
  greater_than_or_equals: 'এর চেয়ে বড় বা সমান',
  less_than_or_equals: 'এর চেয়ে ছোট বা সমান',
  contains: 'ধারণ করে',
  not_contains: 'ধারণ করে না',
  starts_with: 'দিয়ে শুরু',
  ends_with: 'দিয়ে শেষ',
  between: 'এর মধ্যে',
  in: 'এর মধ্যে (তালিকা)',
  not_in: 'এর মধ্যে নয় (তালিকা)',
};

// এক্সিকিউশন মোডের লেবেল
export const EXECUTION_MODE_LABELS: Record<
  (typeof RULE_EXECUTION_MODE)[keyof typeof RULE_EXECUTION_MODE],
  string
> = {
  sync: 'সিঙ্ক্রোনাস',
  async: 'অ্যাসিঙ্ক্রোনাস',
  batch: 'ব্যাচ',
};

// হেল্পার ফাংশন: রুল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidRuleType = (
  type: string
): type is (typeof DEFAULT_RULE_TYPE)[keyof typeof DEFAULT_RULE_TYPE] => {
  return Object.values(DEFAULT_RULE_TYPE).includes(
    type as (typeof DEFAULT_RULE_TYPE)[keyof typeof DEFAULT_RULE_TYPE]
  );
};

// হেল্পার ফাংশন: রুল স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidRuleStatus = (
  status: string
): status is (typeof RULE_STATUS)[keyof typeof RULE_STATUS] => {
  return Object.values(RULE_STATUS).includes(
    status as (typeof RULE_STATUS)[keyof typeof RULE_STATUS]
  );
};

// হেল্পার ফাংশন: কন্ডিশন অপারেটর ভ্যালিড কিনা চেক করুন
export const isValidConditionOperator = (
  operator: string
): operator is (typeof RULE_CONDITION_OPERATOR)[keyof typeof RULE_CONDITION_OPERATOR] => {
  return Object.values(RULE_CONDITION_OPERATOR).includes(
    operator as (typeof RULE_CONDITION_OPERATOR)[keyof typeof RULE_CONDITION_OPERATOR]
  );
};

// হেল্পার ফাংশন: এক্সিকিউশন মোড ভ্যালিড কিনা চেক করুন
export const isValidExecutionMode = (
  mode: string
): mode is (typeof RULE_EXECUTION_MODE)[keyof typeof RULE_EXECUTION_MODE] => {
  return Object.values(RULE_EXECUTION_MODE).includes(
    mode as (typeof RULE_EXECUTION_MODE)[keyof typeof RULE_EXECUTION_MODE]
  );
};

// হেল্পার ফাংশন: রুল কন্ডিশন কাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidRuleConditionCount = (count: number): boolean => {
  return count >= MINIMUM_RULE_CONDITIONS && count <= MAXIMUM_RULE_CONDITIONS;
};

// হেল্পার ফাংশন: রুল টাইপের লেবেল পান
export const getRuleTypeLabel = (type: string): string => {
  return RULE_TYPE_LABELS[type as keyof typeof RULE_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: রুল টাইপের আইকন পান
export const getRuleTypeIcon = (type: string): string => {
  return RULE_TYPE_ICONS[type as keyof typeof RULE_TYPE_ICONS] || 'Circle';
};

// হেল্পার ফাংশন: রুল স্ট্যাটাসের লেবেল পান
export const getRuleStatusLabel = (status: string): string => {
  return RULE_STATUS_LABELS[status as keyof typeof RULE_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: রুল স্ট্যাটাসের কালার পান
export const getRuleStatusColor = (status: string): string => {
  return RULE_STATUS_COLORS[status as keyof typeof RULE_STATUS_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: কন্ডিশন অপারেটরের লেবেল পান
export const getConditionOperatorLabel = (operator: string): string => {
  return CONDITION_OPERATOR_LABELS[operator as keyof typeof CONDITION_OPERATOR_LABELS] || operator;
};

// হেল্পার ফাংশন: এক্সিকিউশন মোডের লেবেল পান
export const getExecutionModeLabel = (mode: string): string => {
  return EXECUTION_MODE_LABELS[mode as keyof typeof EXECUTION_MODE_LABELS] || mode;
};
