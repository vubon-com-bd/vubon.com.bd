/**
 * OTP Generator Port
 * Defines the contract for OTP (One-Time Password) generation and verification
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IOtpGenerator {
  /**
   * Generate a numeric OTP (One-Time Password) code
   * @param length - The length of the OTP code (default: 6)
   * @returns The generated OTP code as a string
   */
  generateOTP(length?: number): string;

  /**
   * Generate a TOTP (Time-based One-Time Password) secret
   * The secret is Base32 encoded and used with authenticator apps
   * @param secretLength - The length of the secret in bytes (default: 20)
   * @returns The Base32 encoded TOTP secret
   */
  generateTOTPSecret(secretLength?: number): string;

  /**
   * Verify a TOTP code against a secret
   * @param secret - The Base32 encoded TOTP secret
   * @param code - The TOTP code to verify
   * @param window - The verification window (default: 2)
   * @returns True if the code is valid, false otherwise
   */
  verifyTOTP(secret: string, code: string, window?: number): boolean;

  /**
   * Generate backup codes for MFA recovery
   * @param count - Number of backup codes to generate (default: 10)
   * @param length - Length of each backup code (default: 8)
   * @returns An array of backup code strings
   */
  generateBackupCodes(count?: number, length?: number): string[];
}
