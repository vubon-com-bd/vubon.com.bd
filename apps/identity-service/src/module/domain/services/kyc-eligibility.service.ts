/**
 * KycEligibilityService — checks if user is eligible for KYC
 * @module identity-service/domain/services
 */
import { USER_KYC_STATUS } from '@vubon/shared-constants/user';
import { USER_TYPE } from '@vubon/shared-constants/user';

export interface KycEligibilityInput {
  readonly userStatus: string;
  readonly userType: string;
  readonly currentKycStatus?: string;
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly documentCount: number;
}

export interface KycEligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export class KycEligibilityService {
  private static readonly TYPE_REQUIRING_KYC: readonly string[] = [
    USER_TYPE.BUSINESS,
    USER_TYPE.VENDOR,
  ];

  static check(input: KycEligibilityInput): KycEligibilityResult {
    const reasons: string[] = [];

    if (input.userStatus !== 'active') {
      reasons.push('user must be active');
    }
    if (!input.emailVerified) {
      reasons.push('email must be verified');
    }
    if (input.documentCount === 0) {
      reasons.push('at least one document required');
    }
    if (
      input.currentKycStatus === USER_KYC_STATUS.APPROVED
    ) {
      reasons.push('KYC already approved');
    }
    if (
      input.currentKycStatus === USER_KYC_STATUS.PENDING ||
      input.currentKycStatus === USER_KYC_STATUS.IN_REVIEW
    ) {
      reasons.push('KYC already in progress');
    }

    return {
      eligible: reasons.length === 0,
      reasons,
    };
  }

  static isEligible(input: KycEligibilityInput): boolean {
    return KycEligibilityService.check(input).eligible;
  }

  static requiresKyc(userType: string): boolean {
    return KycEligibilityService.TYPE_REQUIRING_KYC.includes(userType as never);
  }
}
