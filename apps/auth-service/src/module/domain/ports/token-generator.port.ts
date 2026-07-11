/**
 * Token Generator Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/token-generator.port
 *
 * @description
 * Port (interface) for token generation and management.
 * Defines the contract that infrastructure adapters must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 *
 * @example
 * // Domain usage
 * class LoginHandler {
 *   constructor(private readonly tokenGenerator: ITokenGenerator) {}
 *
 *   async execute(command: LoginCommand) {
 *     const token = await this.tokenGenerator.generateAccessToken(user);
 *     // ...
 *   }
 * }
 */

// ============================================================
// Types
// ============================================================

/**
 * Token type enumeration
 */
export type TokenType = 'access' | 'refresh' | 'reset' | 'verification' | 'mfa' | 'magic_link';

/**
 * Token payload interface
 */
export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  sessionId?: string;
  deviceId?: string;
  type: TokenType;
  iat?: number;
  exp?: number;
  // Bangladesh specific
  district?: string;
  networkType?: string;
  isNightTime?: boolean;
  trustLevel?: number;
}

/**
 * Token options
 */
export interface TokenOptions {
  expiresIn?: string | number;
  issuer?: string;
  audience?: string;
  subject?: string;
  customClaims?: Record<string, unknown>;
}

/**
 * Token generation result
 */
export interface TokenResult {
  token: string;
  expiresAt: Date;
  expiresInSeconds: number;
  tokenId: string;
}

/**
 * Token verification result
 */
export interface TokenVerificationResult<T extends TokenPayload = TokenPayload> {
  valid: boolean;
  payload: T | null;
  error?: string;
  errorCode?: 'EXPIRED' | 'INVALID_SIGNATURE' | 'MALFORMED' | 'REVOKED' | 'ISSUER_MISMATCH' | 'AUDIENCE_MISMATCH';
}

/**
 * Token refresh result
 */
