export const SUPPORT_AUTOMATION_TYPE = {
  AUTO_REPLY: 'auto_reply',
  AUTO_ASSIGN: 'auto_assign',
  AUTO_ESCALATE: 'auto_escalate',
  AUTO_CLOSE: 'auto_close',
  AUTO_TAG: 'auto_tag',
  AUTO_PRIORITY: 'auto_priority',
  AUTO_MERGE: 'auto_merge',
  AUTO_FOLLOWUP: 'auto_followup',
  AUTO_SURVEY: 'auto_survey',
} as const;

export const SUPPORT_AUTOMATION_TRIGGER = {
  TICKET_CREATED: 'ticket_created',
  TICKET_UPDATED: 'ticket_updated',
  TICKET_ASSIGNED: 'ticket_assigned',
  TICKET_RESOLVED: 'ticket_resolved',
  TICKET_CLOSED: 'ticket_closed',
  MESSAGE_RECEIVED: 'message_received',
  TIME_ELAPSED: 'time_elapsed',
  SLA_BREACH: 'sla_breach',
  CUSTOMER_REPLIED: 'customer_replied',
  AGENT_REPLIED: 'agent_replied',
  CHAT_STARTED: 'chat_started',
  CHAT_ENDED: 'chat_ended',
} as const;

export const SUPPORT_AUTOMATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  PAUSED: 'paused',
  ARCHIVED: 'archived',
} as const;

export const SUPPORT_AUTOMATION = {
  TYPE: SUPPORT_AUTOMATION_TYPE,
  TRIGGER: SUPPORT_AUTOMATION_TRIGGER,
  STATUS: SUPPORT_AUTOMATION_STATUS,
  MAX_AUTOMATIONS: 200,
  MAX_ACTIVE_AUTOMATIONS: 100,
  MAX_STEPS_PER_AUTOMATION: 20,
  MAX_DELAY_MINUTES: 10080,
  MIN_DELAY_MINUTES: 1,
  EVALUATION_TIMEOUT_MS: 3000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 60,
  RETENTION_DAYS: 365,
} as const;

export type SupportAutomationTypeType =
  (typeof SUPPORT_AUTOMATION_TYPE)[keyof typeof SUPPORT_AUTOMATION_TYPE];
export type SupportAutomationTriggerType =
  (typeof SUPPORT_AUTOMATION_TRIGGER)[keyof typeof SUPPORT_AUTOMATION_TRIGGER];
export type SupportAutomationStatusType =
  (typeof SUPPORT_AUTOMATION_STATUS)[keyof typeof SUPPORT_AUTOMATION_STATUS];
