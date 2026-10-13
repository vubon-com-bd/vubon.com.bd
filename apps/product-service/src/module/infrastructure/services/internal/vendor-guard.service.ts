/**
 * VendorGuardService — checks vendor eligibility before product actions
 * @module product-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { VendorClient } from '../external/vendor.client.js';

export const VENDOR_GUARD_SERVICE = Symbol('VENDOR_GUARD_SERVICE');

export interface VendorEligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

@Injectable()
export class VendorGuardService {
  private readonly logger = new Logger(VendorGuardService.name);

  constructor(private readonly vendorClient: VendorClient) {}

  async checkEligibility(vendorId: string): Promise<VendorEligibilityResult> {
    const reasons: string[] = [];
    const vendor = await this.vendorClient.getById(vendorId);

    if (!vendor) {
      reasons.push(`vendor "${vendorId}" not found`);
      return { eligible: false, reasons };
    }
    if (vendor.status !== 'active') {
      reasons.push(`vendor status is "${vendor.status ?? 'unknown'}"`);
    }
    if (vendor.isApproved !== true) {
      reasons.push('vendor is not approved');
    }

    return { eligible: reasons.length === 0, reasons };
  }
}
