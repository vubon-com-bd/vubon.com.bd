/**
 * Encryption Helper — AES-256-GCM.
 * @module shared-utils/common/helper/encryption
 *
 * ⚠️ SECURITY: Uses SECURITY.ENCRYPTION constants (single source of truth).
 * Output format: `iv:authTag:ciphertext` (all base64).
 */

import { createCipheriv, randomBytes } from 'crypto';
import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

const ALGORITHM = SECURITY.ENCRYPTION.ALGORITHM; // 'aes-256-gcm'
const IV_LENGTH = SECURITY.ENCRYPTION.IV_LENGTH; // 16
const KEY_LENGTH = SECURITY.ENCRYPTION.KEY_LENGTH; // 32

/**
 * Encrypts plaintext with AES-256-GCM.
 * @param keyHex 64-char hex string (32 bytes)
 * @param data   plaintext
 * @returns      `iv:authTag:ciphertext` (base64 segments)
 */
export const encrypt = (keyHex: string, data: string): string => {
  if (!keyHex || keyHex.length !== KEY_LENGTH * 2) {
    throw new Error(`Key must be ${KEY_LENGTH * 2} hex characters`);
  }
  const key = Buffer.from(keyHex, 'hex');
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64')].join(
    ':'
  );
};

/**
 * Generates a secure 32-byte hex encryption key.
 * Store this in environment variables — NEVER commit.
 */
export const generateEncryptionKey = (): string => randomBytes(KEY_LENGTH).toString('hex');
