/**
 * Logistics Permission Value Types
 * @module shared-types/logistics
 */

import type { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';

export type LogisticsPermissionValue =
  (typeof LOGISTICS_PERMISSION)[keyof typeof LOGISTICS_PERMISSION];

export interface LogisticsPermissionGrant {
  readonly userId: string;
  readonly permission: LogisticsPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
