/**
 * Marketing Report Constants
 * Core marketing report configuration and settings
 */

export const MARKETINGREPORT = {
  // Report Types
  TYPES: {
    CAMPAIGN_PERFORMANCE: 'campaign_performance',
    CHANNEL_PERFORMANCE: 'channel_performance',
    CUSTOMER_INSIGHTS: 'customer_insights',
    SALES_FORECAST: 'sales_forecast',
    ROI_ANALYSIS: 'roi_analysis',
    BUDGET_UTILIZATION: 'budget_utilization',
    CONVERSION_FUNNEL: 'conversion_funnel',
    CUSTOMER_JOURNEY: 'customer_journey',
    MARKETING_ATTRIBUTION: 'marketing_attribution',
    COMPETITIVE_ANALYSIS: 'competitive_analysis',
    SOCIAL_MEDIA_PERFORMANCE: 'social_media_performance',
    EMAIL_MARKETING_PERFORMANCE: 'email_marketing_performance',
    SEO_PERFORMANCE: 'seo_performance',
    CONTENT_PERFORMANCE: 'content_performance',
    LEAD_GENERATION: 'lead_generation',
    CUSTOMER_ACQUISITION: 'customer_acquisition',
    CUSTOMER_RETENTION: 'customer_retention',
    PRODUCT_PERFORMANCE: 'product_performance',
    PRICING_ANALYSIS: 'pricing_analysis',
    MARKET_TRENDS: 'market_trends',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    NPS_ANALYSIS: 'nps_analysis',
    CHURN_ANALYSIS: 'churn_analysis',
    LTV_ANALYSIS: 'ltv_analysis',
    CAC_ANALYSIS: 'cac_analysis',
    CUSTOM: 'custom',
  } as const,

  // Report Categories
  CATEGORIES: {
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
    OPERATIONAL: 'operational',
    MARKETING: 'marketing',
    SALES: 'sales',
    PRODUCT: 'product',
    STRATEGIC: 'strategic',
    TACTICAL: 'tactical',
    ANALYTICAL: 'analytical',
    EXECUTIVE: 'executive',
    CUSTOM: 'custom',
  } as const,

  // Report Frequencies
  FREQUENCIES: {
    REAL_TIME: 'real_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    ON_DEMAND: 'on_demand',
    CUSTOM: 'custom',
  } as const,

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    MARKDOWN: 'markdown',
    DOCX: 'docx',
    PPTX: 'pptx',
    SVG: 'svg',
    PNG: 'png',
    JPEG: 'jpeg',
    TXT: 'txt',
    DASHBOARD: 'dashboard',
    INTERACTIVE: 'interactive',
  } as const,

  // Report Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Report Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    PAUSED: 'paused',
    ON_HOLD: 'on_hold',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
  } as const,

  // Report Delivery Methods
  DELIVERY_METHODS: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    API: 'api',
    WEBHOOK: 'webhook',
    DASHBOARD: 'dashboard',
    FTP: 'ftp',
    S3: 's3',
    PRINT: 'print',
    SHARE: 'share',
  } as const,

  // Report Aggregation Types
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    DISTINCT: 'distinct',
    PERCENTAGE: 'percentage',
    RATE: 'rate',
    MEDIAN: 'median',
    PERCENTILE: 'percentile',
    CUMULATIVE: 'cumulative',
    GROWTH: 'growth',
    TREND: 'trend',
    FORECAST: 'forecast',
  } as const,

  // Report Visualization Types
  VISUALIZATIONS: {
    TABLE: 'table',
    CHART: 'chart',
    GRAPH: 'graph',
    MAP: 'map',
    GAUGE: 'gauge',
    METRIC: 'metric',
    KPI: 'kpi',
    PIVOT: 'pivot',
    CROSS_TAB: 'cross_tab',
    FUNNEL: 'funnel',
    HEATMAP: 'heatmap',
    TREEMAP: 'treemap',
    SANKEY: 'sankey',
    SCATTER: 'scatter',
    BUBBLE: 'bubble',
    RADAR: 'radar',
    POLAR: 'polar',
    WATERFALL: 'waterfall',
    DONUT: 'donut',
    AREA: 'area',
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    HISTOGRAM: 'histogram',
    BOX_PLOT: 'box_plot',
  } as const,

  // Report Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'campaign_performance',
    DEFAULT_CATEGORY: 'performance',
    DEFAULT_FREQUENCY: 'monthly',
    DEFAULT_FORMAT: 'pdf',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_STATUS: 'draft',
    DEFAULT_DELIVERY: 'email',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_LANGUAGE: 'bn',
    DEFAULT_PAGE_SIZE: 50,
    DEFAULT_REFRESH_INTERVAL: 3600,
    MAX_REPORT_HISTORY: 100,
    DEFAULT_RETENTION_DAYS: 365,
    MAX_DATA_POINTS: 10000,
    DEFAULT_RECIPIENTS: [],
    DEFAULT_SUBJECT: 'Marketing Report',
    DEFAULT_BODY: 'Please find the attached marketing report.',
  } as const,

  // Report Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_SUMMARY_LENGTH: 200,
    MAX_RECIPIENTS: 100,
    MAX_TAGS_PER_REPORT: 20,
    MAX_METRICS: 50,
    MAX_DIMENSIONS: 10,
    MAX_FILTERS: 20,
    MAX_SORTS: 5,
    MAX_CHARTS: 10,
    MAX_TABLES: 10,
    MAX_DATA_POINTS: 10000,
    MAX_SCHEDULES: 10,
    MAX_ATTACHMENT_SIZE_MB: 25,
    MAX_REPORT_SIZE_MB: 50,
    MAX_GENERATION_TIME_MIN: 60,
    MAX_HISTORICAL_DAYS: 730,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 1000,
  } as const,
} as const;

