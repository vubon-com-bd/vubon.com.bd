/**
 * Admin Report Constants
 * Admin reporting and analytics definitions
 */

export const ADMIN_REPORT = {
  // Report types
  TYPES: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    ANALYTICAL: 'analytical',
    COMPARATIVE: 'comparative',
    TREND: 'trend',
    FORECAST: 'forecast',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    SECURITY: 'security',
    COMPLIANCE: 'compliance',
    AUDIT: 'audit',
    USER: 'user',
    ADMIN: 'admin',
    PRODUCT: 'product',
    ORDER: 'order',
    PAYMENT: 'payment',
    INVENTORY: 'inventory',
    SALES: 'sales',
    MARKETING: 'marketing',
    SUPPORT: 'support',
    LOGISTICS: 'logistics',
    VENDOR: 'vendor',
    CUSTOM: 'custom',
  },

  // Report formats
  FORMATS: {
    PDF: 'pdf',
    CSV: 'csv',
    EXCEL: 'excel',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    MARKDOWN: 'markdown',
    TEXT: 'text',
    PNG: 'png',
    JPEG: 'jpeg',
    SVG: 'svg',
    PPT: 'ppt',
    DOC: 'doc',
  },

  // Report statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    GENERATING: 'generating',
    GENERATED: 'generated',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    SHARED: 'shared',
    EXPORTED: 'exported',
    EMAILED: 'emailed',
    VIEWED: 'viewed',
    DOWNLOADED: 'downloaded',
  },

  // Report priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    CRITICAL: 'critical',
  },

  // Report frequencies
  FREQUENCIES: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    SEMI_ANNUAL: 'semi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
    REAL_TIME: 'real_time',
    HOURLY: 'hourly',
  },

  // Report categories
  CATEGORIES: {
    BUSINESS: 'business',
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',
    ANALYTICAL: 'analytical',
    ADMINISTRATIVE: 'administrative',
    COMPLIANCE: 'compliance',
    SECURITY: 'security',
    PERFORMANCE: 'performance',
    MARKETING: 'marketing',
    SALES: 'sales',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    INVENTORY: 'inventory',
    LOGISTICS: 'logistics',
    HR: 'hr',
  },

  // Report scopes
  SCOPES: {
    SYSTEM: 'system',
    GLOBAL: 'global',
    REGIONAL: 'regional',
    DEPARTMENT: 'department',
    TEAM: 'team',
    USER: 'user',
    ORGANIZATION: 'organization',
  },

  // Report delivery methods
  DELIVERY: {
    EMAIL: 'email',
    DASHBOARD: 'dashboard',
    DOWNLOAD: 'download',
    WEBHOOK: 'webhook',
    API: 'api',
    FTP: 'ftp',
    S3: 's3',
    SLACK: 'slack',
    TEAMS: 'teams',
  },

  // Report timeframes
  TIMEFRAMES: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
    ALL_TIME: 'all_time',
  },
} as const;

export type AdminReportType = (typeof ADMIN_REPORT.TYPES)[keyof typeof ADMIN_REPORT.TYPES];
export type AdminReportFormat = (typeof ADMIN_REPORT.FORMATS)[keyof typeof ADMIN_REPORT.FORMATS];
export type AdminReportStatus = (typeof ADMIN_REPORT.STATUSES)[keyof typeof ADMIN_REPORT.STATUSES];
export type AdminReportPriority =
  (typeof ADMIN_REPORT.PRIORITIES)[keyof typeof ADMIN_REPORT.PRIORITIES];
export type AdminReportFrequency =
  (typeof ADMIN_REPORT.FREQUENCIES)[keyof typeof ADMIN_REPORT.FREQUENCIES];
export type AdminReportCategory =
  (typeof ADMIN_REPORT.CATEGORIES)[keyof typeof ADMIN_REPORT.CATEGORIES];
export type AdminReportScope = (typeof ADMIN_REPORT.SCOPES)[keyof typeof ADMIN_REPORT.SCOPES];
export type AdminReportDelivery =
  (typeof ADMIN_REPORT.DELIVERY)[keyof typeof ADMIN_REPORT.DELIVERY];
export type AdminReportTimeframe =
  (typeof ADMIN_REPORT.TIMEFRAMES)[keyof typeof ADMIN_REPORT.TIMEFRAMES];

