import { VendorEntity } from '../entities/vendor.entity';
import { VendorSuspensionEntity } from '../entities/vendor-suspension.entity';

export interface SuspensionPolicyResult {
  readonly allowed: boolean;
  readonly reason?: string;
}

export class SuspensionPolicyService {
  canSuspend(
    vendor: VendorEntity,
    activeSuspension: VendorSuspensionEntity | null,
  ): SuspensionPolicyResult {
    if (vendor.isDeleted()) {
      return { allowed: false, reason: 'vendor_deleted' };
    }
    if (activeSuspension !== null) {
      return { allowed: false, reason: 'already_suspended' };
    }
    return { allowed: true };
  }

  canReinstate(activeSuspension: VendorSuspensionEntity | null): boolean {
    return activeSuspension !== null;
  }
}
