/**
 * Team Configuration
 * অ্যাডমিন টিম কনফিগারেশন
 */

export interface TeamConfig {
  enabled: boolean;
  maxMembersPerTeam: number;
  maxTeamsPerAdmin: number;
  defaultStatus: string;
  statuses: string[];
  roles: {
    lead: string;
    member: string;
    observer: string;
  };
  permissions: {
    default: string[];
    maxPerTeam: number;
  };
}

export const createTeamConfig = (): TeamConfig => ({
  enabled: true,
  maxMembersPerTeam: 20,
  maxTeamsPerAdmin: 5,
  defaultStatus: 'active',
  statuses: ['active', 'inactive', 'pending'],
  roles: {
    lead: 'lead',
    member: 'member',
    observer: 'observer',
  },
  permissions: {
    default: ['team_read', 'team_update'],
    maxPerTeam: 10,
  },
});
