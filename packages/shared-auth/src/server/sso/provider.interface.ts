export interface SsoAssertion {
  readonly nameId: string;
  readonly email?: string;
  readonly displayName?: string;
  readonly attributes?: Record<string, string | readonly string[]>;
}

export interface SsoProvider {
  readonly name: 'saml' | 'oidc';
  buildLoginUrl(input: { state: string; redirectUri: string }): string;
  validateAssertion(input: { assertion: string; redirectUri: string }): Promise<SsoAssertion>;
}
