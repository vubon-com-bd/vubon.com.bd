/**
 * Unit tests for TwilioSmsProvider
 * @module notification-service/test/unit/infrastructure/providers/sms
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { TwilioSmsProvider } from '../../../../../src/module/infrastructure/providers/sms/twilio.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const ENABLED_CONFIG = {
  enabled: true,
  accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authToken: 'test_token_abc',
  messagingServiceSid: 'MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  fromNumber: '+15551234567',
  statusCallbackUrl: 'https://example.com/callback',
  timeoutMs: 15000,
  maxRetries: 3,
};

describe('TwilioSmsProvider', () => {
  let provider: TwilioSmsProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new TwilioSmsProvider(ENABLED_CONFIG as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('has correct name and channel', () => {
    expect(provider.name).toBe('twilio');
    expect(provider.channel).toBe('sms');
  });

  it('isEnabled reflects config', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('sends SMS successfully', async () => {
    mockFetchOnce({ status: 200, body: { sid: 'SM123', status: 'queued', num_segments: '1' } });
    const result = await provider.send({
      to: '+8801712345678',
      message: 'Hello',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('SM123');
  });

  it('posts to correct account URL', async () => {
    mockFetchOnce({ status: 200, body: { sid: 'SM1', status: 'queued' } });
    await provider.send({ to: '+8801xxx', message: 'Hi' });
    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe(
      `https://api.twilio.com/2010-04-01/Accounts/${ENABLED_CONFIG.accountSid}/Messages.json`,
    );
    expect(calls[0]?.method).toBe('POST');
  });

  it('uses Basic auth', async () => {
    mockFetchOnce({ status: 200, body: { sid: 'SM1', status: 'queued' } });
    await provider.send({ to: '+8801xxx', message: 'Hi' });
    const calls = getFetchCalls();
    const expected = 'Basic ' + Buffer.from(
      `${ENABLED_CONFIG.accountSid}:${ENABLED_CONFIG.authToken}`,
    ).toString('base64');
    expect(calls[0]?.headers['Authorization']).toBe(expected);
  });

  it('sends form-encoded body with MessagingServiceSid', async () => {
    mockFetchOnce({ status: 200, body: { sid: 'SM1', status: 'queued' } });
    await provider.send({ to: '+8801xxx', message: 'Hi' });
    const calls = getFetchCalls();
    const body = calls[0]?.body ?? '';
    expect(body).toContain('To=%2B8801xxx');
    expect(body).toContain('Body=Hi');
    expect(body).toContain('MessagingServiceSid=' + ENABLED_CONFIG.messagingServiceSid);
    expect(body).not.toContain('From=');
  });

  it('uses From when MessagingServiceSid absent', async () => {
    const provider2 = new TwilioSmsProvider({
      ...ENABLED_CONFIG,
      messagingServiceSid: '',
    } as never);
    mockFetchOnce({ status: 200, body: { sid: 'SM2', status: 'queued' } });
    await provider2.send({ to: '+8801xxx', message: 'Hi' });
    const calls = getFetchCalls();
    const body = calls[0]?.body ?? '';
    expect(body).toContain('From=%2B15551234567');
  });

  it('returns error on Twilio 4xx', async () => {
    mockFetchOnce({ status: 400, body: { message: 'Invalid phone number' } });
    const result = await provider.send({ to: 'bad', message: 'x' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid phone number');
  });

  it('marks 5xx as retryable', async () => {
    mockFetchOnce({ status: 503, body: { message: 'Unavailable' } });
    const result = await provider.send({ to: '+8801xxx', message: 'x' });
    expect(result.retryable).toBe(true);
  });

  it('returns NETWORK_ERROR on network failure', async () => {
    mockFetchOnce({ throwError: new Error('ETIMEDOUT') });
    const result = await provider.send({ to: '+8801xxx', message: 'x' });
    expect(result.errorCode).toBe('NETWORK_ERROR');
    expect(result.retryable).toBe(true);
  });
});

describe('TwilioSmsProvider (disabled)', () => {
  let provider: TwilioSmsProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new TwilioSmsProvider({
      enabled: false,
      accountSid: '',
      authToken: '',
    } as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('isEnabled returns false', () => {
    expect(provider.isEnabled()).toBe(false);
  });

  it('health reports unhealthy', async () => {
    const health = await provider.health();
    expect(health.healthy).toBe(false);
  });

  it('send returns PROVIDER_DISABLED', async () => {
    const result = await provider.send({ to: '+8801xxx', message: 'x' });
    expect(result.errorCode).toBe('PROVIDER_DISABLED');
  });
});
