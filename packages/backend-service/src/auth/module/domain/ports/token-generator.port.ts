/**
 * Token Payload interface for JWT and other tokens
 */
export interface TokenPayload {
  /** User ID */
  userId: string;
  /** User email */
  email: string;
  /** User roles */
  roles: string[];
  /** User permissions */
  permissions: string[];
  /** Session ID */
  sessionId: string;
  /** Device ID (optional) */
  deviceId?: string;
  /** Token version (for refresh token rotation) */
  version?: number;
  /** Token type */
  type: 'access' | 'refresh' | 'verification' | 'reset';
}

/**
 * Token Generator Port
 * Defines the contract for token generation and verification
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface ITokenGenerator {
  /**
   * Generate an access token (JWT)
   * @param payload - The token payload
   * @param expiresIn - Optional custom expiry time (e.g., '15m', '1h')
   * @returns A promise that resolves to the access token string
   */
  generateAccessToken(payload: TokenPayload, expiresIn?: string): Promise<string>;

  /**
   * Generate a refresh token (JWT)
   * @param payload - The token payload
   * @param expiresIn - Optional custom expiry time (e.g., '7d', '30d')
   * @returns A promise that resolves to the refresh token string
   */
  generateRefreshToken(payload: TokenPayload, expiresIn?: string): Promise<string>;

  /**
   * Generate a verification token (email/phone verification)
   * @param payload - The token payload
   * @param expiresIn - Optional custom expiry time (e.g., '24h', '48h')
   * @returns A promise that resolves to the verification token string
   */
  generateVerificationToken(payload: TokenPayload, expiresIn?: string): Promise<string>;

  /**
   * Verify a token and return the decoded payload
   * @param token - The token string to verify
   * @returns A promise that resolves to the token payload
   * @throws {Error} If token is invalid or expired
   */
  verifyToken(token: string): Promise<TokenPayload>;

  /**
   * Decode a token without verification (for inspection only)
   * @param token - The token string to decode
   * @returns The decoded token payload or null if invalid
   */
  decodeToken(token: string): TokenPayload | null;

  /**
   * Check if a token is expired
   * @param token - The token string to check
   * @returns True if the token is expired, false otherwise
   */
  isTokenExpired(token: string): boolean;
}
