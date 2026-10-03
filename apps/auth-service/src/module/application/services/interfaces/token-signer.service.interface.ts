/**
 * TokenSignerServiceInterface
 * @module auth-service/application/services/interfaces
 */
export type TokenSignerPurpose =
  | 'access'
  | 'refresh'
  | 'id'
  | 'password_reset'
  | 'email_verification'
  | 'invite'
  | 'api_key';

export interface TokenSignerPayload {
  readonly sub: string;
  readonly jti: string;
  readonly type: TokenSignerPurpose;
  readonly iat: number;
  readonly exp: number;
  readonly scope?: string;
  readonly meta?: Readonly<Record<string, unknown>>;
}

export interface TokenSignerServiceInterface {
  readonly name: string;
  sign(payload: TokenSignerPayload): Promise<string>;
  verify(token: string): Promise<TokenSignerPayload>;
  decode(token: string): TokenSignerPayload | null;
}
