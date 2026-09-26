import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import {
  CommonModule,
  VendorModule,
  VendorProfileModule,
  VendorBusinessModule,
  VendorContactModule,
  VendorAddressModule,
  VendorBankAccountModule,
  VendorDocumentModule,
  VendorVerificationModule,
  VendorApprovalModule,
  VendorSuspensionModule,
  VendorCommissionModule,
  VendorPayoutModule,
  VendorSettlementModule,
  VendorPerformanceModule,
  VendorRatingModule,
  VendorReviewModule,
  VendorShippingModule,
  VendorReturnPolicyModule,
  VendorWarrantyModule,
  VendorTeamModule,
  VendorFeatureModule,
  VendorSubscriptionModule,
  PublicVendorModule,
} from './module/modules';

@Module({
  imports: [
    // Kernel global modules
    KernelCommonModule,

    // Common (app-level)
    CommonModule,

    // Feature modules
    VendorModule,
    VendorProfileModule,
    VendorBusinessModule,
    VendorContactModule,
    VendorAddressModule,
    VendorBankAccountModule,
    VendorDocumentModule,
    VendorVerificationModule,
    VendorApprovalModule,
    VendorSuspensionModule,
    VendorCommissionModule,
    VendorPayoutModule,
    VendorSettlementModule,
    VendorPerformanceModule,
    VendorRatingModule,
    VendorReviewModule,
    VendorShippingModule,
    VendorReturnPolicyModule,
    VendorWarrantyModule,
    VendorTeamModule,
    VendorFeatureModule,
    VendorSubscriptionModule,
    PublicVendorModule,
  ],
})
export class AppModule {}
