/**
 * Authentication SSO Schema
 * Zod schemas for Single Sign-On configuration, protocols, and authentication
 */

import { z } from 'zod';
import {
  SSO_PROTOCOLS,
  SSO_STATUS,
  SSO_PROVIDERS,
  SSO_CONFIG,
  SSO_ERRORS,
  SSO_SUCCESS,
  SSO_PROVIDER_TYPES,
  SSO_PROVIDER_TYPE_MAP,
  SSO_PROVIDER_LABELS,
  SSO_STATUS_MESSAGES,
  SAML_BINDINGS,
  SAML_NAMEID_FORMATS,
  type SsoProtocol,
  type SsoStatus,
  type SsoProvider,
  type SsoError,
  type SsoSuccess,
  type SsoProviderType,
  type SamlBinding,
  type SamlNameIdFormat,
} from '@vubon/shared-constants';
import {
  idSchema,
  urlSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// SSO PROVIDER SCHEMAS
// ============================================================

/**
 * SSO protocol schema
 */
export const authSsoProtocolSchema = z.enum([
  SSO_PROTOCOLS.SAML,
  SSO_PROTOCOLS.OAUTH,
  SSO_PROTOCOLS.OIDC,
  SSO_PROTOCOLS.CAS,
  SSO_PROTOCOLS.LDAP,
  SSO_PROTOCOLS.ADFS,
]);

/**
 * SSO status schema
 */
export const authSsoStatusSchema = z.enum([
  SSO_STATUS.SUCCESS,
  SSO_STATUS.FAILED,
  SSO_STATUS.PENDING,
  SSO_STATUS.REQUIRES_ACTION,
  SSO_STATUS.CANCELLED,
  SSO_STATUS.TIMEOUT,
  SSO_STATUS.ERROR,
  SSO_STATUS.SESSION_EXPIRED,
]);

/**
 * SSO provider schema
 */
export const authSsoProviderSchema = z.enum([
  SSO_PROVIDERS.GOOGLE_WORKSPACE,
  SSO_PROVIDERS.AZURE_AD,
  SSO_PROVIDERS.OKTA,
  SSO_PROVIDERS.AUTH0,
  SSO_PROVIDERS.KEYCLOAK,
  SSO_PROVIDERS.ONELOGIN,
  SSO_PROVIDERS.PING_IDENTITY,
  SSO_PROVIDERS.SALESFORCE,
  SSO_PROVIDERS.AWS_COGNITO,
  SSO_PROVIDERS.FACEBOOK_WORKPLACE,
  SSO_PROVIDERS.SLACK_ENTERPRISE,
  SSO_PROVIDERS.GITHUB_ENTERPRISE,
  SSO_PROVIDERS.GITLAB,
  SSO_PROVIDERS.CUSTOM_SAML,
  SSO_PROVIDERS.CUSTOM_OIDC,
]);

/**
 * SSO provider type schema
 */
export const authSsoProviderTypeSchema = z.enum([
  SSO_PROVIDER_TYPES.CLOUD,
  SSO_PROVIDER_TYPES.ENTERPRISE,
  SSO_PROVIDER_TYPES.DEVELOPER,
  SSO_PROVIDER_TYPES.CUSTOM,
]);

/**
 * SAML binding schema
 */
export const authSamlBindingSchema = z.enum([
  SAML_BINDINGS.HTTP_REDIRECT,
  SAML_BINDINGS.HTTP_POST,
  SAML_BINDINGS.SOAP,
  SAML_BINDINGS.PAOS,
]);

/**
 * SAML NameID format schema
 */
export const authSamlNameIdFormatSchema = z.enum([
  SAML_NAMEID_FORMATS.PERSISTENT,
  SAML_NAMEID_FORMATS.TRANSIENT,
  SAML_NAMEID_FORMATS.EMAIL,
  SAML_NAMEID_FORMATS.ENTITY,
  SAML_NAMEID_FORMATS.UNSPECIFIED,
]);

// ============================================================
// SSO CONFIGURATION SCHEMAS
// ============================================================

/**
 * SSO provider configuration schema
 */
export const authSsoProviderConfigSchema = z.object({
  provider: authSsoProviderSchema,
  displayName: z.string(),
  type: authSsoProviderTypeSchema,
  protocol: authSsoProtocolSchema,
  isEnabled: z.boolean().default(true),
  isConfigured: z.boolean().default(false),
  entityId: z.string().optional(),
  acsUrl: urlSchema.optional(),
  sloUrl: urlSchema.optional(),
  metadataUrl: urlSchema.optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  authorizationEndpoint: urlSchema.optional(),
  tokenEndpoint: urlSchema.optional(),
  userInfoEndpoint: urlSchema.optional(),
  jwksUri: urlSchema.optional(),
  redirectUris: z.array(urlSchema).optional(),
  scopes: z.array(z.string()).optional(),
  samlBindings: z.array(authSamlBindingSchema).optional(),
  samlNameIdFormat: authSamlNameIdFormatSchema.optional(),
  certificate: z.string().optional(),
  privateKey: z.string().optional(),
  metadata: jsonObjectSchema.optional(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

/**
 * SSO session schema
 */
export const authSsoSessionSchema = z.object({
  id: idSchema,
  userId: idSchema,
  provider: authSsoProviderSchema,
  protocol: authSsoProtocolSchema,
  status: authSsoStatusSchema,
  tokenHash: z.string(),
  samlSessionIndex: z.string().optional(),
  idToken: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenExpiresAt: timestampSchema.optional(),
  ipAddress: z.string().ip(),
  userAgent: z.string(),
  createdAt: timestampSchema,
  lastActivityAt: timestampSchema,
  expiresAt: timestampSchema,
  terminatedAt: timestampSchema.optional(),
  isActive: z.boolean(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// SSO REQUEST SCHEMAS
// ============================================================

/**
 * SSO authentication request schema
 */
export const authSsoAuthRequestSchema = z.object({
  provider: authSsoProviderSchema,
  redirectUri: urlSchema.optional(),
  relayState: z.string().optional(),
  params: z.record(z.string()).optional(),
});

/**
 * SSO callback request schema
 */
export const authSsoCallbackRequestSchema = z.object({
  provider: authSsoProviderSchema,
  samlResponse: z.string().optional(),
  relayState: z.string().optional(),
  code: z.string().optional(),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
});

/**
 * SSO logout request schema
 */
export const authSsoLogoutRequestSchema = z.object({
  userId: idSchema,
  sessionId: idSchema.optional(),
  provider: authSsoProviderSchema.optional(),
  redirectUri: urlSchema.optional(),
  samlLogoutRequest: z.string().optional(),
});

// ============================================================
// SSO RESPONSE SCHEMAS
// ============================================================

/**
 * SSO authentication response schema
 */
export const authSsoAuthResponseSchema = z.object({
  success: z.boolean(),
  status: authSsoStatusSchema,
  userId: idSchema.optional(),
  session: authSsoSessionSchema.optional(),
  redirectUri: urlSchema.optional(),
  error: z.string().optional(),
  isNewUser: z.boolean().optional(),
  linkingRequired: z.boolean().optional(),
});

/**
 * SSO logout response schema
 */
export const authSsoLogoutResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  redirectUri: urlSchema.optional(),
});

// ============================================================
// SSO FILTER SCHEMAS
// ============================================================

/**
 * SSO session filter schema
 */
export const authSsoSessionFilterSchema = z.object({
  userId: idSchema.optional(),
  provider: z.union([authSsoProviderSchema, z.array(authSsoProviderSchema)]).optional(),
  protocol: z.union([authSsoProtocolSchema, z.array(authSsoProtocolSchema)]).optional(),
  status: z.union([authSsoStatusSchema, z.array(authSsoStatusSchema)]).optional(),
  activeOnly: z.boolean().optional(),
  createdDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

/**
 * SSO provider filter schema
 */
export const authSsoProviderFilterSchema = z.object({
  providers: z.union([authSsoProviderSchema, z.array(authSsoProviderSchema)]).optional(),
  type: z.union([authSsoProviderTypeSchema, z.array(authSsoProviderTypeSchema)]).optional(),
  protocol: z.union([authSsoProtocolSchema, z.array(authSsoProtocolSchema)]).optional(),
  isEnabled: z.boolean().optional(),
  isConfigured: z.boolean().optional(),
});

// ============================================================
// SSO SUMMARY SCHEMAS
// ============================================================

/**
 * SSO summary schema
 */
export const authSsoSummarySchema = z.object({
  userId: idSchema,
  totalSessions: z.number().int().min(0),
  activeSessions: z.number().int().min(0),
  providers: z.array(authSsoProviderSchema),
  currentSession: authSsoSessionSchema.optional(),
  sessions: z.array(authSsoSessionSchema),
});

// ============================================================
// SAML ASSERTION SCHEMAS
// ============================================================

/**
 * SAML assertion schema
 */
export const authSamlAssertionSchema = z.object({
  id: z.string(),
  issuer: z.string(),
  subject: z.string(),
  nameIdFormat: authSamlNameIdFormatSchema,
  sessionIndex: z.string(),
  authnContext: z.string(),
  authnInstant: timestampSchema,
  attributes: z.record(z.union([z.string(), z.array(z.string())])),
  notBefore: timestampSchema,
  notOnOrAfter: timestampSchema,
  signature: z.string().optional(),
  rawResponse: z.string(),
});

// ============================================================
// SSO ERROR RESPONSE SCHEMAS
// ============================================================

/**
 * SSO error response schema
 */
export const authSsoErrorResponseSchema = z.object({
  error: z.string(),
  error_description: z.string().optional(),
  state: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

/**
 * AuthSsoProviderConfig type from schema
 */
export type AuthSsoProviderConfig = z.infer<typeof authSsoProviderConfigSchema>;

/**
 * AuthSsoSession type from schema
 */
export type AuthSsoSession = z.infer<typeof authSsoSessionSchema>;

/**
 * AuthSsoAuthRequest type from schema
 */
export type AuthSsoAuthRequest = z.infer<typeof authSsoAuthRequestSchema>;

/**
 * AuthSsoCallbackRequest type from schema
 */
export type AuthSsoCallbackRequest = z.infer<typeof authSsoCallbackRequestSchema>;

/**
 * AuthSsoLogoutRequest type from schema
 */
export type AuthSsoLogoutRequest = z.infer<typeof authSsoLogoutRequestSchema>;

/**
 * AuthSsoAuthResponse type from schema
 */
export type AuthSsoAuthResponse = z.infer<typeof authSsoAuthResponseSchema>;

/**
 * AuthSsoLogoutResponse type from schema
 */
export type AuthSsoLogoutResponse = z.infer<typeof authSsoLogoutResponseSchema>;

/**
 * AuthSsoSessionFilter type from schema
 */
export type AuthSsoSessionFilter = z.infer<typeof authSsoSessionFilterSchema>;

/**
 * AuthSsoProviderFilter type from schema
 */
export type AuthSsoProviderFilter = z.infer<typeof authSsoProviderFilterSchema>;

/**
 * AuthSsoSummary type from schema
 */
export type AuthSsoSummary = z.infer<typeof authSsoSummarySchema>;

/**
 * AuthSamlAssertion type from schema
 */
export type AuthSamlAssertion = z.infer<typeof authSamlAssertionSchema>;

/**
 * AuthSsoErrorResponse type from schema
 */
export type AuthSsoErrorResponse = z.infer<typeof authSsoErrorResponseSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Validate SSO provider
 */
export function isValidAuthSsoProvider(provider: string): provider is SsoProvider {
  return Object.values(SSO_PROVIDERS).includes(provider as SsoProvider);
}

/**
 * Validate SSO protocol
 */
export function isValidAuthSsoProtocol(protocol: string): protocol is SsoProtocol {
  return Object.values(SSO_PROTOCOLS).includes(protocol as SsoProtocol);
}

/**
 * Validate SSO status
 */
export function isValidAuthSsoStatus(status: string): status is SsoStatus {
  return Object.values(SSO_STATUS).includes(status as SsoStatus);
}

/**
 * Validate SAML binding
 */
export function isValidAuthSamlBinding(binding: string): binding is SamlBinding {
  return Object.values(SAML_BINDINGS).includes(binding as SamlBinding);
}

/**
 * Validate SAML NameID format
 */
export function isValidAuthSamlNameIdFormat(format: string): format is SamlNameIdFormat {
  return Object.values(SAML_NAMEID_FORMATS).includes(format as SamlNameIdFormat);
}

/**
 * Get SSO provider label
 */
export function getAuthSsoProviderLabel(provider: SsoProvider): string {
  return SSO_PROVIDER_LABELS[provider] || 'Unknown Provider';
}

/**
 * Get SSO provider type
 */
export function getAuthSsoProviderType(provider: SsoProvider): SsoProviderType {
  return SSO_PROVIDER_TYPE_MAP[provider] || SSO_PROVIDER_TYPES.CUSTOM;
}

/**
 * Get SSO status message
 */
export function getAuthSsoStatusMessage(status: SsoStatus): string {
  return SSO_STATUS_MESSAGES[status] || 'Unknown SSO status';
}

/**
 * Check if SSO status is successful
 */
export function isAuthSsoStatusSuccessful(status: SsoStatus): boolean {
  return status === SSO_STATUS.SUCCESS;
}

/**
 * Check if SSO status is terminal
 */
export function isAuthSsoStatusTerminal(status: SsoStatus): boolean {
  const terminalStatuses: SsoStatus[] = [
    SSO_STATUS.SUCCESS,
    SSO_STATUS.FAILED,
    SSO_STATUS.CANCELLED,
    SSO_STATUS.TIMEOUT,
    SSO_STATUS.ERROR,
  ];
  return terminalStatuses.includes(status);
}

/**
 * Get SSO provider protocols
 */
export function getAuthSsoProviderProtocols(provider: SsoProvider): SsoProtocol[] {
  const protocolMap: Record<SsoProvider, SsoProtocol[]> = {
    [SSO_PROVIDERS.GOOGLE_WORKSPACE]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.AZURE_AD]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.OKTA]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.AUTH0]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.KEYCLOAK]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.ONELOGIN]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.PING_IDENTITY]: [SSO_PROTOCOLS.SAML, SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.SALESFORCE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.AWS_COGNITO]: [SSO_PROTOCOLS.OIDC],
    [SSO_PROVIDERS.FACEBOOK_WORKPLACE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.SLACK_ENTERPRISE]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.GITHUB_ENTERPRISE]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.GITLAB]: [SSO_PROTOCOLS.OIDC, SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.CUSTOM_SAML]: [SSO_PROTOCOLS.SAML],
    [SSO_PROVIDERS.CUSTOM_OIDC]: [SSO_PROTOCOLS.OIDC],
  };
  return protocolMap[provider] || [];
}

/**
 * Check if SSO session is expired
 */
export function isAuthSsoSessionExpired(
  createdAt: Date,
  sessionExpirySeconds: number = SSO_CONFIG.SESSION_EXPIRY
): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= sessionExpirySeconds;
}

