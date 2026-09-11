export interface TicketPriorityData {
  priority: string;
}

export const getPriorityLevel = (priority: string): number => {
  const levels: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4,
    critical: 5,
  };
  return levels[priority] || 1;
};

export const getPriorityResponseTime = (priority: string): number => {
  const times: Record<string, number> = {
    low: 480,
    medium: 120,
    high: 60,
    urgent: 30,
    critical: 15,
  };
  return times[priority] || 480;
};

export const calculateTicketPriority = (ticket: TicketPriorityData): string => {
  return ticket.priority;
};
