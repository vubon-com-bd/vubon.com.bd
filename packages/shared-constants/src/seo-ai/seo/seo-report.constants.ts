/**
 * ডিফল্ট রিপোর্ট ফরম্যাট (PDF)
 */
export const SEO_REPORT_DEFAULT_FORMAT = 'pdf' as const;

/**
 * সর্বোচ্চ পেজ সংখ্যা (১০০)
 */
export const SEO_REPORT_MAX_PAGES = 100 as const;

/**
 * রিপোর্ট সেকশনের তালিকা
 */
export const SEO_REPORT_SECTIONS = [
  'executive-summary',
  'overview',
  'traffic-analysis',
  'keyword-performance',
  'ranking-analysis',
  'backlink-profile',
  'content-performance',
  'technical-seo',
  'competitor-analysis',
  'recommendations',
  'appendix',
] as const;

/**
 * SEO_REPORT_SECTIONS থেকে টাইপ
 */
export type SEOReportSection = (typeof SEO_REPORT_SECTIONS)[number];

/**
 * রিপোর্ট ফরম্যাট এনাম
 */
export const SEO_REPORT_FORMAT = {
  PDF: 'pdf',
  HTML: 'html',
  DOCX: 'docx',
  CSV: 'csv',
  JSON: 'json',
} as const;

/**
 * SEO_REPORT_FORMAT থেকে টাইপ
 */
export type SEOReportFormat = (typeof SEO_REPORT_FORMAT)[keyof typeof SEO_REPORT_FORMAT];

/**
 * রিপোর্ট ফরম্যাট লেবেল
 */
export const SEO_REPORT_FORMAT_LABELS: Record<SEOReportFormat, string> = {
  [SEO_REPORT_FORMAT.PDF]: 'PDF Document',
  [SEO_REPORT_FORMAT.HTML]: 'HTML Document',
  [SEO_REPORT_FORMAT.DOCX]: 'Word Document',
  [SEO_REPORT_FORMAT.CSV]: 'CSV Data',
  [SEO_REPORT_FORMAT.JSON]: 'JSON Data',
} as const;

/**
 * রিপোর্ট ফরম্যাট এক্সটেনশন
 */
export const SEO_REPORT_FORMAT_EXTENSION: Record<SEOReportFormat, string> = {
  [SEO_REPORT_FORMAT.PDF]: '.pdf',
  [SEO_REPORT_FORMAT.HTML]: '.html',
  [SEO_REPORT_FORMAT.DOCX]: '.docx',
  [SEO_REPORT_FORMAT.CSV]: '.csv',
  [SEO_REPORT_FORMAT.JSON]: '.json',
} as const;

/**
 * রিপোর্ট ফরম্যাট MIME টাইপ
 */
export const SEO_REPORT_FORMAT_MIME: Record<SEOReportFormat, string> = {
  [SEO_REPORT_FORMAT.PDF]: 'application/pdf',
  [SEO_REPORT_FORMAT.HTML]: 'text/html',
  [SEO_REPORT_FORMAT.DOCX]:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  [SEO_REPORT_FORMAT.CSV]: 'text/csv',
  [SEO_REPORT_FORMAT.JSON]: 'application/json',
} as const;

/**
 * রিপোর্ট টাইপ এনাম
 */
export const SEO_REPORT_TYPE = {
  STANDARD: 'standard',
  EXECUTIVE: 'executive',
  TECHNICAL: 'technical',
  COMPETITOR: 'competitor',
  CONTENT: 'content',
  KEYWORD: 'keyword',
  LINK: 'link',
  CUSTOM: 'custom',
} as const;

/**
 * SEO_REPORT_TYPE থেকে টাইপ
 */
export type SEOReportType = (typeof SEO_REPORT_TYPE)[keyof typeof SEO_REPORT_TYPE];

/**
 * রিপোর্ট টাইপ লেবেল
 */
export const SEO_REPORT_TYPE_LABELS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.STANDARD]: 'Standard Report',
  [SEO_REPORT_TYPE.EXECUTIVE]: 'Executive Report',
  [SEO_REPORT_TYPE.TECHNICAL]: 'Technical Report',
  [SEO_REPORT_TYPE.COMPETITOR]: 'Competitor Report',
  [SEO_REPORT_TYPE.CONTENT]: 'Content Report',
  [SEO_REPORT_TYPE.KEYWORD]: 'Keyword Report',
  [SEO_REPORT_TYPE.LINK]: 'Link Report',
  [SEO_REPORT_TYPE.CUSTOM]: 'Custom Report',
} as const;

