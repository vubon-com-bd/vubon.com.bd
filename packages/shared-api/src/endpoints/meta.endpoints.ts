/**
 * Aggregated endpoints for all domains.
 * @module shared-api/endpoints/meta
 */

import { AUTH_ENDPOINTS } from './auth.endpoints';
import { USER_ENDPOINTS } from './user.endpoints';
import { ADMIN_ENDPOINTS } from './admin.endpoints';
import { HEALTH_ENDPOINTS } from './health.endpoints';
import { SEARCH_ENDPOINTS } from './search.endpoints';
import { ANALYTICS_ENDPOINTS } from './analytics.endpoints';
import { REPORT_ENDPOINTS } from './report.endpoints';
import { SETTINGS_ENDPOINTS } from './settings.endpoints';
import { PREFERENCES_ENDPOINTS } from './preferences.endpoints';
import { VERIFICATION_ENDPOINTS } from './verification.endpoints';
import { GATEWAY_ENDPOINTS } from './gateway.endpoints';
import { FILTER_ENDPOINTS } from './filter.endpoints';
import { APPROVAL_ENDPOINTS } from './approval.endpoints';
import { NOTIFICATION_ENDPOINTS } from './notification.endpoints';
import { UPLOAD_ENDPOINTS } from './upload.endpoints';
import { DOWNLOAD_ENDPOINTS } from './download.endpoints';
import { EXPORT_ENDPOINTS } from './export.endpoints';
import { IMPORT_ENDPOINTS } from './import.endpoints';
import { WEBHOOK_ENDPOINTS } from './webhook.endpoints';
import { CALLBACK_ENDPOINTS } from './callback.endpoints';

export const ENDPOINTS = {
  auth: AUTH_ENDPOINTS,
  user: USER_ENDPOINTS,
  admin: ADMIN_ENDPOINTS,
  health: HEALTH_ENDPOINTS,
  search: SEARCH_ENDPOINTS,
  analytics: ANALYTICS_ENDPOINTS,
  report: REPORT_ENDPOINTS,
  settings: SETTINGS_ENDPOINTS,
  preferences: PREFERENCES_ENDPOINTS,
  verification: VERIFICATION_ENDPOINTS,
  gateway: GATEWAY_ENDPOINTS,
  filter: FILTER_ENDPOINTS,
  approval: APPROVAL_ENDPOINTS,
  notification: NOTIFICATION_ENDPOINTS,
  upload: UPLOAD_ENDPOINTS,
  download: DOWNLOAD_ENDPOINTS,
  export: EXPORT_ENDPOINTS,
  import: IMPORT_ENDPOINTS,
  webhook: WEBHOOK_ENDPOINTS,
  callback: CALLBACK_ENDPOINTS,
} as const;
