/**
 * Team configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const TEAM_CONFIG = Object.freeze({
  maxMembers: getOptionalEnvInt('TEAM_MAX_MEMBERS', 50),
  inviteExpiryDays: getOptionalEnvInt('TEAM_INVITE_EXPIRY_DAYS', 7),
  requireOwnerApproval: getOptionalEnvBool('TEAM_REQUIRE_OWNER_APPROVAL', true),
  allowMultipleRoles: getOptionalEnvBool('TEAM_ALLOW_MULTIPLE_ROLES', false),
  maxInvitesPerDay: getOptionalEnvInt('TEAM_MAX_INVITES_PER_DAY', 10),
} as const);