/**
 * Check if SSO session is idle
 */
export function isAuthSsoSessionIdle(
  lastActivityAt: Date,
  idleTimeoutSeconds: number = SSO_CONFIG.IDLE_TIMEOUT
): boolean {
  const now = Date.now();
  const idleTime = (now - lastActivityAt.getTime()) / 1000;
  return idleTime >= idleTimeoutSeconds;
}

/**
 * Get remaining SSO session time
 */
export function getAuthSsoSessionRemainingTime(
  createdAt: Date,
  sessionExpirySeconds: number = SSO_CONFIG.SESSION_EXPIRY
): number {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  const remaining = sessionExpirySeconds - age;
  return Math.max(0, remaining);
}

/**
 * Get SAML binding label
 */
export function getAuthSamlBindingLabel(binding: SamlBinding): string {
  const labels: Record<SamlBinding, string> = {
    [SAML_BINDINGS.HTTP_REDIRECT]: 'HTTP Redirect',
    [SAML_BINDINGS.HTTP_POST]: 'HTTP POST',
    [SAML_BINDINGS.SOAP]: 'SOAP',
    [SAML_BINDINGS.PAOS]: 'PAOS',
  };
  return labels[binding] || 'Unknown Binding';
}

/**
 * Get SAML NameID format label
 */
