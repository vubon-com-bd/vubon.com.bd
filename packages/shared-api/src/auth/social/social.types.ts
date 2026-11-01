export type SocialProvider = 'google' | 'facebook' | 'apple' | 'github' | 'twitter';

export interface SocialLoginRequest {
  readonly provider: SocialProvider;
  readonly code: string;
  readonly redirectUri?: string;
}

export interface SocialLoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userId: string;
  readonly isNewUser: boolean;
}
