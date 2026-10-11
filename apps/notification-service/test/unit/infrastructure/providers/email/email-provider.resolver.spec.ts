/**
 * Unit tests for EmailProviderResolver
 * @module notification-service/test/unit/infrastructure/providers/email
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { EmailProviderResolver } from '../../../../../src/module/infrastructure/providers/email/email-provider.resolver.js';
import type { IEmailProvider } from '../../../../../src/module/infrastructure/providers/base/provider.interface.js';
import type { ProviderSendResult } from '../../../../../src/module/infrastructure/providers/base/provider.types.js';

class FakeProvider implements IEmailProvider {
  readonly channel = 'email' as const;
  constructor(public readonly name: string, private readonly enabled: boolean) {}
  isEnabled(): boolean { return this.enabled; }
  async health() { return { healthy: this.enabled, enabled: this.enabled }; }
  info() { return { name: this.name, channel: this.channel, enabled: this.enabled }; }
  rateLimits() { return { perSecond: 10, perDay: 100 }; }
  async send(): Promise<ProviderSendResult> {
    return { success: true, providerMessageId: `${this.name}-id` };
  }
}

describe('EmailProviderResolver', () => {
  let resend: FakeProvider;
  let smtp: FakeProvider;
  let resolver: EmailProviderResolver;

  beforeEach(() => {
    resend = new FakeProvider('resend', true);
    smtp = new FakeProvider('smtp', true);
    resolver = new EmailProviderResolver(resend as never, smtp as never, 'resend');
  });

  describe('list()', () => {
    it('returns enabled providers', () => {
      expect(resolver.list().map((p) => p.name)).toEqual(['resend', 'smtp']);
    });

    it('excludes disabled providers', () => {
      const r2 = new EmailProviderResolver(
        new FakeProvider('resend', false) as never,
        new FakeProvider('smtp', true) as never,
        'smtp',
      );
      expect(r2.list().map((p) => p.name)).toEqual(['smtp']);
    });
  });

  describe('resolve()', () => {
    it('returns preferred provider', () => {
      expect(resolver.resolve('smtp')?.name).toBe('smtp');
    });

    it('falls back to default provider', () => {
      expect(resolver.resolve()?.name).toBe('resend');
    });

    it('returns first available if default not found', () => {
      const r2 = new EmailProviderResolver(
        new FakeProvider('other', true) as never,
        new FakeProvider('smtp', true) as never,
        'nonexistent',
      );
      expect(r2.resolve()?.name).toBe('other');
    });

    it('returns null when no providers available', () => {
      const r2 = new EmailProviderResolver(
        new FakeProvider('a', false) as never,
        new FakeProvider('b', false) as never,
        'a',
      );
      expect(r2.resolve()).toBeNull();
    });

    it('falls through to default when preferred unavailable', () => {
      expect(resolver.resolve('nonexistent')?.name).toBe('resend');
    });
  });

  describe('send()', () => {
    it('delegates to resolved provider', async () => {
      const result = await resolver.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
      expect(result.providerMessageId).toBe('resend-id');
    });

    it('uses preferred provider when specified', async () => {
      const result = await resolver.send(
        { to: ['a@b.com'], subject: 'x', text: 'y' },
        'smtp',
      );
      expect(result.providerMessageId).toBe('smtp-id');
    });

    it('returns NO_PROVIDER when no provider available', async () => {
      const empty = new EmailProviderResolver(
        new FakeProvider('a', false) as never,
        new FakeProvider('b', false) as never,
        'a',
      );
      const result = await empty.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
      expect(result.errorCode).toBe('NO_PROVIDER');
    });
  });
});
