/**
 * ডিফল্ট অডিট স্কোপ
 */
export const SEO_AUDIT_DEFAULT_SCOPE = 'full' as const;

/**
 * সর্বোচ্চ পেজ সংখ্যা (১০০০)
 */
export const SEO_AUDIT_MAX_PAGES = 1000 as const;

/**
 * ক্রল ডেপথ (৫)
 */
export const SEO_AUDIT_CRAWL_DEPTH = 5 as const;

/**
 * SEO অডিট স্কোপ এনাম
 */
export const SEO_AUDIT_SCOPE = {
  FULL: 'full',
  QUICK: 'quick',
  TECHNICAL: 'technical',
  CONTENT: 'content',
  BACKLINK: 'backlink',
  LOCAL: 'local',
  ECOMMERCE: 'ecommerce',
  CUSTOM: 'custom',
} as const;

/**
 * SEO_AUDIT_SCOPE থেকে টাইপ
 */
export type SEOAuditScope = (typeof SEO_AUDIT_SCOPE)[keyof typeof SEO_AUDIT_SCOPE];

/**
 * SEO অডিট স্কোপ লেবেল
 */
export const SEO_AUDIT_SCOPE_LABELS: Record<SEOAuditScope, string> = {
  [SEO_AUDIT_SCOPE.FULL]: 'Full Audit',
  [SEO_AUDIT_SCOPE.QUICK]: 'Quick Audit',
  [SEO_AUDIT_SCOPE.TECHNICAL]: 'Technical Audit',
  [SEO_AUDIT_SCOPE.CONTENT]: 'Content Audit',
  [SEO_AUDIT_SCOPE.BACKLINK]: 'Backlink Audit',
  [SEO_AUDIT_SCOPE.LOCAL]: 'Local SEO Audit',
  [SEO_AUDIT_SCOPE.ECOMMERCE]: 'E-commerce Audit',
  [SEO_AUDIT_SCOPE.CUSTOM]: 'Custom Audit',
} as const;

/**
 * SEO অডিট স্কোপ বিবরণ
 */
export const SEO_AUDIT_SCOPE_DESCRIPTIONS: Record<SEOAuditScope, string> = {
  [SEO_AUDIT_SCOPE.FULL]: 'Comprehensive audit covering all aspects of SEO',
  [SEO_AUDIT_SCOPE.QUICK]: 'Rapid audit focusing on critical issues only',
  [SEO_AUDIT_SCOPE.TECHNICAL]: 'In-depth technical SEO analysis and recommendations',
  [SEO_AUDIT_SCOPE.CONTENT]: 'Content-focused audit for quality and optimization',
  [SEO_AUDIT_SCOPE.BACKLINK]: 'Backlink profile analysis and quality assessment',
  [SEO_AUDIT_SCOPE.LOCAL]: 'Local SEO audit for geographic visibility',
  [SEO_AUDIT_SCOPE.ECOMMERCE]: 'E-commerce specific SEO audit for product pages',
  [SEO_AUDIT_SCOPE.CUSTOM]: 'Customized audit based on specific requirements',
} as const;

/**
 * SEO অডিট স্কোপ আইকন
 */
export const SEO_AUDIT_SCOPE_ICONS: Record<SEOAuditScope, string> = {
  [SEO_AUDIT_SCOPE.FULL]: '🔍',
  [SEO_AUDIT_SCOPE.QUICK]: '⚡',
  [SEO_AUDIT_SCOPE.TECHNICAL]: '⚙️',
  [SEO_AUDIT_SCOPE.CONTENT]: '📝',
  [SEO_AUDIT_SCOPE.BACKLINK]: '🔗',
  [SEO_AUDIT_SCOPE.LOCAL]: '📍',
  [SEO_AUDIT_SCOPE.ECOMMERCE]: '🛒',
  [SEO_AUDIT_SCOPE.CUSTOM]: '🎯',
} as const;

/**
 * SEO অডিট স্ট্যাটাস এনাম
 */
export const SEO_AUDIT_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  ANALYZING: 'analyzing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
  PAUSED: 'paused',
} as const;

/**
 * SEO_AUDIT_STATUS থেকে টাইপ
 */
export type SEOAuditStatus = (typeof SEO_AUDIT_STATUS)[keyof typeof SEO_AUDIT_STATUS];

/**
 * SEO অডিট স্ট্যাটাস লেবেল
 */
export const SEO_AUDIT_STATUS_LABELS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.PENDING]: 'Pending',
  [SEO_AUDIT_STATUS.IN_PROGRESS]: 'In Progress',
  [SEO_AUDIT_STATUS.ANALYZING]: 'Analyzing',
  [SEO_AUDIT_STATUS.COMPLETED]: 'Completed',
  [SEO_AUDIT_STATUS.FAILED]: 'Failed',
  [SEO_AUDIT_STATUS.SCHEDULED]: 'Scheduled',
  [SEO_AUDIT_STATUS.PAUSED]: 'Paused',
} as const;

/**
 * SEO অডিট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_AUDIT_STATUS_COLORS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.PENDING]: '#94a3b8', // Slate-400
  [SEO_AUDIT_STATUS.IN_PROGRESS]: '#3b82f6', // Blue-500
  [SEO_AUDIT_STATUS.ANALYZING]: '#8b5cf6', // Violet-500
  [SEO_AUDIT_STATUS.COMPLETED]: '#22c55e', // Green-500
  [SEO_AUDIT_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_AUDIT_STATUS.SCHEDULED]: '#f59e0b', // Amber-500
  [SEO_AUDIT_STATUS.PAUSED]: '#64748b', // Slate-500
} as const;

/**
 * SEO অডিট রিপোর্ট সেকশনসমূহ
 */
