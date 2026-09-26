export {
  CampaignCreatedEvent,
  CampaignLaunchedEvent,
  CampaignCompletedEvent,
} from './campaign.events';

export {
  PromotionCreatedEvent,
  PromotionAppliedEvent,
  PromotionExpiredEvent,
} from './promotion.events';

export {
  AffiliateRegisteredEvent,
  AffiliateApprovedEvent,
  AffiliateCommissionEarnedEvent,
} from './affiliate.events';

export { AffiliatePayoutProcessedEvent } from './affiliate-payout.events';

export {
  ReferralCreatedEvent,
  ReferralConvertedEvent,
  ReferralRewardedEvent,
} from './referral.events';

export {
  LoyaltyPointsEarnedEvent,
  LoyaltyPointsRedeemedEvent,
  LoyaltyTierUpgradedEvent,
} from './loyalty.events';

export { EmailCampaignSentEvent } from './email-marketing.events';
export { SmsCampaignSentEvent } from './sms-marketing.events';
export { SocialPostPublishedEvent } from './social.events';
export { SeoKeywordTrackedEvent } from './seo.events';

export {
  LeadCreatedEvent,
  LeadQualifiedEvent,
  LeadConvertedEvent,
  LeadLostEvent,
} from './lead.events';

export { AutomationTriggeredEvent, WorkflowExecutedEvent } from './automation.events';
export { MarketingAnalyticsRecordedEvent } from './analytics.events';
