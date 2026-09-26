import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Feature modules
import {
  CampaignModule,
  CampaignBudgetModule,
  CampaignAudienceModule,
  CampaignPerformanceModule,

  PromotionModule,
  PromotionRuleModule,
  PromotionDiscountModule,

  AffiliateModule,
  AffiliateCommissionModule,
  AffiliatePayoutModule,
  AffiliateLinkModule,

  ReferralModule,
  ReferralRewardModule,

  LoyaltyModule,
  LoyaltyPointsModule,
  LoyaltyTierModule,
  LoyaltyRewardModule,

  EmailMarketingModule,
  EmailCampaignModule,
  EmailTemplateModule,
  EmailSubscriberModule,

  SmsMarketingModule,
  SmsCampaignModule,

  SocialMediaModule,
  SocialPostModule,

  SeoMarketingModule,

  LeadModule,
  LeadScoreModule,

  MarketingAnalyticsModule,
  MarketingReportModule,
  MarketingAutomationModule,

  WebhookModule,
} from './module/modules';

@Module({
  imports: [
    // Kernel common (includes ConfigModule + CqrsModule + Prisma + Redis + Queue + Events)
    KernelCommonModule,

    // Feature modules
    CampaignModule,
    CampaignBudgetModule,
    CampaignAudienceModule,
    CampaignPerformanceModule,

    PromotionModule,
    PromotionRuleModule,
    PromotionDiscountModule,

    AffiliateModule,
    AffiliateCommissionModule,
    AffiliatePayoutModule,
    AffiliateLinkModule,

    ReferralModule,
    ReferralRewardModule,

    LoyaltyModule,
    LoyaltyPointsModule,
    LoyaltyTierModule,
    LoyaltyRewardModule,

    EmailMarketingModule,
    EmailCampaignModule,
    EmailTemplateModule,
    EmailSubscriberModule,

    SmsMarketingModule,
    SmsCampaignModule,

    SocialMediaModule,
    SocialPostModule,

    SeoMarketingModule,

    LeadModule,
    LeadScoreModule,

    MarketingAnalyticsModule,
    MarketingReportModule,
    MarketingAutomationModule,

    WebhookModule,
  ],
})
export class AppModule {}
