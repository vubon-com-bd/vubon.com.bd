export const AUTH_SSO = {
  SAML: 'saml',
  OIDC: 'oidc',
  CAS: 'cas',
  KERBEROS: 'kerberos',
  LDAP: 'ldap',
} as const;

export const AUTH_SSO_BINDING = {
  HTTP_REDIRECT: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
  HTTP_POST: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
  ARTIFACT: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact',
} as const;

export const AUTH_SSO_SESSION = {
  EXPIRY_SECONDS: 28800,
  REFRESH_WINDOW_SECONDS: 600,
  SINGLE_LOGOUT: true,
} as const;

export type AuthSsoType = (typeof AUTH_SSO)[keyof typeof AUTH_SSO];
