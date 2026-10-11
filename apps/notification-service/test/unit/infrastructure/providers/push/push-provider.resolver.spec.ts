/**
 * Unit tests for PushProviderResolver
 * @module notification-service/test/unit/infrastructure/providers/push
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PushProviderResolver } from '../../../../../src/module/infrastructure/providers/push/push-provider.resolver.js';
import type { IPushProvider } from '../../../../../src/module/infrastructure/providers/base/provider.interface.js';
import type { ProviderSendResult } from '../../../../../src/module/infrastructure/providers/base/provider.types.js';

class FakeProvider implements IPushProvider {
  readonly channel = 'push' as const;
  constructor(public readonly name: string, private readonly enabled: boolean) {}
  isEnabled(): boolean { return this.enabled; }
  async health() { return { healthy: this.enabled, enabled: this.enabled }; }
  info() { return { name: this.name, channel: this.channel, enabled: this.enabled }; }
  rateLimits() { return { perSecond: 10, perDay: 100 }; }
  async send(): Promise<ProviderSendResult> {
    return { success: true, providerMessageId: `${this.name}-id` };
  }
}

describe('PushProviderResolver', () => {
  let resolver: PushProviderResolver;

  beforeEach(() => {
    resolver = new PushProviderResolver(
      new FakeProvider('fcm', true) as never,
      new FakeProvider('web_push', true) as never,
      'fcm',
    );
  });

  it('lists enabled providers', () => {
    expect(resolver.list().map((p) => p.name)).toEqual(['fcm', 'web_push']);
  });

  it('returns preferred provider', () => {
    expect(resolver.resolve('web_push')?.name).toBe('web_push');
  });

  it('routes web platform to web_push', () => {
    expect(resolver.resolve(undefined, 'web')?.name).toBe('web_push');
  });

  it('routes android to fcm', () => {
    expect(resolver.resolve(undefined, 'android')?.name).toBe('fcm');
  });

  it('routes ios to fcm', () => {
    expect(resolver.resolve(undefined, 'ios')?.name).toBe('fcm');
  });

  it('falls back to default', () => {
    expect(resolver.resolve()?.name).toBe('fcm');
  });

  it('send uses platform routing', async () => {
    const result = await resolver.send({
      token: 'x',
      title: 'y',
      body: 'z',
      platform: 'web',
    });
    expect(result.providerMessageId).toBe('web_push-id');
  });

  it('returns NO_PROVIDER when none enabled', async () => {
    const empty = new PushProviderResolver(
      new FakeProvider('fcm', false) as never,
      new FakeProvider('web_push', false) as never,
      'fcm',
    );
    const result = await empty.send({ token: 'x', title: 'y', body: 'z' });
    expect(result.errorCode).toBe('NO_PROVIDER');
  });
});
