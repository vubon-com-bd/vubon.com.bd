import type { SsoAssertion, SsoProvider } from './provider.interface';
import type { SsoServiceContract } from './service.interface';

/**
 * Server-side SSO orchestration.
 * ⚠️ SERVER-ONLY.
 */
export class SsoService implements SsoServiceContract {
  constructor(private readonly providers: Map<string, SsoProvider>) {}

  getProvider(name: string): SsoProvider {
    const p = this.providers.get(name);
    if (!p) throw new Error(`SSO provider "${name}" not registered`);
    return p;
  }

  buildLoginUrl(
    name: string,
    input: {
      state: string;
      redirectUri: string;
    }
  ): string {
    return this.getProvider(name).buildLoginUrl(input);
  }

  validateAssertion(
    name: string,
    input: {
      assertion: string;
      redirectUri: string;
    }
  ): Promise<SsoAssertion> {
    return this.getProvider(name).validateAssertion(input);
  }
}
