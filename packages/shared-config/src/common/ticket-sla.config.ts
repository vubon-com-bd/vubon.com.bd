export const ticketSlaConfig = {
  defaultSla: {
    low: { responseTime: 480, resolutionTime: 48 },
    medium: { responseTime: 120, resolutionTime: 24 },
    high: { responseTime: 60, resolutionTime: 12 },
    urgent: { responseTime: 30, resolutionTime: 6 },
    critical: { responseTime: 15, resolutionTime: 3 },
  },
  penaltyRate: 10,
  breachNotifyMinutes: 30,
  escalationMinutes: 15,
} as const;