export const SEO_AUDIT_REPORT_SECTIONS = {
  OVERVIEW: 'overview',
  TECHNICAL: 'technical',
  ON_PAGE: 'on-page',
  CONTENT: 'content',
  BACKLINKS: 'backlinks',
  KEYWORDS: 'keywords',
  PERFORMANCE: 'performance',
  MOBILE: 'mobile',
  LOCAL: 'local',
  COMPETITORS: 'competitors',
} as const;

/**
 * SEO_AUDIT_REPORT_SECTIONS থেকে টাইপ
 */
export type SEOAuditReportSection =
  (typeof SEO_AUDIT_REPORT_SECTIONS)[keyof typeof SEO_AUDIT_REPORT_SECTIONS];

/**
 * SEO অডিট রিপোর্ট সেকশন লেবেল
 */
export const SEO_AUDIT_REPORT_SECTION_LABELS: Record<SEOAuditReportSection, string> = {
  [SEO_AUDIT_REPORT_SECTIONS.OVERVIEW]: 'Overview',
  [SEO_AUDIT_REPORT_SECTIONS.TECHNICAL]: 'Technical SEO',
  [SEO_AUDIT_REPORT_SECTIONS.ON_PAGE]: 'On-Page SEO',
  [SEO_AUDIT_REPORT_SECTIONS.CONTENT]: 'Content Analysis',
  [SEO_AUDIT_REPORT_SECTIONS.BACKLINKS]: 'Backlink Profile',
  [SEO_AUDIT_REPORT_SECTIONS.KEYWORDS]: 'Keyword Analysis',
  [SEO_AUDIT_REPORT_SECTIONS.PERFORMANCE]: 'Performance',
  [SEO_AUDIT_REPORT_SECTIONS.MOBILE]: 'Mobile Optimization',
  [SEO_AUDIT_REPORT_SECTIONS.LOCAL]: 'Local SEO',
  [SEO_AUDIT_REPORT_SECTIONS.COMPETITORS]: 'Competitor Analysis',
} as const;

/**
 * SEO অডিট সেভিরিটি লেভেল
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
 * SEO অডিট সেভিরিটি লেবেল
 */
export const SEO_AUDIT_SEVERITY_LABELS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: 'Critical',
  [SEO_AUDIT_SEVERITY.HIGH]: 'High',
  [SEO_AUDIT_SEVERITY.MEDIUM]: 'Medium',
  [SEO_AUDIT_SEVERITY.LOW]: 'Low',
  [SEO_AUDIT_SEVERITY.INFO]: 'Info',
} as const;

/**
 * SEO অডিট সেভিরিটি কালার (হেক্স কোড)
 */
export const SEO_AUDIT_SEVERITY_COLORS: Record<SEOAuditSeverity, string> = {
  [SEO_AUDIT_SEVERITY.CRITICAL]: '#dc2626', // Red-600
  [SEO_AUDIT_SEVERITY.HIGH]: '#f97316', // Orange-500
  [SEO_AUDIT_SEVERITY.MEDIUM]: '#f59e0b', // Amber-500
  [SEO_AUDIT_SEVERITY.LOW]: '#22c55e', // Green-500
  [SEO_AUDIT_SEVERITY.INFO]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO অডিট স্কোর রেঞ্জ
 */
export const SEO_AUDIT_SCORE_RANGE = {
  MIN: 0,
  MAX: 100,
  PASS: 70,
} as const;

/**
 * SEO অডিট কনফিগারেশন
 */
export interface SEOAuditConfig {
  defaultScope: SEOAuditScope;
  maxPages: number;
  crawlDepth: number;
  reportSections: SEOAuditReportSection[];
  includeCompetitors: boolean;
  includeSuggestions: boolean;
  autoSchedule: boolean;
}

/**
 * SEO অডিট ডিফল্ট কনফিগারেশন
 */
export const SEO_AUDIT_DEFAULT_CONFIG: SEOAuditConfig = {
  defaultScope: SEO_AUDIT_DEFAULT_SCOPE as SEOAuditScope,
  maxPages: SEO_AUDIT_MAX_PAGES,
  crawlDepth: SEO_AUDIT_CRAWL_DEPTH,
  reportSections: Object.values(SEO_AUDIT_REPORT_SECTIONS),
  includeCompetitors: true,
  includeSuggestions: true,
  autoSchedule: false,
} as const;

/**
 * SEO অডিট ফিল্টার
 */
export interface SEOAuditFilter {
  scope?: SEOAuditScope;
  status?: SEOAuditStatus;
  severity?: SEOAuditSeverity;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

/**
 * SEO অডিট ইস্যু
 */
export interface SEOAuditIssue {
  id: string;
  title: string;
  description: string;
  severity: SEOAuditSeverity;
  section: SEOAuditReportSection;
  recommendation: string;
  affectedPages: string[];
  score: number;
}

/**
 * SEO অডিট রিপোর্ট
 */
export interface SEOAuditReport {
  id: string;
  url: string;
  scope: SEOAuditScope;
  status: SEOAuditStatus;
  score: number;
  issues: SEOAuditIssue[];
  sections: Record<SEOAuditReportSection, number>;
  generatedAt: Date;
  expiresAt: Date;
}

/**
 * SEO অডিট টাস্ক
 */
export interface SEOAuditTask {
  id: string;
  reportId: string;
  issueId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}
