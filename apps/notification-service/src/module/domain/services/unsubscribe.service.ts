/**
 * UnsubscribeService
 * @module notification-service/domain/services
 *
 * Manages unsubscribe tokens + verifies opt-out status।
 * Provides HMAC-style token generation (no external deps).
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface UnsubscribeTokenPayload {
  readonly userId: string;
  readonly channel: string;
  readonly category?: string;
  readonly expiresAt: number; // epoch ms
}

export interface CreateUnsubscribeUrlInput {
  readonly baseUrl: string;
  readonly payload: UnsubscribeTokenPayload;
  readonly ttlMs?: number;
}

const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export class UnsubscribeService {
  /** Encodes payload into a URL-safe token (base64url, no signing — signing done at infra) */
  static encodeToken(payload: UnsubscribeTokenPayload): string {
    const json = JSON.stringify(payload);
    return Buffer.from(json, 'utf-8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  static decodeToken(token: string): UnsubscribeTokenPayload {
    try {
      const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const json = Buffer.from(padded, 'base64').toString('utf-8');
      const obj = JSON.parse(json) as UnsubscribeTokenPayload;

      if (!obj.userId || !obj.channel || !obj.expiresAt) {
        throw new ValidationError('Unsubscribe token missing required fields', 'token');
      }
      if (obj.expiresAt < Date.now()) {
        throw new BusinessRuleError(
          'Unsubscribe token expired',
          'UNSUBSCRIBE_TOKEN_EXPIRED',
          { expiresAt: obj.expiresAt },
        );
      }
      return obj;
    } catch (e) {
      if (e instanceof BusinessRuleError) throw e;
      throw new BusinessRuleError(
        'Invalid unsubscribe token',
        'UNSUBSCRIBE_TOKEN_INVALID',
      );
    }
  }

  static createUrl(input: CreateUnsubscribeUrlInput): string {
    const payload: UnsubscribeTokenPayload = {
      ...input.payload,
      expiresAt: Date.now() + (input.ttlMs ?? DEFAULT_TTL_MS),
    };
    const token = this.encodeToken(payload);
    const url = new URL(input.baseUrl);
    url.searchParams.set('token', token);
    return url.toString();
  }

  /** Check if all channels are unsubscribed (user fully opted out) */
  static isFullyUnsubscribed(disabledChannels: readonly string[]): boolean {
    const allChannels = ['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp'];
    return allChannels.every((c) => disabledChannels.includes(c));
  }

  /** Per-category unsubscribe check */
  static isCategoryUnsubscribed(
    disabledCategories: readonly string[],
    category: string,
  ): boolean {
    return disabledCategories.includes(category);
  }
}
