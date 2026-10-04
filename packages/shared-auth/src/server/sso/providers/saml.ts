import type { SsoAssertion, SsoProvider } from '../provider.interface';

export interface SamlConfig {
  readonly idpEntryPoint: string;
  readonly issuer: string;
  readonly idpCert: string;
}

export class SamlProvider implements SsoProvider {
  readonly name = 'saml' as const;

  constructor(private readonly config: SamlConfig) {}

  buildLoginUrl(input: { state: string; redirectUri: string }): string {
    const params = new URLSearchParams({
      SAMLRequest: this.config.issuer,
      RelayState: `${input.state}|${input.redirectUri}`,
    });
    return `${this.config.idpEntryPoint}?${params.toString()}`;
  }

  async validateAssertion(input: {
    assertion: string;
    redirectUri: string;
  }): Promise<SsoAssertion> {
    // TODO: verify XML signature against this.config.idpCert.
    // Stub returns decoded assertion.
    const decoded = Buffer.from(input.assertion, 'base64').toString('utf-8');
    return {
      nameId: decoded.slice(0, 32) || 'unknown',
      attributes: { raw: decoded },
    };
  }
}
