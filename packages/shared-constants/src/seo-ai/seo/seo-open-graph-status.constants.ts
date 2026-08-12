/**
 * SEO Open Graph স্ট্যাটাস এনাম
 */
export const SEO_OPEN_GRAPH_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UPDATING: 'updating',
} as const;

/**
 * SEO_OPEN_GRAPH_STATUS থেকে টাইপ
 */
export type SEOOpenGraphStatus = (typeof SEO_OPEN_GRAPH_STATUS)[keyof typeof SEO_OPEN_GRAPH_STATUS];

/**
 * SEO Open Graph স্ট্যাটাস লেবেল
 */
export const SEO_OPEN_GRAPH_STATUS_LABELS: Record<SEOOpenGraphStatus, string> = {
  [SEO_OPEN_GRAPH_STATUS.DRAFT]: 'Draft',
  [SEO_OPEN_GRAPH_STATUS.ACTIVE]: 'Active',
  [SEO_OPEN_GRAPH_STATUS.INACTIVE]: 'Inactive',
  [SEO_OPEN_GRAPH_STATUS.UPDATING]: 'Updating',
} as const;

/**
 * SEO Open Graph স্ট্যাটাস বিবরণ
 */
export const SEO_OPEN_GRAPH_STATUS_DESCRIPTIONS: Record<SEOOpenGraphStatus, string> = {
  [SEO_OPEN_GRAPH_STATUS.DRAFT]: 'Open Graph tags are in draft mode, not yet published',
  [SEO_OPEN_GRAPH_STATUS.ACTIVE]: 'Open Graph tags are active and being used on the site',
  [SEO_OPEN_GRAPH_STATUS.INACTIVE]: 'Open Graph tags are inactive and not being used',
  [SEO_OPEN_GRAPH_STATUS.UPDATING]: 'Open Graph tags are currently being updated',
} as const;

/**
 * SEO Open Graph স্ট্যাটাস আইকন
 */
export const SEO_OPEN_GRAPH_STATUS_ICONS: Record<SEOOpenGraphStatus, string> = {
  [SEO_OPEN_GRAPH_STATUS.DRAFT]: '📝',
  [SEO_OPEN_GRAPH_STATUS.ACTIVE]: '✅',
  [SEO_OPEN_GRAPH_STATUS.INACTIVE]: '⏸️',
  [SEO_OPEN_GRAPH_STATUS.UPDATING]: '🔄',
} as const;

/**
 * SEO Open Graph স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_OPEN_GRAPH_STATUS_COLORS: Record<SEOOpenGraphStatus, string> = {
  [SEO_OPEN_GRAPH_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_OPEN_GRAPH_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_OPEN_GRAPH_STATUS.INACTIVE]: '#f59e0b', // Amber-500
  [SEO_OPEN_GRAPH_STATUS.UPDATING]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO Open Graph স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_OPEN_GRAPH_STATUS_TRANSITIONS: Record<SEOOpenGraphStatus, SEOOpenGraphStatus[]> = {
  [SEO_OPEN_GRAPH_STATUS.DRAFT]: [SEO_OPEN_GRAPH_STATUS.ACTIVE, SEO_OPEN_GRAPH_STATUS.INACTIVE],
  [SEO_OPEN_GRAPH_STATUS.ACTIVE]: [SEO_OPEN_GRAPH_STATUS.UPDATING, SEO_OPEN_GRAPH_STATUS.INACTIVE],
  [SEO_OPEN_GRAPH_STATUS.INACTIVE]: [SEO_OPEN_GRAPH_STATUS.ACTIVE, SEO_OPEN_GRAPH_STATUS.DRAFT],
  [SEO_OPEN_GRAPH_STATUS.UPDATING]: [SEO_OPEN_GRAPH_STATUS.ACTIVE, SEO_OPEN_GRAPH_STATUS.INACTIVE],
} as const;

/**
 * SEO Open Graph স্ট্যাটাস কনফিগারেশন
 */
