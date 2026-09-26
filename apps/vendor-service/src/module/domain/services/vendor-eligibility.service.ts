import { VendorEntity } from '../entities/vendor.entity';

export class VendorEligibilityService {
  canRegister(ownerId: string, existingVendor: VendorEntity | null): boolean {
    if (!ownerId) return false;
    if (existingVendor !== null) return false;
    return true;
  }

  canBeApproved(vendor: VendorEntity): boolean {
    if (vendor.isDeleted()) return false;
    return vendor.status.value === 'pending_approval';
  }

  canBeSuspended(vendor: VendorEntity): boolean {
    if (vendor.isDeleted()) return false;
    if (vendor.status.value === 'suspended') return false;
    return true;
  }
}
