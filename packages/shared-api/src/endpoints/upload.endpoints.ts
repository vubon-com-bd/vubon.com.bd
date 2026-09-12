/**
 * Upload API endpoint paths.
 * @module shared-api/endpoints/upload
 */

export const UPLOAD_ENDPOINTS = {
  SINGLE: '/upload',
  MULTIPLE: '/upload/multiple',
  CHUNKED_START: '/upload/chunked/start',
  CHUNKED_PART: '/upload/chunked/part',
  CHUNKED_COMPLETE: '/upload/chunked/complete',
  PRESIGNED: '/upload/presigned',
  IMAGE: '/upload/image',
  VIDEO: '/upload/video',
  DOCUMENT: '/upload/document',
  STATUS: (uploadId: string) => `/upload/${uploadId}/status`,
  CANCEL: (uploadId: string) => `/upload/${uploadId}/cancel`,
} as const;
