/**
 * Decryption Helper — AES-256-GCM.
 * @module shared-utils/common/helper/decryption
 */

import { createDecipheriv } from 'crypto';
import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

const ALGORITHM = SECURITY.ENCRYPTION.ALGORITHM;
const KEY_LENGTH = SECURITY.ENCRYPTION.KEY_LENGTH;

/**
 * Decrypts AES-256-GCM ciphertext produced by `encrypt()`.
 * Input format: `iv:authTag:ciphertext` (all base64).
 */
export const decrypt = (keyHex: string, payload: string): string => {
  if (!keyHex || keyHex.length !== KEY_LENGTH * 2) {
    throw new Error(`Key must be ${KEY_LENGTH * 2} hex characters`);
  }
  const parts = payload.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid ciphertext format (expected iv:authTag:data)');
  }
  const [ivB64, authTagB64, dataB64] = parts;
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivB64!, 'base64');
  const authTag = Buffer.from(authTagB64!, 'base64');
  const encrypted = Buffer.from(dataB64!, 'base64');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
};
