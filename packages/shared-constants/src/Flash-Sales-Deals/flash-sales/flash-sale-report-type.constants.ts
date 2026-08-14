/**
 * Flash Sale Report Type Constants
 * রিপোর্টের প্রকারভেদ
 */

// রিপোর্ট টাইপ এনাম
export const REPORT_TYPE = {
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  SALES: 'sales',
  PARTICIPANT: 'participant',
  PERFORMANCE: 'performance',
  FINANCIAL: 'financial',
  MARKETING: 'marketing',
  OPERATIONAL: 'operational',
  CUSTOM: 'custom',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  EXECUTIVE: 'executive',
  ANALYTICAL: 'analytical',
  COMPARATIVE: 'comparative',
  PREDICTIVE: 'predictive',
} as const;

// রিপোর্ট ফরম্যাট এনাম
export const REPORT_FORMAT = {
  EXCEL: 'excel',
  PDF: 'pdf',
  CSV: 'csv',
  JSON: 'json',
} as const;

// রিপোর্ট টাইপ টাইপ
export type ReportType = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];

// রিপোর্ট ফরম্যাট টাইপ
export type ReportFormat = (typeof REPORT_FORMAT)[keyof typeof REPORT_FORMAT];

// রিপোর্ট টাইপের লেবেল
export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  summary: 'সারাংশ রিপোর্ট',
  detailed: 'বিস্তারিত রিপোর্ট',
  sales: 'বিক্রয় রিপোর্ট',
  participant: 'অংশগ্রহণকারী রিপোর্ট',
  performance: 'পারফরম্যান্স রিপোর্ট',
  financial: 'আর্থিক রিপোর্ট',
  marketing: 'মার্কেটিং রিপোর্ট',
  operational: 'অপারেশনাল রিপোর্ট',
  custom: 'কাস্টম রিপোর্ট',
  daily: 'দৈনিক রিপোর্ট',
  weekly: 'সাপ্তাহিক রিপোর্ট',
  monthly: 'মাসিক রিপোর্ট',
  quarterly: 'ত্রৈমাসিক রিপোর্ট',
  yearly: 'বার্ষিক রিপোর্ট',
  executive: 'এক্সিকিউটিভ রিপোর্ট',
  analytical: 'বিশ্লেষণমূলক রিপোর্ট',
  comparative: 'তুলনামূলক রিপোর্ট',
  predictive: 'ভবিষ্যদ্বাণীমূলক রিপোর্ট',
};

// রিপোর্ট টাইপের বিবরণ
export const REPORT_TYPE_DESCRIPTIONS: Record<ReportType, string> = {
  summary: 'সম্মিলিত সারাংশ রিপোর্ট',
  detailed: 'বিস্তারিত সকল তথ্য সহ রিপোর্ট',
  sales: 'বিক্রয় সংক্রান্ত রিপোর্ট',
  participant: 'অংশগ্রহণকারীদের রিপোর্ট',
  performance: 'পারফরম্যান্স মূল্যায়ন রিপোর্ট',
  financial: 'আর্থিক লেনদেনের রিপোর্ট',
  marketing: 'মার্কেটিং কার্যক্রমের রিপোর্ট',
  operational: 'অপারেশনাল কার্যক্রমের রিপোর্ট',
  custom: 'কাস্টমাইজড রিপোর্ট',
  daily: 'দৈনিক কার্যক্রমের রিপোর্ট',
  weekly: 'সাপ্তাহিক কার্যক্রমের রিপোর্ট',
  monthly: 'মাসিক কার্যক্রমের রিপোর্ট',
  quarterly: 'ত্রৈমাসিক কার্যক্রমের রিপোর্ট',
  yearly: 'বার্ষিক কার্যক্রমের রিপোর্ট',
  executive: 'এক্সিকিউটিভদের জন্য রিপোর্ট',
  analytical: 'বিশ্লেষণ ভিত্তিক রিপোর্ট',
  comparative: 'তুলনামূলক বিশ্লেষণ রিপোর্ট',
  predictive: 'ভবিষ্যৎ পূর্বাভাস রিপোর্ট',
};

// রিপোর্ট টাইপের আইকন
export const REPORT_TYPE_ICONS: Record<ReportType, string> = {
  summary: 'FileText',
  detailed: 'File',
  sales: 'DollarSign',
  participant: 'Users',
  performance: 'BarChart',
  financial: 'Wallet',
  marketing: 'Megaphone',
  operational: 'Settings',
  custom: 'Sliders',
  daily: 'Sun',
  weekly: 'Calendar',
  monthly: 'CalendarDays',
  quarterly: 'Calendar',
  yearly: 'Calendar',
  executive: 'Briefcase',
  analytical: 'LineChart',
  comparative: 'GitCompare',
  predictive: 'TrendingUp',
};

