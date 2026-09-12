import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';

export interface TeamInput {
  name: string;
  status: string;
}

export const validateVendorTeam = (
  team: Partial<TeamInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!team.name) errors.push('Team name is required');
  if (team.status && !Object.keys(VENDOR_TEAM.STATUS).includes(team.status)) {
    errors.push('Invalid team status');
  }
  return { isValid: errors.length === 0, errors };
};
