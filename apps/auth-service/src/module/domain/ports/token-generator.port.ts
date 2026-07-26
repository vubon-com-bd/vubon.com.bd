/**
 * Token Generator Port Interface
 * Defines contract for token generation operations
 * Infrastructure layer will provide implementation
 */

export interface ITokenGenerator {
  /**
   * Generate a cryptographically secure random token
   * @param length - Length of the token in bytes (default: 32)
   * @param encoding - Encoding format (default: 'hex')
   * @returns Random token string
   */
  generateToken(length?: number, encoding?: 'hex' | 'base64' | 'base64url'): string;

  /**
   * Generate a numeric OTP (One-Time Password)
   * @param digits - Number of digits (default: 6)
   * @returns OTP as string
   */
  generateOTP(digits?: number): string;

  /**
   * Generate a random alphanumeric string
   * @param length - Length of the string (default: 16)
   * @returns Random alphanumeric string
   */
  generateAlphanumeric(length?: number): string;

  /**
   * Generate a secure random string with custom character set
   * @param length - Length of the string
   * @param chars - Character set to use (default: alphanumeric)
   * @returns Random string
   */
  generateCustomRandom(length?: number, chars?: string): string;

  /**
   * Generate a UUID v4 compatible random string
   * @returns UUID v4 string
   */
  generateUUID(): string;

  /**
   * Generate a JWT token
   * @param payload - Data to encode in token
   * @param expiresIn - Expiration time (e.g., '7d', '24h')
   * @returns JWT token string
   */
  generateJWT<T extends Record<string, unknown>>(payload: T, expiresIn?: string): string;

  /**
   * Verify a JWT token
   * @param token - JWT token to verify
   * @returns Decoded token payload
   * @throws Error if token is invalid or expired
   */
  verifyJWT<T extends Record<string, unknown>>(token: string): T;

  /**
   * Generate a refresh token
   * @param userId - User ID to associate with token
   * @returns Refresh token string
   */
  generateRefreshToken(userId: string): string;

  /**
   * Verify a refresh token
   * @param token - Refresh token to verify
   * @returns User ID associated with token
   * @throws Error if token is invalid or expired
   */
  verifyRefreshToken(token: string): string;

  /**
   * Generate a password reset token
   * @param userId - User ID to associate with token
   * @param expiresIn - Expiration time (default: '1h')
   * @returns Password reset token
   */
  generatePasswordResetToken(userId: string, expiresIn?: string): string;

  /**
   * Verify a password reset token
   * @param token - Password reset token to verify
   * @returns User ID associated with token
   * @throws Error if token is invalid or expired
   */
  verifyPasswordResetToken(token: string): string;

  /**
   * Generate an email verification token
   * @param userId - User ID to associate with token
   * @param expiresIn - Expiration time (default: '7d')
   * @returns Email verification token
   */
  generateEmailVerificationToken(userId: string, expiresIn?: string): string;

  /**
   * Verify an email verification token
   * @param token - Email verification token to verify
   * @returns User ID associated with token
   * @throws Error if token is invalid or expired
   */
  verifyEmailVerificationToken(token: string): string;
}