export interface TokenRefreshResult {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  tokenVersion: number;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Token Generator Port Interface
 * Defines the contract for token operations in the domain layer.
 */
export interface ITokenGenerator {
  /**
   * Generate an access token
   * @param payload - Token payload
   * @param options - Token options
   * @returns Token generation result
   */
  generateAccessToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Generate a refresh token
   * @param payload - Token payload
   * @param options - Token options
   * @returns Token generation result
   */
  generateRefreshToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Generate a password reset token
   * @param userId - User ID
   * @param email - User email
   * @param options - Token options
   * @returns Token generation result
   */
  generateResetToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Generate an email verification token
   * @param userId - User ID
   * @param email - User email
   * @param options - Token options
   * @returns Token generation result
   */
  generateVerificationToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Generate an MFA token
   * @param userId - User ID
   * @param sessionId - Session ID
   * @param options - Token options
   * @returns Token generation result
   */
  generateMFAToken(
    userId: string,
    sessionId: string,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Generate a magic link token (passwordless login)
   * @param email - User email
   * @param redirectUrl - Redirect URL after verification
   * @param options - Token options
   * @returns Token generation result
   */
  generateMagicLinkToken(
    email: string,
    redirectUrl: string,
    options?: TokenOptions
  ): Promise<TokenResult>;

  /**
   * Verify a token
   * @param token - Token string
   * @param expectedType - Expected token type
   * @returns Verification result
   */
  verifyToken<T extends TokenPayload = TokenPayload>(
    token: string,
    expectedType: TokenType
  ): Promise<TokenVerificationResult<T>>;

  /**
   * Verify a token without type check
   * @param token - Token string
   * @returns Verification result
   */
  verifyTokenUnsafe<T extends TokenPayload = TokenPayload>(
    token: string
  ): Promise<TokenVerificationResult<T>>;

  /**
   * Refresh an access token using refresh token
   * @param refreshToken - Refresh token string
   * @param options - Refresh options
   * @returns Token refresh result
   */
  refreshAccessToken(
    refreshToken: string,
    options?: { deviceId?: string; ipAddress?: string }
  ): Promise<TokenRefreshResult>;

  /**
   * Revoke a token
   * @param token - Token to revoke
   * @param reason - Revocation reason
   * @returns True if revoked successfully
   */
  revokeToken(
    token: string,
    reason?: string
  ): Promise<boolean>;

  /**
   * Revoke all tokens for a user
   * @param userId - User ID
   * @param reason - Revocation reason
   * @returns Number of revoked tokens
   */
  revokeAllUserTokens(
    userId: string,
    reason?: string
  ): Promise<number>;

  /**
   * Check if a token is revoked
   * @param tokenId - Token ID (jti)
   * @returns True if revoked
   */
  isTokenRevoked(
    tokenId: string
  ): Promise<boolean>;

  /**
   * Get token remaining time in seconds
   * @param token - Token string
   * @returns Remaining time in seconds
   */
  getTokenRemainingTime(
    token: string
  ): Promise<number>;

  /**
   * Decode token without verification (for non-secure operations)
   * @param token - Token string
   * @returns Decoded payload or null
   */
  decodeToken<T extends TokenPayload = TokenPayload>(
    token: string
  ): T | null;

  /**
   * Get token expiration time
   * @param token - Token string
   * @returns Expiration date or null
   */
  getTokenExpiry(
    token: string
  ): Date | null;

  /**
   * Get token issued at time
   * @param token - Token string
   * @returns Issued at date or null
   */
  getTokenIssuedAt(
    token: string
  ): Date | null;
}

// ============================================================
// Mock Implementation (For Testing)
// ============================================================

/**
 * Mock token generator for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockTokenGenerator implements ITokenGenerator {
  private tokens: Map<string, { payload: TokenPayload; revoked: boolean }> = new Map();
  private counter = 0;

  async generateAccessToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('access', payload, options);
  }

  async generateRefreshToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('refresh', payload, options);
  }

  async generateResetToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('reset', { userId, email, role: 'CUSTOMER', type: 'reset' }, options);
  }

  async generateVerificationToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('verification', { userId, email, role: 'CUSTOMER', type: 'verification' }, options);
  }

  async generateMFAToken(
    userId: string,
    sessionId: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('mfa', { userId, email: 'test@example.com', role: 'CUSTOMER', sessionId, type: 'mfa' }, options);
  }

  async generateMagicLinkToken(
    email: string,
    redirectUrl: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('magic_link', { userId: 'mock-user-id', email, role: 'CUSTOMER', type: 'magic_link' }, options);
  }

  private async generateToken(
    type: TokenType,
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    const tokenId = `mock-token-${++this.counter}`;
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = this.parseExpiry(options?.expiresIn || '1h');
    const tokenPayload: TokenPayload = {
      ...payload,
      type,
      iat: now,
      exp: now + expiresIn,
    };
    const token = `mock-${type}-${tokenId}`;
    this.tokens.set(token, { payload: tokenPayload, revoked: false });
    return {
      token,
      expiresAt: new Date((now + expiresIn) * 1000),
      expiresInSeconds: expiresIn,
      tokenId,
    };
  }

  private parseExpiry(expiry: string | number): number {
    if (typeof expiry === 'number') return expiry;
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1), 10);
    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return parseInt(expiry, 10);
    }
  }

  async verifyToken<T extends TokenPayload>(
    token: string,
    expectedType: TokenType
  ): Promise<TokenVerificationResult<T>> {
    const entry = this.tokens.get(token);
    if (!entry) {
      return { valid: false, payload: null, error: 'Token not found', errorCode: 'MALFORMED' };
    }
    if (entry.revoked) {
      return { valid: false, payload: null, error: 'Token revoked', errorCode: 'REVOKED' };
    }
    const payload = entry.payload as T;
    if (payload.type !== expectedType) {
      return { valid: false, payload: null, error: 'Token type mismatch', errorCode: 'INVALID_SIGNATURE' };
    }
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, payload: null, error: 'Token expired', errorCode: 'EXPIRED' };
    }
    return { valid: true, payload };
  }

  async verifyTokenUnsafe<T extends TokenPayload>(
    token: string
  ): Promise<TokenVerificationResult<T>> {
    const entry = this.tokens.get(token);
    if (!entry) {
      return { valid: false, payload: null, error: 'Token not found', errorCode: 'MALFORMED' };
    }
    if (entry.revoked) {
      return { valid: false, payload: null, error: 'Token revoked', errorCode: 'REVOKED' };
    }
    const payload = entry.payload as T;
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, payload: null, error: 'Token expired', errorCode: 'EXPIRED' };
    }
    return { valid: true, payload };
  }

  async refreshAccessToken(
    refreshToken: string,
    options?: { deviceId?: string; ipAddress?: string }
  ): Promise<TokenRefreshResult> {
    const result = await this.verifyToken(refreshToken, 'refresh');
    if (!result.valid || !result.payload) {
      throw new Error('Invalid refresh token');
    }
    const accessResult = await this.generateAccessToken(
      { userId: result.payload.userId, email: result.payload.email, role: result.payload.role },
      { expiresIn: '15m' }
    );
    const newRefreshResult = await this.generateRefreshToken(
      { userId: result.payload.userId, email: result.payload.email, role: result.payload.role },
      { expiresIn: '7d' }
    );
    return {
      accessToken: accessResult.token,
      refreshToken: newRefreshResult.token,
      accessTokenExpiresIn: accessResult.expiresInSeconds,
      refreshTokenExpiresIn: newRefreshResult.expiresInSeconds,
      tokenVersion: 1,
    };
  }

  async revokeToken(token: string, reason?: string): Promise<boolean> {
    const entry = this.tokens.get(token);
    if (!entry) return false;
    entry.revoked = true;
    return true;
  }

  async revokeAllUserTokens(userId: string, reason?: string): Promise<number> {
    let count = 0;
    for (const [token, entry] of this.tokens) {
      if (entry.payload.userId === userId && !entry.revoked) {
        entry.revoked = true;
        count++;
      }
    }
    return count;
  }

  async isTokenRevoked(tokenId: string): Promise<boolean> {
    for (const [, entry] of this.tokens) {
      if (entry.payload.userId === tokenId) {
        return entry.revoked;
      }
    }
    return false;
  }

  async getTokenRemainingTime(token: string): Promise<number> {
    const entry = this.tokens.get(token);
    if (!entry || entry.revoked) return 0;
    const payload = entry.payload;
    if (!payload.exp) return 0;
    const remaining = payload.exp - Math.floor(Date.now() / 1000);
    return remaining > 0 ? remaining : 0;
  }

  decodeToken<T extends TokenPayload>(token: string): T | null {
    const entry = this.tokens.get(token);
    if (!entry) return null;
    return entry.payload as T;
  }

  getTokenExpiry(token: string): Date | null {
    const entry = this.tokens.get(token);
    if (!entry) return null;
    const payload = entry.payload;
    if (!payload.exp) return null;
    return new Date(payload.exp * 1000);
  }

  getTokenIssuedAt(token: string): Date | null {
    const entry = this.tokens.get(token);
    if (!entry) return null;
    const payload = entry.payload;
    if (!payload.iat) return null;
    return new Date(payload.iat * 1000);
  }
}
