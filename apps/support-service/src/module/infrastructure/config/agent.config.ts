export const AGENT_CONFIG = Object.freeze({
  maxConcurrentTickets: 10,
  maxTicketsPerDay: 100,
  autoAssign: true,
  roundRobin: true,
  skillBasedRouting: true,
  languageRouting: true,
  idleTimeoutMinutes: 15,
} as const);