export const ADMIN_REPORT_TYPE_LABELS: Record<AdminReportType, string> = {
  [ADMIN_REPORT.TYPES.SUMMARY]: 'Summary Report',
  [ADMIN_REPORT.TYPES.DETAILED]: 'Detailed Report',
  [ADMIN_REPORT.TYPES.ANALYTICAL]: 'Analytical Report',
  [ADMIN_REPORT.TYPES.COMPARATIVE]: 'Comparative Report',
  [ADMIN_REPORT.TYPES.TREND]: 'Trend Report',
  [ADMIN_REPORT.TYPES.FORECAST]: 'Forecast Report',
  [ADMIN_REPORT.TYPES.PERFORMANCE]: 'Performance Report',
  [ADMIN_REPORT.TYPES.FINANCIAL]: 'Financial Report',
  [ADMIN_REPORT.TYPES.OPERATIONAL]: 'Operational Report',
  [ADMIN_REPORT.TYPES.SECURITY]: 'Security Report',
  [ADMIN_REPORT.TYPES.COMPLIANCE]: 'Compliance Report',
  [ADMIN_REPORT.TYPES.AUDIT]: 'Audit Report',
  [ADMIN_REPORT.TYPES.USER]: 'User Report',
  [ADMIN_REPORT.TYPES.ADMIN]: 'Admin Report',
  [ADMIN_REPORT.TYPES.PRODUCT]: 'Product Report',
  [ADMIN_REPORT.TYPES.ORDER]: 'Order Report',
  [ADMIN_REPORT.TYPES.PAYMENT]: 'Payment Report',
  [ADMIN_REPORT.TYPES.INVENTORY]: 'Inventory Report',
  [ADMIN_REPORT.TYPES.SALES]: 'Sales Report',
  [ADMIN_REPORT.TYPES.MARKETING]: 'Marketing Report',
  [ADMIN_REPORT.TYPES.SUPPORT]: 'Support Report',
  [ADMIN_REPORT.TYPES.LOGISTICS]: 'Logistics Report',
  [ADMIN_REPORT.TYPES.VENDOR]: 'Vendor Report',
  [ADMIN_REPORT.TYPES.CUSTOM]: 'Custom Report',
};

export const ADMIN_REPORT_TYPE_ICONS: Record<AdminReportType, string> = {
  [ADMIN_REPORT.TYPES.SUMMARY]: '📊',
  [ADMIN_REPORT.TYPES.DETAILED]: '📋',
  [ADMIN_REPORT.TYPES.ANALYTICAL]: '📈',
  [ADMIN_REPORT.TYPES.COMPARATIVE]: '📊',
  [ADMIN_REPORT.TYPES.TREND]: '📉',
  [ADMIN_REPORT.TYPES.FORECAST]: '🔮',
  [ADMIN_REPORT.TYPES.PERFORMANCE]: '⚡',
  [ADMIN_REPORT.TYPES.FINANCIAL]: '💰',
  [ADMIN_REPORT.TYPES.OPERATIONAL]: '⚙️',
  [ADMIN_REPORT.TYPES.SECURITY]: '🔐',
  [ADMIN_REPORT.TYPES.COMPLIANCE]: '📜',
  [ADMIN_REPORT.TYPES.AUDIT]: '🔍',
  [ADMIN_REPORT.TYPES.USER]: '👤',
  [ADMIN_REPORT.TYPES.ADMIN]: '👥',
  [ADMIN_REPORT.TYPES.PRODUCT]: '📦',
  [ADMIN_REPORT.TYPES.ORDER]: '🛍️',
  [ADMIN_REPORT.TYPES.PAYMENT]: '💳',
  [ADMIN_REPORT.TYPES.INVENTORY]: '📦',
  [ADMIN_REPORT.TYPES.SALES]: '📈',
  [ADMIN_REPORT.TYPES.MARKETING]: '📣',
  [ADMIN_REPORT.TYPES.SUPPORT]: '🎧',
  [ADMIN_REPORT.TYPES.LOGISTICS]: '🚚',
  [ADMIN_REPORT.TYPES.VENDOR]: '🏢',
  [ADMIN_REPORT.TYPES.CUSTOM]: '🛠️',
};

