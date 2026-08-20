/**
 * অ্যাডমিন রিপোর্টের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// রিপোর্ট টাইপ
export const REPORT_TYPES = {
  ACTIVITY: 'activity',
  AUDIT: 'audit',
  SECURITY: 'security',
  PERFORMANCE: 'performance',
  FINANCIAL: 'financial',
  TEAM: 'team',
  DEPARTMENT: 'department',
  ANALYTICS: 'analytics',
  COMPLIANCE: 'compliance',
} as const;

// টাইপের আইকন
export const REPORT_TYPE_ICONS = {
  ACTIVITY: '📊',
  AUDIT: '📋',
  SECURITY: '🔒',
  PERFORMANCE: '⚡',
  FINANCIAL: '💰',
  TEAM: '👥',
  DEPARTMENT: '🏢',
  ANALYTICS: '📈',
  COMPLIANCE: '✅',
} as const;

// টাইপের কালার কোড
export const REPORT_TYPE_COLORS = {
  ACTIVITY: '#3B82F6',
  AUDIT: '#8B5CF6',
  SECURITY: '#EF4444',
  PERFORMANCE: '#22C55E',
  FINANCIAL: '#F59E0B',
  TEAM: '#EC4899',
  DEPARTMENT: '#14B8A6',
  ANALYTICS: '#6366F1',
  COMPLIANCE: '#10B981',
} as const;

// টাইপের ডেসক্রিপশন
export const REPORT_TYPE_DESCRIPTIONS = {
  ACTIVITY: 'User activity and engagement report',
  AUDIT: 'System audit and compliance report',
  SECURITY: 'Security incidents and threat report',
  PERFORMANCE: 'System performance and metrics report',
  FINANCIAL: 'Financial transactions and revenue report',
  TEAM: 'Team performance and productivity report',
  DEPARTMENT: 'Department-wise analysis and report',
  ANALYTICS: 'Advanced analytics and insights report',
  COMPLIANCE: 'Regulatory compliance and standards report',
} as const;

// টাইপের ডিফল্ট ফরম্যাট
export const REPORT_TYPE_DEFAULT_FORMAT = {
  ACTIVITY: 'excel',
  AUDIT: 'pdf',
  SECURITY: 'pdf',
  PERFORMANCE: 'excel',
  FINANCIAL: 'excel',
  TEAM: 'excel',
  DEPARTMENT: 'excel',
  ANALYTICS: 'json',
  COMPLIANCE: 'pdf',
} as const;

// টাইপের ডেটা সোর্স
export const REPORT_TYPE_DATA_SOURCES = {
  ACTIVITY: 'activity_logs',
  AUDIT: 'audit_logs',
  SECURITY: 'security_logs',
  PERFORMANCE: 'performance_metrics',
  FINANCIAL: 'financial_transactions',
  TEAM: 'team_metrics',
  DEPARTMENT: 'department_metrics',
  ANALYTICS: 'analytics_data',
  COMPLIANCE: 'compliance_data',
} as const;

// টাইপের জেনারেশন পদ্ধতি
export const REPORT_TYPE_GENERATION_METHODS = {
  ACTIVITY: 'aggregation',
  AUDIT: 'query',
  SECURITY: 'query',
  PERFORMANCE: 'calculation',
  FINANCIAL: 'aggregation',
  TEAM: 'aggregation',
  DEPARTMENT: 'aggregation',
  ANALYTICS: 'analysis',
  COMPLIANCE: 'validation',
} as const;

// টাইপ গ্রুপ
export const REPORT_TYPE_GROUPS = {
  OPERATIONAL: ['activity', 'performance', 'analytics'],
  SECURITY: ['audit', 'security'],
  FINANCIAL: ['financial', 'compliance'],
  ORGANIZATIONAL: ['team', 'department'],
} as const;

// টাইপের লেবেল (বাংলা)
export const REPORT_TYPE_LABELS_BN = {
  ACTIVITY: 'অ্যাক্টিভিটি',
  AUDIT: 'অডিট',
  SECURITY: 'নিরাপত্তা',
  PERFORMANCE: 'পারফরম্যান্স',
  FINANCIAL: 'আর্থিক',
  TEAM: 'টিম',
  DEPARTMENT: 'ডিপার্টমেন্ট',
  ANALYTICS: 'অ্যানালিটিক্স',
  COMPLIANCE: 'কমপ্লায়েন্স',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const REPORT_TYPE_LABELS_EN = {
  ACTIVITY: 'Activity',
  AUDIT: 'Audit',
  SECURITY: 'Security',
  PERFORMANCE: 'Performance',
  FINANCIAL: 'Financial',
  TEAM: 'Team',
  DEPARTMENT: 'Department',
  ANALYTICS: 'Analytics',
  COMPLIANCE: 'Compliance',
} as const;

// টাইপের CSS ক্লাস
export const REPORT_TYPE_CSS_CLASSES = {
  ACTIVITY: 'report-activity',
  AUDIT: 'report-audit',
  SECURITY: 'report-security',
  PERFORMANCE: 'report-performance',
  FINANCIAL: 'report-financial',
  TEAM: 'report-team',
  DEPARTMENT: 'report-department',
  ANALYTICS: 'report-analytics',
  COMPLIANCE: 'report-compliance',
} as const;

// টাইপের জন্য ইমোজি
export const REPORT_TYPE_EMOJIS = {
  ACTIVITY: '📊',
  AUDIT: '📋',
  SECURITY: '🔒',
  PERFORMANCE: '⚡',
  FINANCIAL: '💰',
  TEAM: '👥',
  DEPARTMENT: '🏢',
  ANALYTICS: '📈',
  COMPLIANCE: '✅',
} as const;

// টাইপের রিটেনশন পিরিয়ড (দিনে)
export const REPORT_TYPE_RETENTION = {
  ACTIVITY: 30,
  AUDIT: 90,
  SECURITY: 90,
  PERFORMANCE: 30,
  FINANCIAL: 365,
  TEAM: 60,
  DEPARTMENT: 60,
  ANALYTICS: 30,
  COMPLIANCE: 730,
} as const;

// টাইপের ডিফল্ট স্কেডিউল
export const REPORT_TYPE_DEFAULT_SCHEDULE = {
  ACTIVITY: 'daily',
  AUDIT: 'weekly',
  SECURITY: 'weekly',
  PERFORMANCE: 'daily',
  FINANCIAL: 'monthly',
  TEAM: 'weekly',
  DEPARTMENT: 'weekly',
  ANALYTICS: 'daily',
  COMPLIANCE: 'monthly',
} as const;

// টাইপের সর্বোচ্চ রেকর্ড
export const REPORT_TYPE_MAX_RECORDS = {
  ACTIVITY: 100000,
  AUDIT: 50000,
  SECURITY: 50000,
  PERFORMANCE: 100000,
  FINANCIAL: 100000,
  TEAM: 50000,
  DEPARTMENT: 50000,
  ANALYTICS: 100000,
  COMPLIANCE: 50000,
} as const;
