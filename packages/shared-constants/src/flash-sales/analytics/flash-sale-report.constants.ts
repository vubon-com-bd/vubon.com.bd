/**
 * Flash Sale Report Constants
 * Configuration for flash sale reports
 */

export const FLASH_SALE_REPORT = {
  // Report Types
  TYPES: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    INVENTORY: 'inventory',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    COMPARATIVE: 'comparative',
    TREND: 'trend',
    FORECAST: 'forecast',
  },

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
    TEXT: 'text',
    MARKDOWN: 'markdown',
  },

  // Report Sections
  SECTIONS: {
    EXECUTIVE_SUMMARY: 'executive_summary',
    KEY_METRICS: 'key_metrics',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    INVENTORY: 'inventory',
    CUSTOMER_INSIGHTS: 'customer_insights',
    PRODUCT_INSIGHTS: 'product_insights',
    TRENDS: 'trends',
    RECOMMENDATIONS: 'recommendations',
    APPENDIX: 'appendix',
  },

  // Report Delivery
  DELIVERY: {
    DOWNLOAD: 'download',
    EMAIL: 'email',
    DASHBOARD: 'dashboard',
    API: 'api',
    WEBHOOK: 'webhook',
    SCHEDULED: 'scheduled',
  },

  // Report Scheduling
  SCHEDULING: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  },

  // Report Defaults
  DEFAULTS: {
    TYPE: 'summary',
    FORMAT: 'pdf',
    DELIVERY: 'download',
    LANGUAGE: 'en',
    TIMEZONE: 'Asia/Dhaka',
    INCLUDE_CHARTS: true,
    INCLUDE_TABLES: true,
    INCLUDE_METRICS: true,
    PAGE_SIZE: 'A4',
    ORIENTATION: 'portrait',
  },

  // Report Limits
  LIMITS: {
    MAX_ROWS: 10000,
    MAX_COLUMNS: 50,
    MAX_CHARTS: 20,
    MAX_TABLES: 20,
    MAX_METRICS: 50,
    MAX_SECTIONS: 15,
    MAX_FILE_SIZE_MB: 50,
  },
} as const;

// Report Types
export type FlashSaleReportType =
  (typeof FLASH_SALE_REPORT.TYPES)[keyof typeof FLASH_SALE_REPORT.TYPES];

// Report Formats
export type FlashSaleReportFormat =
  (typeof FLASH_SALE_REPORT.FORMATS)[keyof typeof FLASH_SALE_REPORT.FORMATS];

// Report Sections
export type FlashSaleReportSection =
  (typeof FLASH_SALE_REPORT.SECTIONS)[keyof typeof FLASH_SALE_REPORT.SECTIONS];

// Report Delivery
export type FlashSaleReportDelivery =
  (typeof FLASH_SALE_REPORT.DELIVERY)[keyof typeof FLASH_SALE_REPORT.DELIVERY];

// Report Scheduling
export type FlashSaleReportScheduling =
  (typeof FLASH_SALE_REPORT.SCHEDULING)[keyof typeof FLASH_SALE_REPORT.SCHEDULING];

// Utility Functions
export function flashsalesReportGetTypeLabel(type: FlashSaleReportType): string {
  const labels: Record<FlashSaleReportType, string> = {
    [FLASH_SALE_REPORT.TYPES.SUMMARY]: 'Summary Report',
    [FLASH_SALE_REPORT.TYPES.DETAILED]: 'Detailed Report',
    [FLASH_SALE_REPORT.TYPES.PERFORMANCE]: 'Performance Report',
    [FLASH_SALE_REPORT.TYPES.FINANCIAL]: 'Financial Report',
    [FLASH_SALE_REPORT.TYPES.INVENTORY]: 'Inventory Report',
    [FLASH_SALE_REPORT.TYPES.CUSTOMER]: 'Customer Report',
    [FLASH_SALE_REPORT.TYPES.PRODUCT]: 'Product Report',
    [FLASH_SALE_REPORT.TYPES.COMPARATIVE]: 'Comparative Report',
    [FLASH_SALE_REPORT.TYPES.TREND]: 'Trend Report',
    [FLASH_SALE_REPORT.TYPES.FORECAST]: 'Forecast Report',
  };
  return labels[type] || 'Unknown Report Type';
}

export function flashsalesReportGetFormatLabel(format: FlashSaleReportFormat): string {
  const labels: Record<FlashSaleReportFormat, string> = {
    [FLASH_SALE_REPORT.FORMATS.PDF]: 'PDF Document',
    [FLASH_SALE_REPORT.FORMATS.EXCEL]: 'Excel Spreadsheet',
    [FLASH_SALE_REPORT.FORMATS.CSV]: 'CSV File',
    [FLASH_SALE_REPORT.FORMATS.JSON]: 'JSON File',
    [FLASH_SALE_REPORT.FORMATS.HTML]: 'HTML Page',
    [FLASH_SALE_REPORT.FORMATS.TEXT]: 'Text File',
    [FLASH_SALE_REPORT.FORMATS.MARKDOWN]: 'Markdown Document',
  };
  return labels[format] || 'Unknown Format';
}

