import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { VENDOR_PERMISSION } from '../business/vendor/vendor-permission.constants';

export const MARKETING_PERMISSION = {
  ...COMMON_PERMISSIONS,
  ...ADMIN_PERMISSIONS,
  ...VENDOR_PERMISSION,

  // Campaign Management
  CAMPAIGN_VIEW: 'campaign:view',
  CAMPAIGN_CREATE: 'campaign:create',
  CAMPAIGN_UPDATE: 'campaign:update',
  CAMPAIGN_DELETE: 'campaign:delete',
  CAMPAIGN_LAUNCH: 'campaign:launch',
  CAMPAIGN_PAUSE: 'campaign:pause',
  CAMPAIGN_MANAGE: 'campaign:manage',

  // Promotion Management
  PROMOTION_VIEW: 'promotion:view',
  PROMOTION_CREATE: 'promotion:create',
  PROMOTION_UPDATE: 'promotion:update',
  PROMOTION_DELETE: 'promotion:delete',
  PROMOTION_APPLY: 'promotion:apply',

  // Affiliate Management
  AFFILIATE_VIEW: 'affiliate:view',
  AFFILIATE_CREATE: 'affiliate:create',
  AFFILIATE_UPDATE: 'affiliate:update',
  AFFILIATE_DELETE: 'affiliate:delete',
  AFFILIATE_APPROVE: 'affiliate:approve',
  AFFILIATE_COMMISSION: 'affiliate:commission',

  // Referral Management
  REFERRAL_VIEW: 'referral:view',
  REFERRAL_CREATE: 'referral:create',
  REFERRAL_UPDATE: 'referral:update',
  REFERRAL_DELETE: 'referral:delete',

  // Loyalty Management
  LOYALTY_VIEW: 'loyalty:view',
  LOYALTY_CREATE: 'loyalty:create',
  LOYALTY_UPDATE: 'loyalty:update',
  LOYALTY_DELETE: 'loyalty:delete',
  LOYALTY_MANAGE: 'loyalty:manage',

  // Email Marketing
  EMAIL_VIEW: 'email:view',
  EMAIL_CREATE: 'email:create',
  EMAIL_UPDATE: 'email:update',
  EMAIL_DELETE: 'email:delete',
  EMAIL_SEND: 'email:send',

  // SMS Marketing
  SMS_VIEW: 'sms:view',
  SMS_CREATE: 'sms:create',
  SMS_UPDATE: 'sms:update',
  SMS_DELETE: 'sms:delete',
  SMS_SEND: 'sms:send',

  // Lead Management
  LEAD_VIEW: 'lead:view',
  LEAD_CREATE: 'lead:create',
  LEAD_UPDATE: 'lead:update',
  LEAD_DELETE: 'lead:delete',
  LEAD_CONVERT: 'lead:convert',
  LEAD_QUALIFY: 'lead:qualify',

  // Marketing Analytics
  MARKETING_ANALYTICS_VIEW: 'marketing_analytics:view',
  MARKETING_REPORT_VIEW: 'marketing_report:view',

  // Marketing Automation
  MARKETING_AUTOMATION_VIEW: 'marketing_automation:view',
  MARKETING_AUTOMATION_CONFIGURE: 'marketing_automation:configure',
} as const;
