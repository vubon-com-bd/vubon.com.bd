/**
 * Auth SSO Constants (EXTENDS common/types)
 * @module shared-constants/auth/auth-sso.constants
 */

import { TYPES } from '../common/types.constants';

export const AUTH_SSO = {
  // Base types
  ...TYPES,

  // SSO protocols
  PROTOCOLS: {
    SAML: 'saml',
    SAML2: 'saml2',
    OPENID: 'openid',
    OPENID_CONNECT: 'openid_connect',
    CAS: 'cas',
    LDAP: 'ldap',
    KERBEROS: 'kerberos',
    JWT: 'jwt',
    OAUTH2: 'oauth2',
  } as const,

  // SSO status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    FAILED: 'failed',
  } as const,

  // SSO providers
  PROVIDERS: {
    GOOGLE_WORKSPACE: 'google_workspace',
    MICROSOFT_AZURE: 'microsoft_azure',
    OKTA: 'okta',
    AUTH0: 'auth0',
    KEYCLOAK: 'keycloak',
    ONELOGIN: 'onelogin',
    PING: 'ping',
    FORGEOK: 'forgeok',
    JUMPCLOUD: 'jumpcloud',
    CUSTOM: 'custom',
  } as const,

  // SSO settings
  SETTINGS: {
    DEFAULT_PROTOCOL: 'openid_connect',
    SESSION_TIMEOUT: 3600,
    MAX_SSO_SESSIONS: 10,
    ALLOW_MULTIPLE_PROVIDERS: true,
    FORCE_MFA: false,
    AUTO_CREATE_USER: true,
    UPDATE_USER_ATTRIBUTES: true,
  },

  // SAML settings
  SAML: {
    NAME_ID_FORMAT: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    SIGNATURE_ALGORITHM: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
    DIGEST_ALGORITHM: 'http://www.w3.org/2001/04/xmlenc#sha256',
    BINDINGS: {
      HTTP_REDIRECT: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      HTTP_POST: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      SOAP: 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
    } as const,
  },

  // OpenID Connect settings
  OPENID_CONNECT: {
    RESPONSE_TYPES: ['code', 'id_token', 'code id_token'],
    RESPONSE_MODES: ['query', 'fragment', 'form_post'],
    CLAIMS: ['sub', 'email', 'email_verified', 'name', 'picture', 'locale'],
    SCOPES: ['openid', 'email', 'profile', 'offline_access'],
  },
} as const;

export type SsoProtocol = (typeof AUTH_SSO.PROTOCOLS)[keyof typeof AUTH_SSO.PROTOCOLS];
export type SsoStatus = (typeof AUTH_SSO.STATUS)[keyof typeof AUTH_SSO.STATUS];
export type SsoProvider = (typeof AUTH_SSO.PROVIDERS)[keyof typeof AUTH_SSO.PROVIDERS];
export type SamlBinding = (typeof AUTH_SSO.SAML.BINDINGS)[keyof typeof AUTH_SSO.SAML.BINDINGS];
