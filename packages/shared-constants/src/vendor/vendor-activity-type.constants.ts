/**
 * অ্যাক্টিভিটির প্রকারভেদ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি অবজেক্ট
 */
export const ActivityTypeCategory = {
  BUSINESS: 'BUSINESS',
  ADMINISTRATIVE: 'ADMINISTRATIVE',
  SECURITY: 'SECURITY',
  SYSTEM: 'SYSTEM',
  COMMUNICATION: 'COMMUNICATION',
  FINANCIAL: 'FINANCIAL',
} as const;

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type ActivityTypeCategoryValue =
  (typeof ActivityTypeCategory)[keyof typeof ActivityTypeCategory];

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি লেবেলসমূহ
 */
export const ActivityTypeCategoryLabels: Record<
  ActivityTypeCategoryValue,
  { en: string; bn: string }
> = {
  [ActivityTypeCategory.BUSINESS]: {
    en: 'Business',
    bn: 'ব্যবসা',
  },
  [ActivityTypeCategory.ADMINISTRATIVE]: {
    en: 'Administrative',
    bn: 'প্রশাসনিক',
  },
  [ActivityTypeCategory.SECURITY]: {
    en: 'Security',
    bn: 'নিরাপত্তা',
  },
  [ActivityTypeCategory.SYSTEM]: {
    en: 'System',
    bn: 'সিস্টেম',
  },
  [ActivityTypeCategory.COMMUNICATION]: {
    en: 'Communication',
    bn: 'যোগাযোগ',
  },
  [ActivityTypeCategory.FINANCIAL]: {
    en: 'Financial',
    bn: 'আর্থিক',
  },
};

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি রঙ কোডসমূহ
 */
export const ActivityTypeCategoryColors: Record<ActivityTypeCategoryValue, string> = {
  [ActivityTypeCategory.BUSINESS]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ActivityTypeCategory.ADMINISTRATIVE]: 'bg-purple-100 text-purple-800 border-purple-300',
  [ActivityTypeCategory.SECURITY]: 'bg-red-100 text-red-800 border-red-300',
  [ActivityTypeCategory.SYSTEM]: 'bg-gray-100 text-gray-800 border-gray-300',
  [ActivityTypeCategory.COMMUNICATION]: 'bg-green-100 text-green-800 border-green-300',
  [ActivityTypeCategory.FINANCIAL]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি আইকন ম্যাপিং
 */
export const ActivityTypeCategoryIcons: Record<ActivityTypeCategoryValue, string> = {
  [ActivityTypeCategory.BUSINESS]: 'briefcase',
  [ActivityTypeCategory.ADMINISTRATIVE]: 'settings',
  [ActivityTypeCategory.SECURITY]: 'shield',
  [ActivityTypeCategory.SYSTEM]: 'server',
  [ActivityTypeCategory.COMMUNICATION]: 'message-square',
  [ActivityTypeCategory.FINANCIAL]: 'dollar-sign',
};

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি বিবরণসমূহ
 */
export const ActivityTypeCategoryDescriptions: Record<ActivityTypeCategoryValue, string> = {
  [ActivityTypeCategory.BUSINESS]: 'Business-related activities such as orders, products, etc.',
  [ActivityTypeCategory.ADMINISTRATIVE]:
    'Administrative activities like profile updates, settings changes',
  [ActivityTypeCategory.SECURITY]: 'Security-related activities like logins, permission changes',
  [ActivityTypeCategory.SYSTEM]: 'System-generated activities and automated processes',
  [ActivityTypeCategory.COMMUNICATION]: 'Communication activities like tickets, messages',
  [ActivityTypeCategory.FINANCIAL]: 'Financial activities like payments, payouts, invoices',
};

/**
 * অ্যাক্টিভিটি টাইপ ট্র্যাকিং রুলস
 */
export const ActivityTypeTrackingRules: Record<
  ActivityTypeCategoryValue,
  {
    enabled: boolean;
    retentionDays: number;
    requiredActions: string[];
    notifyOnAnomaly: boolean;
  }
> = {
  [ActivityTypeCategory.BUSINESS]: {
    enabled: true,
    retentionDays: 90,
    requiredActions: ['create', 'update', 'delete'],
    notifyOnAnomaly: true,
  },
  [ActivityTypeCategory.ADMINISTRATIVE]: {
    enabled: true,
    retentionDays: 180,
    requiredActions: ['update', 'delete'],
    notifyOnAnomaly: true,
  },
  [ActivityTypeCategory.SECURITY]: {
    enabled: true,
    retentionDays: 365,
    requiredActions: ['create', 'update', 'delete'],
    notifyOnAnomaly: true,
  },
  [ActivityTypeCategory.SYSTEM]: {
    enabled: true,
    retentionDays: 30,
    requiredActions: ['create', 'update'],
    notifyOnAnomaly: false,
  },
  [ActivityTypeCategory.COMMUNICATION]: {
    enabled: true,
    retentionDays: 60,
    requiredActions: ['create', 'update'],
    notifyOnAnomaly: false,
  },
  [ActivityTypeCategory.FINANCIAL]: {
    enabled: true,
    retentionDays: 365,
    requiredActions: ['create', 'update', 'delete'],
    notifyOnAnomaly: true,
  },
};

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি ক্যাশে টিটিএল (সেকেন্ড)
 */
export const ActivityTypeCategoryCacheTTL = 600;

/**
 * অ্যাক্টিভিটি টাইপ ক্যাটাগরি অডিট লগ রিটেনশন (দিন)
 */
export const ActivityTypeCategoryAuditRetentionDays = 365;
