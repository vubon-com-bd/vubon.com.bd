/**
 * Download API endpoint paths.
 * @module shared-api/endpoints/download
 */

export const DOWNLOAD_ENDPOINTS = {
  FILE: (fileId: string) => `/download/${fileId}`,
  BULK: '/download/bulk',
  PRESIGNED: (fileId: string) => `/download/${fileId}/presigned`,
  STATUS: (fileId: string) => `/download/${fileId}/status`,
  IMAGE: (fileId: string) => `/download/image/${fileId}`,
  VIDEO: (fileId: string) => `/download/video/${fileId}`,
  DOCUMENT: (fileId: string) => `/download/document/${fileId}`,
} as const;
