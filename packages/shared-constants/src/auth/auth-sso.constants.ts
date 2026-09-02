/**
 * Auth SSO Constants
 * প্রমাণীকরণ Single Sign-On সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_SSO = {
  // SSO protocols
  PROTOCOLS: {
    SAML: 'saml',
    OIDC: 'oidc',
    CAS: 'cas',
    WS_FEDERATION: 'ws_federation',
    OAUTH2: 'oauth2',
  },

  // SSO providers
  PROVIDERS: {
    // International
    OKTA: 'okta',
    AUTH0: 'auth0',
    AZURE_AD: 'azure_ad',
    AWS_COGNITO: 'aws_cognito',
    GOOGLE_WORKSPACE: 'google_workspace',
    MICROSOFT_365: 'microsoft_365',
    DUO: 'duo',
    PING_IDENTITY: 'ping_identity',
    ONE_LOGIN: 'one_login',

    // Bangladesh-specific
    BD_GOV_SSO: 'bd_gov_sso',
    BD_GOV_DIGITAL: 'bd_gov_digital',
    BD_GOV_NID: 'bd_gov_nid',
    BD_GOV_ETC: 'bd_gov_etc',
    BANK_ASIA: 'bank_asia',
    DBBL_SSO: 'dbbl_sso',
    BRAC_SSO: 'brac_sso',
    BKASH_SSO: 'bkash_sso',
    NAGAD_SSO: 'nagad_sso',
    ROCKET_SSO: 'rocket_sso',
  },

  // SAML bindings
  SAML_BINDINGS: {
    HTTP_REDIRECT: 'http_redirect',
    HTTP_POST: 'http_post',
    HTTP_ARTIFACT: 'http_artifact',
    SOAP: 'soap',
  },

  // Default values
  DEFAULTS: {
    SESSION_DURATION: 28800, // 8 hours
    TIMEOUT: 60, // 60 seconds
    MAX_ATTEMPTS: 3,
    METADATA_CACHE: 86400, // 24 hours
  },
} as const;

export type AuthSSOProtocol = (typeof AUTH_SSO.PROTOCOLS)[keyof typeof AUTH_SSO.PROTOCOLS];
export type AuthSSOProvider = (typeof AUTH_SSO.PROVIDERS)[keyof typeof AUTH_SSO.PROVIDERS];
export type AuthSAMLBinding = (typeof AUTH_SSO.SAML_BINDINGS)[keyof typeof AUTH_SSO.SAML_BINDINGS];
