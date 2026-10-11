/**
 * Unit tests for SslWirelessSmsProvider
 * @module notification-service/test/unit/infrastructure/providers/sms
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { SslWirelessSmsProvider } from '../../../../../src/module/infrastructure/providers/sms/sslwireless.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const ENABLED_CONFIG = {
  enabled: true,
  apiKey: 'test-api-key',
  senderId: 'VUBON',
  baseUrl: 'https://esms.mimsms.com',
};

describe('SslWirelessSmsProvider', () => {
  let provider: SslWirelessSmsProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new SslWirelessSmsProvider(ENABLED_CONFIG as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('has correct name and channel', () => {
    expect(provider.name).toBe('sslwireless');
    expect(provider.channel).toBe('sms');
  });

  it('isEnabled reflects config', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('sends SMS successfully', async () => {
    mockFetchOnce({
      status: 200,
      body: { status: 'SUCCESS', smsinfo: [{ csms_id: 'CS123' }] },
    });
    const result = await provider.send({
      to: '8801712345678',
      message: 'Test',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('CS123');
  });

  it('posts to /api/smsapi', async () => {
    mockFetchOnce({ status: 200, body: { status: 'SUCCESS', smsinfo: [{ csms_id: 'C1' }] } });
    await provider.send({ to: '8801', message: 'x' });
    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe('https://esms.mimsms.com/api/smsapi');
    expect(calls[0]?.method).toBe('POST');
  });

  it('sends form-encoded body', async () => {
    mockFetchOnce({ status: 200, body: { status: 'SUCCESS', smsinfo: [{ csms_id: 'C1' }] } });
    await provider.send({ to: '8801', message: 'Hello' });
    const calls = getFetchCalls();
    const body = calls[0]?.body ?? '';
    expect(body).toContain('api_token=test-api-key');
    expect(body).toContain('msisdn=8801');
    expect(body).toContain('sms=Hello');
    expect(body).toContain('sid=VUBON');
  });

  it('returns error on non-SUCCESS status', async () => {
    mockFetchOnce({
      status: 200,
      body: { status: 'FAILED', error_code: '4001', error_message: 'Invalid number' },
    });
    const result = await provider.send({ to: 'bad', message: 'x' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid number');
    expect(result.errorCode).toBe('4001');
  });

  it('returns retryable error on network failure', async () => {
    mockFetchOnce({ throwError: new Error('ETIMEDOUT') });
    const result = await provider.send({ to: '8801', message: 'x' });
    expect(result.success).toBe(false);
    expect(result.retryable).toBe(true);
  });

  it('uses custom senderId when provided', async () => {
    mockFetchOnce({ status: 200, body: { status: 'SUCCESS', smsinfo: [{ csms_id: 'C1' }] } });
    await provider.send({ to: '8801', message: 'x', senderId: 'CUSTOM' });
    const calls = getFetchCalls();
    expect(calls[0]?.body).toContain('sid=CUSTOM');
  });
});

describe('SslWirelessSmsProvider (disabled)', () => {
  let provider: SslWirelessSmsProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new SslWirelessSmsProvider({
      enabled: false,
      apiKey: '',
      senderId: '',
      baseUrl: 'https://esms.mimsms.com',
    } as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('send returns PROVIDER_DISABLED', async () => {
    const result = await provider.send({ to: 'x', message: 'y' });
    expect(result.errorCode).toBe('PROVIDER_DISABLED');
  });
});
