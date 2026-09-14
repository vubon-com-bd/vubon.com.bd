/**
 * User KYC Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-kyc.constants থেকে।
 */

import type {
  USER_KYC_STATUS,
  USER_KYC_LEVEL,
  USER_KYC_DOCUMENT,
} from '@vubon/shared-constants/user';
import type { UserId, Url } from '../common/primitives';

export type KycStatusValue = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];

export type KycLevelValue = (typeof USER_KYC_LEVEL)[keyof typeof USER_KYC_LEVEL];

export type KycDocumentType = (typeof USER_KYC_DOCUMENT)[keyof typeof USER_KYC_DOCUMENT];

export interface UserKyc {
  readonly userId: UserId;
  readonly status: KycStatusValue;
  readonly level: KycLevelValue;
  readonly documents: readonly KycDocument[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}

export interface KycDocument {
  readonly id: string;
  readonly type: KycDocumentType;
  readonly number?: string;
  readonly frontUrl: Url;
  readonly backUrl?: Url;
  readonly selfieUrl?: Url;
  readonly verified: boolean;
  readonly uploadedAt: string;
}

export interface UserKycInput {
  readonly userId: UserId;
  readonly documents: readonly Omit<KycDocument, 'id' | 'verified' | 'uploadedAt'>[];
}
