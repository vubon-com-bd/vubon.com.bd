/**
 * Auth Type Constants
 * প্রমাণীকরণ পদ্ধতির ধরন সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH } from './auth.constants';

export const AUTH_TYPE = {
  ...AUTH.TYPES,

  // Additional auth types
  PASSWORDLESS: 'passwordless',
  CERTIFICATE: 'certificate',
  API_KEY: 'api_key',
  SERVICE_ACCOUNT: 'service_account',
  IMPERSONATION: 'impersonation',
} as const;

export type AuthTypeValue = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];
