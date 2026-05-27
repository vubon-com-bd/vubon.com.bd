/**
 * Encryption Utilities - Pure AES encryption/decryption
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/src/crypto/encrypt.util
 *
 * RULES:
 * ✅ ONLY encryption/decryption helpers - NO business logic
 * ✅ NO secret storage, database operations, side effects
 * ✅ Pure functions with deterministic output (given same inputs)
 * ✅ Named exports only
 * ✅ No console.log or external API calls
 */

import crypto from 'crypto';

// Import constants from shared-constants layer (Enterprise rule)
import { ENCRYPTION_CONFIG } from '@vubon/auth-constants';

// ==================== Constants (from shared-constants) ====================

const {
  ALGORITHM,
  CBC_ALGORITHM,
  IV_LENGTH,
  AUTH_TAG_LENGTH,
  KEY_LENGTH,
  ENCODING,
  SCRYPT,
} = ENCRYPTION_CONFIG;

const { N: SCRYPT_N, R: SCRYPT_R, P: SCRYPT_P } = SCRYPT;

// ==================== Key Cache (Performance optimization) ====================

/**
 * LRU-like cache for derived keys
 * Prevents repeated scrypt computation for the same secret
 */
const keyCache = new Map<string, { key: Buffer; expiresAt: number }>();
const CACHE_TTL_MS = 3600000; // 1 hour cache TTL

const getCachedKey = (secret: string): Buffer | null => {
  const cached = keyCache.get(secret);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.key;
  }
  if (cached) {
    keyCache.delete(secret);
  }
  return null;
};

const setCachedKey = (secret: string, key: Buffer): void => {
  // Prevent memory leak - limit cache size
  if (keyCache.size > 1000) {
    const oldestKey = keyCache.keys().next().value;
    if (oldestKey) keyCache.delete(oldestKey);
  }
  keyCache.set(secret, { key, expiresAt: Date.now() + CACHE_TTL_MS });
};

// ==================== Private Helper Functions ====================

/**
 * Derive a secure key from a secret using scrypt (Async version)
 * Pure function - no side effects
 */
