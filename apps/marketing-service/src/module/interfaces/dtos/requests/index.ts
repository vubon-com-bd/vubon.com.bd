export {
  CreateCampaignRequestDTO,
  UpdateCampaignRequestDTO,
  LaunchCampaignRequestDTO,
  CampaignIdRequestDTO,
  CampaignTypeEnum,
  CampaignChannelEnum,
} from './campaign.request.dto';

export {
  CreatePromotionRequestDTO,
  ApplyPromotionRequestDTO,
} from './promotion.request.dto';

export {
  RegisterAffiliateRequestDTO,
  ApproveAffiliateRequestDTO,
  TrackConversionRequestDTO,
  RequestPayoutRequestDTO,
} from './affiliate.request.dto';

export {
  EarnPointsRequestDTO,
  RedeemPointsRequestDTO,
  UpgradeTierRequestDTO,
  ClaimRewardRequestDTO,
} from './loyalty.request.dto';

export {
  CreateLeadRequestDTO,
  QualifyLeadRequestDTO,
  ConvertLeadRequestDTO,
  AssignLeadRequestDTO,
  LeadSourceEnum,
} from './lead.request.dto';

export {
  CreateEmailCampaignRequestDTO,
  SendEmailCampaignRequestDTO,
  ScheduleEmailCampaignRequestDTO,
  CreateEmailTemplateRequestDTO,
} from './email.request.dto';

export {
  CreateSmsCampaignRequestDTO,
  SendSmsCampaignRequestDTO,
  ScheduleSmsCampaignRequestDTO,
} from './sms.request.dto';

export {
  CreateSocialPostRequestDTO,
  ScheduleSocialPostRequestDTO,
  PublishSocialPostRequestDTO,
  SocialPlatformEnum,
} from './social.request.dto';
