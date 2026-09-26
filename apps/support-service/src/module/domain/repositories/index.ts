// support-service/domain/repositories/index.ts
// Repository interface barrel — final

// Ticket domain
export * from './ticket.repository.interface';
export * from './ticket-message.repository.interface';
export * from './ticket-attachment.repository.interface';
export * from './ticket-escalation.repository.interface';
export * from './ticket-satisfaction.repository.interface';

// Conversation domain
export * from './conversation.repository.interface';
export * from './message.repository.interface';
export * from './attachment.repository.interface';

// FAQ / KB domain
export * from './faq.repository.interface';
export * from './faq-category.repository.interface';
export * from './knowledge-article.repository.interface';
export * from './knowledge-category.repository.interface';

// Feedback / Complaint
export * from './feedback.repository.interface';
export * from './complaint.repository.interface';

// Survey
export * from './survey.repository.interface';
export * from './survey-response.repository.interface';

// Live Chat
export * from './live-chat.repository.interface';

// Chatbot
export * from './chatbot.repository.interface';
export * from './chatbot-intent.repository.interface';
export * from './chatbot-slot.repository.interface';

// Agent / Team
export * from './support-agent.repository.interface';
export * from './support-team.repository.interface';

// SLA / Rule / Automation / Template
export * from './sla.repository.interface';
export * from './support-rule.repository.interface';
export * from './support-automation.repository.interface';
export * from './support-template.repository.interface';
