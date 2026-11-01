/**
 * Login request/response types.
 * NOTE: If shared-types/auth has these, prefer importing from there.
 */
export interface LoginRequest {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
  readonly deviceId?: string;
}

export interface LoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
  readonly tokenType: 'Bearer';
  readonly userId: string;
}
