/**
 * KycEligibilityService — Domain Service
 * @module user-service/domain/services
 */
import { UserEntity } from '../entities/user.entity.js';
import { UserKycEntity } from '../entities/user-kyc.entity.js';
import { KycNotAllowedError } from '../errors/kyc.errors.js';

export interface KycEligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export class KycEligibilityService {
  static check(user: UserEntity, existing?: UserKycEntity | null): KycEligibilityResult {
    const reasons: string[] = [];

    // Explicit deletion check — defensive against base-class flag mismatch
    if (user.isDeleted() || user.deletedAtValue !== null) {
      reasons.push('User is deleted');
    }

    if (!user.isActive()) reasons.push('User is not active');
    if (!user.emailVerified) reasons.push('Email not verified');
    if (!user.requiresKyc()) reasons.push('User type does not require KYC');

    if (existing) {
      if (existing.isVerified()) reasons.push('KYC already verified');
      if (existing.status.isPending()) reasons.push('KYC is already pending review');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  static assertEligible(user: UserEntity, existing?: UserKycEntity | null): void {
    const result = KycEligibilityService.check(user, existing);
    if (!result.eligible) {
      throw new KycNotAllowedError(result.reasons.join('; '));
    }
  }

  static requiresReverification(user: UserEntity, kyc: UserKycEntity): boolean {
    if (!kyc.isVerified()) return false;
    if (kyc.verifiedAt === null) return true;
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    return Date.now() - kyc.verifiedAt.epochMs > oneYearMs;
  }
}