export function flashsalesReportGetSectionLabel(section: FlashSaleReportSection): string {
  const labels: Record<FlashSaleReportSection, string> = {
    [FLASH_SALE_REPORT.SECTIONS.EXECUTIVE_SUMMARY]: 'Executive Summary',
    [FLASH_SALE_REPORT.SECTIONS.KEY_METRICS]: 'Key Metrics',
    [FLASH_SALE_REPORT.SECTIONS.PERFORMANCE]: 'Performance Analysis',
    [FLASH_SALE_REPORT.SECTIONS.FINANCIAL]: 'Financial Analysis',
    [FLASH_SALE_REPORT.SECTIONS.INVENTORY]: 'Inventory Analysis',
    [FLASH_SALE_REPORT.SECTIONS.CUSTOMER_INSIGHTS]: 'Customer Insights',
    [FLASH_SALE_REPORT.SECTIONS.PRODUCT_INSIGHTS]: 'Product Insights',
    [FLASH_SALE_REPORT.SECTIONS.TRENDS]: 'Trends Analysis',
    [FLASH_SALE_REPORT.SECTIONS.RECOMMENDATIONS]: 'Recommendations',
    [FLASH_SALE_REPORT.SECTIONS.APPENDIX]: 'Appendix',
  };
  return labels[section] || 'Unknown Section';
}

export function flashsalesReportGetDeliveryLabel(delivery: FlashSaleReportDelivery): string {
  const labels: Record<FlashSaleReportDelivery, string> = {
    [FLASH_SALE_REPORT.DELIVERY.DOWNLOAD]: 'Download',
    [FLASH_SALE_REPORT.DELIVERY.EMAIL]: 'Email',
    [FLASH_SALE_REPORT.DELIVERY.DASHBOARD]: 'Dashboard',
    [FLASH_SALE_REPORT.DELIVERY.API]: 'API',
    [FLASH_SALE_REPORT.DELIVERY.WEBHOOK]: 'Webhook',
    [FLASH_SALE_REPORT.DELIVERY.SCHEDULED]: 'Scheduled Delivery',
  };
  return labels[delivery] || 'Unknown Delivery';
}

export function flashsalesReportGetSchedulingLabel(scheduling: FlashSaleReportScheduling): string {
  const labels: Record<FlashSaleReportScheduling, string> = {
    [FLASH_SALE_REPORT.SCHEDULING.ONE_TIME]: 'One Time',
    [FLASH_SALE_REPORT.SCHEDULING.DAILY]: 'Daily',
    [FLASH_SALE_REPORT.SCHEDULING.WEEKLY]: 'Weekly',
    [FLASH_SALE_REPORT.SCHEDULING.BI_WEEKLY]: 'Bi-Weekly',
    [FLASH_SALE_REPORT.SCHEDULING.MONTHLY]: 'Monthly',
    [FLASH_SALE_REPORT.SCHEDULING.QUARTERLY]: 'Quarterly',
    [FLASH_SALE_REPORT.SCHEDULING.CUSTOM]: 'Custom',
  };
  return labels[scheduling] || 'Unknown Scheduling';
}

export function flashsalesReportIsValidType(type: string): type is FlashSaleReportType {
  return Object.values(FLASH_SALE_REPORT.TYPES).includes(type as FlashSaleReportType);
}

export function flashsalesReportIsValidFormat(format: string): format is FlashSaleReportFormat {
  return Object.values(FLASH_SALE_REPORT.FORMATS).includes(format as FlashSaleReportFormat);
}

export function flashsalesReportGetDefaultType(): FlashSaleReportType {
  return FLASH_SALE_REPORT.DEFAULTS.TYPE as FlashSaleReportType;
}

export function flashsalesReportGetDefaultFormat(): FlashSaleReportFormat {
  return FLASH_SALE_REPORT.DEFAULTS.FORMAT as FlashSaleReportFormat;
}

export function flashsalesReportGetDefaultDelivery(): FlashSaleReportDelivery {
  return FLASH_SALE_REPORT.DEFAULTS.DELIVERY as FlashSaleReportDelivery;
}

export function flashsalesReportGetMaxRows(): number {
  return FLASH_SALE_REPORT.LIMITS.MAX_ROWS;
}

export function flashsalesReportGetMaxFileSizeMB(): number {
  return FLASH_SALE_REPORT.LIMITS.MAX_FILE_SIZE_MB;
}

export function flashsalesReportGetFileExtension(format: FlashSaleReportFormat): string {
  const extensions: Record<FlashSaleReportFormat, string> = {
    [FLASH_SALE_REPORT.FORMATS.PDF]: '.pdf',
    [FLASH_SALE_REPORT.FORMATS.EXCEL]: '.xlsx',
    [FLASH_SALE_REPORT.FORMATS.CSV]: '.csv',
    [FLASH_SALE_REPORT.FORMATS.JSON]: '.json',
    [FLASH_SALE_REPORT.FORMATS.HTML]: '.html',
    [FLASH_SALE_REPORT.FORMATS.TEXT]: '.txt',
    [FLASH_SALE_REPORT.FORMATS.MARKDOWN]: '.md',
  };
  return extensions[format] || '.pdf';
}

export function flashsalesReportGetMimeType(format: FlashSaleReportFormat): string {
  const mimeTypes: Record<FlashSaleReportFormat, string> = {
    [FLASH_SALE_REPORT.FORMATS.PDF]: 'application/pdf',
    [FLASH_SALE_REPORT.FORMATS.EXCEL]:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [FLASH_SALE_REPORT.FORMATS.CSV]: 'text/csv',
    [FLASH_SALE_REPORT.FORMATS.JSON]: 'application/json',
    [FLASH_SALE_REPORT.FORMATS.HTML]: 'text/html',
    [FLASH_SALE_REPORT.FORMATS.TEXT]: 'text/plain',
    [FLASH_SALE_REPORT.FORMATS.MARKDOWN]: 'text/markdown',
  };
  return mimeTypes[format] || 'application/octet-stream';
}
