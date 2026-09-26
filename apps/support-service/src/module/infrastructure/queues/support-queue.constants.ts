/**
 * Support-service queue names (local)
 * @module support-service/infrastructure/queues
 *
 * Rule: shared-constants-এ support queue নেই; তাই local define
 */
export const SUPPORT_QUEUE = Object.freeze({
  TICKET: 'support.ticket',
  SLA: 'support.sla',
  ESCALATION: 'support.escalation',
  FEEDBACK: 'support.feedback',
  CHATBOT: 'support.chatbot',
  LIVE_CHAT: 'support.live_chat',
  NOTIFICATION: 'support.notification',
  ANALYTICS: 'support.analytics',
  AUTO_CLOSE: 'support.auto_close',
  SURVEY: 'support.survey',
} as const);

export type SupportQueueName = (typeof SUPPORT_QUEUE)[keyof typeof SUPPORT_QUEUE];

export const SUPPORT_QUEUE_JOB = Object.freeze({
  TICKET_ASSIGN: 'ticket.assign',
  TICKET_NOTIFY: 'ticket.notify',
  TICKET_AUTO_CLOSE: 'ticket.auto_close',
  SLA_CHECK: 'sla.check',
  SLA_BREACH: 'sla.breach',
  ESCALATION_RUN: 'escalation.run',
  FEEDBACK_FOLLOWUP: 'feedback.followup',
  CHATBOT_TRAIN: 'chatbot.train',
  CHAT_TIMEOUT: 'chat.timeout',
  SURVEY_SEND: 'survey.send',
  ANALYTICS_AGGREGATE: 'analytics.aggregate',
} as const);

export type SupportQueueJob =
  (typeof SUPPORT_QUEUE_JOB)[keyof typeof SUPPORT_QUEUE_JOB];
