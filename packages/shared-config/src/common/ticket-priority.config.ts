/**
 * Ticket Priority Configuration
 * টিকেট প্রায়োরিটি কনফিগারেশন
 */
export interface TicketPriorityConfig {
  levels: {
    critical: { value: number; label: string; color: string };
    high: { value: number; label: string; color: string };
    medium: { value: number; label: string; color: string };
    low: { value: number; label: string; color: string };
  };
  autoAssignment: {
    enabled: boolean;
    rules: {
      condition: string;
      priority: string;
    }[];
  };
  weight: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const createTicketPriorityConfig = (): TicketPriorityConfig => ({
  levels: {
    critical: { value: 0, label: 'Critical', color: 'red' },
    high: { value: 1, label: 'High', color: 'orange' },
    medium: { value: 2, label: 'Medium', color: 'yellow' },
    low: { value: 3, label: 'Low', color: 'green' },
  },
  autoAssignment: {
    enabled: true,
    rules: [
      { condition: 'type === "security"', priority: 'critical' },
      { condition: 'type === "billing"', priority: 'high' },
      { condition: 'type === "technical"', priority: 'medium' },
    ],
  },
  weight: {
    critical: 10,
    high: 7,
    medium: 4,
    low: 1,
  },
});
