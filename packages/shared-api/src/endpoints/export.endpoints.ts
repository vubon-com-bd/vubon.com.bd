/**
 * Export API endpoint paths.
 * @module shared-api/endpoints/export
 */

export const EXPORT_ENDPOINTS = {
  CREATE: '/export',
  STATUS: (exportId: string) => `/export/${exportId}/status`,
  DOWNLOAD: (exportId: string) => `/export/${exportId}/download`,
  CANCEL: (exportId: string) => `/export/${exportId}/cancel`,
  TYPES: '/export/types',
  FORMATS: '/export/formats',
  HISTORY: '/export/history',
} as const;