export function getAuthSamlNameIdFormatLabel(format: SamlNameIdFormat): string {
  const labels: Record<SamlNameIdFormat, string> = {
    [SAML_NAMEID_FORMATS.PERSISTENT]: 'Persistent',
    [SAML_NAMEID_FORMATS.TRANSIENT]: 'Transient',
    [SAML_NAMEID_FORMATS.EMAIL]: 'Email Address',
    [SAML_NAMEID_FORMATS.ENTITY]: 'Entity',
    [SAML_NAMEID_FORMATS.UNSPECIFIED]: 'Unspecified',
  };
  return labels[format] || 'Unknown Format';
}

/**
 * Get default SSO config
 */
export function getAuthSsoDefaultConfig(): typeof SSO_CONFIG {
  return SSO_CONFIG;
}

/**
 * Create SAML assertion
 */
export function createAuthSamlAssertion(data: Partial<AuthSamlAssertion>): AuthSamlAssertion {
  const now = new Date();
  return {
    id: data.id || `saml-${Date.now()}`,
    issuer: data.issuer || '',
    subject: data.subject || '',
    nameIdFormat: data.nameIdFormat || SAML_NAMEID_FORMATS.UNSPECIFIED,
    sessionIndex: data.sessionIndex || `session-${Date.now()}`,
    authnContext: data.authnContext || 'urn:oasis:names:tc:SAML:2.0:ac:classes:Password',
    authnInstant: data.authnInstant || now,
    attributes: data.attributes || {},
    notBefore: data.notBefore || now,
    notOnOrAfter: data.notOnOrAfter || new Date(now.getTime() + 3600000),
    rawResponse: data.rawResponse || '',
    ...data,
  };
}

/**
 * Create SSO error response
 */
export function createAuthSsoErrorResponse(
  error: SsoError,
  description?: string,
  state?: string
): AuthSsoErrorResponse {
  const errorMessage = SSO_ERRORS[error as keyof typeof SSO_ERRORS] || 'Unknown SSO error';

  return {
    error,
    error_description: description || errorMessage,
    state,
  };
}

/**
 * Get SSO error message
 */
export function getAuthSsoErrorMessage(error: SsoError): string {
  return SSO_ERRORS[error as keyof typeof SSO_ERRORS] || 'Unknown SSO error';
}

/**
 * Get SSO success message
 */
export function getAuthSsoSuccessMessage(success: SsoSuccess): string {
  return SSO_SUCCESS[success as keyof typeof SSO_SUCCESS] || 'Unknown success message';
}

/**
 * Check if SSO error is valid
 */
export function isValidAuthSsoError(error: string): error is SsoError {
  return Object.values(SSO_ERRORS).includes(error as SsoError);
}
