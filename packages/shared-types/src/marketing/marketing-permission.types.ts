/**
 * Marketing Permission Value Types
 * @module shared-types/marketing
 */

import type { MARKETING_PERMISSION } from '@vubon/shared-constants/marketing';

export type MarketingPermissionValue =
  (typeof MARKETING_PERMISSION)[keyof typeof MARKETING_PERMISSION];

export interface MarketingPermissionGrant {
  readonly userId: string;
  readonly permission: MarketingPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}
