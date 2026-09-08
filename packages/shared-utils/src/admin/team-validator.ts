import { AdminTeam } from '@vubon/shared-types';

export const validateTeam = (team: Partial<AdminTeam>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!team.name) errors.push('Team name is required');
  if (!team.leadId) errors.push('Team lead is required');
  return { isValid: errors.length === 0, errors };
};