/**
 * রিপোর্ট টাইপ বিবরণ
 */
export const SEO_REPORT_TYPE_DESCRIPTIONS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.STANDARD]: 'Comprehensive standard SEO report',
  [SEO_REPORT_TYPE.EXECUTIVE]: 'High-level executive summary report',
  [SEO_REPORT_TYPE.TECHNICAL]: 'In-depth technical SEO analysis report',
  [SEO_REPORT_TYPE.COMPETITOR]: 'Competitor analysis and benchmarking report',
  [SEO_REPORT_TYPE.CONTENT]: 'Content performance and optimization report',
  [SEO_REPORT_TYPE.KEYWORD]: 'Keyword research and performance report',
  [SEO_REPORT_TYPE.LINK]: 'Link profile and backlink analysis report',
  [SEO_REPORT_TYPE.CUSTOM]: 'Customized report with specific sections',
} as const;

/**
 * রিপোর্ট টাইপ আইকন
 */
export const SEO_REPORT_TYPE_ICONS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.STANDARD]: '📊',
  [SEO_REPORT_TYPE.EXECUTIVE]: '📋',
  [SEO_REPORT_TYPE.TECHNICAL]: '⚙️',
  [SEO_REPORT_TYPE.COMPETITOR]: '🏁',
  [SEO_REPORT_TYPE.CONTENT]: '📝',
  [SEO_REPORT_TYPE.KEYWORD]: '🔑',
  [SEO_REPORT_TYPE.LINK]: '🔗',
  [SEO_REPORT_TYPE.CUSTOM]: '🎯',
} as const;

/**
 * রিপোর্ট টাইপ কালার (হেক্স কোড)
 */
export const SEO_REPORT_TYPE_COLORS: Record<SEOReportType, string> = {
  [SEO_REPORT_TYPE.STANDARD]: '#3b82f6', // Blue-500
  [SEO_REPORT_TYPE.EXECUTIVE]: '#8b5cf6', // Violet-500
  [SEO_REPORT_TYPE.TECHNICAL]: '#dc2626', // Red-600
  [SEO_REPORT_TYPE.COMPETITOR]: '#f59e0b', // Amber-500
  [SEO_REPORT_TYPE.CONTENT]: '#22c55e', // Green-500
  [SEO_REPORT_TYPE.KEYWORD]: '#ec4899', // Pink-500
  [SEO_REPORT_TYPE.LINK]: '#06b6d4', // Cyan-500
  [SEO_REPORT_TYPE.CUSTOM]: '#f97316', // Orange-500
} as const;

/**
 * রিপোর্ট সেকশন লেবেল
 */
export const SEO_REPORT_SECTION_LABELS: Record<SEOReportSection, string> = {
  'executive-summary': 'Executive Summary',
  overview: 'Overview',
  'traffic-analysis': 'Traffic Analysis',
  'keyword-performance': 'Keyword Performance',
  'ranking-analysis': 'Ranking Analysis',
  'backlink-profile': 'Backlink Profile',
  'content-performance': 'Content Performance',
  'technical-seo': 'Technical SEO',
  'competitor-analysis': 'Competitor Analysis',
  recommendations: 'Recommendations',
  appendix: 'Appendix',
} as const;

/**
 * রিপোর্ট সেকশন বিবরণ
 */
export const SEO_REPORT_SECTION_DESCRIPTIONS: Record<SEOReportSection, string> = {
  'executive-summary': 'High-level overview of key findings and recommendations',
  overview: 'General overview of SEO performance and metrics',
  'traffic-analysis': 'Analysis of organic traffic trends and patterns',
  'keyword-performance': 'Performance analysis of target keywords',
  'ranking-analysis': 'Analysis of search engine rankings',
  'backlink-profile': 'Analysis of backlink profile and link quality',
  'content-performance': 'Performance analysis of content assets',
  'technical-seo': 'Technical SEO audit and recommendations',
  'competitor-analysis': 'Comparison with competitor performance',
  recommendations: 'Actionable recommendations for improvement',
  appendix: 'Additional data and supporting information',
} as const;

/**
 * রিপোর্ট সেকশন আইকন
 */