// Report Types
export type MarketingReportType =
  (typeof MARKETINGREPORT.TYPES)[keyof typeof MARKETINGREPORT.TYPES];

// Report Categories
export type MarketingReportCategory =
  (typeof MARKETINGREPORT.CATEGORIES)[keyof typeof MARKETINGREPORT.CATEGORIES];

// Report Frequencies
export type MarketingReportFrequency =
  (typeof MARKETINGREPORT.FREQUENCIES)[keyof typeof MARKETINGREPORT.FREQUENCIES];

// Report Formats
export type MarketingReportFormat =
  (typeof MARKETINGREPORT.FORMATS)[keyof typeof MARKETINGREPORT.FORMATS];

// Report Priorities
export type MarketingReportPriority =
  (typeof MARKETINGREPORT.PRIORITIES)[keyof typeof MARKETINGREPORT.PRIORITIES];

// Report Statuses
export type MarketingReportStatus =
  (typeof MARKETINGREPORT.STATUSES)[keyof typeof MARKETINGREPORT.STATUSES];

// Report Delivery Methods
export type MarketingReportDeliveryMethod =
  (typeof MARKETINGREPORT.DELIVERY_METHODS)[keyof typeof MARKETINGREPORT.DELIVERY_METHODS];

// Report Aggregation Types
export type MarketingReportAggregation =
  (typeof MARKETINGREPORT.AGGREGATIONS)[keyof typeof MARKETINGREPORT.AGGREGATIONS];

// Report Visualization Types
export type MarketingReportVisualization =
  (typeof MARKETINGREPORT.VISUALIZATIONS)[keyof typeof MARKETINGREPORT.VISUALIZATIONS];

// Report Defaults
export type MarketingReportDefault =
  (typeof MARKETINGREPORT.DEFAULTS)[keyof typeof MARKETINGREPORT.DEFAULTS];

// Report Limits
export type MarketingReportLimit =
  (typeof MARKETINGREPORT.LIMITS)[keyof typeof MARKETINGREPORT.LIMITS];

