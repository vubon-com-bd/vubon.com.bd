/**
 * PrismaRepositoriesModule — wires all 23 repositories
 * @module vendor-service/infrastructure/persistence/prisma
 *
 * Binds domain repository tokens → Prisma implementations.
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

import { VENDOR_REPOSITORY } from '../../../domain/repositories/vendor.repository.interface.js';
import { VENDOR_PROFILE_REPOSITORY } from '../../../domain/repositories/vendor-profile.repository.interface.js';
import { VENDOR_SETTINGS_REPOSITORY } from '../../../domain/repositories/vendor-settings.repository.interface.js';
import { VENDOR_DOCUMENT_REPOSITORY } from '../../../domain/repositories/vendor-document.repository.interface.js';
import { VENDOR_VERIFICATION_REPOSITORY } from '../../../domain/repositories/vendor-verification.repository.interface.js';
import { VENDOR_APPROVAL_REPOSITORY } from '../../../domain/repositories/vendor-approval.repository.interface.js';
import { VENDOR_SUSPENSION_REPOSITORY } from '../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VENDOR_SUSPENSION_LOG_REPOSITORY } from '../../../domain/repositories/vendor-suspension-log.repository.interface.js';
import { VENDOR_TEAM_MEMBER_REPOSITORY } from '../../../domain/repositories/vendor-team-member.repository.interface.js';
import { VENDOR_TEAM_INVITE_REPOSITORY } from '../../../domain/repositories/vendor-team-invite.repository.interface.js';
import { VENDOR_PAYOUT_REPOSITORY } from '../../../domain/repositories/vendor-payout.repository.interface.js';
import { VENDOR_SETTLEMENT_REPOSITORY } from '../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VENDOR_INVOICE_REPOSITORY } from '../../../domain/repositories/vendor-invoice.repository.interface.js';
import { VENDOR_SUBSCRIPTION_REPOSITORY } from '../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VENDOR_COMMISSION_REPOSITORY } from '../../../domain/repositories/vendor-commission.repository.interface.js';
import { VENDOR_RATING_REPOSITORY } from '../../../domain/repositories/vendor-rating.repository.interface.js';
import { VENDOR_REVIEW_REPOSITORY } from '../../../domain/repositories/vendor-review.repository.interface.js';
import { VENDOR_PERFORMANCE_REPOSITORY } from '../../../domain/repositories/vendor-performance.repository.interface.js';
import { VENDOR_STATS_REPOSITORY } from '../../../domain/repositories/vendor-stats.repository.interface.js';
import { VENDOR_REPORT_REPOSITORY } from '../../../domain/repositories/vendor-report.repository.interface.js';
import { VENDOR_SHIPPING_REPOSITORY } from '../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VENDOR_WARRANTY_REPOSITORY } from '../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VENDOR_RETURN_POLICY_REPOSITORY } from '../../../domain/repositories/vendor-return-policy.repository.interface.js';

import { VendorPrismaRepository } from './repositories/vendor.prisma.repository.js';
import { VendorProfilePrismaRepository } from './repositories/vendor-profile.prisma.repository.js';
import { VendorSettingsPrismaRepository } from './repositories/vendor-settings.prisma.repository.js';
import { VendorDocumentPrismaRepository } from './repositories/vendor-document.prisma.repository.js';
import { VendorVerificationPrismaRepository } from './repositories/vendor-verification.prisma.repository.js';
import { VendorApprovalPrismaRepository } from './repositories/vendor-approval.prisma.repository.js';
import { VendorSuspensionPrismaRepository } from './repositories/vendor-suspension.prisma.repository.js';
import { VendorSuspensionLogPrismaRepository } from './repositories/vendor-suspension-log.prisma.repository.js';
import { VendorTeamMemberPrismaRepository } from './repositories/vendor-team-member.prisma.repository.js';
import { VendorTeamInvitePrismaRepository } from './repositories/vendor-team-invite.prisma.repository.js';
import { VendorPayoutPrismaRepository } from './repositories/vendor-payout.prisma.repository.js';
import { VendorSettlementPrismaRepository } from './repositories/vendor-settlement.prisma.repository.js';
import { VendorInvoicePrismaRepository } from './repositories/vendor-invoice.prisma.repository.js';
import { VendorSubscriptionPrismaRepository } from './repositories/vendor-subscription.prisma.repository.js';
import { VendorCommissionPrismaRepository } from './repositories/vendor-commission.prisma.repository.js';
import { VendorRatingPrismaRepository } from './repositories/vendor-rating.prisma.repository.js';
import { VendorReviewPrismaRepository } from './repositories/vendor-review.prisma.repository.js';
import { VendorPerformancePrismaRepository } from './repositories/vendor-performance.prisma.repository.js';
import { VendorStatsPrismaRepository } from './repositories/vendor-stats.prisma.repository.js';
import { VendorReportPrismaRepository } from './repositories/vendor-report.prisma.repository.js';
import { VendorShippingPrismaRepository } from './repositories/vendor-shipping.prisma.repository.js';
import { VendorWarrantyPrismaRepository } from './repositories/vendor-warranty.prisma.repository.js';
import { VendorReturnPolicyPrismaRepository } from './repositories/vendor-return-policy.prisma.repository.js';

const REPO_PROVIDERS = [
  { provide: VENDOR_REPOSITORY, useClass: VendorPrismaRepository },
  { provide: VENDOR_PROFILE_REPOSITORY, useClass: VendorProfilePrismaRepository },
  { provide: VENDOR_SETTINGS_REPOSITORY, useClass: VendorSettingsPrismaRepository },
  { provide: VENDOR_DOCUMENT_REPOSITORY, useClass: VendorDocumentPrismaRepository },
  { provide: VENDOR_VERIFICATION_REPOSITORY, useClass: VendorVerificationPrismaRepository },
  { provide: VENDOR_APPROVAL_REPOSITORY, useClass: VendorApprovalPrismaRepository },
  { provide: VENDOR_SUSPENSION_REPOSITORY, useClass: VendorSuspensionPrismaRepository },
  { provide: VENDOR_SUSPENSION_LOG_REPOSITORY, useClass: VendorSuspensionLogPrismaRepository },
  { provide: VENDOR_TEAM_MEMBER_REPOSITORY, useClass: VendorTeamMemberPrismaRepository },
  { provide: VENDOR_TEAM_INVITE_REPOSITORY, useClass: VendorTeamInvitePrismaRepository },
  { provide: VENDOR_PAYOUT_REPOSITORY, useClass: VendorPayoutPrismaRepository },
  { provide: VENDOR_SETTLEMENT_REPOSITORY, useClass: VendorSettlementPrismaRepository },
  { provide: VENDOR_INVOICE_REPOSITORY, useClass: VendorInvoicePrismaRepository },
  { provide: VENDOR_SUBSCRIPTION_REPOSITORY, useClass: VendorSubscriptionPrismaRepository },
  { provide: VENDOR_COMMISSION_REPOSITORY, useClass: VendorCommissionPrismaRepository },
  { provide: VENDOR_RATING_REPOSITORY, useClass: VendorRatingPrismaRepository },
  { provide: VENDOR_REVIEW_REPOSITORY, useClass: VendorReviewPrismaRepository },
  { provide: VENDOR_PERFORMANCE_REPOSITORY, useClass: VendorPerformancePrismaRepository },
  { provide: VENDOR_STATS_REPOSITORY, useClass: VendorStatsPrismaRepository },
  { provide: VENDOR_REPORT_REPOSITORY, useClass: VendorReportPrismaRepository },
  { provide: VENDOR_SHIPPING_REPOSITORY, useClass: VendorShippingPrismaRepository },
  { provide: VENDOR_WARRANTY_REPOSITORY, useClass: VendorWarrantyPrismaRepository },
  { provide: VENDOR_RETURN_POLICY_REPOSITORY, useClass: VendorReturnPolicyPrismaRepository },
];

@Module({
  imports: [PrismaModule],
  providers: [...REPO_PROVIDERS],
  exports: [...REPO_PROVIDERS],
})
export class PrismaRepositoriesModule {}
