import type { SsoAssertion, SsoProvider } from './provider.interface';

export interface SsoServiceContract {
  getProvider(name: string): SsoProvider;
  buildLoginUrl(
    name: string,
    input: {
      state: string;
      redirectUri: string;
    }
  ): string;
  validateAssertion(
    name: string,
    input: {
      assertion: string;
      redirectUri: string;
    }
  ): Promise<SsoAssertion>;
}
