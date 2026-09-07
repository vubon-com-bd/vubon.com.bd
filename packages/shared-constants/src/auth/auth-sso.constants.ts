import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_SSO = {
  ...COMMON_TYPES,
  SAML: 'saml',
  OIDC: 'oidc',
  CAS: 'cas',
} as const;
