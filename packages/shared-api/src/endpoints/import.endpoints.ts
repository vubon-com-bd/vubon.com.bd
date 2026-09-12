/**
 * Import API endpoint paths.
 * @module shared-api/endpoints/import
 */

export const IMPORT_ENDPOINTS = {
  CREATE: '/import',
  STATUS: (importId: string) => `/import/${importId}/status`,
  VALIDATE: '/import/validate',
  PREVIEW: '/import/preview',
  CANCEL: (importId: string) => `/import/${importId}/cancel`,
  TEMPLATES: '/import/templates',
  TEMPLATE: (type: string) => `/import/templates/${type}`,
  HISTORY: '/import/history',
} as const;
