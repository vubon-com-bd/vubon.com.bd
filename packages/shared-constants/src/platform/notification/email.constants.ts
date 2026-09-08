import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { EMAIL_TEMPLATE } from './email-template.constants';

export const EMAIL = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    QUEUED: 'queued',
    SENDING: 'sending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    BOUNCED: 'bounced',
    SPAM: 'spam',
  },
  TYPES: {
    ...COMMON_TYPES,
    HTML: 'html',
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    TEMPLATE: 'template',
  },
  EMAIL_TEMPLATE: { ...EMAIL_TEMPLATE },
  EMAIL_PROVIDERS: {
    SENDGRID: 'sendgrid',
    AWS_SES: 'aws_ses',
    MAILGUN: 'mailgun',
    SMTP: 'smtp',
  },
  MAX_SUBJECT_LENGTH: 100,
  MAX_BODY_LENGTH: 100000,
  MAX_RECIPIENTS: 1000,
  EMAIL_TIMEOUT_SECONDS: 30,
} as const;
