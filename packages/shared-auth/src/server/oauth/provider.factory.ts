import { AppleOAuthProvider } from './providers/apple';
import { FacebookOAuthProvider } from './providers/facebook';
import { GithubOAuthProvider } from './providers/github';
import { GoogleOAuthProvider } from './providers/google';
import { MicrosoftOAuthProvider } from './providers/microsoft';
import { TwitterOAuthProvider } from './providers/twitter';
import type { OAuthProvider } from './provider.interface';

export type OAuthProviderName =
  'google' | 'facebook' | 'github' | 'apple' | 'microsoft' | 'twitter';

export interface OAuthProviderConfigs {
  readonly google?: { clientId: string; clientSecret: string };
  readonly facebook?: { clientId: string; clientSecret: string };
  readonly github?: { clientId: string; clientSecret: string };
  readonly apple?: { clientId: string; teamId: string; keyId: string; privateKey: string };
  readonly microsoft?: { clientId: string; clientSecret: string; tenant?: string };
  readonly twitter?: { clientId: string; clientSecret: string };
}

export function createOAuthProvider(
  name: OAuthProviderName,
  config: OAuthProviderConfigs
): OAuthProvider {
  if (name === 'google' && config.google) return new GoogleOAuthProvider(config.google);
  if (name === 'facebook' && config.facebook) return new FacebookOAuthProvider(config.facebook);
  if (name === 'github' && config.github) return new GithubOAuthProvider(config.github);
  if (name === 'apple' && config.apple) return new AppleOAuthProvider(config.apple);
  if (name === 'microsoft' && config.microsoft) return new MicrosoftOAuthProvider(config.microsoft);
  if (name === 'twitter' && config.twitter) return new TwitterOAuthProvider(config.twitter);
  throw new Error(`OAuth provider "${name}" is not configured`);
}
