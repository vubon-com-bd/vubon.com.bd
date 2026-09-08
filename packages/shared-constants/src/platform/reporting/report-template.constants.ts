import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_TYPE } from './report-type.constants';

export const REPORT_TEMPLATE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  },
  TYPES: {
    ...COMMON_TYPES,
    ...REPORT_TYPE.TYPES,
    CUSTOM: 'custom',
    PREMIUM: 'premium',
    STANDARD: 'standard',
  },
  REPORT_TYPE: { ...REPORT_TYPE },
  TEMPLATE_SECTIONS: [
    'header',
    'summary',
    'metrics',
    'charts',
    'tables',
    'analysis',
    'recommendations',
    'footer',
  ],
  MAX_TEMPLATES: 50,
  TEMPLATE_CATEGORIES: ['business', 'sales', 'marketing', 'support', 'financial'],
} as const;
