/**
 * SEO অডিট সিভারিটি এনাম
 */
export const SEO_AUDIT_SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
} as const;

/**
 * SEO_AUDIT_SEVERITY থেকে টাইপ
 */
export type SEOAuditSeverity = (typeof SEO_AUDIT_SEVERITY)[keyof typeof SEO_AUDIT_SEVERITY];

/**
 * SEO অডিট সিভারিটি লেবেল
 */
export const SEO_AUDIT_SEVERITY_LABELS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 'Critical',
  [SEO_AUDIT_SEVERITY.HIGH]: 'High',
  [SEO_AUDIT_SEVERITY.MEDIUM]: 'Medium',
  [SEO_AUDIT_SEVERITY.LOW]: 'Low',
  [SEO_AUDIT_SEVERITY.INFO]: 'Info',
} as const;

/**
 * SEO অডিট সিভারিটি বিবরণ
 */
export const SEO_AUDIT_SEVERITY_DESCRIPTIONS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 'Immediate action required - severe impact on SEO performance',
  [SEO_AUDIT_SEVERITY.HIGH]: 'Urgent attention needed - significant negative impact on SEO',
  [SEO_AUDIT_SEVERITY.MEDIUM]: 'Important to address - moderate impact on SEO performance',
  [SEO_AUDIT_SEVERITY.LOW]: 'Minor issues - low impact on SEO, can be addressed later',
  [SEO_AUDIT_SEVERITY.INFO]: 'Informational - no immediate action required, for awareness only',
} as const;

/**
 * SEO অডিট সিভারিটি আইকন
 */
export const SEO_AUDIT_SEVERITY_ICONS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: '🔴',
  [SEO_AUDIT_SEVERITY.HIGH]: '🟠',
  [SEO_AUDIT_SEVERITY.MEDIUM]: '🟡',
  [SEO_AUDIT_SEVERITY.LOW]: '🟢',
  [SEO_AUDIT_SEVERITY.INFO]: '🔵',
} as const;

/**
 * SEO অডিট সিভারিটি কালার (হেক্স কোড)
 */
export const SEO_AUDIT_SEVERITY_COLORS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: '#dc2626', // Red-600
  [SEO_AUDIT_SEVERITY.HIGH]: '#f97316', // Orange-500
  [SEO_AUDIT_SEVERITY.MEDIUM]: '#f59e0b', // Amber-500
  [SEO_AUDIT_SEVERITY.LOW]: '#22c55e', // Green-500
  [SEO_AUDIT_SEVERITY.INFO]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO অডিট সিভারিটি স্কোর (০-১০০)
 */
export const SEO_AUDIT_SEVERITY_SCORE: Record<SEOAuditSeverity, number> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 100,
  [SEO_AUDIT_SEVERITY.HIGH]: 80,
  [SEO_AUDIT_SEVERITY.MEDIUM]: 60,
  [SEO_AUDIT_SEVERITY.LOW]: 30,
  [SEO_AUDIT_SEVERITY.INFO]: 10,
} as const;

/**
 * SEO অডিট সিভারিটি প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_AUDIT_SEVERITY_PRIORITY: Record<SEOAuditSeverity, number> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 1,
  [SEO_AUDIT_SEVERITY.HIGH]: 2,
  [SEO_AUDIT_SEVERITY.MEDIUM]: 3,
  [SEO_AUDIT_SEVERITY.LOW]: 4,
  [SEO_AUDIT_SEVERITY.INFO]: 5,
} as const;

/**
 * SEO অডিট সিভারিটি রেসপন্স টাইম (ঘন্টায়)
 */
export const SEO_AUDIT_SEVERITY_RESPONSE_TIME: Record<SEOAuditSeverity, number> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 1, // 1 hour
  [SEO_AUDIT_SEVERITY.HIGH]: 4, // 4 hours
  [SEO_AUDIT_SEVERITY.MEDIUM]: 24, // 24 hours
  [SEO_AUDIT_SEVERITY.LOW]: 72, // 72 hours
  [SEO_AUDIT_SEVERITY.INFO]: 168, // 168 hours (7 days)
} as const;

/**
 * SEO অডিট সিভারিটি কনফিগারেশন
 */
