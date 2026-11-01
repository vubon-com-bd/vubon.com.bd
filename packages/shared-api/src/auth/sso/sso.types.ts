export interface SsoLoginRequest {
  readonly domain: string;
  readonly samlResponse?: string;
  readonly relayState?: string;
}

export interface SsoLoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userId: string;
}