export const ADMIN_REPORT_FORMAT_LABELS: Record<AdminReportFormat, string> = {
  [ADMIN_REPORT.FORMATS.PDF]: 'PDF',
  [ADMIN_REPORT.FORMATS.CSV]: 'CSV',
  [ADMIN_REPORT.FORMATS.EXCEL]: 'Excel',
  [ADMIN_REPORT.FORMATS.JSON]: 'JSON',
  [ADMIN_REPORT.FORMATS.XML]: 'XML',
  [ADMIN_REPORT.FORMATS.HTML]: 'HTML',
  [ADMIN_REPORT.FORMATS.MARKDOWN]: 'Markdown',
  [ADMIN_REPORT.FORMATS.TEXT]: 'Text',
  [ADMIN_REPORT.FORMATS.PNG]: 'PNG',
  [ADMIN_REPORT.FORMATS.JPEG]: 'JPEG',
  [ADMIN_REPORT.FORMATS.SVG]: 'SVG',
  [ADMIN_REPORT.FORMATS.PPT]: 'PowerPoint',
  [ADMIN_REPORT.FORMATS.DOC]: 'Word',
};

export const ADMIN_REPORT_STATUS_LABELS: Record<AdminReportStatus, string> = {
  [ADMIN_REPORT.STATUSES.DRAFT]: 'Draft',
  [ADMIN_REPORT.STATUSES.PENDING]: 'Pending',
  [ADMIN_REPORT.STATUSES.GENERATING]: 'Generating',
  [ADMIN_REPORT.STATUSES.GENERATED]: 'Generated',
  [ADMIN_REPORT.STATUSES.FAILED]: 'Failed',
  [ADMIN_REPORT.STATUSES.SCHEDULED]: 'Scheduled',
  [ADMIN_REPORT.STATUSES.PROCESSING]: 'Processing',
  [ADMIN_REPORT.STATUSES.COMPLETED]: 'Completed',
  [ADMIN_REPORT.STATUSES.CANCELLED]: 'Cancelled',
  [ADMIN_REPORT.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_REPORT.STATUSES.ARCHIVED]: 'Archived',
  [ADMIN_REPORT.STATUSES.DELETED]: 'Deleted',
  [ADMIN_REPORT.STATUSES.SHARED]: 'Shared',
  [ADMIN_REPORT.STATUSES.EXPORTED]: 'Exported',
  [ADMIN_REPORT.STATUSES.EMAILED]: 'Emailed',
  [ADMIN_REPORT.STATUSES.VIEWED]: 'Viewed',
  [ADMIN_REPORT.STATUSES.DOWNLOADED]: 'Downloaded',
};

export const ADMIN_REPORT_STATUS_COLORS: Record<AdminReportStatus, string> = {
  [ADMIN_REPORT.STATUSES.DRAFT]: '#9CA3AF',
  [ADMIN_REPORT.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_REPORT.STATUSES.GENERATING]: '#3B82F6',
  [ADMIN_REPORT.STATUSES.GENERATED]: '#34D399',
  [ADMIN_REPORT.STATUSES.FAILED]: '#EF4444',
  [ADMIN_REPORT.STATUSES.SCHEDULED]: '#6366F1',
  [ADMIN_REPORT.STATUSES.PROCESSING]: '#8B5CF6',
  [ADMIN_REPORT.STATUSES.COMPLETED]: '#10B981',
  [ADMIN_REPORT.STATUSES.CANCELLED]: '#6B7280',
  [ADMIN_REPORT.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_REPORT.STATUSES.ARCHIVED]: '#6B7280',
  [ADMIN_REPORT.STATUSES.DELETED]: '#DC2626',
  [ADMIN_REPORT.STATUSES.SHARED]: '#8B5CF6',
  [ADMIN_REPORT.STATUSES.EXPORTED]: '#34D399',
  [ADMIN_REPORT.STATUSES.EMAILED]: '#34D399',
  [ADMIN_REPORT.STATUSES.VIEWED]: '#60A5FA',
  [ADMIN_REPORT.STATUSES.DOWNLOADED]: '#3B82F6',
};

export const ADMIN_REPORT_PRIORITY_LABELS: Record<AdminReportPriority, string> = {
  [ADMIN_REPORT.PRIORITIES.LOW]: 'Low',
  [ADMIN_REPORT.PRIORITIES.MEDIUM]: 'Medium',
  [ADMIN_REPORT.PRIORITIES.HIGH]: 'High',
  [ADMIN_REPORT.PRIORITIES.URGENT]: 'Urgent',
  [ADMIN_REPORT.PRIORITIES.CRITICAL]: 'Critical',
};

