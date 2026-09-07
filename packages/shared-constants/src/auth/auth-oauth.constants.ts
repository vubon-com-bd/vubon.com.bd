import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_OAUTH = {
  ...COMMON_TYPES,
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  PASSWORD: 'password',
} as const;
