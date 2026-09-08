import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CONTENT_TYPE } from '../content/content-type.constants';

export const AI_PROMPT = {
  TYPES: {
    ...COMMON_TYPES,
    ...CONTENT_TYPE,
    RECOMMENDATION: 'recommendation',
    SEARCH: 'search',
    CONTENT_GENERATION: 'content_generation',
    SUPPORT: 'support',
    ANALYSIS: 'analysis',
    SUMMARIZATION: 'summarization',
    TRANSLATION: 'translation',
    CLASSIFICATION: 'classification',
  },
  CONTENT_TYPE: { ...CONTENT_TYPE },
  PROMPT_TEMPLATES: {
    RECOMMENDATION: 'Based on user history, recommend products that...',
    SEARCH: 'Find products matching the query...',
    SUPPORT: 'Provide support for the following issue...',
  },
  MAX_PROMPT_LENGTH: 4096,
  MAX_RESPONSE_LENGTH: 4096,
  TEMPERATURE_DEFAULT: 0.7,
  TEMPERATURE_MAX: 1.0,
  TEMPERATURE_MIN: 0.0,
  TOP_P_DEFAULT: 0.9,
  FREQUENCY_PENALTY: 0.0,
  PRESENCE_PENALTY: 0.0,
} as const;
