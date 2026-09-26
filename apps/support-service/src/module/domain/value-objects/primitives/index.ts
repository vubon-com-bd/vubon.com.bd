// support-service/domain/value-objects/primitives/index.ts
// Primitives VO barrel — সব primitive VO একসাথে export

// Ticket
export * from './ticket-id.vo';
export * from './ticket-number.vo';
export * from './ticket-subject.vo';
export * from './ticket-description.vo';
export * from './ticket-status.vo';
export * from './ticket-priority.vo';
export * from './ticket-type.vo';
export * from './ticket-channel.vo';
export * from './ticket-category-id.vo';

// Escalation
export * from './ticket-escalation-id.vo';
export * from './ticket-escalation-level.vo';

// Satisfaction
export * from './ticket-satisfaction-id.vo';
export * from './satisfaction-score.vo';
export * from './satisfaction-comment.vo';

// Conversation / Message
export * from './conversation-id.vo';
export * from './conversation-status.vo';
export * from './conversation-type.vo';
export * from './message-id.vo';
export * from './message-content.vo';
export * from './message-type.vo';
export * from './message-status.vo';

// Attachment
export * from './attachment-id.vo';
export * from './attachment-type.vo';
export * from './attachment-url.vo';
export * from './attachment-size.vo';

// FAQ
export * from './faq-id.vo';
export * from './faq-question.vo';
export * from './faq-answer.vo';
export * from './faq-status.vo';

// Knowledge Base
export * from './knowledge-article-id.vo';
export * from './knowledge-article-title.vo';
export * from './knowledge-article-body.vo';
export * from './knowledge-status.vo';

// Feedback
export * from './feedback-id.vo';
export * from './feedback-type.vo';
export * from './feedback-status.vo';
export * from './feedback-content.vo';

// Complaint
export * from './complaint-id.vo';
export * from './complaint-type.vo';
export * from './complaint-severity.vo';
export * from './complaint-status.vo';

// Survey
export * from './survey-id.vo';
export * from './survey-type.vo';
export * from './survey-status.vo';
export * from './survey-question.vo';

// Live Chat
export * from './live-chat-id.vo';
export * from './live-chat-status.vo';
export * from './live-chat-type.vo';

// Chatbot
export * from './chatbot-id.vo';
export * from './chatbot-status.vo';
export * from './chatbot-type.vo';
export * from './chatbot-intent-id.vo';
export * from './chatbot-entity-id.vo';

// Agent
export * from './agent-id.vo';
export * from './agent-status.vo';
export * from './agent-type.vo';

// Team
export * from './team-id.vo';
export * from './team-name.vo';
export * from './team-type.vo';

// SLA
export * from './sla-id.vo';
export * from './sla-type.vo';
export * from './sla-target.vo';
export * from './sla-status.vo';

// Rule
export * from './rule-id.vo';
export * from './rule-type.vo';
export * from './rule-condition.vo';

// Automation
export * from './automation-id.vo';
export * from './automation-type.vo';
export * from './automation-status.vo';

// Template
export * from './template-id.vo';
export * from './template-type.vo';
export * from './template-content.vo';

// Cross-service reference VOs
export * from './user-id.vo';
export * from './order-id.vo';
export * from './product-id.vo';
export * from './vendor-id.vo';
export * from './payment-id.vo';
