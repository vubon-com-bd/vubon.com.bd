/**
 * Memory Repositories Module — All 23 InMemory repos
 * @module vendor-service/infrastructure/persistence/memory
 */
import { Module } from '@nestjs/common';

// Vendor core
import { InMemoryVendorRepository } from './repositories/vendor.memory.repository.js';
import { InMemoryVendorProfileRepository } from './repositories/vendor-profile.memory.repository.js';
import { InMemoryVendorBusinessRepository } from './repositories/vendor-business.memory.repository.js';
import { InMemoryVendorContactRepository } from './repositories/vendor-contact.memory.repository.js';
import { InMemoryVendorAddressRepository } from './repositories/vendor-address.memory.repository.js';
import { InMemoryVendorBankAccountRepository } from './repositories/vendor-bank-account.memory.repository.js';
import { InMemoryVendorDocumentRepository } from './repositories/vendor-document.memory.repository.js';
import { InMemoryVendorVerificationRepository } from './repositories/vendor-verification.memory.repository.js';
import { InMemoryVendorApprovalRepository } from './repositories/vendor-approval.memory.repository.js';
import { InMemoryVendorSuspensionRepository } from './repositories/vendor-suspension.memory.repository.js';

// Financials
import { InMemoryVendorCommissionRepository } from './repositories/vendor-commission.memory.repository.js';
import { InMemoryVendorPayoutRepository } from './repositories/vendor-payout.memory.repository.js';
import { InMemoryVendorSettlementRepository } from './repositories/vendor-settlement.memory.repository.js';

// Analytics
import { InMemoryVendorPerformanceRepository } from './repositories/vendor-performance.memory.repository.js';
import { InMemoryVendorRatingRepository } from './repositories/vendor-rating.memory.repository.js';
import { InMemoryVendorReviewRepository } from './repositories/vendor-review.memory.repository.js';

// Shipping/Policies
import { InMemoryVendorShippingRepository } from './repositories/vendor-shipping.memory.repository.js';
import { InMemoryVendorReturnPolicyRepository } from './repositories/vendor-return-policy.memory.repository.js';
import { InMemoryVendorWarrantyRepository } from './repositories/vendor-warranty.memory.repository.js';

// Team & Access
import { InMemoryVendorTeamRepository } from './repositories/vendor-team.memory.repository.js';
import { InMemoryVendorPermissionRepository } from './repositories/vendor-permission.memory.repository.js';

// Features & Billing
import { InMemoryVendorFeatureRepository } from './repositories/vendor-feature.memory.repository.js';
import { InMemoryVendorSubscriptionRepository } from './repositories/vendor-subscription.memory.repository.js';

// DI Tokens
import { VENDOR_REPOSITORY } from '../../../domain/repositories/vendor.repository.interface.js';
import { VENDOR_PROFILE_REPOSITORY } from '../../../domain/repositories/vendor-profile.repository.interface.js';
import { VENDOR_BUSINESS_REPOSITORY } from '../../../domain/repositories/vendor-business.repository.interface.js';
import { VENDOR_CONTACT_REPOSITORY } from '../../../domain/repositories/vendor-contact.repository.interface.js';
import { VENDOR_ADDRESS_REPOSITORY } from '../../../domain/repositories/vendor-address.repository.interface.js';
import { VENDOR_BANK_ACCOUNT_REPOSITORY } from '../../../domain/repositories/vendor-bank-account.repository.interface.js';
import { VENDOR_DOCUMENT_REPOSITORY } from '../../../domain/repositories/vendor-document.repository.interface.js';
import { VENDOR_VERIFICATION_REPOSITORY } from '../../../domain/repositories/vendor-verification.repository.interface.js';
import { VENDOR_APPROVAL_REPOSITORY } from '../../../domain/repositories/vendor-approval.repository.interface.js';
import { VENDOR_SUSPENSION_REPOSITORY } from '../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VENDOR_COMMISSION_REPOSITORY } from '../../../domain/repositories/vendor-commission.repository.interface.js';
import { VENDOR_PAYOUT_REPOSITORY } from '../../../domain/repositories/vendor-payout.repository.interface.js';
import { VENDOR_SETTLEMENT_REPOSITORY } from '../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VENDOR_PERFORMANCE_REPOSITORY } from '../../../domain/repositories/vendor-performance.repository.interface.js';
import { VENDOR_RATING_REPOSITORY } from '../../../domain/repositories/vendor-rating.repository.interface.js';
import { VENDOR_REVIEW_REPOSITORY } from '../../../domain/repositories/vendor-review.repository.interface.js';
import { VENDOR_SHIPPING_REPOSITORY } from '../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VENDOR_RETURN_POLICY_REPOSITORY } from '../../../domain/repositories/vendor-return-policy.repository.interface.js';
import { VENDOR_WARRANTY_REPOSITORY } from '../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VENDOR_TEAM_REPOSITORY } from '../../../domain/repositories/vendor-team.repository.interface.js';
import { VENDOR_PERMISSION_REPOSITORY } from '../../../domain/repositories/vendor-permission.repository.interface.js';
import { VENDOR_FEATURE_REPOSITORY } from '../../../domain/repositories/vendor-feature.repository.interface.js';
import { VENDOR_SUBSCRIPTION_REPOSITORY } from '../../../domain/repositories/vendor-subscription.repository.interface.js';

