/**
 * SEO স্কিমা স্ট্যাটাস এনাম
 */
export const SEO_SCHEMA_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VALIDATING: 'validating',
  INVALID: 'invalid',
  UPDATING: 'updating',
  ARCHIVED: 'archived',
} as const;

/**
 * SEO_SCHEMA_STATUS থেকে টাইপ
 */
export type SEOSchemaStatus = (typeof SEO_SCHEMA_STATUS)[keyof typeof SEO_SCHEMA_STATUS];

/**
 * SEO স্কিমা স্ট্যাটাস লেবেল
 */
export const SEO_SCHEMA_STATUS_LABELS: Record<SEOSchemaStatus, string> = {
  [SEO_SCHEMA_STATUS.DRAFT]: 'Draft',
  [SEO_SCHEMA_STATUS.ACTIVE]: 'Active',
  [SEO_SCHEMA_STATUS.INACTIVE]: 'Inactive',
  [SEO_SCHEMA_STATUS.VALIDATING]: 'Validating',
  [SEO_SCHEMA_STATUS.INVALID]: 'Invalid',
  [SEO_SCHEMA_STATUS.UPDATING]: 'Updating',
  [SEO_SCHEMA_STATUS.ARCHIVED]: 'Archived',
} as const;

/**
 * SEO স্কিমা স্ট্যাটাস বিবরণ
 */
export const SEO_SCHEMA_STATUS_DESCRIPTIONS: Record<SEOSchemaStatus, string> = {
  [SEO_SCHEMA_STATUS.DRAFT]: 'Schema markup is in draft mode, not yet published',
  [SEO_SCHEMA_STATUS.ACTIVE]: 'Schema markup is active and being used on the site',
  [SEO_SCHEMA_STATUS.INACTIVE]: 'Schema markup is inactive and not being used',
  [SEO_SCHEMA_STATUS.VALIDATING]: 'Schema markup is being validated for correctness',
  [SEO_SCHEMA_STATUS.INVALID]: 'Schema markup validation has failed',
  [SEO_SCHEMA_STATUS.UPDATING]: 'Schema markup is currently being updated',
  [SEO_SCHEMA_STATUS.ARCHIVED]: 'Schema markup has been archived and is no longer used',
} as const;

/**
 * SEO স্কিমা স্ট্যাটাস আইকন
 */
export const SEO_SCHEMA_STATUS_ICONS: Record<SEOSchemaStatus, string> = {
  [SEO_SCHEMA_STATUS.DRAFT]: '📝',
  [SEO_SCHEMA_STATUS.ACTIVE]: '✅',
  [SEO_SCHEMA_STATUS.INACTIVE]: '⏸️',
  [SEO_SCHEMA_STATUS.VALIDATING]: '🔍',
  [SEO_SCHEMA_STATUS.INVALID]: '❌',
  [SEO_SCHEMA_STATUS.UPDATING]: '🔄',
  [SEO_SCHEMA_STATUS.ARCHIVED]: '📦',
} as const;

