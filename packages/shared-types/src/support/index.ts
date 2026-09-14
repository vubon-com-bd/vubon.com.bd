// shared-types/support/index.ts
// Support domain barrel export

// Base value types (imported by other files)
export * from './support-agent.types';
export * from './support-analytics.types';
export * from './ticket-status.types';
export * from './ticket-priority.types';
export * from './ticket-type.types';
export * from './ticket-channel.types';
export * from './ticket-category.types';

// Entity types
export * from './support.types';
export * from './ticket.types';
export * from './conversation.types';
export * from './message.types';
export * from './attachment.types';
export * from './faq.types';
export * from './knowledge-base.types';
export * from './feedback.types';
export * from './complaint.types';
export * from './survey.types';
export * from './live-chat.types';
export * from './chatbot.types';
export * from './support-sla.types';
export * from './support-team.types';
export * from './support-schedule.types';
export * from './support-rule.types';
export * from './support-automation.types';
export * from './support-template.types';
export * from './support-email.types';
export * from './support-sms.types';
export * from './support-push.types';
export * from './support-permission.types';

// Depends on ticket-escalation and support-analytics
export * from './ticket-escalation.types';
export * from './ticket-satisfaction.types';
export * from './support-report.types';