const REPOSITORIES = [
  { provide: VENDOR_REPOSITORY, useClass: InMemoryVendorRepository },
  { provide: VENDOR_PROFILE_REPOSITORY, useClass: InMemoryVendorProfileRepository },
  { provide: VENDOR_BUSINESS_REPOSITORY, useClass: InMemoryVendorBusinessRepository },
  { provide: VENDOR_CONTACT_REPOSITORY, useClass: InMemoryVendorContactRepository },
  { provide: VENDOR_ADDRESS_REPOSITORY, useClass: InMemoryVendorAddressRepository },
  { provide: VENDOR_BANK_ACCOUNT_REPOSITORY, useClass: InMemoryVendorBankAccountRepository },
  { provide: VENDOR_DOCUMENT_REPOSITORY, useClass: InMemoryVendorDocumentRepository },
  { provide: VENDOR_VERIFICATION_REPOSITORY, useClass: InMemoryVendorVerificationRepository },
  { provide: VENDOR_APPROVAL_REPOSITORY, useClass: InMemoryVendorApprovalRepository },
  { provide: VENDOR_SUSPENSION_REPOSITORY, useClass: InMemoryVendorSuspensionRepository },
  { provide: VENDOR_COMMISSION_REPOSITORY, useClass: InMemoryVendorCommissionRepository },
  { provide: VENDOR_PAYOUT_REPOSITORY, useClass: InMemoryVendorPayoutRepository },
  { provide: VENDOR_SETTLEMENT_REPOSITORY, useClass: InMemoryVendorSettlementRepository },
  { provide: VENDOR_PERFORMANCE_REPOSITORY, useClass: InMemoryVendorPerformanceRepository },
  { provide: VENDOR_RATING_REPOSITORY, useClass: InMemoryVendorRatingRepository },
  { provide: VENDOR_REVIEW_REPOSITORY, useClass: InMemoryVendorReviewRepository },
  { provide: VENDOR_SHIPPING_REPOSITORY, useClass: InMemoryVendorShippingRepository },
  { provide: VENDOR_RETURN_POLICY_REPOSITORY, useClass: InMemoryVendorReturnPolicyRepository },
  { provide: VENDOR_WARRANTY_REPOSITORY, useClass: InMemoryVendorWarrantyRepository },
  { provide: VENDOR_TEAM_REPOSITORY, useClass: InMemoryVendorTeamRepository },
  { provide: VENDOR_PERMISSION_REPOSITORY, useClass: InMemoryVendorPermissionRepository },
  { provide: VENDOR_FEATURE_REPOSITORY, useClass: InMemoryVendorFeatureRepository },
  { provide: VENDOR_SUBSCRIPTION_REPOSITORY, useClass: InMemoryVendorSubscriptionRepository },
];

@Module({
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class MemoryRepositoriesModule {}
