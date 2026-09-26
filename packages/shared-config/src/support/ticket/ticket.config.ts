/**
 * Support ticket configuration
 * @module shared-config/support/ticket
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const TICKET_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TICKET_ENABLED', true),
  maxOpenPerUser: getOptionalEnvInt('TICKET_MAX_OPEN_PER_USER', 20),
  subjectMaxLength: getOptionalEnvInt('TICKET_SUBJECT_MAX', 200),
  descriptionMaxLength: getOptionalEnvInt('TICKET_DESC_MAX', 10000),
  maxAttachments: getOptionalEnvInt('TICKET_MAX_ATTACHMENTS', 10),
  maxAttachmentSizeMb: getOptionalEnvInt('TICKET_MAX_ATTACHMENT_MB', 10),
  maxTags: getOptionalEnvInt('TICKET_MAX_TAGS', 20),
  maxWatchers: getOptionalEnvInt('TICKET_MAX_WATCHERS', 10),
  autoCloseDays: getOptionalEnvInt('TICKET_AUTO_CLOSE_DAYS', 7),
  reopenWindowDays: getOptionalEnvInt('TICKET_REOPEN_WINDOW_DAYS', 14),
  satisfactionEnabled: getOptionalEnvBool('TICKET_SATISFACTION', true),
  autoAssign: getOptionalEnvBool('TICKET_AUTO_ASSIGN', true),
});
