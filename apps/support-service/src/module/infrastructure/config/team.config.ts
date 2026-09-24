export const TEAM_CONFIG = Object.freeze({
  maxMembers: 200,
  minMembers: 1,
  maxTeams: 100,
  defaultRouting: 'skill_based' as const,
  autoAssign: true,
  escalationEnabled: true,
  maxEscalationLevels: 5,
} as const);
