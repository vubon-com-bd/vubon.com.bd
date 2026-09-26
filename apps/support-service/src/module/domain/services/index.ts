// support-service/domain/services/index.ts
// Domain service barrel — final

// Ticket
export * from './ticket-number.service';
export * from './ticket-routing.service';
export * from './ticket-priority.service';
export * from './ticket-escalation.service';
export * from './ticket-assignment.service';

// SLA
export * from './sla-calculation.service';
export * from './sla-breach-detector.service';

// Satisfaction
export * from './satisfaction-calculator.service';
export * from './customer-satisfaction.service';

// Agent
export * from './agent-workload.service';
export * from './agent-availability.service';

// Complaint
export * from './complaint-severity.service';

// Chatbot
export * from './chatbot-intent-classifier.service';
export * from './chatbot-response.service';
export * from './sentiment-analysis.service';
export * from './keyword-extraction.service';

// Auto-response
export * from './auto-response.service';
