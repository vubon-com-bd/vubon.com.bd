/**
 * E2E: Push provider → WebPush integration (mocked HTTP)
 * @module notification-service/test/e2e/infrastructure
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { WebPushProvider } from '../../../src/module/infrastructure/providers/push/webpush.provider.js';
import { PushProviderResolver } from '../../../src/module/infrastructure/providers/push/push-provider.resolver.js';
import { FcmPushProvider } from '../../../src/module/infrastructure/providers/push/fcm.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const WEBPUSH_CONFIG = {
  enabled: true,
  vapidPublicKey: 'BPe2e',
  vapidPrivateKey: 'e2e-private',
  subject: 'mailto:e2e@test.com',
  ttlSeconds: 86400,
};

const SUBSCRIPTION_JSON = JSON.stringify({
  endpoint: 'https://fcm.googleapis.com/fcm/send/e2e-token',
  keys: { p256dh: 'p256', auth: 'auth' },
});

describe('E2E: Push provider flow (WebPush)', () => {
  let resolver: PushProviderResolver;

  beforeEach(() => {
    setupFetchMock();
    const webpush = new WebPushProvider(WEBPUSH_CONFIG as never);
    const fcm = new FcmPushProvider({
      enabled: false,
      projectId: '',
      clientEmail: '',
      privateKey: '',
      serviceAccountJson: '',
    } as never);
    resolver = new PushProviderResolver(fcm, webpush, 'web_push');
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('routes web platform to WebPush', () => {
    expect(resolver.resolve(undefined, 'web')?.name).toBe('web_push');
  });

  it('delivers push through WebPush', async () => {
    mockFetchOnce({ status: 201, body: '' });
    const result = await resolver.send({
      token: SUBSCRIPTION_JSON,
      title: 'New Message',
      body: 'You have a message',
      data: { messageId: 'msg-1' },
      platform: 'web',
    });
    expect(result.success).toBe(true);

    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe('https://fcm.googleapis.com/fcm/send/e2e-token');
    expect(calls[0]?.headers['TTL']).toBe('86400');
  });

  it('handles expired subscription', async () => {
    mockFetchOnce({ status: 410, body: { message: 'HTTP 410' } });
    const result = await resolver.send({
      token: SUBSCRIPTION_JSON,
      title: 'x',
      body: 'y',
      platform: 'web',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('SUBSCRIPTION_GONE');
    expect(result.retryable).toBe(false);
  });

  it('handles malformed subscription gracefully', async () => {
    const result = await resolver.send({
      token: 'not-json',
      title: 'x',
      body: 'y',
      platform: 'web',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_SUBSCRIPTION');
  });
});
