import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { CAMPAIGN_TYPE } from './campaign-type.constants';
import { CAMPAIGN_STATUS } from './campaign-status.constants';
import { CAMPAIGN_CHANNEL } from './campaign-channel.constants';
import { CAMPAIGN_BUDGET } from './campaign-budget.constants';
import { PRODUCT_STATUS } from '../business/product/product-status.constants';

export const CAMPAIGN = {
  STATUS: {
    ...STATUS,
    ...CAMPAIGN_STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'campaign:view',
    CREATE: 'campaign:create',
    UPDATE: 'campaign:update',
    DELETE: 'campaign:delete',
    LAUNCH: 'campaign:launch',
    PAUSE: 'campaign:pause',
  },
  CAMPAIGN_TYPE: { ...CAMPAIGN_TYPE },
  CAMPAIGN_STATUS: { ...CAMPAIGN_STATUS },
  CAMPAIGN_CHANNEL: { ...CAMPAIGN_CHANNEL },
  CAMPAIGN_BUDGET: { ...CAMPAIGN_BUDGET },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  CAMPAIGN_GOALS: {
    AWARENESS: 'awareness',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REVENUE: 'revenue',
  },
  CAMPAIGN_NAME_MAX_LENGTH: 100,
  CAMPAIGN_DESCRIPTION_MAX_LENGTH: 500,
  MAX_DURATION_DAYS: 365,
  MIN_DURATION_DAYS: 1,
  MAX_PRODUCTS_PER_CAMPAIGN: 100,
} as const;
