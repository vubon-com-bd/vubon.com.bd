import { API_ROUTES } from '@vubon/shared-constants/common';

export const UPLOAD_BASE_ENDPOINTS = {
  image: API_ROUTES.UPLOAD.IMAGE,
  video: API_ROUTES.UPLOAD.VIDEO,
  document: API_ROUTES.UPLOAD.DOCUMENT,
} as const;
