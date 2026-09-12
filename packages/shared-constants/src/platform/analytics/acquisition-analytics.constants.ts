import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ACQUISITION_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    CHANNEL: 'channel',
    CAMPAIGN: 'campaign',
    SOURCE: 'source',
  },
  METRICS: {
    NEW_USERS: 'new_users',
    ACQUISITION_COST: 'acquisition_cost',
    CONVERSION_RATE: 'conversion_rate',
    LTV_TO_CAC_RATIO: 'ltv_to_cac_ratio',
  },
  ACQUISITION_CHANNELS: {
    ORGANIC: 'organic',
    PAID: 'paid',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    DIRECT: 'direct',
  },
} as const;
