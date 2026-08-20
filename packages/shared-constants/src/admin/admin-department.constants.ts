/**
 * অ্যাডমিন ডিপার্টমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিপার্টমেন্ট আইডি প্রিফিক্স
export const DEPARTMENT_ID_PREFIX = 'DEPT';

// ডিফল্ট ডিপার্টমেন্ট
export const DEFAULT_DEPARTMENTS = {
  ENGINEERING: 'engineering',
  MARKETING: 'marketing',
  SALES: 'sales',
  SUPPORT: 'support',
  FINANCE: 'finance',
  HR: 'hr',
} as const;

// ডিপার্টমেন্টের কালার কোড
export const DEPARTMENT_COLORS = {
  ENGINEERING: '#2563EB', // নীল
  MARKETING: '#EC4899', // গোলাপি
  SALES: '#F59E0B', // কমলা
  SUPPORT: '#22C55E', // সবুজ
  FINANCE: '#8B5CF6', // বেগুনি
  HR: '#DC2626', // লাল
} as const;

// ডিপার্টমেন্টের আইকন
export const DEPARTMENT_ICONS = {
  ENGINEERING: '⚙️',
  MARKETING: '📢',
  SALES: '💰',
  SUPPORT: '🎧',
  FINANCE: '📊',
  HR: '👥',
} as const;

// ডিপার্টমেন্টের ডেসক্রিপশন
export const DEPARTMENT_DESCRIPTIONS = {
  ENGINEERING: 'Software development and technical operations',
  MARKETING: 'Marketing campaigns and brand management',
  SALES: 'Sales operations and customer acquisition',
  SUPPORT: 'Customer support and technical assistance',
  FINANCE: 'Financial management and accounting',
  HR: 'Human resources and talent management',
} as const;

// ডিপার্টমেন্টের অনুমোদিত রোল লিস্ট
export const DEPARTMENT_ALLOWED_ROLES = {
  ENGINEERING: ['developer', 'engineer', 'architect', 'devops', 'manager'],
  MARKETING: ['marketing_manager', 'content_writer', 'seo_specialist', 'social_media', 'analyst'],
  SALES: ['sales_manager', 'sales_rep', 'account_executive', 'business_development'],
  SUPPORT: ['support_manager', 'support_agent', 'technical_support', 'customer_success'],
  FINANCE: ['finance_manager', 'accountant', 'analyst', 'controller'],
  HR: ['hr_manager', 'recruiter', 'training_specialist', 'payroll'],
} as const;

// ডিফল্ট ডিপার্টমেন্ট সেটিংস
export const DEFAULT_DEPARTMENT_SETTINGS = {
  ENGINEERING: {
    timezone: 'UTC',
    workingHours: '9-5',
    holidayPolicy: 'standard',
    budget: 100000,
    maxEmployees: 100,
  },
  MARKETING: {
    timezone: 'UTC',
    workingHours: '9-5',
    holidayPolicy: 'standard',
    budget: 50000,
    maxEmployees: 50,
  },
  SALES: {
    timezone: 'UTC',
    workingHours: '9-5',
    holidayPolicy: 'standard',
    budget: 75000,
    maxEmployees: 75,
  },
  SUPPORT: {
    timezone: 'UTC',
    workingHours: '24/7',
    holidayPolicy: 'rotational',
    budget: 40000,
    maxEmployees: 60,
  },
  FINANCE: {
    timezone: 'UTC',
    workingHours: '9-5',
    holidayPolicy: 'standard',
    budget: 30000,
    maxEmployees: 30,
  },
  HR: {
    timezone: 'UTC',
    workingHours: '9-5',
    holidayPolicy: 'standard',
    budget: 25000,
    maxEmployees: 25,
  },
} as const;

// ডিপার্টমেন্টের লেবেল (বাংলা)
export const DEPARTMENT_LABELS_BN = {
  ENGINEERING: 'ইঞ্জিনিয়ারিং',
  MARKETING: 'মার্কেটিং',
  SALES: 'সেলস',
  SUPPORT: 'সাপোর্ট',
  FINANCE: 'ফাইন্যান্স',
  HR: 'এইচআর',
} as const;

// ডিপার্টমেন্টের লেবেল (ইংরেজি)
export const DEPARTMENT_LABELS_EN = {
  ENGINEERING: 'Engineering',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  SUPPORT: 'Support',
  FINANCE: 'Finance',
  HR: 'HR',
} as const;

// ডিপার্টমেন্টের CSS ক্লাস
export const DEPARTMENT_CSS_CLASSES = {
  ENGINEERING: 'dept-engineering',
  MARKETING: 'dept-marketing',
  SALES: 'dept-sales',
  SUPPORT: 'dept-support',
  FINANCE: 'dept-finance',
  HR: 'dept-hr',
} as const;

// ডিপার্টমেন্ট গ্রুপ
export const DEPARTMENT_GROUPS = {
  TECHNICAL: ['engineering'],
  COMMERCIAL: ['marketing', 'sales'],
  OPERATIONAL: ['support', 'finance', 'hr'],
} as const;

// ডিপার্টমেন্ট স্ট্যাটাস
export const DEPARTMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

// ডিপার্টমেন্টের জন্য ইমোজি
export const DEPARTMENT_EMOJIS = {
  ENGINEERING: '🛠️',
  MARKETING: '📣',
  SALES: '💵',
  SUPPORT: '🆘',
  FINANCE: '📈',
  HR: '🤝',
} as const;
