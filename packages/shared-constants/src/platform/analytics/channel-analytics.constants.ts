import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CAMPAIGN_CHANNEL } from '../../marketing/campaign-channel.constants';

export const CHANNEL_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    ...CAMPAIGN_CHANNEL.TYPES,
    PERFORMANCE: 'performance',
    ATTRIBUTION: 'attribution',
    CONVERSION: 'conversion',
  },
  CAMPAIGN_CHANNEL: { ...CAMPAIGN_CHANNEL },
  METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    TOTAL_ORDERS: 'total_orders',
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    RETURN_ON_AD_SPEND: 'return_on_ad_spend',
  },
  ATTRIBUTION_MODELS: {
    LAST_CLICK: 'last_click',
    FIRST_CLICK: 'first_click',
    LINEAR: 'linear',
    TIME_DECAY: 'time_decay',
    POSITION_BASED: 'position_based',
  },
} as const;
