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

// ==================== Constants (Enterprise grade) ====================

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const ENCODING = 'hex' as const;
const SALT = 'vubon-encryption-salt-2024'; // Fixed salt for deterministic key derivation
const KEY_LENGTH = 32; // 256 bits
const SCRYPT_N = 16384; // CPU/memory cost factor
const SCRYPT_R = 8; // Block size
const SCRYPT_P = 1; // Parallelization factor

// AES-256-CBC constants (alternative for compatibility)
const CBC_ALGORITHM = 'aes-256-cbc';
const CBC_IV_LENGTH = 16;

// ==================== Private Helper Functions ====================

/**
 * Derive a secure key from a secret using scrypt
 * Pure function - no side effects
 */
const deriveKey = (secret: string): Buffer => {
  return crypto.scryptSync(secret, SALT, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
};

/**
 * Validate encrypted format
 */
const isValidEncryptedFormat = (parts: string[]): parts is [string, string, string] => {
  return parts.length === 3 && parts.every(part => part.length > 0);
};

// ==================== AES-256-GCM Encryption (Recommended) ====================

/**
 * Encrypt data using AES-256-GCM (Authenticated encryption)
 * Pure function - deterministic given same inputs
 * 
 * @param text - Plain text to encrypt
 * @param secret - Secret key (will be derived to 32 bytes)
 * @returns Encrypted string format: iv:encrypted:authTag
 * 
 * @example
 * const encrypted = encrypt('sensitive data', 'my-secret-key');
 * // Returns: "a1b2c3:xyz789:auth123"
 */
export const encrypt = (text: string, secret: string): string => {
  if (!text) {
    throw new Error('Text to encrypt cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const key = deriveKey(secret);
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}:${authTag.toString(ENCODING)}`;
};

/**
 * Decrypt data encrypted with encrypt()
 * Pure function - deterministic given same inputs
 * 
 * @param encryptedText - Encrypted string format: iv:encrypted:authTag
 * @param secret - Secret key used for encryption
 * @returns Decrypted plain text
 * @throws Error if invalid format or decryption fails
 */
export const decrypt = (encryptedText: string, secret: string): string => {
  if (!encryptedText) {
    throw new Error('Encrypted text cannot be empty');
  }
  if (!secret || secret.length < 8) {
    throw new Error('Secret must be at least 8 characters');
  }

  const parts = encryptedText.split(':');
  
  if (!isValidEncryptedFormat(parts)) {
    throw new Error('Invalid encrypted format. Expected format: iv:encrypted:authTag');
  }
  
  const [ivHex, encryptedHex, authTagHex] = parts;
  
  const key = deriveKey(secret);
  const iv = Buffer.from(ivHex, ENCODING);
  const encrypted = Buffer.from(encryptedHex, ENCODING);
  const authTag = Buffer.from(authTagHex, ENCODING);
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  try {
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
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

  const key = deriveKey(secret);
  const iv = crypto.randomBytes(CBC_IV_LENGTH);
  const cipher = crypto.createCipheriv(CBC_ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  
  return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}`;
};

/**
 * Decrypt data encrypted with encryptCBC()
 */
export const decryptCBC = (encryptedText: string, secret: string): string => {
  if (!encryptedText || !secret) {
    throw new Error('Encrypted text and secret are required');
  }

  const parts = encryptedText.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted format');
  }
  
  const [ivHex, encryptedHex] = parts;
  
  const key = deriveKey(secret);
  const iv = Buffer.from(ivHex, ENCODING);
  const encrypted = Buffer.from(encryptedHex, ENCODING);
  
  const decipher = crypto.createDecipheriv(CBC_ALGORITHM, key, iv);
  
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  
  return decrypted.toString('utf8');
};

// ==================== Simple Obfuscation (NOT for sensitive data) ====================

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
export const generateIV = (length: number = IV_LENGTH): string => {
  return crypto.randomBytes(length).toString(ENCODING);
};

/**
 * Generate a secure hash of a key (for key fingerprinting)
 * Not reversible - useful for key identification
 */
export const getKeyFingerprint = (secret: string): string => {
  const key = deriveKey(secret);
  return crypto.createHash('sha256').update(key).digest('hex').substring(0, 16);
};

// ==================== Validation Helpers ====================

/**
 * Check if a string appears to be encrypted (GCM format)
 */
export const isEncryptedFormat = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const parts = text.split(':');
  return parts.length === 3 && 
         parts.every(part => /^[a-f0-9]+$/i.test(part));
};

/**
 * Check if a string appears to be encrypted (CBC format)
 */
export const isEncryptedCBCFormat = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const parts = text.split(':');
  return parts.length === 2 && 
         parts.every(part => /^[a-f0-9]+$/i.test(part));
};

// ==================== Type Exports ====================

export type EncryptionAlgorithm = typeof ALGORITHM;
export type CBCEncryptionAlgorithm = typeof CBC_ALGORITHM;
export type EncryptionResult = ReturnType<typeof encrypt>;
export type DecryptionResult = ReturnType<typeof decrypt>;
