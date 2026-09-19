/**
 * Token Generator Port
 * Application-layer contract for JWT token generation/verification.
 * Implementation lives in infrastructure layer (jsonwebtoken).
 */
export interface TokenPayload {
  readonly sub: string;
  readonly type: 'access' | 'refresh';
  readonly jti: string;
}

export interface TokenGeneratorPort {
  generateAccessToken(payload: TokenPayload): Promise<string>;
  generateRefreshToken(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
  decode(token: string): TokenPayload | null;
}
