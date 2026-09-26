import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// App-level Prisma
import { PrismaModule } from './persistence/prisma/prisma.module';

// Repositories
import {
  CampaignPrismaRepository,
  CampaignBudgetPrismaRepository,
  CampaignAudiencePrismaRepository,
  CampaignPerformancePrismaRepository,
  PromotionPrismaRepository,
  PromotionRulePrismaRepository,
  PromotionDiscountPrismaRepository,
  AffiliatePrismaRepository,
  AffiliateCommissionPrismaRepository,
  AffiliatePayoutPrismaRepository,
  AffiliateLinkPrismaRepository,
  ReferralPrismaRepository,
  ReferralRewardPrismaRepository,
  LoyaltyPrismaRepository,
  LoyaltyPointsPrismaRepository,
  LoyaltyTierPrismaRepository,
  LoyaltyRewardPrismaRepository,
  LoyaltyTransactionPrismaRepository,
  EmailMarketingPrismaRepository,
  EmailCampaignPrismaRepository,
  EmailTemplatePrismaRepository,
  EmailSubscriberPrismaRepository,
  SmsMarketingPrismaRepository,
  SmsCampaignPrismaRepository,
  SocialMediaPrismaRepository,
  SocialPostPrismaRepository,
  SeoMarketingPrismaRepository,
  SeoKeywordPrismaRepository,
  LeadPrismaRepository,
  LeadScorePrismaRepository,
  LeadSourcePrismaRepository,
  MarketingAnalyticsPrismaRepository,
  MarketingReportPrismaRepository,
  MarketingAutomationPrismaRepository,
  MarketingWorkflowPrismaRepository,
  MarketingPermissionPrismaRepository,
} from './persistence/prisma/repositories';

import {
  CampaignCacheRepository,
  PromotionCacheRepository,
  LoyaltyTierCacheRepository,
  LeadScoreCacheRepository,
  AnalyticsCacheRepository,
} from './persistence/cache/repositories';

// Internal services
import {
  AttributionTrackerService,
  UtmParserService,
  CouponGeneratorService,
  ReferralCodeGeneratorService,
  AffiliateLinkGeneratorService,
  LoyaltyPointsCalculatorService,
  LeadScoringService,
  AudienceSegmenterService,
  BudgetOptimizerService,
  RoiCalculatorService,
  ClvCalculatorService,
  CacCalculatorService,
  AbTestingService,
} from './services/internal';

// External clients
import {
  UserClient,
  OrderClient,
  ProductClient,
  VendorClient,
  CartClient,
  PaymentClient,
  NotificationClient,
  AnalyticsClient,
} from './services/external';

// Queues
import {
  CampaignQueue,
  PromotionQueue,
  AffiliateQueue,
  LoyaltyQueue,
  EmailQueue,
  SmsQueue,
  SocialQueue,
  LeadQueue,
  NotificationQueue,
  AnalyticsQueue,
  ReportQueue,
} from './queues';

// Workers
import {
  CampaignProcessorWorker,
  CampaignOptimizerWorker,
  PromotionExpiryWorker,
  AffiliateAttributionWorker,
  LoyaltyPointsCalculatorWorker,
  LoyaltyPointsExpiryWorker,
  LoyaltyTierEvaluatorWorker,
  EmailSenderWorker,
  SmsSenderWorker,
  SocialSchedulerWorker,
  LeadScorerWorker,
  AbandonedCartRecoveryWorker,
  AnalyticsProcessorWorker,
  ReportGeneratorWorker,
  NotificationWorker,
} from './workers';

// Providers (stub)
import {
  StubEmailProvider,
  StubSmsProvider,
  StubSocialProvider,
  StubAdsProvider,
  StubAnalyticsProvider,
  StubAiProvider,
} from './marketing-providers';

const REPOSITORIES = [
  CampaignPrismaRepository,
  CampaignBudgetPrismaRepository,
  CampaignAudiencePrismaRepository,
  CampaignPerformancePrismaRepository,
  PromotionPrismaRepository,
  PromotionRulePrismaRepository,
  PromotionDiscountPrismaRepository,
  AffiliatePrismaRepository,
  AffiliateCommissionPrismaRepository,
  AffiliatePayoutPrismaRepository,
  AffiliateLinkPrismaRepository,
  ReferralPrismaRepository,
  ReferralRewardPrismaRepository,
  LoyaltyPrismaRepository,
  LoyaltyPointsPrismaRepository,
  LoyaltyTierPrismaRepository,
  LoyaltyRewardPrismaRepository,
  LoyaltyTransactionPrismaRepository,
  EmailMarketingPrismaRepository,
  EmailCampaignPrismaRepository,
  EmailTemplatePrismaRepository,
  EmailSubscriberPrismaRepository,
  SmsMarketingPrismaRepository,
  SmsCampaignPrismaRepository,
  SocialMediaPrismaRepository,
  SocialPostPrismaRepository,
  SeoMarketingPrismaRepository,
  SeoKeywordPrismaRepository,
  LeadPrismaRepository,
  LeadScorePrismaRepository,
  LeadSourcePrismaRepository,
  MarketingAnalyticsPrismaRepository,
  MarketingReportPrismaRepository,
  MarketingAutomationPrismaRepository,
  MarketingWorkflowPrismaRepository,
  MarketingPermissionPrismaRepository,
];

const CACHE_REPOSITORIES = [
  CampaignCacheRepository,
  PromotionCacheRepository,
  LoyaltyTierCacheRepository,
  LeadScoreCacheRepository,
  AnalyticsCacheRepository,
];

const INTERNAL_SERVICES = [
  AttributionTrackerService,
  UtmParserService,
  CouponGeneratorService,
  ReferralCodeGeneratorService,
  AffiliateLinkGeneratorService,
  LoyaltyPointsCalculatorService,
  LeadScoringService,
  AudienceSegmenterService,
  BudgetOptimizerService,
  RoiCalculatorService,
  ClvCalculatorService,
  CacCalculatorService,
  AbTestingService,
];

const EXTERNAL_CLIENTS = [
  UserClient,
  OrderClient,
  ProductClient,
  VendorClient,
  CartClient,
  PaymentClient,
  NotificationClient,
  AnalyticsClient,
];

const QUEUES = [
  CampaignQueue,
  PromotionQueue,
  AffiliateQueue,
  LoyaltyQueue,
  EmailQueue,
  SmsQueue,
  SocialQueue,
  LeadQueue,
  NotificationQueue,
  AnalyticsQueue,
  ReportQueue,
];

const WORKERS = [
  CampaignProcessorWorker,
  CampaignOptimizerWorker,
  PromotionExpiryWorker,
  AffiliateAttributionWorker,
  LoyaltyPointsCalculatorWorker,
  LoyaltyPointsExpiryWorker,
  LoyaltyTierEvaluatorWorker,
  EmailSenderWorker,
  SmsSenderWorker,
  SocialSchedulerWorker,
  LeadScorerWorker,
  AbandonedCartRecoveryWorker,
  AnalyticsProcessorWorker,
  ReportGeneratorWorker,
  NotificationWorker,
];

const PROVIDERS = [
  StubEmailProvider,
  StubSmsProvider,
  StubSocialProvider,
  StubAdsProvider,
  StubAnalyticsProvider,
  StubAiProvider,
];

@Module({
  imports: [KernelCommonModule, PrismaModule],
  providers: [
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUES,
    ...WORKERS,
    ...PROVIDERS,
  ],
  exports: [
    PrismaModule,
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUES,
    ...PROVIDERS,
  ],
})
export class InfrastructureModule {}
