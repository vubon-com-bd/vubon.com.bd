import { SUPPORT_TEAM } from '@vubon/shared-constants/src/support/support-team.constants';

export interface SupportTeamInput {
  name: string;
  status: string;
  type: string;
}

export const validateSupportTeam = (
  team: Partial<SupportTeamInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!team.name) errors.push('Team name is required');
  if (team.status && !Object.keys(SUPPORT_TEAM.STATUS).includes(team.status)) {
    errors.push('Invalid team status');
  }
  if (team.type && !Object.keys(SUPPORT_TEAM.TYPES).includes(team.type)) {
    errors.push('Invalid team type');
  }
  return { isValid: errors.length === 0, errors };
};
