/**
 * Prisma Repositories Module — all 23 vendor repositories
 * @module vendor-service/infrastructure/persistence/prisma
 *
 * Registers both:
 *  - Class providers (VendorPrismaRepository, etc.)
 *  - DI Token aliases (VENDOR_REPOSITORY → VendorPrismaRepository)
 *
 * This allows both `@Inject(VendorPrismaRepository)` and
 * `@Inject(VENDOR_REPOSITORY)` to work.
 */
import { Module } from '@nestjs/common';
import { VendorPrismaModule } from './prisma.module.js';

// ─── Repository class implementations ───────
import { VendorPrismaRepository } from './repositories/vendor.prisma.repository.js';
import { VendorProfilePrismaRepository } from './repositories/vendor-profile.prisma.repository.js';
import { VendorBusinessPrismaRepository } from './repositories/vendor-business.prisma.repository.js';
import { VendorContactPrismaRepository } from './repositories/vendor-contact.prisma.repository.js';
import { VendorAddressPrismaRepository } from './repositories/vendor-address.prisma.repository.js';
import { VendorBankAccountPrismaRepository } from './repositories/vendor-bank-account.prisma.repository.js';
import { VendorDocumentPrismaRepository } from './repositories/vendor-document.prisma.repository.js';
import { VendorVerificationPrismaRepository } from './repositories/vendor-verification.prisma.repository.js';
import { VendorApprovalPrismaRepository } from './repositories/vendor-approval.prisma.repository.js';
import { VendorSuspensionPrismaRepository } from './repositories/vendor-suspension.prisma.repository.js';
import { VendorCommissionPrismaRepository } from './repositories/vendor-commission.prisma.repository.js';
import { VendorPayoutPrismaRepository } from './repositories/vendor-payout.prisma.repository.js';
import { VendorSettlementPrismaRepository } from './repositories/vendor-settlement.prisma.repository.js';
import { VendorPerformancePrismaRepository } from './repositories/vendor-performance.prisma.repository.js';
import { VendorRatingPrismaRepository } from './repositories/vendor-rating.prisma.repository.js';
import { VendorReviewPrismaRepository } from './repositories/vendor-review.prisma.repository.js';
import { VendorShippingPrismaRepository } from './repositories/vendor-shipping.prisma.repository.js';
import { VendorReturnPolicyPrismaRepository } from './repositories/vendor-return-policy.prisma.repository.js';
import { VendorWarrantyPrismaRepository } from './repositories/vendor-warranty.prisma.repository.js';
import { VendorTeamPrismaRepository } from './repositories/vendor-team.prisma.repository.js';
import { VendorFeaturePrismaRepository } from './repositories/vendor-feature.prisma.repository.js';
import { VendorSubscriptionPrismaRepository } from './repositories/vendor-subscription.prisma.repository.js';
import { VendorPermissionPrismaRepository } from './repositories/vendor-permission.prisma.repository.js';

// ─── DI Tokens ──────────────────────────────
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
import { VENDOR_FEATURE_REPOSITORY } from '../../../domain/repositories/vendor-feature.repository.interface.js';
import { VENDOR_SUBSCRIPTION_REPOSITORY } from '../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VENDOR_PERMISSION_REPOSITORY } from '../../../domain/repositories/vendor-permission.repository.interface.js';

// ─── Class providers ────────────────────────
const REPO_CLASSES = [
  VendorPrismaRepository,
  VendorProfilePrismaRepository,
  VendorBusinessPrismaRepository,
  VendorContactPrismaRepository,
  VendorAddressPrismaRepository,
  VendorBankAccountPrismaRepository,
  VendorDocumentPrismaRepository,
  VendorVerificationPrismaRepository,
  VendorApprovalPrismaRepository,
  VendorSuspensionPrismaRepository,
  VendorCommissionPrismaRepository,
  VendorPayoutPrismaRepository,
  VendorSettlementPrismaRepository,
  VendorPerformancePrismaRepository,
  VendorRatingPrismaRepository,
  VendorReviewPrismaRepository,
  VendorShippingPrismaRepository,
  VendorReturnPolicyPrismaRepository,
  VendorWarrantyPrismaRepository,
  VendorTeamPrismaRepository,
  VendorFeaturePrismaRepository,
  VendorSubscriptionPrismaRepository,
  VendorPermissionPrismaRepository,
];

// ─── Token → Class aliases ──────────────────
const TOKEN_ALIASES = [
  { provide: VENDOR_REPOSITORY, useExisting: VendorPrismaRepository },
  { provide: VENDOR_PROFILE_REPOSITORY, useExisting: VendorProfilePrismaRepository },
  { provide: VENDOR_BUSINESS_REPOSITORY, useExisting: VendorBusinessPrismaRepository },
  { provide: VENDOR_CONTACT_REPOSITORY, useExisting: VendorContactPrismaRepository },
  { provide: VENDOR_ADDRESS_REPOSITORY, useExisting: VendorAddressPrismaRepository },
  { provide: VENDOR_BANK_ACCOUNT_REPOSITORY, useExisting: VendorBankAccountPrismaRepository },
  { provide: VENDOR_DOCUMENT_REPOSITORY, useExisting: VendorDocumentPrismaRepository },
  { provide: VENDOR_VERIFICATION_REPOSITORY, useExisting: VendorVerificationPrismaRepository },
  { provide: VENDOR_APPROVAL_REPOSITORY, useExisting: VendorApprovalPrismaRepository },
  { provide: VENDOR_SUSPENSION_REPOSITORY, useExisting: VendorSuspensionPrismaRepository },
  { provide: VENDOR_COMMISSION_REPOSITORY, useExisting: VendorCommissionPrismaRepository },
  { provide: VENDOR_PAYOUT_REPOSITORY, useExisting: VendorPayoutPrismaRepository },
  { provide: VENDOR_SETTLEMENT_REPOSITORY, useExisting: VendorSettlementPrismaRepository },
  { provide: VENDOR_PERFORMANCE_REPOSITORY, useExisting: VendorPerformancePrismaRepository },
  { provide: VENDOR_RATING_REPOSITORY, useExisting: VendorRatingPrismaRepository },
  { provide: VENDOR_REVIEW_REPOSITORY, useExisting: VendorReviewPrismaRepository },
  { provide: VENDOR_SHIPPING_REPOSITORY, useExisting: VendorShippingPrismaRepository },
  { provide: VENDOR_RETURN_POLICY_REPOSITORY, useExisting: VendorReturnPolicyPrismaRepository },
  { provide: VENDOR_WARRANTY_REPOSITORY, useExisting: VendorWarrantyPrismaRepository },
  { provide: VENDOR_TEAM_REPOSITORY, useExisting: VendorTeamPrismaRepository },
  { provide: VENDOR_FEATURE_REPOSITORY, useExisting: VendorFeaturePrismaRepository },
  { provide: VENDOR_SUBSCRIPTION_REPOSITORY, useExisting: VendorSubscriptionPrismaRepository },
  { provide: VENDOR_PERMISSION_REPOSITORY, useExisting: VendorPermissionPrismaRepository },
];

const PROVIDERS = [...REPO_CLASSES, ...TOKEN_ALIASES];

@Module({
  imports: [VendorPrismaModule],
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class PrismaRepositoriesModule {}
