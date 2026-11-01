/**
 * Support Permission Value Types
 * @module shared-types/support
 */

import type { SUPPORT_PERMISSION } from '@vubon/shared-constants/support';

export type SupportPermissionValue = (typeof SUPPORT_PERMISSION)[keyof typeof SUPPORT_PERMISSION];

export interface SupportPermissionGrant {
  readonly userId: string;
  readonly permission: SupportPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
