/**
 * GuestTokenService — generate + validate guest cart tokens
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

const TOKEN_LENGTH = 32;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

@Injectable()
export class GuestTokenService {
  private readonly logger = new Logger(GuestTokenService.name);

  generate(): string {
    const bytes = randomBytes(TOKEN_LENGTH);
    let out = '';
    for (let i = 0; i < bytes.length; i++) {
      out += CHARS[bytes[i] % CHARS.length];
    }
    return out;
  }

  validate(token: string): boolean {
    if (typeof token !== 'string') return false;
    if (token.length < 16 || token.length > 128) return false;
    return /^[A-Za-z0-9_-]+$/.test(token);
  }

  computeExpiry(ttlHours: number = 168): string {
    const d = new Date();
    d.setHours(d.getHours() + ttlHours);
    return d.toISOString();
  }
}
