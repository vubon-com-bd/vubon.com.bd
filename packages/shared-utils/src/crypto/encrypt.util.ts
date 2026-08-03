import crypto from 'crypto';

/**
 * Encryption algorithm types
 */
export type EncryptionAlgorithm = 'aes-256-gcm' | 'aes-256-cbc';

/**
 * Encryption result interface
 */
export interface EncryptionResult {
  /** Encrypted data as base64 string */
  encryptedData: string;
  /** Initialization vector as base64 string */
  iv: string;
  /** Authentication tag (for GCM) as base64 string */
  authTag?: string;
  /** Algorithm used for encryption */
  algorithm: EncryptionAlgorithm;
}

/**
 * Decryption result interface
 */
export interface DecryptionResult {
  /** Decrypted data as string */
  data: string;
  /** Algorithm used for decryption */
  algorithm: EncryptionAlgorithm;
}

/**
 * Encrypts data using AES-256-GCM (authenticated encryption)
 * This is the recommended algorithm for most use cases
 *
 * @param text - The plain text to encrypt
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param iv - Optional initialization vector (will be generated if not provided)
 * @returns EncryptionResult containing encrypted data, IV, and auth tag
 *
 * @example
 * const result = encryptGCM('Sensitive data', '32-byte-long-secret-key-here!');
 * // { encryptedData: '...', iv: '...', authTag: '...' }
 */
export function encryptGCM(text: string, key: Buffer | string, iv?: Buffer): EncryptionResult {
  if (!text || typeof text !== 'string') {
    throw new Error('Text to encrypt must be a non-empty string');
  }

  if (!key) {
    throw new Error('Encryption key is required');
  }

  // Convert key to Buffer if it's a string
  const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;

  // Ensure key is 32 bytes (256 bits)
  if (keyBuffer.length !== 32) {
    throw new Error('Key must be exactly 32 bytes for AES-256');
  }

  // Generate IV if not provided
  const ivBuffer = iv || crypto.randomBytes(16);

  // Create cipher with GCM mode
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, ivBuffer);

  // Encrypt the data
  const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);

  // Get the authentication tag
  const authTag = cipher.getAuthTag();

  return {
    encryptedData: encrypted.toString('base64'),
    iv: ivBuffer.toString('base64'),
    authTag: authTag.toString('base64'),
    algorithm: 'aes-256-gcm',
  };
}

/**
 * Decrypts data encrypted with AES-256-GCM
 *
 * @param encryptedData - The encrypted data as base64 string
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param iv - The initialization vector as base64 string
 * @param authTag - The authentication tag as base64 string
 * @returns DecryptionResult containing the decrypted data
 *
 * @example
 * const result = decryptGCM(
 *   'encrypted-base64-data',
 *   '32-byte-long-secret-key-here!',
 *   'iv-base64-string',
 *   'auth-tag-base64-string'
 * );
 * // { data: 'Sensitive data', algorithm: 'aes-256-gcm' }
 */
export function decryptGCM(
  encryptedData: string,
  key: Buffer | string,
  iv: string,
  authTag: string
): DecryptionResult {
  if (!encryptedData || typeof encryptedData !== 'string') {
    throw new Error('Encrypted data must be a non-empty string');
  }

  if (!key) {
    throw new Error('Decryption key is required');
  }

  if (!iv || typeof iv !== 'string') {
    throw new Error('IV must be a non-empty string');
  }

  if (!authTag || typeof authTag !== 'string') {
    throw new Error('Auth tag must be a non-empty string');
  }

  // Convert key to Buffer if it's a string
  const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;

  // Ensure key is 32 bytes (256 bits)
  if (keyBuffer.length !== 32) {
    throw new Error('Key must be exactly 32 bytes for AES-256');
  }

  // Decode base64 data
  const encryptedBuffer = Buffer.from(encryptedData, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');
  const authTagBuffer = Buffer.from(authTag, 'base64');

  // Create decipher with GCM mode
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, ivBuffer);
  decipher.setAuthTag(authTagBuffer);

  // Decrypt the data
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

  return {
    data: decrypted.toString('utf-8'),
    algorithm: 'aes-256-gcm',
  };
}

/**
 * Encrypts data using AES-256-CBC (legacy, without authentication)
 * Use GCM instead when possible for better security
 *
 * @param text - The plain text to encrypt
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param iv - Optional initialization vector (will be generated if not provided)
 * @returns EncryptionResult containing encrypted data and IV
 *
 * @example
 * const result = encryptCBC('Sensitive data', '32-byte-long-secret-key-here!');
 * // { encryptedData: '...', iv: '...' }
 */