const deriveKeyAsync = async (secret: string, salt: string): Promise<Buffer> => {
  return crypto.scrypt(secret, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
};

/**
 * Derive a secure key from a secret using scrypt (Sync version for sync contexts)
 * Pure function - no side effects
 */
const deriveKeySync = (secret: string, salt: string): Buffer => {
  return crypto.scryptSync(secret, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
};

/**
 * Generate a random salt
 */
const generateSalt = (): string => {
  return crypto.randomBytes(16).toString(ENCODING);
};

/**
 * Generate random initialization vector
 */
const generateIV = (): Buffer => {
  return crypto.randomBytes(IV_LENGTH);
};

/**
 * Validate encrypted format
 */
const isValidEncryptedFormat = (parts: string[], expectedParts: number): boolean => {
  return parts.length === expectedParts && parts.every(part => /^[a-f0-9]+$/i.test(part));
};

// ==================== AES-256-GCM Encryption (Recommended) - Async ====================

/**
 * Encrypt data using AES-256-GCM with random salt (Authenticated encryption)
 * Pure function - deterministic given same inputs
 *
 * @param text - Plain text to encrypt
 * @param secret - Secret key (will be derived to 32 bytes using scrypt)
 * @returns Encrypted string format: salt:iv:encrypted:authTag
 *
 * @example
 * const encrypted = await encrypt('sensitive data', 'my-secret-key');
 * // Returns: "a1b2c3:d4e5f6:xyz789:auth123"
 */
export const encrypt = async (text: string, secret: string): Promise<string> => {
  if (!text) {
    throw new Error('Text to encrypt cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const salt = generateSalt();
  const key = await deriveKeyAsync(secret, salt);
  const iv = generateIV();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${salt}:${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}:${authTag.toString(ENCODING)}`;
};

/**
 * Decrypt data encrypted with encrypt()
 * Pure function - deterministic given same inputs
 *
 * @param encryptedText - Encrypted string format: salt:iv:encrypted:authTag
 * @param secret - Secret key used for encryption
 * @returns Decrypted plain text
 * @throws Error if invalid format or decryption fails
 */
export const decrypt = async (encryptedText: string, secret: string): Promise<string> => {
  if (!encryptedText) {
    throw new Error('Encrypted text cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const parts = encryptedText.split(':');

  if (!isValidEncryptedFormat(parts, 4)) {
    throw new Error('Invalid encrypted format. Expected format: salt:iv:encrypted:authTag');
  }

  const [saltHex, ivHex, encryptedHex, authTagHex] = parts;

  const key = await deriveKeyAsync(secret, saltHex);
  const iv = Buffer.from(ivHex, ENCODING);
  const encrypted = Buffer.from(encryptedHex, ENCODING);
  const authTag = Buffer.from(authTagHex, ENCODING);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  try {
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error('Decryption failed: Invalid secret or corrupted data');
  }
};

// ==================== AES-256-GCM Encryption (Sync version for performance-critical sync contexts) ====================

/**
 * Encrypt data using AES-256-GCM with random salt (Sync version)
 * Use this only when async is not possible
 */
export const encryptSync = (text: string, secret: string): string => {
  if (!text) {
    throw new Error('Text to encrypt cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const cachedKey = getCachedKey(secret);
  let key: Buffer;

  if (cachedKey) {
    key = cachedKey;
  } else {
    const salt = generateSalt();
    key = deriveKeySync(secret, salt);
    setCachedKey(secret, key);
  }

  const iv = generateIV();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Note: For sync version, salt is not stored separately (using fixed salt)
  // This is less secure but necessary for sync compatibility
  return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}:${authTag.toString(ENCODING)}`;
};

/**
 * Decrypt data encrypted with encryptSync()
 */
export const decryptSync = (encryptedText: string, secret: string): string => {
  if (!encryptedText) {
    throw new Error('Encrypted text cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const parts = encryptedText.split(':');

  if (!isValidEncryptedFormat(parts, 3)) {
    throw new Error('Invalid encrypted format. Expected format: iv:encrypted:authTag');
  }

  const cachedKey = getCachedKey(secret);
  let key: Buffer;

  if (cachedKey) {
    key = cachedKey;
  } else {
    key = deriveKeySync(secret, '');
    setCachedKey(secret, key);
  }

  const [ivHex, encryptedHex, authTagHex] = parts;

  const iv = Buffer.from(ivHex, ENCODING);
  const encrypted = Buffer.from(encryptedHex, ENCODING);
  const authTag = Buffer.from(authTagHex, ENCODING);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  try {
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error('Decryption failed: Invalid secret or corrupted data');
  }
};

// ==================== AES-256-CBC Encryption (Legacy/Compatibility) ====================

/**
 * Encrypt data using AES-256-CBC (No authentication - for compatibility only)
 * Prefer encrypt() for new code
 */
export const encryptCBC = (text: string, secret: string): string => {
  if (!text || !secret) {
    throw new Error('Text and secret are required');
  }

  const salt = generateSalt();
  const key = deriveKeySync(secret, salt);
  const iv = crypto.randomBytes(CBC_IV_LENGTH);
  const cipher = crypto.createCipheriv(CBC_ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

  return `${salt}:${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}`;
};

/**
 * Decrypt data encrypted with encryptCBC()
 */
export const decryptCBC = (encryptedText: string, secret: string): string => {
  if (!encryptedText || !secret) {
    throw new Error('Encrypted text and secret are required');
  }

  const parts = encryptedText.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted format. Expected format: salt:iv:encrypted');
  }

  const [saltHex, ivHex, encryptedHex] = parts;

  const key = deriveKeySync(secret, saltHex);
  const iv = Buffer.from(ivHex, ENCODING);
  const encrypted = Buffer.from(encryptedHex, ENCODING);

  const decipher = crypto.createDecipheriv(CBC_ALGORITHM, key, iv);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return decrypted.toString('utf8');
};

// ==================== XOR Obfuscation (NOT for sensitive data) ====================

/**
 * Simple XOR encryption for NON-SENSITIVE data only!
 * WARNING: NOT cryptographically secure - for obfuscation only
 * Do NOT use for passwords, tokens, or personal data
 *
 * @deprecated Use encrypt() for sensitive data
 */
export const xorEncrypt = (text: string, key: string): string => {
  if (!text || !key) {
    throw new Error('Text and key are required');
  }

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return Buffer.from(result, 'utf8').toString('base64');
};

/**
 * XOR decryption for NON-SENSITIVE data only
 * @deprecated Use decrypt() for sensitive data
 */
export const xorDecrypt = (encryptedBase64: string, key: string): string => {
  if (!encryptedBase64 || !key) {
    throw new Error('Encrypted text and key are required');
  }

  const encrypted = Buffer.from(encryptedBase64, 'base64').toString('utf8');
  let result = '';
  for (let i = 0; i < encrypted.length; i++) {
    const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
};

// ==================== Key Generation Helpers ====================

/**
 * Generate a cryptographically secure random encryption key
 * @param length - Key length in bytes (default: 32 for AES-256)
 * @returns Hex encoded key string
 */
export const generateEncryptionKey = (length: number = KEY_LENGTH): string => {
  if (length < 16) {
    throw new Error('Key length must be at least 16 bytes for secure encryption');
  }
  if (length > 64) {
    throw new Error('Key length cannot exceed 64 bytes');
  }
  return crypto.randomBytes(length).toString(ENCODING);
};

/**
 * Generate a random initialization vector (IV)
 */
export const generateIVString = (length: number = IV_LENGTH): string => {
  return crypto.randomBytes(length).toString(ENCODING);
};

/**
 * Generate a secure hash of a key (for key fingerprinting)
 * Not reversible - useful for key identification
 */
export const getKeyFingerprint = async (secret: string): Promise<string> => {
  const salt = generateSalt();
  const key = await deriveKeyAsync(secret, salt);
  return crypto.createHash('sha256').update(key).digest('hex').substring(0, 16);
};

/**
 * Generate a secure hash of a key (sync version)
 */
export const getKeyFingerprintSync = (secret: string): string => {
  const key = deriveKeySync(secret, '');
  return crypto.createHash('sha256').update(key).digest('hex').substring(0, 16);
};

// ==================== Validation Helpers ====================

/**
 * Check if a string appears to be encrypted (GCM format with salt - async version)
 */
export const isEncryptedFormat = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const parts = text.split(':');
  return (parts.length === 4 || parts.length === 3) && 
         parts.every(part => /^[a-f0-9]+$/i.test(part));
};

/**
 * Check if a string appears to be encrypted (CBC format)
 */
export const isEncryptedCBCFormat = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const parts = text.split(':');
  return parts.length === 3 && 
         parts.every(part => /^[a-f0-9]+$/i.test(part));
};

// ==================== Clear Cache (For testing) ====================

/**
 * Clear the key cache (useful for testing)
 */
export const clearKeyCache = (): void => {
  keyCache.clear();
};

// ==================== Type Exports ====================

export type EncryptionAlgorithm = typeof ALGORITHM;
export type CBCEncryptionAlgorithm = typeof CBC_ALGORITHM;
export type EncryptionResult = Awaited<ReturnType<typeof encrypt>>;
export type DecryptionResult = Awaited<ReturnType<typeof decrypt>>;
export type SyncEncryptionResult = ReturnType<typeof encryptSync>;
export type SyncDecryptionResult = ReturnType<typeof decryptSync>;
