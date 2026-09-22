import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const VENDOR_CONFIG = Object.freeze({
  defaultTier: getOptionalEnv('VENDOR_DEFAULT_TIER', 'bronze'),
  defaultStatus: getOptionalEnv('VENDOR_DEFAULT_STATUS', 'pending_verification'),
  defaultType: getOptionalEnv('VENDOR_DEFAULT_TYPE', 'individual'),
  maxTeamMembers: getOptionalEnvInt('VENDOR_MAX_TEAM_MEMBERS', 10),
  maxBankAccounts: getOptionalEnvInt('VENDOR_MAX_BANK_ACCOUNTS', 5),
  maxAddresses: getOptionalEnvInt('VENDOR_MAX_ADDRESSES', 5),
} as const);
