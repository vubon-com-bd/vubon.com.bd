/**
 * Report API endpoint paths.
 * @module shared-api/endpoints/report
 */

export const REPORT_ENDPOINTS = {
  LIST: '/reports',
  CREATE: '/reports',
  GET: (reportId: string) => `/reports/${reportId}`,
  DELETE: (reportId: string) => `/reports/${reportId}`,
  GENERATE: '/reports/generate',
  DOWNLOAD: (reportId: string) => `/reports/${reportId}/download`,
  SCHEDULE: '/reports/schedule',
  SCHEDULES: '/reports/schedules',
  SCHEDULE_DELETE: (scheduleId: string) => `/reports/schedules/${scheduleId}`,
  TYPES: '/reports/types',
} as const;
