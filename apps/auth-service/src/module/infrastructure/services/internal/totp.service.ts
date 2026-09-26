/**
 * TotpService — RFC 6238 TOTP generation & verification
 * @module auth-service/infrastructure/services/internal
 *
 * Self-contained implementation using node:crypto (HMAC-SHA1).
 * Avoids the `otplib` dependency for portability.
 */
import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'node:crypto';
import type { TotpServiceInterface } from '../../../application/services/interfaces/totp.service.interface';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const DIGITS = 6;
const PERIOD_SEC = 30;

@Injectable()
export class TotpService implements TotpServiceInterface {
  readonly name = 'TotpService';

  generateSecret(): string {
    const bytes = randomBytes(20); // 160-bit
    return TotpService.base32Encode(bytes);
  }

  buildOtpAuthUrl(input: {
    secret: string;
    accountName: string;
    issuer: string;
  }): string {
    const label = encodeURIComponent(`${input.issuer}:${input.accountName}`);
    const params = new URLSearchParams({
      secret: input.secret,
      issuer: input.issuer,
      algorithm: 'SHA1',
      digits: String(DIGITS),
      period: String(PERIOD_SEC),
    });
    return `otpauth://totp/${label}?${params.toString()}`;
  }

  async verify(input: {
    secret: string;
    code: string;
    window?: number;
  }): Promise<boolean> {
    if (!input.secret || !input.code) return false;
    if (!/^\d{6}$/.test(input.code)) return false;

    const window = input.window ?? 1;
    const counter = Math.floor(Date.now() / 1000 / PERIOD_SEC);

    for (let i = -window; i <= window; i += 1) {
      const candidate = TotpService.generateCode(input.secret, counter + i);
      if (TotpService.timingSafeEqual(candidate, input.code)) return true;
    }
    return false;
  }

  // ---------- internals ----------

  private static generateCode(secret: string, counter: number): string {
    const key = TotpService.base32Decode(secret);
    const buffer = Buffer.alloc(8);
    buffer.writeBigUInt64BE(BigInt(counter));

    const hmac = createHmac('sha1', key).update(buffer).digest();
    const offset = hmac[hmac.length - 1]! & 0x0f;
    const binary =
      ((hmac[offset]! & 0x7f) << 24) |
      ((hmac[offset + 1]! & 0xff) << 16) |
      ((hmac[offset + 2]! & 0xff) << 8) |
      (hmac[offset + 3]! & 0xff);

    const otp = binary % 10 ** DIGITS;
    return otp.toString().padStart(DIGITS, '0');
  }

  private static base32Encode(buf: Buffer): string {
    let bits = 0;
    let value = 0;
    let output = '';
    for (const byte of buf) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }
    return output;
  }

  private static base32Decode(input: string): Buffer {
    const cleaned = input.toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
    let bits = 0;
    let value = 0;
    const bytes: number[] = [];
    for (const char of cleaned) {
      const idx = BASE32_ALPHABET.indexOf(char);
      if (idx === -1) continue;
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bytes.push((value >>> (bits - 8)) & 0xff);
        bits -= 8;
      }
    }
    return Buffer.from(bytes);
  }

  private static timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i += 1) {
      diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
  }
}
