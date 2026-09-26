import type { SsoAssertion } from './provider.interface';

export interface OidcDiscoveryDocument {
  readonly issuer: string;
  readonly authorization_endpoint: string;
  readonly token_endpoint: string;
  readonly userinfo_endpoint?: string;
  readonly jwks_uri: string;
}

export interface OidcConfig {
  readonly issuer: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: readonly string[];
  readonly discovery?: OidcDiscoveryDocument;
}

export class OidcProvider {
  readonly name = 'oidc' as const;

  constructor(private readonly config: OidcConfig) {}

  buildLoginUrl(input: { state: string; redirectUri: string }): string {
    const endpoint =
      this.config.discovery?.authorization_endpoint ?? `${this.config.issuer}/authorize`;
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      scope: (this.config.scopes ?? ['openid', 'email', 'profile']).join(' '),
      redirect_uri: input.redirectUri,
      state: input.state,
    });
    return `${endpoint}?${params.toString()}`;
  }

  async validateAssertion(input: {
    assertion: string;
    redirectUri: string;
  }): Promise<SsoAssertion> {
    // TODO: exchange code at token_endpoint, verify id_token against jwks_uri.
    return { nameId: input.assertion.slice(0, 32) || 'unknown' };
  }
}
