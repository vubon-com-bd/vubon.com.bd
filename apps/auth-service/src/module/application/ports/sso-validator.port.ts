/**
 * SSO Validator Port
 * Application-layer contract for SSO token verification.
 * Implementation lives in infrastructure layer (SAML/OIDC libs).
 */
export interface SsoProfile {
  readonly externalId: string;
  readonly email?: string;
  readonly name?: string;
  readonly attributes: Readonly<Record<string, unknown>>;
}

export interface SsoValidatorPort {
  verify(provider: string, token: string): Promise<SsoProfile>;
}
