/**
 * Analytics Permission Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_PERMISSION } from '@vubon/shared-constants/platform';

export type AnalyticsPermissionValue =
  (typeof ANALYTICS_PERMISSION)[keyof typeof ANALYTICS_PERMISSION];

export interface AnalyticsPermissionGrant {
  readonly userId: string;
  readonly permission: AnalyticsPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
