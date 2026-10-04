export interface OAuthAuthorizeRequest {
  readonly clientId: string;
  readonly redirectUri: string;
  readonly scope: readonly string[];
  readonly state?: string;
}

export interface OAuthAuthorizeResponse {
  readonly authorizationUrl: string;
  readonly state: string;
}

export interface OAuthCallbackRequest {
  readonly code: string;
  readonly state: string;
}

export interface OAuthCallbackResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}
