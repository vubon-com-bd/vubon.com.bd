/**
 * Report Configuration
 * অ্যাডমিন রিপোর্ট কনফিগারেশন
 */

export interface ReportConfig {
  enabled: boolean;
  types: string[];
  formats: string[];
  statuses: string[];
  defaults: {
    maxRecords: number;
    retentionDays: number;
    maxReportsPerUser: number;
    generationTimeout: number;
  };
  schedules: {
    enabled: boolean;
    maxScheduledReports: number;
    allowedFrequencies: string[];
  };
  export: {
    allowedFormats: string[];
    maxFileSize: number;
    maxRows: number;
  };
}

export const createReportConfig = (): ReportConfig => ({
  enabled: true,
  types: ['daily', 'weekly', 'monthly', 'custom'],
  formats: ['pdf', 'csv', 'excel', 'json'],
  statuses: ['pending', 'processing', 'completed', 'failed'],
  defaults: {
    maxRecords: 10000,
    retentionDays: 90,
    maxReportsPerUser: 50,
    generationTimeout: 300,
  },
  schedules: {
    enabled: true,
    maxScheduledReports: 10,
    allowedFrequencies: ['daily', 'weekly', 'monthly'],
  },
  export: {
    allowedFormats: ['csv', 'excel', 'json', 'pdf'],
    maxFileSize: 10 * 1024 * 1024,
    maxRows: 100000,
  },
});