export const SEO_REPORT_SECTION_ICONS: Record<SEOReportSection, string> = {
  'executive-summary': '📋',
  overview: '📊',
  'traffic-analysis': '🚗',
  'keyword-performance': '🔑',
  'ranking-analysis': '🎯',
  'backlink-profile': '🔗',
  'content-performance': '📝',
  'technical-seo': '⚙️',
  'competitor-analysis': '🏁',
  recommendations: '💡',
  appendix: '📎',
} as const;

/**
 * রিপোর্ট ফ্রিকোয়েন্সি
 */
export const SEO_REPORT_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BI_WEEKLY: 'bi-weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ON_DEMAND: 'on-demand',
} as const;

/**
 * SEO_REPORT_FREQUENCY থেকে টাইপ
 */
export type SEOReportFrequency = (typeof SEO_REPORT_FREQUENCY)[keyof typeof SEO_REPORT_FREQUENCY];

/**
 * রিপোর্ট ফ্রিকোয়েন্সি লেবেল
 */
export const SEO_REPORT_FREQUENCY_LABELS: Record<SEOReportFrequency, string> = {
  [SEO_REPORT_FREQUENCY.DAILY]: 'Daily',
  [SEO_REPORT_FREQUENCY.WEEKLY]: 'Weekly',
  [SEO_REPORT_FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
  [SEO_REPORT_FREQUENCY.MONTHLY]: 'Monthly',
  [SEO_REPORT_FREQUENCY.QUARTERLY]: 'Quarterly',
  [SEO_REPORT_FREQUENCY.YEARLY]: 'Yearly',
  [SEO_REPORT_FREQUENCY.ON_DEMAND]: 'On Demand',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস
 */
export const SEO_REPORT_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  DELETED: 'deleted',
} as const;

/**
 * SEO_REPORT_STATUS থেকে টাইপ
 */
export type SEOReportStatus = (typeof SEO_REPORT_STATUS)[keyof typeof SEO_REPORT_STATUS];

/**
 * রিপোর্ট স্ট্যাটাস লেবেল
 */
export const SEO_REPORT_STATUS_LABELS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: 'Pending',
  [SEO_REPORT_STATUS.GENERATING]: 'Generating',
  [SEO_REPORT_STATUS.COMPLETED]: 'Completed',
  [SEO_REPORT_STATUS.FAILED]: 'Failed',
  [SEO_REPORT_STATUS.DELETED]: 'Deleted',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস কালার
 */
export const SEO_REPORT_STATUS_COLORS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: '#94a3b8', // Slate-400
  [SEO_REPORT_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [SEO_REPORT_STATUS.COMPLETED]: '#22c55e', // Green-500
  [SEO_REPORT_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_REPORT_STATUS.DELETED]: '#64748b', // Slate-500
} as const;

/**
 * রিপোর্ট কনফিগারেশন
 */
export interface SEOReportConfig {
  defaultFormat: SEOReportFormat;
  maxPages: number;
  sections: SEOReportSection[];
  includeCharts: boolean;
  includeTables: boolean;
  includeImages: boolean;
  includeRecommendations: boolean;
}

/**
 * রিপোর্ট ডিফল্ট কনফিগারেশন
 */
export const SEO_REPORT_DEFAULT_CONFIG: SEOReportConfig = {
  defaultFormat: SEO_REPORT_DEFAULT_FORMAT as SEOReportFormat,
  maxPages: SEO_REPORT_MAX_PAGES,
  sections: SEO_REPORT_SECTIONS as unknown as SEOReportSection[],
  includeCharts: true,
  includeTables: true,
  includeImages: true,
  includeRecommendations: true,
} as const;

/**
 * রিপোর্ট ফিল্টার
 */
export interface SEOReportFilter {
  type?: SEOReportType;
  format?: SEOReportFormat;
  status?: SEOReportStatus;
  frequency?: SEOReportFrequency;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

/**
 * রিপোর্ট ডেটা
 */
export interface SEOReportData {
  id: string;
  title: string;
  type: SEOReportType;
  format: SEOReportFormat;
  status: SEOReportStatus;
  frequency: SEOReportFrequency;
  sections: SEOReportSection[];
  pages: number;
  size: number; // KB
  url: string;
  generatedAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
}

/**
 * রিপোর্ট রেসপন্স
 */
export interface SEOReportResponse {
  data: SEOReportData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
