import type { SsoAssertion, SsoProvider } from '../provider.interface';

export interface OidcConfig {
  readonly issuer: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: readonly string[];
}

export class OidcProvider implements SsoProvider {
  readonly name = 'oidc' as const;

  constructor(private readonly config: OidcConfig) {}

  buildLoginUrl(input: { state: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      scope: (this.config.scopes ?? ['openid', 'email', 'profile']).join(' '),
      redirect_uri: input.redirectUri,
      state: input.state,
    });
    return `${this.config.issuer}/authorize?${params.toString()}`;
  }

  async validateAssertion(input: {
    assertion: string;
    redirectUri: string;
  }): Promise<SsoAssertion> {
    // TODO: exchange assertion (code) at token endpoint, then verify id_token.
    return { nameId: input.assertion.slice(0, 32) || 'unknown' };
  }
}
