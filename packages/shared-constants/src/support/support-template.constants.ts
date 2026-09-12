import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const SUPPORT_TEMPLATE = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
  },
  TYPES: {
    ...COMMON_TYPES,
    ACKNOWLEDGMENT: 'acknowledgment',
    RESOLUTION: 'resolution',
    FOLLOW_UP: 'follow_up',
    ESCALATION: 'escalation',
    CLOSURE: 'closure',
    SURVEY: 'survey',
  },
  TEMPLATE_FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
  },
  MAX_TEMPLATE_NAME_LENGTH: 100,
  MAX_TEMPLATE_CONTENT_LENGTH: 5000,
  VARIABLES: [
    '{{ticket_id}}',
    '{{customer_name}}',
    '{{agent_name}}',
    '{{ticket_status}}',
    '{{ticket_priority}}',
    '{{order_id}}',
    '{{issue_type}}',
    '{{support_url}}',
    '{{company_name}}',
  ],
} as const;
