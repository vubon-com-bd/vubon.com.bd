import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from 'node:crypto';
import { getEnv } from '@vubon/shared-config/common';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

@Injectable()
export class CryptoService {
  private readonly key: Buffer;

  constructor() {
    const rawKey = getEnv('ENCRYPTION_KEY');
    this.key = createHash('sha256').update(rawKey).digest();
  }

  encrypt(plain: string): string {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plain, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(payload: string): string {
    const [ivHex, tagHex, dataHex] = payload.split(':');
    if (!ivHex || !tagHex || !dataHex) {
      throw new Error('Invalid encrypted payload');
    }
    const decipher = createDecipheriv(
      ALGORITHM,
      this.key,
      Buffer.from(ivHex, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataHex, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }

  hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
