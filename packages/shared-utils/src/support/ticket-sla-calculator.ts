import { getPriorityResponseTime } from './ticket-priority-calculator';

export interface SlaTicketData {
  priority: string;
  createdAt: Date;
}

export const calculateSlaBreach = (ticket: SlaTicketData): boolean => {
  const responseTime = getPriorityResponseTime(ticket.priority);
  const elapsed = (Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60);
  return elapsed > responseTime;
};

export const calculateRemainingSlaTime = (ticket: SlaTicketData): number => {
  const responseTime = getPriorityResponseTime(ticket.priority);
  const elapsed = (Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60);
  return Math.max(0, responseTime - elapsed);
};

export const getSlaStatus = (ticket: SlaTicketData): 'on_track' | 'at_risk' | 'breached' => {
  const remaining = calculateRemainingSlaTime(ticket);
  const total = getPriorityResponseTime(ticket.priority);
  const percentage = (remaining / total) * 100;
  if (percentage > 50) return 'on_track';
  if (percentage > 20) return 'at_risk';
  return 'breached';
};
