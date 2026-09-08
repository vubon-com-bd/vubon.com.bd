import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { NOTIFICATION_TYPE } from './notification-type.constants';

export const NOTIFICATION_TEMPLATE = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  },
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_TYPE.TYPES,
    CUSTOM: 'custom',
  },
  NOTIFICATION_TYPE: { ...NOTIFICATION_TYPE },
  TEMPLATE_FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    JSON: 'json',
  },
  MAX_TEMPLATE_NAME_LENGTH: 100,
  MAX_TEMPLATE_CONTENT_LENGTH: 10000,
  MAX_TEMPLATES: 100,
} as const;