// Utility Functions
export function marketingreportGetTypeLabel(type: MarketingReportType): string {
  const labels: Record<MarketingReportType, string> = {
    [MARKETINGREPORT.TYPES.CAMPAIGN_PERFORMANCE]: 'Campaign Performance',
    [MARKETINGREPORT.TYPES.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [MARKETINGREPORT.TYPES.CUSTOMER_INSIGHTS]: 'Customer Insights',
    [MARKETINGREPORT.TYPES.SALES_FORECAST]: 'Sales Forecast',
    [MARKETINGREPORT.TYPES.ROI_ANALYSIS]: 'ROI Analysis',
    [MARKETINGREPORT.TYPES.BUDGET_UTILIZATION]: 'Budget Utilization',
    [MARKETINGREPORT.TYPES.CONVERSION_FUNNEL]: 'Conversion Funnel',
    [MARKETINGREPORT.TYPES.CUSTOMER_JOURNEY]: 'Customer Journey',
    [MARKETINGREPORT.TYPES.MARKETING_ATTRIBUTION]: 'Marketing Attribution',
    [MARKETINGREPORT.TYPES.COMPETITIVE_ANALYSIS]: 'Competitive Analysis',
    [MARKETINGREPORT.TYPES.SOCIAL_MEDIA_PERFORMANCE]: 'Social Media Performance',
    [MARKETINGREPORT.TYPES.EMAIL_MARKETING_PERFORMANCE]: 'Email Marketing Performance',
    [MARKETINGREPORT.TYPES.SEO_PERFORMANCE]: 'SEO Performance',
    [MARKETINGREPORT.TYPES.CONTENT_PERFORMANCE]: 'Content Performance',
    [MARKETINGREPORT.TYPES.LEAD_GENERATION]: 'Lead Generation',
    [MARKETINGREPORT.TYPES.CUSTOMER_ACQUISITION]: 'Customer Acquisition',
    [MARKETINGREPORT.TYPES.CUSTOMER_RETENTION]: 'Customer Retention',
    [MARKETINGREPORT.TYPES.PRODUCT_PERFORMANCE]: 'Product Performance',
    [MARKETINGREPORT.TYPES.PRICING_ANALYSIS]: 'Pricing Analysis',
    [MARKETINGREPORT.TYPES.MARKET_TRENDS]: 'Market Trends',
    [MARKETINGREPORT.TYPES.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [MARKETINGREPORT.TYPES.NPS_ANALYSIS]: 'NPS Analysis',
    [MARKETINGREPORT.TYPES.CHURN_ANALYSIS]: 'Churn Analysis',
    [MARKETINGREPORT.TYPES.LTV_ANALYSIS]: 'LTV Analysis',
    [MARKETINGREPORT.TYPES.CAC_ANALYSIS]: 'CAC Analysis',
    [MARKETINGREPORT.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[type] || 'Unknown Report Type';
}

export function marketingreportGetCategoryLabel(category: MarketingReportCategory): string {
  const labels: Record<MarketingReportCategory, string> = {
    [MARKETINGREPORT.CATEGORIES.PERFORMANCE]: 'Performance',
    [MARKETINGREPORT.CATEGORIES.FINANCIAL]: 'Financial',
    [MARKETINGREPORT.CATEGORIES.CUSTOMER]: 'Customer',
    [MARKETINGREPORT.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGREPORT.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGREPORT.CATEGORIES.SALES]: 'Sales',
    [MARKETINGREPORT.CATEGORIES.PRODUCT]: 'Product',
    [MARKETINGREPORT.CATEGORIES.STRATEGIC]: 'Strategic',
    [MARKETINGREPORT.CATEGORIES.TACTICAL]: 'Tactical',
    [MARKETINGREPORT.CATEGORIES.ANALYTICAL]: 'Analytical',
    [MARKETINGREPORT.CATEGORIES.EXECUTIVE]: 'Executive',
    [MARKETINGREPORT.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingreportGetFrequencyLabel(frequency: MarketingReportFrequency): string {
  const labels: Record<MarketingReportFrequency, string> = {
    [MARKETINGREPORT.FREQUENCIES.REAL_TIME]: 'Real-Time',
    [MARKETINGREPORT.FREQUENCIES.DAILY]: 'Daily',
    [MARKETINGREPORT.FREQUENCIES.WEEKLY]: 'Weekly',
    [MARKETINGREPORT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [MARKETINGREPORT.FREQUENCIES.MONTHLY]: 'Monthly',
    [MARKETINGREPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [MARKETINGREPORT.FREQUENCIES.BI_ANNUAL]: 'Bi-Annual',
    [MARKETINGREPORT.FREQUENCIES.ANNUAL]: 'Annual',
    [MARKETINGREPORT.FREQUENCIES.ON_DEMAND]: 'On-Demand',
    [MARKETINGREPORT.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingreportGetFormatLabel(format: MarketingReportFormat): string {
  const labels: Record<MarketingReportFormat, string> = {
    [MARKETINGREPORT.FORMATS.PDF]: 'PDF',
    [MARKETINGREPORT.FORMATS.EXCEL]: 'Excel',
    [MARKETINGREPORT.FORMATS.CSV]: 'CSV',
    [MARKETINGREPORT.FORMATS.JSON]: 'JSON',
    [MARKETINGREPORT.FORMATS.XML]: 'XML',
    [MARKETINGREPORT.FORMATS.HTML]: 'HTML',
    [MARKETINGREPORT.FORMATS.MARKDOWN]: 'Markdown',
    [MARKETINGREPORT.FORMATS.DOCX]: 'Word Document',
    [MARKETINGREPORT.FORMATS.PPTX]: 'PowerPoint',
    [MARKETINGREPORT.FORMATS.SVG]: 'SVG',
    [MARKETINGREPORT.FORMATS.PNG]: 'PNG Image',
    [MARKETINGREPORT.FORMATS.JPEG]: 'JPEG Image',
    [MARKETINGREPORT.FORMATS.TXT]: 'Text File',
    [MARKETINGREPORT.FORMATS.DASHBOARD]: 'Dashboard',
    [MARKETINGREPORT.FORMATS.INTERACTIVE]: 'Interactive',
  };
  return labels[format] || 'Unknown Format';
}

export function marketingreportGetPriorityLabel(priority: MarketingReportPriority): string {
  const labels: Record<MarketingReportPriority, string> = {
    [MARKETINGREPORT.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGREPORT.PRIORITIES.HIGH]: 'High',
    [MARKETINGREPORT.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGREPORT.PRIORITIES.LOW]: 'Low',
    [MARKETINGREPORT.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingreportGetStatusLabel(status: MarketingReportStatus): string {
  const labels: Record<MarketingReportStatus, string> = {
    [MARKETINGREPORT.STATUSES.DRAFT]: 'Draft',
    [MARKETINGREPORT.STATUSES.PENDING]: 'Pending',
    [MARKETINGREPORT.STATUSES.GENERATING]: 'Generating',
    [MARKETINGREPORT.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGREPORT.STATUSES.FAILED]: 'Failed',
    [MARKETINGREPORT.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGREPORT.STATUSES.ARCHIVED]: 'Archived',
    [MARKETINGREPORT.STATUSES.SCHEDULED]: 'Scheduled',
    [MARKETINGREPORT.STATUSES.IN_PROGRESS]: 'In Progress',
    [MARKETINGREPORT.STATUSES.PAUSED]: 'Paused',
    [MARKETINGREPORT.STATUSES.ON_HOLD]: 'On Hold',
    [MARKETINGREPORT.STATUSES.APPROVED]: 'Approved',
    [MARKETINGREPORT.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGREPORT.STATUSES.PUBLISHED]: 'Published',
    [MARKETINGREPORT.STATUSES.UNPUBLISHED]: 'Unpublished',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingreportGetDeliveryMethodLabel(
  method: MarketingReportDeliveryMethod
): string {
  const labels: Record<MarketingReportDeliveryMethod, string> = {
    [MARKETINGREPORT.DELIVERY_METHODS.EMAIL]: 'Email',
    [MARKETINGREPORT.DELIVERY_METHODS.DOWNLOAD]: 'Download',
    [MARKETINGREPORT.DELIVERY_METHODS.API]: 'API',
    [MARKETINGREPORT.DELIVERY_METHODS.WEBHOOK]: 'Webhook',
    [MARKETINGREPORT.DELIVERY_METHODS.DASHBOARD]: 'Dashboard',
    [MARKETINGREPORT.DELIVERY_METHODS.FTP]: 'FTP',
    [MARKETINGREPORT.DELIVERY_METHODS.S3]: 'S3',
    [MARKETINGREPORT.DELIVERY_METHODS.PRINT]: 'Print',
    [MARKETINGREPORT.DELIVERY_METHODS.SHARE]: 'Share',
  };
  return labels[method] || 'Unknown Delivery Method';
}

export function marketingreportGetAggregationLabel(
  aggregation: MarketingReportAggregation
): string {
  const labels: Record<MarketingReportAggregation, string> = {
    [MARKETINGREPORT.AGGREGATIONS.SUM]: 'Sum',
    [MARKETINGREPORT.AGGREGATIONS.AVG]: 'Average',
    [MARKETINGREPORT.AGGREGATIONS.MIN]: 'Minimum',
    [MARKETINGREPORT.AGGREGATIONS.MAX]: 'Maximum',
    [MARKETINGREPORT.AGGREGATIONS.COUNT]: 'Count',
    [MARKETINGREPORT.AGGREGATIONS.DISTINCT]: 'Distinct Count',
    [MARKETINGREPORT.AGGREGATIONS.PERCENTAGE]: 'Percentage',
    [MARKETINGREPORT.AGGREGATIONS.RATE]: 'Rate',
    [MARKETINGREPORT.AGGREGATIONS.MEDIAN]: 'Median',
    [MARKETINGREPORT.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [MARKETINGREPORT.AGGREGATIONS.CUMULATIVE]: 'Cumulative',
    [MARKETINGREPORT.AGGREGATIONS.GROWTH]: 'Growth',
    [MARKETINGREPORT.AGGREGATIONS.TREND]: 'Trend',
    [MARKETINGREPORT.AGGREGATIONS.FORECAST]: 'Forecast',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function marketingreportGetVisualizationLabel(
  visualization: MarketingReportVisualization
): string {
  const labels: Record<MarketingReportVisualization, string> = {
    [MARKETINGREPORT.VISUALIZATIONS.TABLE]: 'Table',
    [MARKETINGREPORT.VISUALIZATIONS.CHART]: 'Chart',
    [MARKETINGREPORT.VISUALIZATIONS.GRAPH]: 'Graph',
    [MARKETINGREPORT.VISUALIZATIONS.MAP]: 'Map',
    [MARKETINGREPORT.VISUALIZATIONS.GAUGE]: 'Gauge',
    [MARKETINGREPORT.VISUALIZATIONS.METRIC]: 'Metric',
    [MARKETINGREPORT.VISUALIZATIONS.KPI]: 'KPI',
    [MARKETINGREPORT.VISUALIZATIONS.PIVOT]: 'Pivot Table',
    [MARKETINGREPORT.VISUALIZATIONS.CROSS_TAB]: 'Cross Tab',
    [MARKETINGREPORT.VISUALIZATIONS.FUNNEL]: 'Funnel',
    [MARKETINGREPORT.VISUALIZATIONS.HEATMAP]: 'Heatmap',
    [MARKETINGREPORT.VISUALIZATIONS.TREEMAP]: 'Treemap',
    [MARKETINGREPORT.VISUALIZATIONS.SANKEY]: 'Sankey',
    [MARKETINGREPORT.VISUALIZATIONS.SCATTER]: 'Scatter Plot',
    [MARKETINGREPORT.VISUALIZATIONS.BUBBLE]: 'Bubble Chart',
    [MARKETINGREPORT.VISUALIZATIONS.RADAR]: 'Radar Chart',
    [MARKETINGREPORT.VISUALIZATIONS.POLAR]: 'Polar Area',
    [MARKETINGREPORT.VISUALIZATIONS.WATERFALL]: 'Waterfall',
    [MARKETINGREPORT.VISUALIZATIONS.DONUT]: 'Donut Chart',
    [MARKETINGREPORT.VISUALIZATIONS.AREA]: 'Area Chart',
    [MARKETINGREPORT.VISUALIZATIONS.LINE]: 'Line Chart',
    [MARKETINGREPORT.VISUALIZATIONS.BAR]: 'Bar Chart',
    [MARKETINGREPORT.VISUALIZATIONS.PIE]: 'Pie Chart',
    [MARKETINGREPORT.VISUALIZATIONS.HISTOGRAM]: 'Histogram',
    [MARKETINGREPORT.VISUALIZATIONS.BOX_PLOT]: 'Box Plot',
  };
  return labels[visualization] || 'Unknown Visualization';
}

export function marketingreportGetDefaultFormat(): MarketingReportFormat {
  return MARKETINGREPORT.DEFAULTS.DEFAULT_FORMAT;
}

export function marketingreportGetDefaultTimezone(): string {
  return MARKETINGREPORT.DEFAULTS.DEFAULT_TIMEZONE;
}

export function marketingreportGetDefaultPageSize(): number {
  return MARKETINGREPORT.DEFAULTS.DEFAULT_PAGE_SIZE;
}

export function marketingreportIsExecutiveReport(category: MarketingReportCategory): boolean {
  return category === MARKETINGREPORT.CATEGORIES.EXECUTIVE;
}

export function marketingreportIsStrategicReport(category: MarketingReportCategory): boolean {
  return category === MARKETINGREPORT.CATEGORIES.STRATEGIC;
}

export function marketingreportIsTacticalReport(category: MarketingReportCategory): boolean {
  return category === MARKETINGREPORT.CATEGORIES.TACTICAL;
}

export function marketingreportIsCompleted(status: MarketingReportStatus): boolean {
  const completedStatuses: MarketingReportStatus[] = [
    MARKETINGREPORT.STATUSES.COMPLETED,
    MARKETINGREPORT.STATUSES.PUBLISHED,
    MARKETINGREPORT.STATUSES.APPROVED,
  ];
  return completedStatuses.includes(status);
}

export function marketingreportIsPending(status: MarketingReportStatus): boolean {
  const pendingStatuses: MarketingReportStatus[] = [
    MARKETINGREPORT.STATUSES.PENDING,
    MARKETINGREPORT.STATUSES.GENERATING,
    MARKETINGREPORT.STATUSES.IN_PROGRESS,
    MARKETINGREPORT.STATUSES.SCHEDULED,
  ];
  return pendingStatuses.includes(status);
}

export function marketingreportIsActive(status: MarketingReportStatus): boolean {
  const activeStatuses: MarketingReportStatus[] = [
    MARKETINGREPORT.STATUSES.DRAFT,
    MARKETINGREPORT.STATUSES.SCHEDULED,
    MARKETINGREPORT.STATUSES.IN_PROGRESS,
    MARKETINGREPORT.STATUSES.PENDING,
  ];
  return activeStatuses.includes(status);
}

export function marketingreportCanTransition(
  currentStatus: MarketingReportStatus,
  targetStatus: MarketingReportStatus
): boolean {
  const validTransitions: Record<MarketingReportStatus, MarketingReportStatus[]> = {
    [MARKETINGREPORT.STATUSES.DRAFT]: [
      MARKETINGREPORT.STATUSES.PENDING,
      MARKETINGREPORT.STATUSES.CANCELLED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.PENDING]: [
      MARKETINGREPORT.STATUSES.GENERATING,
      MARKETINGREPORT.STATUSES.CANCELLED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.GENERATING]: [
      MARKETINGREPORT.STATUSES.COMPLETED,
      MARKETINGREPORT.STATUSES.FAILED,
      MARKETINGREPORT.STATUSES.CANCELLED,
    ],
    [MARKETINGREPORT.STATUSES.COMPLETED]: [
      MARKETINGREPORT.STATUSES.APPROVED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.FAILED]: [
      MARKETINGREPORT.STATUSES.DRAFT,
      MARKETINGREPORT.STATUSES.CANCELLED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.CANCELLED]: [
      MARKETINGREPORT.STATUSES.DRAFT,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.ARCHIVED]: [],
    [MARKETINGREPORT.STATUSES.SCHEDULED]: [
      MARKETINGREPORT.STATUSES.GENERATING,
      MARKETINGREPORT.STATUSES.CANCELLED,
    ],
    [MARKETINGREPORT.STATUSES.IN_PROGRESS]: [
      MARKETINGREPORT.STATUSES.COMPLETED,
      MARKETINGREPORT.STATUSES.PAUSED,
      MARKETINGREPORT.STATUSES.FAILED,
      MARKETINGREPORT.STATUSES.CANCELLED,
    ],
    [MARKETINGREPORT.STATUSES.PAUSED]: [
      MARKETINGREPORT.STATUSES.IN_PROGRESS,
      MARKETINGREPORT.STATUSES.CANCELLED,
    ],
    [MARKETINGREPORT.STATUSES.ON_HOLD]: [
      MARKETINGREPORT.STATUSES.IN_PROGRESS,
      MARKETINGREPORT.STATUSES.CANCELLED,
    ],
    [MARKETINGREPORT.STATUSES.APPROVED]: [
      MARKETINGREPORT.STATUSES.PUBLISHED,
      MARKETINGREPORT.STATUSES.REJECTED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.REJECTED]: [
      MARKETINGREPORT.STATUSES.DRAFT,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.PUBLISHED]: [
      MARKETINGREPORT.STATUSES.UNPUBLISHED,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
    [MARKETINGREPORT.STATUSES.UNPUBLISHED]: [
      MARKETINGREPORT.STATUSES.DRAFT,
      MARKETINGREPORT.STATUSES.ARCHIVED,
    ],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}
