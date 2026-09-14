/**
 * User Verification Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-verification.constants থেকে।
 */

import type { USER_VERIFICATION_STATUS } from '@vubon/shared-constants/user';
import type { UserId } from '../common/primitives';

export type UserVerificationStatusValue =
  (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];

export interface UserVerification {
  readonly userId: UserId;
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly identityVerified: boolean;
  readonly addressVerified: boolean;
  readonly status: UserVerificationStatusValue;
  readonly verifiedAt?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}

export interface UserVerificationSummary {
  readonly userId: UserId;
  readonly status: UserVerificationStatusValue;
  readonly verificationCount: number;
  readonly isFullyVerified: boolean;
}
