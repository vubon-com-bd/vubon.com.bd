/**
 * Social Validator Port
 * Application-layer contract for social OAuth token verification.
 * Implementation lives in infrastructure layer (provider SDKs).
 */
export interface SocialProfile {
  readonly providerUserId: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
}

export interface SocialValidatorPort {
  verify(provider: string, accessToken: string): Promise<SocialProfile>;
}
