/**
 * Unit tests for WebPushProvider
 * @module notification-service/test/unit/infrastructure/providers/push
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { WebPushProvider } from '../../../../../src/module/infrastructure/providers/push/webpush.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const ENABLED_CONFIG = {
  enabled: true,
  vapidPublicKey: 'BGxxx',
  vapidPrivateKey: 'yyy',
  subject: 'mailto:test@example.com',
  ttlSeconds: 2419200,
};

const SUBSCRIPTION = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/abc123',
  keys: { p256dh: 'p256', auth: 'auth' },
};

describe('WebPushProvider', () => {
  let provider: WebPushProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new WebPushProvider(ENABLED_CONFIG as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('has correct name and channel', () => {
    expect(provider.name).toBe('web_push');
    expect(provider.channel).toBe('push');
  });

  it('isEnabled reflects config', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('sends to subscription endpoint', async () => {
    mockFetchOnce({ status: 201, body: '' });
    const result = await provider.send({
      token: JSON.stringify(SUBSCRIPTION),
      title: 'Hello',
      body: 'Test',
    });
    expect(result.success).toBe(true);
    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe(SUBSCRIPTION.endpoint);
    expect(calls[0]?.method).toBe('POST');
  });

  it('passes TTL and Urgency headers', async () => {
    mockFetchOnce({ status: 201, body: '' });
    await provider.send({
      token: JSON.stringify(SUBSCRIPTION),
      title: 'Hello',
      body: 'Test',
    });
    const calls = getFetchCalls();
    expect(calls[0]?.headers['TTL']).toBe('2419200');
    expect(calls[0]?.headers['Urgency']).toBe('high');
  });

  it('marks silent push as low urgency', async () => {
    mockFetchOnce({ status: 201, body: '' });
    await provider.send({
      token: JSON.stringify(SUBSCRIPTION),
      title: 'x',
      body: 'y',
      silent: true,
    });
    const calls = getFetchCalls();
    expect(calls[0]?.headers['Urgency']).toBe('low');
  });

  it('returns INVALID_SUBSCRIPTION on bad JSON', async () => {
    const result = await provider.send({
      token: 'not-json',
      title: 'x',
      body: 'y',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_SUBSCRIPTION');
  });

  it('returns INVALID_SUBSCRIPTION when endpoint missing', async () => {
    const result = await provider.send({
      token: JSON.stringify({ keys: { p256dh: 'x', auth: 'y' } }),
      title: 'x',
      body: 'y',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_SUBSCRIPTION');
  });

  it('marks 410 Gone as SUBSCRIPTION_GONE (non-retryable)', async () => {
    mockFetchOnce({ status: 410, body: { message: 'HTTP 410' } });
    const result = await provider.send({
      token: JSON.stringify(SUBSCRIPTION),
      title: 'x',
      body: 'y',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('SUBSCRIPTION_GONE');
    expect(result.retryable).toBe(false);
  });

  it('marks 5xx as retryable', async () => {
    mockFetchOnce({ status: 500, body: { message: 'Server error' } });
    const result = await provider.send({
      token: JSON.stringify(SUBSCRIPTION),
      title: 'x',
      body: 'y',
    });
    expect(result.retryable).toBe(true);
  });
});

describe('WebPushProvider (disabled)', () => {
  let provider: WebPushProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new WebPushProvider({
      enabled: false,
      vapidPublicKey: '',
      vapidPrivateKey: '',
      subject: '',
      ttlSeconds: 0,
    } as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('send returns PROVIDER_DISABLED', async () => {
    const result = await provider.send({ token: 'x', title: 'x', body: 'y' });
    expect(result.errorCode).toBe('PROVIDER_DISABLED');
  });
});
