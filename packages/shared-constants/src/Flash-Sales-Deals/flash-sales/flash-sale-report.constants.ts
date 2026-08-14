/**
 * Flash Sale Report Constants
 * রিপোর্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট রিপোর্ট টাইপ
export const DEFAULT_REPORT_TYPE = {
  sales: 'sales',
  revenue: 'revenue',
  participants: 'participants',
  products: 'products',
  conversion: 'conversion',
  performance: 'performance',
};

// ডিফল্ট টাইম রেঞ্জ (দিনে)
export const DEFAULT_REPORT_TIME_RANGE = 30;

// ডিফল্ট ফরম্যাট
export const DEFAULT_REPORT_FORMAT = {
  pdf: 'pdf',
  excel: 'excel',
  csv: 'csv',
  json: 'json',
  html: 'html',
};

// ডিফল্ট ডেলিভারি মেথড
export const DEFAULT_DELIVERY_METHOD = {
  email: 'email',
  download: 'download',
  api: 'api',
  ftp: 'ftp',
};

// রিপোর্ট জেনারেশন টাইমআউট (মিলিসেকেন্ডে)
export const REPORT_GENERATION_TIMEOUT = 300000; // ৫ মিনিট

// ডিফল্ট রিপোর্ট সাইজ (রেকর্ড সংখ্যা)
export const DEFAULT_REPORT_SIZE = 1000;

// ক্যাশ সেটিংস
export const REPORT_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 100,
  enabled: true,
};

// ডিফল্ট পেজিনেশন
export const REPORT_PAGINATION_SIZE = 10;

// ডিফল্ট সর্টিং
export const DEFAULT_REPORT_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const REPORT_API_RESPONSE_LIMIT = 100;

// রিপোর্ট স্ট্যাটাস
export const REPORT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// রিপোর্ট কনফিগারেশন ইন্টারফেস
export interface FlashSaleReportConfig {
  defaultReportTypes: {
    sales: string;
    revenue: string;
    participants: string;
    products: string;
    conversion: string;
    performance: string;
  };
  defaultTimeRange: number;
  defaultFormats: {
    pdf: string;
    excel: string;
    csv: string;
    json: string;
    html: string;
  };
  defaultDeliveryMethods: {
    email: string;
    download: string;
    api: string;
    ftp: string;
  };
  generationTimeout: number;
  defaultSize: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট রিপোর্ট কনফিগারেশন
export const DEFAULT_REPORT_CONFIG: FlashSaleReportConfig = {
  defaultReportTypes: DEFAULT_REPORT_TYPE,
  defaultTimeRange: DEFAULT_REPORT_TIME_RANGE,
  defaultFormats: DEFAULT_REPORT_FORMAT,
  defaultDeliveryMethods: DEFAULT_DELIVERY_METHOD,
  generationTimeout: REPORT_GENERATION_TIMEOUT,
  defaultSize: DEFAULT_REPORT_SIZE,
  cacheSettings: REPORT_CACHE_SETTINGS,
  paginationSize: REPORT_PAGINATION_SIZE,
  defaultSorting: DEFAULT_REPORT_SORTING,
  apiResponseLimit: REPORT_API_RESPONSE_LIMIT,
};

// রিপোর্ট টাইপের লেবেল
export const REPORT_TYPE_LABELS: Record<
  (typeof DEFAULT_REPORT_TYPE)[keyof typeof DEFAULT_REPORT_TYPE],
  string
> = {
  sales: 'বিক্রয় রিপোর্ট',
  revenue: 'রাজস্ব রিপোর্ট',
  participants: 'অংশগ্রহণকারী রিপোর্ট',
  products: 'পণ্য রিপোর্ট',
  conversion: 'কনভার্সন রিপোর্ট',
  performance: 'পারফরম্যান্স রিপোর্ট',
};

// রিপোর্ট ফরম্যাটের লেবেল
export const REPORT_FORMAT_LABELS: Record<
  (typeof DEFAULT_REPORT_FORMAT)[keyof typeof DEFAULT_REPORT_FORMAT],
  string
> = {
  pdf: 'PDF',
  excel: 'Excel',
  csv: 'CSV',
  json: 'JSON',
  html: 'HTML',
};

// রিপোর্ট ডেলিভারি মেথডের লেবেল
export const DELIVERY_METHOD_LABELS: Record<
  (typeof DEFAULT_DELIVERY_METHOD)[keyof typeof DEFAULT_DELIVERY_METHOD],
  string
> = {
  email: 'ইমেইল',
  download: 'ডাউনলোড',
  api: 'API',
  ftp: 'FTP',
};

// রিপোর্ট স্ট্যাটাসের লেবেল
export const REPORT_STATUS_LABELS: Record<
  (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS],
  string
> = {
  pending: 'অপেক্ষমান',
  processing: 'প্রক্রিয়াকরণ',
  completed: 'সম্পন্ন',
  failed: 'ব্যর্থ',
  cancelled: 'বাতিলকৃত',
};

// রিপোর্ট স্ট্যাটাসের কালার
export const REPORT_STATUS_COLORS: Record<
  (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS],
  string
> = {
  pending: '#FCD34D',
  processing: '#3B82F6',
  completed: '#22C55E',
  failed: '#EF4444',
  cancelled: '#6B7280',
};

// হেল্পার ফাংশন: রিপোর্ট টাইপ ভ্যালিড কিনা চেক করুন
export const isValidReportType = (
  type: string
): type is (typeof DEFAULT_REPORT_TYPE)[keyof typeof DEFAULT_REPORT_TYPE] => {
  return Object.values(DEFAULT_REPORT_TYPE).includes(
    type as (typeof DEFAULT_REPORT_TYPE)[keyof typeof DEFAULT_REPORT_TYPE]
  );
};

// হেল্পার ফাংশন: রিপোর্ট ফরম্যাট ভ্যালিড কিনা চেক করুন
export const isValidReportFormat = (
  format: string
): format is (typeof DEFAULT_REPORT_FORMAT)[keyof typeof DEFAULT_REPORT_FORMAT] => {
  return Object.values(DEFAULT_REPORT_FORMAT).includes(
    format as (typeof DEFAULT_REPORT_FORMAT)[keyof typeof DEFAULT_REPORT_FORMAT]
  );
};

// হেল্পার ফাংশন: ডেলিভারি মেথড ভ্যালিড কিনা চেক করুন
export const isValidDeliveryMethod = (
  method: string
): method is (typeof DEFAULT_DELIVERY_METHOD)[keyof typeof DEFAULT_DELIVERY_METHOD] => {
  return Object.values(DEFAULT_DELIVERY_METHOD).includes(
    method as (typeof DEFAULT_DELIVERY_METHOD)[keyof typeof DEFAULT_DELIVERY_METHOD]
  );
};

// হেল্পার ফাংশন: রিপোর্ট স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidReportStatus = (
  status: string
): status is (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS] => {
  return Object.values(REPORT_STATUS).includes(
    status as (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS]
  );
};

// হেল্পার ফাংশন: রিপোর্ট টাইম রেঞ্জ ভ্যালিড কিনা চেক করুন
export const isValidReportTimeRange = (range: number): boolean => {
  return range >= 1 && range <= 365;
};

// হেল্পার ফাংশন: রিপোর্ট টাইপের লেবেল পান
export const getReportTypeLabel = (type: string): string => {
  return REPORT_TYPE_LABELS[type as keyof typeof REPORT_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: রিপোর্ট ফরম্যাটের লেবেল পান
export const getReportFormatLabel = (format: string): string => {
  return REPORT_FORMAT_LABELS[format as keyof typeof REPORT_FORMAT_LABELS] || format;
};

// হেল্পার ফাংশন: ডেলিভারি মেথডের লেবেল পান
export const getDeliveryMethodLabel = (method: string): string => {
  return DELIVERY_METHOD_LABELS[method as keyof typeof DELIVERY_METHOD_LABELS] || method;
};

// হেল্পার ফাংশন: রিপোর্ট স্ট্যাটাসের লেবেল পান
export const getReportStatusLabel = (status: string): string => {
  return REPORT_STATUS_LABELS[status as keyof typeof REPORT_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: রিপোর্ট স্ট্যাটাসের কালার পান
export const getReportStatusColor = (status: string): string => {
  return REPORT_STATUS_COLORS[status as keyof typeof REPORT_STATUS_COLORS] || '#6B7280';
};
