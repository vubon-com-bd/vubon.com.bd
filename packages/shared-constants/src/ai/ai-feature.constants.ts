import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { VENDOR_FEATURE } from '../business/vendor/vendor-feature.constants';

export const AI_FEATURE = {
  TYPES: {
    ...COMMON_TYPES,
    ...VENDOR_FEATURE.TYPES,
    AI_RECOMMENDATION: 'ai_recommendation',
    AI_PERSONALIZATION: 'ai_personalization',
    AI_SEARCH: 'ai_search',
    AI_RANKING: 'ai_ranking',
    AI_ANALYTICS: 'ai_analytics',
    AI_CHAT: 'ai_chat',
    AI_SUPPORT: 'ai_support',
    AI_CONTENT: 'ai_content',
    AI_IMAGE: 'ai_image',
    AI_VOICE: 'ai_voice',
  },
  VENDOR_FEATURE: { ...VENDOR_FEATURE },
  AI_FEATURE_STATUS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    BETA: 'beta',
    DEPRECATED: 'deprecated',
  },
  FEATURE_REQUIREMENTS: {
    AI_RECOMMENDATION: ['user_history', 'product_data'],
    AI_PERSONALIZATION: ['user_preferences', 'behavior_data'],
    AI_SEARCH: ['search_index', 'embedding_model'],
  },
} as const;