export interface SEOAuditSeverityConfig {
  severity: SEOAuditSeverity;
  label: string;
  description: string;
  icon: string;
  color: string;
  score: number;
  priority: number;
  responseTime: number; // hours
  requiresImmediateAction: boolean;
  order: number;
}

/**
 * SEO অডিট সিভারিটি মেটাডেটা
 */
export const SEO_AUDIT_SEVERITY_METADATA: Record<SEOAuditSeverity, SEOAuditSeverityConfig> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: {
    severity: SEO_AUDIT_SEVERITY.CRITICAL,
    label: SEO_AUDIT_SEVERITY_LABELS[SEO_AUDIT_SEVERITY.CRITICAL],
    description: SEO_AUDIT_SEVERITY_DESCRIPTIONS[SEO_AUDIT_SEVERITY.CRITICAL],
    icon: SEO_AUDIT_SEVERITY_ICONS[SEO_AUDIT_SEVERITY.CRITICAL],
    color: SEO_AUDIT_SEVERITY_COLORS[SEO_AUDIT_SEVERITY.CRITICAL],
    score: SEO_AUDIT_SEVERITY_SCORE[SEO_AUDIT_SEVERITY.CRITICAL],
    priority: SEO_AUDIT_SEVERITY_PRIORITY[SEO_AUDIT_SEVERITY.CRITICAL],
    responseTime: SEO_AUDIT_SEVERITY_RESPONSE_TIME[SEO_AUDIT_SEVERITY.CRITICAL],
    requiresImmediateAction: true,
    order: 0,
  },
  [SEO_AUDIT_SEVERITY.HIGH]: {
    severity: SEO_AUDIT_SEVERITY.HIGH,
    label: SEO_AUDIT_SEVERITY_LABELS[SEO_AUDIT_SEVERITY.HIGH],
    description: SEO_AUDIT_SEVERITY_DESCRIPTIONS[SEO_AUDIT_SEVERITY.HIGH],
    icon: SEO_AUDIT_SEVERITY_ICONS[SEO_AUDIT_SEVERITY.HIGH],
    color: SEO_AUDIT_SEVERITY_COLORS[SEO_AUDIT_SEVERITY.HIGH],
    score: SEO_AUDIT_SEVERITY_SCORE[SEO_AUDIT_SEVERITY.HIGH],
    priority: SEO_AUDIT_SEVERITY_PRIORITY[SEO_AUDIT_SEVERITY.HIGH],
    responseTime: SEO_AUDIT_SEVERITY_RESPONSE_TIME[SEO_AUDIT_SEVERITY.HIGH],
    requiresImmediateAction: true,
    order: 1,
  },
  [SEO_AUDIT_SEVERITY.MEDIUM]: {
    severity: SEO_AUDIT_SEVERITY.MEDIUM,
    label: SEO_AUDIT_SEVERITY_LABELS[SEO_AUDIT_SEVERITY.MEDIUM],
    description: SEO_AUDIT_SEVERITY_DESCRIPTIONS[SEO_AUDIT_SEVERITY.MEDIUM],
    icon: SEO_AUDIT_SEVERITY_ICONS[SEO_AUDIT_SEVERITY.MEDIUM],
    color: SEO_AUDIT_SEVERITY_COLORS[SEO_AUDIT_SEVERITY.MEDIUM],
    score: SEO_AUDIT_SEVERITY_SCORE[SEO_AUDIT_SEVERITY.MEDIUM],
    priority: SEO_AUDIT_SEVERITY_PRIORITY[SEO_AUDIT_SEVERITY.MEDIUM],
    responseTime: SEO_AUDIT_SEVERITY_RESPONSE_TIME[SEO_AUDIT_SEVERITY.MEDIUM],
    requiresImmediateAction: false,
    order: 2,
  },
  [SEO_AUDIT_SEVERITY.LOW]: {
    severity: SEO_AUDIT_SEVERITY.LOW,
    label: SEO_AUDIT_SEVERITY_LABELS[SEO_AUDIT_SEVERITY.LOW],
    description: SEO_AUDIT_SEVERITY_DESCRIPTIONS[SEO_AUDIT_SEVERITY.LOW],
    icon: SEO_AUDIT_SEVERITY_ICONS[SEO_AUDIT_SEVERITY.LOW],
    color: SEO_AUDIT_SEVERITY_COLORS[SEO_AUDIT_SEVERITY.LOW],
    score: SEO_AUDIT_SEVERITY_SCORE[SEO_AUDIT_SEVERITY.LOW],
    priority: SEO_AUDIT_SEVERITY_PRIORITY[SEO_AUDIT_SEVERITY.LOW],
    responseTime: SEO_AUDIT_SEVERITY_RESPONSE_TIME[SEO_AUDIT_SEVERITY.LOW],
    requiresImmediateAction: false,
    order: 3,
  },
  [SEO_AUDIT_SEVERITY.INFO]: {
    severity: SEO_AUDIT_SEVERITY.INFO,
    label: SEO_AUDIT_SEVERITY_LABELS[SEO_AUDIT_SEVERITY.INFO],
    description: SEO_AUDIT_SEVERITY_DESCRIPTIONS[SEO_AUDIT_SEVERITY.INFO],
    icon: SEO_AUDIT_SEVERITY_ICONS[SEO_AUDIT_SEVERITY.INFO],
    color: SEO_AUDIT_SEVERITY_COLORS[SEO_AUDIT_SEVERITY.INFO],
    score: SEO_AUDIT_SEVERITY_SCORE[SEO_AUDIT_SEVERITY.INFO],
    priority: SEO_AUDIT_SEVERITY_PRIORITY[SEO_AUDIT_SEVERITY.INFO],
    responseTime: SEO_AUDIT_SEVERITY_RESPONSE_TIME[SEO_AUDIT_SEVERITY.INFO],
    requiresImmediateAction: false,
    order: 4,
  },
} as const;

