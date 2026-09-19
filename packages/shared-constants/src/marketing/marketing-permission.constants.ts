// Note: Cannot import from higher layer (layer isolation) — hardcode + comment
export const MARKETING_PERMISSION = {
  CAMPAIGN_VIEW: 'marketing:campaign:view',
  CAMPAIGN_CREATE: 'marketing:campaign:create',
  CAMPAIGN_UPDATE: 'marketing:campaign:update',
  CAMPAIGN_DELETE: 'marketing:campaign:delete',
  CAMPAIGN_LAUNCH: 'marketing:campaign:launch',
  CAMPAIGN_PAUSE: 'marketing:campaign:pause',

  PROMOTION_VIEW: 'marketing:promotion:view',
  PROMOTION_CREATE: 'marketing:promotion:create',
  PROMOTION_UPDATE: 'marketing:promotion:update',
  PROMOTION_DELETE: 'marketing:promotion:delete',

  AFFILIATE_VIEW: 'marketing:affiliate:view',
  AFFILIATE_MANAGE: 'marketing:affiliate:manage',
  AFFILIATE_APPROVE: 'marketing:affiliate:approve',
  AFFILIATE_PAYOUT: 'marketing:affiliate:payout',

  REFERRAL_VIEW: 'marketing:referral:view',
  REFERRAL_MANAGE: 'marketing:referral:manage',

  LOYALTY_VIEW: 'marketing:loyalty:view',
  LOYALTY_MANAGE: 'marketing:loyalty:manage',
  LOYALTY_POINTS_ADJUST: 'marketing:loyalty:points:adjust',

  EMAIL_VIEW: 'marketing:email:view',
  EMAIL_MANAGE: 'marketing:email:manage',
  EMAIL_SEND: 'marketing:email:send',

  SMS_VIEW: 'marketing:sms:view',
  SMS_MANAGE: 'marketing:sms:manage',
  SMS_SEND: 'marketing:sms:send',

  SOCIAL_VIEW: 'marketing:social:view',
  SOCIAL_MANAGE: 'marketing:social:manage',
  SOCIAL_PUBLISH: 'marketing:social:publish',

  LEAD_VIEW: 'marketing:lead:view',
  LEAD_MANAGE: 'marketing:lead:manage',
  LEAD_EXPORT: 'marketing:lead:export',

  ANALYTICS_VIEW: 'marketing:analytics:view',
  ANALYTICS_EXPORT: 'marketing:analytics:export',

  REPORT_VIEW: 'marketing:report:view',
  REPORT_EXPORT: 'marketing:report:export',

  AUTOMATION_VIEW: 'marketing:automation:view',
  AUTOMATION_MANAGE: 'marketing:automation:manage',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type MarketingPermissionType =
  (typeof MARKETING_PERMISSION)[keyof typeof MARKETING_PERMISSION];
