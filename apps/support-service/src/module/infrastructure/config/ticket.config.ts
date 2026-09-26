/**
 * Ticket service config
 * @module support-service/infrastructure/config
 *
 * Rule: no hardcoded business rules, all from config
 */
export const TICKET_CONFIG = Object.freeze({
  maxAttachments: 5,
  maxAttachmentSizeMB: 10,
  maxOpenTicketsPerUser: 10,
  defaultPriority: 'normal',
  autoCloseDays: 7,
  reopenWindowHours: 72,
  maxTags: 10,
  maxWatchers: 20,
  subjectMaxLength: 200,
  descriptionMaxLength: 5000,
} as const);

export type TicketConfig = typeof TICKET_CONFIG;