// রিপোর্ট টাইপের কালার
export const REPORT_TYPE_COLORS: Record<ReportType, string> = {
  summary: '#3B82F6',
  detailed: '#8B5CF6',
  sales: '#22C55E',
  participant: '#F59E0B',
  performance: '#EC4899',
  financial: '#06B6D4',
  marketing: '#F97316',
  operational: '#6366F1',
  custom: '#8B5CF6',
  daily: '#F59E0B',
  weekly: '#3B82F6',
  monthly: '#8B5CF6',
  quarterly: '#EC4899',
  yearly: '#EF4444',
  executive: '#1F2937',
  analytical: '#14B8A6',
  comparative: '#FBBF24',
  predictive: '#10B981',
};

// রিপোর্ট ফরম্যাটের লেবেল
export const REPORT_FORMAT_LABELS: Record<ReportFormat, string> = {
  excel: 'Excel',
  pdf: 'PDF',
  csv: 'CSV',
  json: 'JSON',
};

// রিপোর্ট টাইপ গ্রুপ
export const REPORT_TYPE_GROUPS = {
  SUMMARY_TYPE: ['summary', 'detailed', 'executive'] as ReportType[],
  SALES_TYPE: ['sales', 'financial'] as ReportType[],
  ANALYTICAL_TYPE: ['performance', 'analytical', 'comparative', 'predictive'] as ReportType[],
  TIME_BASED: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as ReportType[],
  OTHER: ['participant', 'marketing', 'operational', 'custom'] as ReportType[],
} as const;

