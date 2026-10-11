/**
 * Unit tests for SmsProviderResolver
 * @module notification-service/test/unit/infrastructure/providers/sms
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SmsProviderResolver } from '../../../../../src/module/infrastructure/providers/sms/sms-provider.resolver.js';
import type { ISmsProvider } from '../../../../../src/module/infrastructure/providers/base/provider.interface.js';
import type { ProviderSendResult } from '../../../../../src/module/infrastructure/providers/base/provider.types.js';

class FakeProvider implements ISmsProvider {
  readonly channel = 'sms' as const;
  constructor(public readonly name: string, private readonly enabled: boolean) {}
  isEnabled(): boolean { return this.enabled; }
  async health() { return { healthy: this.enabled, enabled: this.enabled }; }
  info() { return { name: this.name, channel: this.channel, enabled: this.enabled }; }
  rateLimits() { return { perSecond: 10, perDay: 100 }; }
  async send(): Promise<ProviderSendResult> {
    return { success: true, providerMessageId: `${this.name}-id` };
  }
}

describe('SmsProviderResolver', () => {
  let resolver: SmsProviderResolver;

  beforeEach(() => {
    resolver = new SmsProviderResolver(
      new FakeProvider('twilio', true) as never,
      new FakeProvider('sslwireless', true) as never,
      'twilio',
    );
  });

  it('lists enabled providers', () => {
    expect(resolver.list().map((p) => p.name)).toEqual(['twilio', 'sslwireless']);
  });

  it('resolves preferred provider', () => {
    expect(resolver.resolve('sslwireless')?.name).toBe('sslwireless');
  });

  it('falls back to default', () => {
    expect(resolver.resolve()?.name).toBe('twilio');
  });

  it('returns null when none enabled', () => {
    const r2 = new SmsProviderResolver(
      new FakeProvider('a', false) as never,
      new FakeProvider('b', false) as never,
      'a',
    );
    expect(r2.resolve()).toBeNull();
  });

  it('send delegates to resolved provider', async () => {
    const result = await resolver.send({ to: '+8801', message: 'x' });
    expect(result.providerMessageId).toBe('twilio-id');
  });

  it('send returns NO_PROVIDER when none', async () => {
    const empty = new SmsProviderResolver(
      new FakeProvider('a', false) as never,
      new FakeProvider('b', false) as never,
      'a',
    );
    const result = await empty.send({ to: '+8801', message: 'x' });
    expect(result.errorCode).toBe('NO_PROVIDER');
  });
});
