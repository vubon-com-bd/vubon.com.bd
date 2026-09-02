/**
 * Ticket SLA Configuration
 * টিকিট এসএলএ কনফিগারেশন
 */
export interface TicketSLAConfig {
  enabled: boolean;
  priorities: {
    critical: { response: number; resolution: number };
    high: { response: number; resolution: number };
    medium: { response: number; resolution: number };
    low: { response: number; resolution: number };
  };
  escalation: {
    enabled: boolean;
    after: number;
    to: string[];
  };
  notifications: {
    before: number[];
    after: number[];
  };
  businessHours: {
    enabled: boolean;
    days: number[];
    start: string;
    end: string;
  };
}

export const createTicketSLAConfig = (): TicketSLAConfig => ({
  enabled: true,
  priorities: {
    critical: { response: 1, resolution: 4 },
    high: { response: 2, resolution: 8 },
    medium: { response: 4, resolution: 24 },
    low: { response: 8, resolution: 48 },
  },
  escalation: {
    enabled: true,
    after: 2,
    to: ['admin', 'manager'],
  },
  notifications: {
    before: [1],
    after: [0.5, 1, 2],
  },
  businessHours: {
    enabled: true,
    days: [1, 2, 3, 4, 5],
    start: '09:00',
    end: '18:00',
  },
});