export function encryptCBC(text: string, key: Buffer | string, iv?: Buffer): EncryptionResult {
  if (!text || typeof text !== 'string') {
    throw new Error('Text to encrypt must be a non-empty string');
  }

  if (!key) {
    throw new Error('Encryption key is required');
  }

  // Convert key to Buffer if it's a string
  const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;

  // Ensure key is 32 bytes (256 bits)
  if (keyBuffer.length !== 32) {
    throw new Error('Key must be exactly 32 bytes for AES-256');
  }

  // Generate IV if not provided
  const ivBuffer = iv || crypto.randomBytes(16);

  // Create cipher with CBC mode
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  // Encrypt the data
  const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);

  return {
    encryptedData: encrypted.toString('base64'),
    iv: ivBuffer.toString('base64'),
    algorithm: 'aes-256-cbc',
  };
}

/**
 * Decrypts data encrypted with AES-256-CBC (legacy)
 *
 * @param encryptedData - The encrypted data as base64 string
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param iv - The initialization vector as base64 string
 * @returns DecryptionResult containing the decrypted data
 *
 * @example
 * const result = decryptCBC(
 *   'encrypted-base64-data',
 *   '32-byte-long-secret-key-here!',
 *   'iv-base64-string'
 * );
 * // { data: 'Sensitive data', algorithm: 'aes-256-cbc' }
 */
export function decryptCBC(
  encryptedData: string,
  key: Buffer | string,
  iv: string
): DecryptionResult {
  if (!encryptedData || typeof encryptedData !== 'string') {
    throw new Error('Encrypted data must be a non-empty string');
  }

  if (!key) {
    throw new Error('Decryption key is required');
  }

  if (!iv || typeof iv !== 'string') {
    throw new Error('IV must be a non-empty string');
  }

  // Convert key to Buffer if it's a string
  const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;

  // Ensure key is 32 bytes (256 bits)
  if (keyBuffer.length !== 32) {
    throw new Error('Key must be exactly 32 bytes for AES-256');
  }

  // Decode base64 data
  const encryptedBuffer = Buffer.from(encryptedData, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');

  // Create decipher with CBC mode
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  // Decrypt the data
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

  return {
    data: decrypted.toString('utf-8'),
    algorithm: 'aes-256-cbc',
  };
}

/**
 * Generic encrypt function that chooses the best algorithm
 * Uses GCM by default, falls back to CBC if specified
 *
 * @param text - The plain text to encrypt
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param algorithm - The encryption algorithm to use (default: 'aes-256-gcm')
 * @returns EncryptionResult containing encrypted data and IV
 *
 * @example
 * const result = encrypt('Sensitive data', '32-byte-long-secret-key-here!');
 * // { encryptedData: '...', iv: '...', authTag: '...', algorithm: 'aes-256-gcm' }
 */
export function encrypt(
  text: string,
  key: Buffer | string,
  algorithm: EncryptionAlgorithm = 'aes-256-gcm'
): EncryptionResult {
  if (algorithm === 'aes-256-gcm') {
    return encryptGCM(text, key);
  } else if (algorithm === 'aes-256-cbc') {
    return encryptCBC(text, key);
  } else {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Generic decrypt function that handles both GCM and CBC
 *
 * @param encryptedData - The encrypted data as base64 string
 * @param key - The encryption key (must be 32 bytes for AES-256)
 * @param iv - The initialization vector as base64 string
 * @param authTag - The authentication tag (required for GCM, optional for CBC)
 * @param algorithm - The encryption algorithm used (default: 'aes-256-gcm')
 * @returns DecryptionResult containing the decrypted data
 *
 * @example
 * const result = decrypt(
 *   'encrypted-base64-data',
 *   '32-byte-long-secret-key-here!',
 *   'iv-base64-string',
 *   'auth-tag-base64-string'
 * );
 * // { data: 'Sensitive data', algorithm: 'aes-256-gcm' }
 */
export function decrypt(
  encryptedData: string,
  key: Buffer | string,
  iv: string,
  authTag?: string,
  algorithm: EncryptionAlgorithm = 'aes-256-gcm'
): DecryptionResult {
  if (algorithm === 'aes-256-gcm') {
    if (!authTag) {
      throw new Error('Auth tag is required for AES-256-GCM decryption');
    }
    return decryptGCM(encryptedData, key, iv, authTag);
  } else if (algorithm === 'aes-256-cbc') {
    return decryptCBC(encryptedData, key, iv);
  } else {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Generates a secure random encryption key (32 bytes for AES-256)
 *
 * @param encoding - The encoding to return the key in (default: 'base64')
 * @returns The generated key in the specified encoding
 *
 * @example
 * const key = generateEncryptionKey();
 * // 'base64-encoded-32-byte-key'
 */
export function generateEncryptionKey(encoding: BufferEncoding = 'base64'): string {
  return crypto.randomBytes(32).toString(encoding);
}

/**
 * Generates a secure random IV (16 bytes for AES)
 *
 * @param encoding - The encoding to return the IV in (default: 'base64')
 * @returns The generated IV in the specified encoding
 *
 * @example
 * const iv = generateIV();
 * // 'base64-encoded-16-byte-iv'
 */
export function generateIV(encoding: BufferEncoding = 'base64'): string {
  return crypto.randomBytes(16).toString(encoding);
}
