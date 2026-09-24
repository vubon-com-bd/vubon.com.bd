import { TICKET_PRIORITY } from '@vubon/shared-constants/support';

export const TICKET_CONFIG = Object.freeze({
  maxAttachments: 5,
  maxAttachmentSizeMB: 10,
  maxOpenTicketsPerUser: 10,
  defaultPriority: TICKET_PRIORITY.NORMAL,
  autoCloseDays: 7,
  maxSubjectLength: 200,
  maxDescriptionLength: 5000,
} as const);
