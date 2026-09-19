import type { OAuthProfile, OAuthProvider } from './provider.interface';

export interface OAuthServiceContract {
  getProvider(name: string): OAuthProvider;
  authorize(
    name: string,
    input: {
      state: string;
      codeChallenge?: string;
      redirectUri: string;
    }
  ): string;
  handleCallback(
    name: string,
    input: {
      code: string;
      redirectUri: string;
      codeVerifier?: string;
    }
  ): Promise<OAuthProfile>;
}