// রিপোর্ট টাইপ কনফিগারেশন ইন্টারফেস
export interface ReportTypeConfig {
  type: ReportType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ রিপোর্ট টাইপ কনফিগারেশন
export const REPORT_TYPE_CONFIGS: Record<ReportType, ReportTypeConfig> = {
  summary: {
    type: 'summary',
    label: REPORT_TYPE_LABELS.summary,
    description: REPORT_TYPE_DESCRIPTIONS.summary,
    icon: REPORT_TYPE_ICONS.summary,
    color: REPORT_TYPE_COLORS.summary,
    isActive: true,
  },
  detailed: {
    type: 'detailed',
    label: REPORT_TYPE_LABELS.detailed,
    description: REPORT_TYPE_DESCRIPTIONS.detailed,
    icon: REPORT_TYPE_ICONS.detailed,
    color: REPORT_TYPE_COLORS.detailed,
    isActive: true,
  },
  sales: {
    type: 'sales',
    label: REPORT_TYPE_LABELS.sales,
    description: REPORT_TYPE_DESCRIPTIONS.sales,
    icon: REPORT_TYPE_ICONS.sales,
    color: REPORT_TYPE_COLORS.sales,
    isActive: true,
  },
  participant: {
    type: 'participant',
    label: REPORT_TYPE_LABELS.participant,
    description: REPORT_TYPE_DESCRIPTIONS.participant,
    icon: REPORT_TYPE_ICONS.participant,
    color: REPORT_TYPE_COLORS.participant,
    isActive: true,
  },
  performance: {
    type: 'performance',
    label: REPORT_TYPE_LABELS.performance,
    description: REPORT_TYPE_DESCRIPTIONS.performance,
    icon: REPORT_TYPE_ICONS.performance,
    color: REPORT_TYPE_COLORS.performance,
    isActive: true,
  },
  financial: {
    type: 'financial',
    label: REPORT_TYPE_LABELS.financial,
    description: REPORT_TYPE_DESCRIPTIONS.financial,
    icon: REPORT_TYPE_ICONS.financial,
    color: REPORT_TYPE_COLORS.financial,
    isActive: true,
  },
  marketing: {
    type: 'marketing',
    label: REPORT_TYPE_LABELS.marketing,
    description: REPORT_TYPE_DESCRIPTIONS.marketing,
    icon: REPORT_TYPE_ICONS.marketing,
    color: REPORT_TYPE_COLORS.marketing,
    isActive: true,
  },
  operational: {
    type: 'operational',
    label: REPORT_TYPE_LABELS.operational,
    description: REPORT_TYPE_DESCRIPTIONS.operational,
    icon: REPORT_TYPE_ICONS.operational,
    color: REPORT_TYPE_COLORS.operational,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: REPORT_TYPE_LABELS.custom,
    description: REPORT_TYPE_DESCRIPTIONS.custom,
    icon: REPORT_TYPE_ICONS.custom,
    color: REPORT_TYPE_COLORS.custom,
    isActive: true,
  },
  daily: {
    type: 'daily',
    label: REPORT_TYPE_LABELS.daily,
    description: REPORT_TYPE_DESCRIPTIONS.daily,
    icon: REPORT_TYPE_ICONS.daily,
    color: REPORT_TYPE_COLORS.daily,
    isActive: true,
  },
  weekly: {
    type: 'weekly',
    label: REPORT_TYPE_LABELS.weekly,
    description: REPORT_TYPE_DESCRIPTIONS.weekly,
    icon: REPORT_TYPE_ICONS.weekly,
    color: REPORT_TYPE_COLORS.weekly,
    isActive: true,
  },
  monthly: {
    type: 'monthly',
    label: REPORT_TYPE_LABELS.monthly,
    description: REPORT_TYPE_DESCRIPTIONS.monthly,
    icon: REPORT_TYPE_ICONS.monthly,
    color: REPORT_TYPE_COLORS.monthly,
    isActive: true,
  },
  quarterly: {
    type: 'quarterly',
    label: REPORT_TYPE_LABELS.quarterly,
    description: REPORT_TYPE_DESCRIPTIONS.quarterly,
    icon: REPORT_TYPE_ICONS.quarterly,
    color: REPORT_TYPE_COLORS.quarterly,
    isActive: true,
  },
  yearly: {
    type: 'yearly',
    label: REPORT_TYPE_LABELS.yearly,
    description: REPORT_TYPE_DESCRIPTIONS.yearly,
    icon: REPORT_TYPE_ICONS.yearly,
    color: REPORT_TYPE_COLORS.yearly,
    isActive: true,
  },
  executive: {
    type: 'executive',
    label: REPORT_TYPE_LABELS.executive,
    description: REPORT_TYPE_DESCRIPTIONS.executive,
    icon: REPORT_TYPE_ICONS.executive,
    color: REPORT_TYPE_COLORS.executive,
    isActive: true,
  },
  analytical: {
    type: 'analytical',
    label: REPORT_TYPE_LABELS.analytical,
    description: REPORT_TYPE_DESCRIPTIONS.analytical,
    icon: REPORT_TYPE_ICONS.analytical,
    color: REPORT_TYPE_COLORS.analytical,
    isActive: true,
  },
  comparative: {
    type: 'comparative',
    label: REPORT_TYPE_LABELS.comparative,
    description: REPORT_TYPE_DESCRIPTIONS.comparative,
    icon: REPORT_TYPE_ICONS.comparative,
    color: REPORT_TYPE_COLORS.comparative,
    isActive: true,
  },
  predictive: {
    type: 'predictive',
    label: REPORT_TYPE_LABELS.predictive,
    description: REPORT_TYPE_DESCRIPTIONS.predictive,
    icon: REPORT_TYPE_ICONS.predictive,
    color: REPORT_TYPE_COLORS.predictive,
    isActive: true,
  },
};

// হেল্পার ফাংশন: রিপোর্ট টাইপ ভ্যালিড কিনা চেক করুন
export const isValidReportType = (type: string): type is ReportType => {
  return Object.values(REPORT_TYPE).includes(type as ReportType);
};

// হেল্পার ফাংশন: রিপোর্ট ফরম্যাট ভ্যালিড কিনা চেক করুন
export const isValidReportFormat = (format: string): format is ReportFormat => {
  return Object.values(REPORT_FORMAT).includes(format as ReportFormat);
};

// হেল্পার ফাংশন: সক্রিয় রিপোর্ট টাইপ গুলো পান
export const getActiveReportTypes = (): ReportType[] => {
  return Object.values(REPORT_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: রিপোর্ট টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getReportTypesByGroup = (group: keyof typeof REPORT_TYPE_GROUPS): ReportType[] => {
  return REPORT_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: রিপোর্ট টাইপের লেবেল পান
export const getReportTypeLabel = (type: ReportType): string => {
  return REPORT_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: রিপোর্ট টাইপের কালার পান
export const getReportTypeColor = (type: ReportType): string => {
  return REPORT_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: রিপোর্ট টাইপের আইকন পান
export const getReportTypeIcon = (type: ReportType): string => {
  return REPORT_TYPE_ICONS[type] || 'File';
};

// হেল্পার ফাংশন: রিপোর্ট ফরম্যাটের লেবেল পান
export const getReportFormatLabel = (format: ReportFormat): string => {
  return REPORT_FORMAT_LABELS[format] || format;
};

// হেল্পার ফাংশন: রিপোর্ট টাইপ টাইম বেসড কিনা চেক করুন
export const isTimeBasedReport = (type: ReportType): boolean => {
  const timeBasedTypes: ReportType[] = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'];
  return timeBasedTypes.includes(type);
};

// হেল্পার ফাংশন: রিপোর্ট টাইপ অ্যানালিটিক্যাল কিনা চেক করুন
export const isAnalyticalReport = (type: ReportType): boolean => {
  const analyticalTypes: ReportType[] = ['analytical', 'comparative', 'predictive', 'performance'];
  return analyticalTypes.includes(type);
};
