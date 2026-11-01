/**
 * EncryptionService — AES-256-GCM for sensitive fields
 * @module logistics-service/infrastructure/services/internal
 *
 * ⚠️ Uses ENCRYPTION_KEY env var (32 bytes / 64 hex chars)
 */
import { Injectable, Logger } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12;    // GCM recommended
const TAG_LENGTH = 16;
const SALT = 'logistics-service';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly key: Buffer;

  constructor() {
    const rawKey = process.env['ENCRYPTION_KEY'] ?? '';
    if (!rawKey) {
      // Dev fallback — NOT secure; warn loudly
      this.logger.warn('⚠️  ENCRYPTION_KEY env not set — using derived dev key');
      this.key = scryptSync('dev-encryption-key-do-not-use-in-prod', SALT, 32);
    } else {
      // Support either hex (64 chars) or passphrase (derive)
      this.key = /^[0-9a-fA-F]{64}$/.test(rawKey)
        ? Buffer.from(rawKey, 'hex')
        : scryptSync(rawKey, SALT, 32);
    }
  }

  /**
   * Encrypt plaintext → base64 ciphertext (includes IV + auth tag).
   */
  encrypt(plaintext: string): string {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGO, this.key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString('base64');
  }

  /**
   * Decrypt base64 ciphertext → plaintext.
   */
  decrypt(ciphertextB64: string): string {
    const buf = Buffer.from(ciphertextB64, 'base64');
    const iv = buf.subarray(0, IV_LENGTH);
    const tag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const encrypted = buf.subarray(IV_LENGTH + TAG_LENGTH);
    const decipher = createDecipheriv(ALGO, this.key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  }
}