/**
 * SEO স্কিমা স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_SCHEMA_STATUS_COLORS: Record<SEOSchemaStatus, string> = {
  [SEO_SCHEMA_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_SCHEMA_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_SCHEMA_STATUS.INACTIVE]: '#f59e0b', // Amber-500
  [SEO_SCHEMA_STATUS.VALIDATING]: '#3b82f6', // Blue-500
  [SEO_SCHEMA_STATUS.INVALID]: '#dc2626', // Red-600
  [SEO_SCHEMA_STATUS.UPDATING]: '#8b5cf6', // Violet-500
  [SEO_SCHEMA_STATUS.ARCHIVED]: '#64748b', // Slate-500
} as const;

/**
 * SEO স্কিমা স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_SCHEMA_STATUS_TRANSITIONS: Record<SEOSchemaStatus, SEOSchemaStatus[]> = {
  [SEO_SCHEMA_STATUS.DRAFT]: [SEO_SCHEMA_STATUS.VALIDATING, SEO_SCHEMA_STATUS.ARCHIVED],
  [SEO_SCHEMA_STATUS.VALIDATING]: [
    SEO_SCHEMA_STATUS.ACTIVE,
    SEO_SCHEMA_STATUS.INVALID,
    SEO_SCHEMA_STATUS.DRAFT,
  ],
  [SEO_SCHEMA_STATUS.ACTIVE]: [
    SEO_SCHEMA_STATUS.INACTIVE,
    SEO_SCHEMA_STATUS.UPDATING,
    SEO_SCHEMA_STATUS.ARCHIVED,
  ],
  [SEO_SCHEMA_STATUS.INACTIVE]: [SEO_SCHEMA_STATUS.ACTIVE, SEO_SCHEMA_STATUS.ARCHIVED],
  [SEO_SCHEMA_STATUS.UPDATING]: [
    SEO_SCHEMA_STATUS.ACTIVE,
    SEO_SCHEMA_STATUS.INVALID,
    SEO_SCHEMA_STATUS.ARCHIVED,
  ],
  [SEO_SCHEMA_STATUS.INVALID]: [
    SEO_SCHEMA_STATUS.DRAFT,
    SEO_SCHEMA_STATUS.UPDATING,
    SEO_SCHEMA_STATUS.ARCHIVED,
  ],
  [SEO_SCHEMA_STATUS.ARCHIVED]: [SEO_SCHEMA_STATUS.DRAFT],
} as const;

/**
 * SEO স্কিমা স্ট্যাটাস কনফিগারেশন
 */
export interface SEOSchemaStatusConfig {
  status: SEOSchemaStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  isActive: boolean;
  order: number;
}

/**
 * SEO স্কিমা স্ট্যাটাস মেটাডেটা
 */
export const SEO_SCHEMA_STATUS_METADATA: Record<SEOSchemaStatus, SEOSchemaStatusConfig> = {
  [SEO_SCHEMA_STATUS.DRAFT]: {
    status: SEO_SCHEMA_STATUS.DRAFT,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.DRAFT],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.DRAFT],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.DRAFT],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.DRAFT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_SCHEMA_STATUS.VALIDATING]: {
    status: SEO_SCHEMA_STATUS.VALIDATING,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.VALIDATING],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.VALIDATING],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.VALIDATING],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.VALIDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_SCHEMA_STATUS.ACTIVE]: {
    status: SEO_SCHEMA_STATUS.ACTIVE,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.ACTIVE],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.ACTIVE],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.ACTIVE],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.ACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_SCHEMA_STATUS.INACTIVE]: {
    status: SEO_SCHEMA_STATUS.INACTIVE,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.INACTIVE],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.INACTIVE],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.INACTIVE],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.INACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 3,
  },
  [SEO_SCHEMA_STATUS.UPDATING]: {
    status: SEO_SCHEMA_STATUS.UPDATING,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.UPDATING],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.UPDATING],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.UPDATING],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_SCHEMA_STATUS.INVALID]: {
    status: SEO_SCHEMA_STATUS.INVALID,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.INVALID],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.INVALID],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.INVALID],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.INVALID],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
  [SEO_SCHEMA_STATUS.ARCHIVED]: {
    status: SEO_SCHEMA_STATUS.ARCHIVED,
    label: SEO_SCHEMA_STATUS_LABELS[SEO_SCHEMA_STATUS.ARCHIVED],
    description: SEO_SCHEMA_STATUS_DESCRIPTIONS[SEO_SCHEMA_STATUS.ARCHIVED],
    icon: SEO_SCHEMA_STATUS_ICONS[SEO_SCHEMA_STATUS.ARCHIVED],
    color: SEO_SCHEMA_STATUS_COLORS[SEO_SCHEMA_STATUS.ARCHIVED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_SCHEMA_TERMINAL_STATUSES = [
  SEO_SCHEMA_STATUS.INVALID,
  SEO_SCHEMA_STATUS.ARCHIVED,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_SCHEMA_SUCCESS_STATUSES = [SEO_SCHEMA_STATUS.ACTIVE] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_SCHEMA_ERROR_STATUSES = [SEO_SCHEMA_STATUS.INVALID] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_SCHEMA_ACTIVE_STATUSES = [
  SEO_SCHEMA_STATUS.VALIDATING,
  SEO_SCHEMA_STATUS.ACTIVE,
  SEO_SCHEMA_STATUS.UPDATING,
] as const;