export interface SEOOpenGraphStatusConfig {
  status: SEOOpenGraphStatus;
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
 * SEO Open Graph স্ট্যাটাস মেটাডেটা
 */
export const SEO_OPEN_GRAPH_STATUS_METADATA: Record<SEOOpenGraphStatus, SEOOpenGraphStatusConfig> =
  {
    [SEO_OPEN_GRAPH_STATUS.DRAFT]: {
      status: SEO_OPEN_GRAPH_STATUS.DRAFT,
      label: SEO_OPEN_GRAPH_STATUS_LABELS[SEO_OPEN_GRAPH_STATUS.DRAFT],
      description: SEO_OPEN_GRAPH_STATUS_DESCRIPTIONS[SEO_OPEN_GRAPH_STATUS.DRAFT],
      icon: SEO_OPEN_GRAPH_STATUS_ICONS[SEO_OPEN_GRAPH_STATUS.DRAFT],
      color: SEO_OPEN_GRAPH_STATUS_COLORS[SEO_OPEN_GRAPH_STATUS.DRAFT],
      isTerminal: false,
      isError: false,
      isSuccess: false,
      isActive: false,
      order: 0,
    },
    [SEO_OPEN_GRAPH_STATUS.ACTIVE]: {
      status: SEO_OPEN_GRAPH_STATUS.ACTIVE,
      label: SEO_OPEN_GRAPH_STATUS_LABELS[SEO_OPEN_GRAPH_STATUS.ACTIVE],
      description: SEO_OPEN_GRAPH_STATUS_DESCRIPTIONS[SEO_OPEN_GRAPH_STATUS.ACTIVE],
      icon: SEO_OPEN_GRAPH_STATUS_ICONS[SEO_OPEN_GRAPH_STATUS.ACTIVE],
      color: SEO_OPEN_GRAPH_STATUS_COLORS[SEO_OPEN_GRAPH_STATUS.ACTIVE],
      isTerminal: false,
      isError: false,
      isSuccess: true,
      isActive: true,
      order: 1,
    },
    [SEO_OPEN_GRAPH_STATUS.INACTIVE]: {
      status: SEO_OPEN_GRAPH_STATUS.INACTIVE,
      label: SEO_OPEN_GRAPH_STATUS_LABELS[SEO_OPEN_GRAPH_STATUS.INACTIVE],
      description: SEO_OPEN_GRAPH_STATUS_DESCRIPTIONS[SEO_OPEN_GRAPH_STATUS.INACTIVE],
      icon: SEO_OPEN_GRAPH_STATUS_ICONS[SEO_OPEN_GRAPH_STATUS.INACTIVE],
      color: SEO_OPEN_GRAPH_STATUS_COLORS[SEO_OPEN_GRAPH_STATUS.INACTIVE],
      isTerminal: true,
      isError: false,
      isSuccess: false,
      isActive: false,
      order: 2,
    },
    [SEO_OPEN_GRAPH_STATUS.UPDATING]: {
      status: SEO_OPEN_GRAPH_STATUS.UPDATING,
      label: SEO_OPEN_GRAPH_STATUS_LABELS[SEO_OPEN_GRAPH_STATUS.UPDATING],
      description: SEO_OPEN_GRAPH_STATUS_DESCRIPTIONS[SEO_OPEN_GRAPH_STATUS.UPDATING],
      icon: SEO_OPEN_GRAPH_STATUS_ICONS[SEO_OPEN_GRAPH_STATUS.UPDATING],
      color: SEO_OPEN_GRAPH_STATUS_COLORS[SEO_OPEN_GRAPH_STATUS.UPDATING],
      isTerminal: false,
      isError: false,
      isSuccess: false,
      isActive: true,
      order: 3,
    },
  } as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_OPEN_GRAPH_TERMINAL_STATUSES = [SEO_OPEN_GRAPH_STATUS.INACTIVE] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_OPEN_GRAPH_SUCCESS_STATUSES = [SEO_OPEN_GRAPH_STATUS.ACTIVE] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_OPEN_GRAPH_ERROR_STATUSES = [] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_OPEN_GRAPH_ACTIVE_STATUSES = [
  SEO_OPEN_GRAPH_STATUS.ACTIVE,
  SEO_OPEN_GRAPH_STATUS.UPDATING,
] as const;
