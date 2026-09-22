import { Module } from '@nestjs/common';

// Kernel modules (global)
import {
  PrismaModule,
  RedisModule,
  EmailModule,
  SmsModule,
  PushModule,
  QueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level Prisma module
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';

// Prisma repositories (23)
import {
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
} from './persistence/prisma/repositories';

// Cache repositories (4)
import {
  VendorCacheRepository,
  CommissionCacheRepository,
  PerformanceCacheRepository,
  SubscriptionCacheRepository,
} from './persistence/cache/repositories';

// External services (5)
import {
  EmailService,
  SmsService,
  PushService,
  StorageService,
  BankService,
} from './services/external';

// Internal services (8)
import {
  SlugGeneratorService,
  TierCalculatorService,
  CommissionCalculatorService,
  PayoutCalculatorService,
  PerformanceTrackerService,
  RatingCalculatorService,
  BankVerificationService,
  DocumentValidatorService,
} from './services/internal';

// Queues (6)
import {
  VendorQueue,
  CommissionQueue,
  PayoutQueue,
  SettlementQueue,
  DocumentQueue,
  NotificationQueue,
} from './queues';

// Workers (8)
import {
  CommissionCalculatorWorker,
  PayoutProcessorWorker,
  SettlementProcessorWorker,
  PerformanceTrackerWorker,
  TierEvaluatorWorker,
  DocumentExpiryWorker,
  SubscriptionRenewalWorker,
  AnalyticsProcessorWorker,
} from './workers';

// Bank providers (4)
import {
  BkashProvider,
  NagadProvider,
  RocketProvider,
  BankTransferProvider,
} from './external/bank/providers';

const PRISMA_REPOSITORIES = [
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

const CACHE_REPOSITORIES = [
  VendorCacheRepository,
  CommissionCacheRepository,
  PerformanceCacheRepository,
  SubscriptionCacheRepository,
];

const EXTERNAL_SERVICES = [
  EmailService,
  SmsService,
  PushService,
  StorageService,
  BankService,
];

const INTERNAL_SERVICES = [
  SlugGeneratorService,
  TierCalculatorService,
  CommissionCalculatorService,
  PayoutCalculatorService,
  PerformanceTrackerService,
  RatingCalculatorService,
  BankVerificationService,
  DocumentValidatorService,
];

const QUEUES = [
  VendorQueue,
  CommissionQueue,
  PayoutQueue,
  SettlementQueue,
  DocumentQueue,
  NotificationQueue,
];

const WORKERS = [
  CommissionCalculatorWorker,
  PayoutProcessorWorker,
  SettlementProcessorWorker,
  PerformanceTrackerWorker,
  TierEvaluatorWorker,
  DocumentExpiryWorker,
  SubscriptionRenewalWorker,
  AnalyticsProcessorWorker,
];

const BANK_PROVIDERS = [
  BkashProvider,
  NagadProvider,
  RocketProvider,
  BankTransferProvider,
];

@Module({
  imports: [
    PrismaModule,
    AppPrismaModule,
    RedisModule,
    EmailModule,
    SmsModule,
    PushModule,
    QueueModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
    ...BANK_PROVIDERS,
  ],
  exports: [
    AppPrismaModule,
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
    ...QUEUES,
    ...BANK_PROVIDERS,
  ],
})
export class InfrastructureModule {}