/**
 * SEO অডিট সিভারিটি গ্রুপ
 */
export const SEO_AUDIT_SEVERITY_GROUPS = {
  URGENT: [SEO_AUDIT_SEVERITY.CRITICAL, SEO_AUDIT_SEVERITY.HIGH] as const,
  STANDARD: [SEO_AUDIT_SEVERITY.MEDIUM, SEO_AUDIT_SEVERITY.LOW] as const,
  INFORMATIONAL: [SEO_AUDIT_SEVERITY.INFO] as const,
} as const;

/**
 * SEO অডিট সিভারিটি গ্রুপ লেবেল
 */
export const SEO_AUDIT_SEVERITY_GROUP_LABELS = {
  URGENT: 'Urgent',
  STANDARD: 'Standard',
  INFORMATIONAL: 'Informational',
} as const;

/**
 * SEO অডিট সিভারিটি গ্রুপ কালার
 */
export const SEO_AUDIT_SEVERITY_GROUP_COLORS = {
  URGENT: '#dc2626',
  STANDARD: '#f59e0b',
  INFORMATIONAL: '#3b82f6',
} as const;

/**
 * SEO অডিট সিভারিটি থ্রেশহোল্ড
 */
export const SEO_AUDIT_SEVERITY_THRESHOLDS = {
  CRITICAL_MIN: 90,
  HIGH_MIN: 70,
  MEDIUM_MIN: 40,
  LOW_MIN: 20,
  INFO_MIN: 0,
} as const;

/**
 * স্কোর থেকে সিভারিটি নির্ধারণ
 */
export const getAuditSeverityFromScore = (score: number): SEOAuditSeverity => {
  if (score >= SEO_AUDIT_SEVERITY_THRESHOLDS.CRITICAL_MIN) {
    return SEO_AUDIT_SEVERITY.CRITICAL;
  }
  if (score >= SEO_AUDIT_SEVERITY_THRESHOLDS.HIGH_MIN) {
    return SEO_AUDIT_SEVERITY.HIGH;
  }
  if (score >= SEO_AUDIT_SEVERITY_THRESHOLDS.MEDIUM_MIN) {
    return SEO_AUDIT_SEVERITY.MEDIUM;
  }
  if (score >= SEO_AUDIT_SEVERITY_THRESHOLDS.LOW_MIN) {
    return SEO_AUDIT_SEVERITY.LOW;
  }
  return SEO_AUDIT_SEVERITY.INFO;
};
