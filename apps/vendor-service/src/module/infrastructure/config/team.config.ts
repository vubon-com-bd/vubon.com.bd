import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TEAM_CONFIG = Object.freeze({
  maxMembers: getOptionalEnvInt('TEAM_MAX_MEMBERS', 10),
  invitationExpiryDays: getOptionalEnvInt('TEAM_INVITATION_EXPIRY_DAYS', 7),
  allowOwners: true,
} as const);
