/**
 * Crypto Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/crypto/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Encryption Utilities (encrypt.util.ts)
// ============================================================
export {
  // Core encryption/decryption
  encrypt,
  decrypt,
  encryptWithUserSalt,
  decryptWithUserSalt,

  // Legacy CBC encryption/decryption
  encryptCBC,
  decryptCBC,

  // Simple obfuscation (NOT for sensitive data)
  xorEncrypt,
  xorDecrypt,

  // Key generation helpers
  generateEncryptionKey,
  generateIV,
  getKeyFingerprint,

  // Validation helpers
  isEncryptedFormat,
  isEncryptedCBCFormat,

  // Bangladesh specific helpers
  generateBangladeshEncryptionKey,
  isSecretStrong,
} from './encrypt.util';

export type {
  EncryptionAlgorithm,
  CBCEncryptionAlgorithm,
  EncryptionResult,
  DecryptionResult,
  EncryptedFormat,
} from './encrypt.util';

// ============================================================
// Hash Utilities (hash.util.ts)
// ============================================================
export {
  // Bcrypt password hashing
  hashPassword,
  hashPasswordSync,
  comparePassword,
  comparePasswordSync,
  isValidBcryptHash, // ✅ ADDED - এই লাইনটি আগে ছিল না

  // Password strength validation
  checkPasswordStrength,

  // SHA family hashing
  sha256,
  sha256Async,
  sha512,
  hash,

  // HMAC
  hmac,

  // Timing-safe comparison
  timingSafeEqual,

  // Entropy calculation
  calculateEntropy,

  // Constants
  HASH_ALGORITHMS,
  DEFAULT_SALT_ROUNDS,
  MIN_SALT_ROUNDS,
  MAX_SALT_ROUNDS,
} from './hash.util';

export type {
  HashAlgorithm,
  PasswordStrengthInfo,
  EntropyResult,
} from './hash.util';

// ============================================================
// Random Utilities (random.util.ts)
// ============================================================
export {
  // OTP Generation
  generateOtp,
  generateOtps,
  generateOtpNumber,

  // Token Generation
  generateToken,
  generateRandomString,
  generateAlphanumericToken,
  generateNumericToken,
  generateHexToken,
  generateBase64Token,
  generateBase64UrlToken,
  generateSecureToken,

  // UUID Generation
  generateUuid,
  generateUuids,
  isValidUuid,

  // Recovery Code Generation
  generateRecoveryCodes,
  generateRecoveryCode,
  generateFormattedRecoveryCodes,

  // Nonce Generation
  generateNonce,
  generateTimestampNonce,
  generateShortNonce,

  // Combined Secrets
  generateSecrets,

  // Entropy/Quality
  getEntropyQuality,

  // Bangladesh Specific
  generateBangladeshOtp,
  generateWhatsAppOtp,
  generateVoiceCallOtp,

  // Secure Password Generation
  generateSecurePassword,

  // Constants
  OTP_LENGTH,
  OTP_MIN,
  OTP_MAX,
  UUID_VERSION,
} from './random.util';

export type {
  OTPString,
  TokenString,
  UUIDString,
  NonceString,
  RecoveryCodeString,
  BangladeshOtpString,
  WhatsAppOtpString,
  VoiceCallOtpString,
  GeneratedSecrets,
  SecurePasswordOptions,
} from './random.util';
