// support-service/domain/entities/index.ts
// Entity barrel — final

// Ticket domain
export * from './ticket.entity';
export * from './ticket-message.entity';
export * from './ticket-attachment.entity';
export * from './ticket-escalation.entity';
export * from './ticket-satisfaction.entity';

// Conversation domain
export * from './conversation.entity';
export * from './message.entity';
export * from './attachment.entity';

// FAQ / KB domain
export * from './faq.entity';
export * from './faq-category.entity';
export * from './knowledge-article.entity';
export * from './knowledge-category.entity';

// Feedback / Complaint / Survey
export * from './feedback.entity';
export * from './complaint.entity';
export * from './survey.entity';
export * from './survey-response.entity';

// Chat / Chatbot
export * from './live-chat.entity';
export * from './chatbot.entity';
export * from './chatbot-intent.entity';
export * from './chatbot-entity.entity';

// Agent / Team
export * from './support-agent.entity';
export * from './support-team.entity';

// SLA / Rule / Automation / Template
export * from './sla.entity';
export * from './support-rule.entity';
export * from './support-automation.entity';
export * from './support-template.entity';
