export {
  CampaignOperationFailedError,
  CampaignNotFoundAppError,
  BudgetExceededAppError,
} from './campaign.errors';

export {
  PromotionNotFoundAppError,
  PromotionNotApplicableAppError,
  PromotionStackingAppError,
} from './promotion.errors';

export {
  AffiliateNotFoundAppError,
  AffiliatePayoutAppError,
} from './affiliate.errors';

export {
  LoyaltyNotFoundAppError,
  InsufficientPointsAppError,
  TierNotMetAppError,
} from './loyalty.errors';

export {
  EmailMarketingNotFoundAppError,
  EmailAlreadySentAppError,
  SpamScoreTooHighAppError,
} from './email.errors';

export {
  LeadNotFoundAppError,
  InvalidLeadStateAppError,
} from './lead.errors';
