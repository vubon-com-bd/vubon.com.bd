// support-service/domain/value-objects/composites/index.ts
// Composite VO barrel

// Ticket-related
export * from './ticket.vo';
export * from './ticket-message.vo';
export * from './ticket-attachment.vo';
export * from './ticket-escalation.vo';
export * from './ticket-satisfaction.vo';

// Conversation / Message
export * from './conversation.vo';
export * from './message.vo';
export * from './attachment.vo';

// FAQ / KB
export * from './faq.vo';
export * from './faq-category.vo';
export * from './knowledge-article.vo';
export * from './knowledge-category.vo';

// Feedback / Complaint
export * from './feedback.vo';
export * from './complaint.vo';
export * from './complaint-severity.vo';

// Survey
export * from './survey.vo';
export * from './survey-question.vo';
export * from './survey-response.vo';

// Live Chat
export * from './live-chat.vo';
export * from './chat-message.vo';

// Chatbot
export * from './chatbot.vo';
export * from './chatbot-intent.vo';
export * from './chatbot-entity.vo';

// Agent / Team
export * from './support-agent.vo';
export * from './support-team.vo';

// SLA / Rule / Automation / Template
export * from './sla.vo';
export * from './support-rule.vo';
export * from './support-automation.vo';
export * from './support-template.vo';

// Analytics / Summary
export * from './support-analytics.vo';
export * from './support-summary.vo';