export const ADMIN_REPORT_PRIORITY_LEVELS: Record<AdminReportPriority, number> = {
  [ADMIN_REPORT.PRIORITIES.LOW]: 1,
  [ADMIN_REPORT.PRIORITIES.MEDIUM]: 2,
  [ADMIN_REPORT.PRIORITIES.HIGH]: 3,
  [ADMIN_REPORT.PRIORITIES.URGENT]: 4,
  [ADMIN_REPORT.PRIORITIES.CRITICAL]: 5,
};

export const ADMIN_REPORT_FREQUENCY_LABELS: Record<AdminReportFrequency, string> = {
  [ADMIN_REPORT.FREQUENCIES.ONCE]: 'Once',
  [ADMIN_REPORT.FREQUENCIES.DAILY]: 'Daily',
  [ADMIN_REPORT.FREQUENCIES.WEEKLY]: 'Weekly',
  [ADMIN_REPORT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
  [ADMIN_REPORT.FREQUENCIES.MONTHLY]: 'Monthly',
  [ADMIN_REPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
  [ADMIN_REPORT.FREQUENCIES.SEMI_ANNUAL]: 'Semi-Annual',
  [ADMIN_REPORT.FREQUENCIES.ANNUAL]: 'Annual',
  [ADMIN_REPORT.FREQUENCIES.CUSTOM]: 'Custom',
  [ADMIN_REPORT.FREQUENCIES.REAL_TIME]: 'Real-Time',
  [ADMIN_REPORT.FREQUENCIES.HOURLY]: 'Hourly',
};

export const ADMIN_REPORT_CATEGORY_LABELS: Record<AdminReportCategory, string> = {
  [ADMIN_REPORT.CATEGORIES.BUSINESS]: 'Business',
  [ADMIN_REPORT.CATEGORIES.OPERATIONAL]: 'Operational',
  [ADMIN_REPORT.CATEGORIES.FINANCIAL]: 'Financial',
  [ADMIN_REPORT.CATEGORIES.ANALYTICAL]: 'Analytical',
  [ADMIN_REPORT.CATEGORIES.ADMINISTRATIVE]: 'Administrative',
  [ADMIN_REPORT.CATEGORIES.COMPLIANCE]: 'Compliance',
  [ADMIN_REPORT.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_REPORT.CATEGORIES.PERFORMANCE]: 'Performance',
  [ADMIN_REPORT.CATEGORIES.MARKETING]: 'Marketing',
  [ADMIN_REPORT.CATEGORIES.SALES]: 'Sales',
  [ADMIN_REPORT.CATEGORIES.CUSTOMER]: 'Customer',
  [ADMIN_REPORT.CATEGORIES.PRODUCT]: 'Product',
  [ADMIN_REPORT.CATEGORIES.INVENTORY]: 'Inventory',
  [ADMIN_REPORT.CATEGORIES.LOGISTICS]: 'Logistics',
  [ADMIN_REPORT.CATEGORIES.HR]: 'Human Resources',
};

export const ADMIN_REPORT_SCOPE_LABELS: Record<AdminReportScope, string> = {
  [ADMIN_REPORT.SCOPES.SYSTEM]: 'System',
  [ADMIN_REPORT.SCOPES.GLOBAL]: 'Global',
  [ADMIN_REPORT.SCOPES.REGIONAL]: 'Regional',
  [ADMIN_REPORT.SCOPES.DEPARTMENT]: 'Department',
  [ADMIN_REPORT.SCOPES.TEAM]: 'Team',
  [ADMIN_REPORT.SCOPES.USER]: 'User',
  [ADMIN_REPORT.SCOPES.ORGANIZATION]: 'Organization',
};

export const ADMIN_REPORT_DELIVERY_LABELS: Record<AdminReportDelivery, string> = {
  [ADMIN_REPORT.DELIVERY.EMAIL]: 'Email',
  [ADMIN_REPORT.DELIVERY.DASHBOARD]: 'Dashboard',
  [ADMIN_REPORT.DELIVERY.DOWNLOAD]: 'Download',
  [ADMIN_REPORT.DELIVERY.WEBHOOK]: 'Webhook',
  [ADMIN_REPORT.DELIVERY.API]: 'API',
  [ADMIN_REPORT.DELIVERY.FTP]: 'FTP',
  [ADMIN_REPORT.DELIVERY.S3]: 'S3',
  [ADMIN_REPORT.DELIVERY.SLACK]: 'Slack',
  [ADMIN_REPORT.DELIVERY.TEAMS]: 'Teams',
};

export const ADMIN_REPORT_TIMEFRAME_LABELS: Record<AdminReportTimeframe, string> = {
  [ADMIN_REPORT.TIMEFRAMES.TODAY]: 'Today',
  [ADMIN_REPORT.TIMEFRAMES.YESTERDAY]: 'Yesterday',
  [ADMIN_REPORT.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
  [ADMIN_REPORT.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
  [ADMIN_REPORT.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
  [ADMIN_REPORT.TIMEFRAMES.THIS_MONTH]: 'This Month',
  [ADMIN_REPORT.TIMEFRAMES.LAST_MONTH]: 'Last Month',
  [ADMIN_REPORT.TIMEFRAMES.THIS_QUARTER]: 'This Quarter',
  [ADMIN_REPORT.TIMEFRAMES.LAST_QUARTER]: 'Last Quarter',
  [ADMIN_REPORT.TIMEFRAMES.THIS_YEAR]: 'This Year',
  [ADMIN_REPORT.TIMEFRAMES.LAST_YEAR]: 'Last Year',
  [ADMIN_REPORT.TIMEFRAMES.CUSTOM]: 'Custom',
  [ADMIN_REPORT.TIMEFRAMES.ALL_TIME]: 'All Time',
};

export function getAdminReportTypeLabel(type: AdminReportType): string {
  return ADMIN_REPORT_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminReportTypeIcon(type: AdminReportType): string {
  return ADMIN_REPORT_TYPE_ICONS[type] || '❓';
}

export function getAdminReportFormatLabel(format: AdminReportFormat): string {
  return ADMIN_REPORT_FORMAT_LABELS[format] || 'Unknown Format';
}

export function getAdminReportStatusLabel(status: AdminReportStatus): string {
  return ADMIN_REPORT_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminReportStatusColor(status: AdminReportStatus): string {
  return ADMIN_REPORT_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminReportPriorityLabel(priority: AdminReportPriority): string {
  return ADMIN_REPORT_PRIORITY_LABELS[priority] || 'Unknown Priority';
}

export function getAdminReportPriorityLevel(priority: AdminReportPriority): number {
  return ADMIN_REPORT_PRIORITY_LEVELS[priority] || 0;
}

export function getAdminReportFrequencyLabel(frequency: AdminReportFrequency): string {
  return ADMIN_REPORT_FREQUENCY_LABELS[frequency] || 'Unknown Frequency';
}

export function getAdminReportCategoryLabel(category: AdminReportCategory): string {
  return ADMIN_REPORT_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function getAdminReportScopeLabel(scope: AdminReportScope): string {
  return ADMIN_REPORT_SCOPE_LABELS[scope] || 'Unknown Scope';
}

export function getAdminReportDeliveryLabel(delivery: AdminReportDelivery): string {
  return ADMIN_REPORT_DELIVERY_LABELS[delivery] || 'Unknown Delivery';
}

export function getAdminReportTimeframeLabel(timeframe: AdminReportTimeframe): string {
  return ADMIN_REPORT_TIMEFRAME_LABELS[timeframe] || 'Unknown Timeframe';
}

export function isReportGenerated(status: AdminReportStatus): boolean {
  return (
    status === ADMIN_REPORT.STATUSES.GENERATED ||
    status === ADMIN_REPORT.STATUSES.COMPLETED ||
    status === ADMIN_REPORT.STATUSES.SHARED ||
    status === ADMIN_REPORT.STATUSES.EXPORTED ||
    status === ADMIN_REPORT.STATUSES.EMAILED
  );
}

export function isReportProcessing(status: AdminReportStatus): boolean {
  return (
    status === ADMIN_REPORT.STATUSES.PENDING ||
    status === ADMIN_REPORT.STATUSES.GENERATING ||
    status === ADMIN_REPORT.STATUSES.PROCESSING ||
    status === ADMIN_REPORT.STATUSES.SCHEDULED
  );
}

export function isReportFailed(status: AdminReportStatus): boolean {
  return (
    status === ADMIN_REPORT.STATUSES.FAILED ||
    status === ADMIN_REPORT.STATUSES.CANCELLED ||
    status === ADMIN_REPORT.STATUSES.EXPIRED
  );
}

export function isReportTerminal(status: AdminReportStatus): boolean {
  return (
    isReportGenerated(status) ||
    isReportFailed(status) ||
    status === ADMIN_REPORT.STATUSES.ARCHIVED ||
    status === ADMIN_REPORT.STATUSES.DELETED
  );
}
