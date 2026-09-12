import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';

export interface TeamMemberInput {
  userId: string;
  role: string;
}

export const validateTeamMember = (
  member: Partial<TeamMemberInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!member.userId) errors.push('User ID is required');
  if (!member.role) errors.push('Role is required');
  if (member.role && !Object.keys(VENDOR_TEAM.ROLES).includes(member.role)) {
    errors.push('Invalid role');
  }
  return { isValid: errors.length === 0, errors };
};
