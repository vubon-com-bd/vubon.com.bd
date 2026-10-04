// shared-types/support/index.ts
// Support domain barrel export

// Base value types (imported by other files)
export * from './support-agent.types.js';
export * from './support-analytics.types.js';
export * from './ticket-status.types.js';
export * from './ticket-priority.types.js';
export * from './ticket-type.types.js';
export * from './ticket-channel.types.js';
export * from './ticket-category.types.js';

// Entity types
export * from './support.types.js';
export * from './ticket.types.js';
export * from './conversation.types.js';
export * from './message.types.js';
export * from './attachment.types.js';
export * from './faq.types.js';
export * from './knowledge-base.types.js';
export * from './feedback.types.js';
export * from './complaint.types.js';
export * from './survey.types.js';
export * from './live-chat.types.js';
export * from './chatbot.types.js';
export * from './support-sla.types.js';
export * from './support-team.types.js';
export * from './support-schedule.types.js';
export * from './support-rule.types.js';
export * from './support-automation.types.js';
export * from './support-template.types.js';
export * from './support-email.types.js';
export * from './support-sms.types.js';
export * from './support-push.types.js';
export * from './support-permission.types.js';

// Depends on ticket-escalation and support-analytics
export * from './ticket-escalation.types.js';
export * from './ticket-satisfaction.types.js';
export * from './support-report.types.js';
