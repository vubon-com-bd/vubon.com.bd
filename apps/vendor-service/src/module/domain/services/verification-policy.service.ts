import { VendorEntity } from '../entities/vendor.entity';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity';

export interface VerificationPolicyResult {
  readonly allowed: boolean;
  readonly reason?: string;
}

export class VerificationPolicyService {
  canSubmit(
    vendor: VendorEntity,
    latestVerification: VendorVerificationEntity | null,
  ): VerificationPolicyResult {
    if (vendor.isDeleted()) {
      return { allowed: false, reason: 'vendor_deleted' };
    }
    if (latestVerification?.status.value === 'pending') {
      return { allowed: false, reason: 'verification_pending' };
    }
    if (latestVerification?.status.value === 'verified') {
      return { allowed: false, reason: 'already_verified' };
    }
    return { allowed: true };
  }

  canVerify(verification: VendorVerificationEntity): boolean {
    return verification.status.value === 'pending';
  }
}
