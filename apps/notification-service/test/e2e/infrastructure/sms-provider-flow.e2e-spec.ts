/**
 * E2E: SMS provider → Twilio integration (mocked HTTP)
 * @module notification-service/test/e2e/infrastructure
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { TwilioSmsProvider } from '../../../src/module/infrastructure/providers/sms/twilio.provider.js';
import { SmsProviderResolver } from '../../../src/module/infrastructure/providers/sms/sms-provider.resolver.js';
import { SslWirelessSmsProvider } from '../../../src/module/infrastructure/providers/sms/sslwireless.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const TWILIO_CONFIG = {
  enabled: true,
  accountSid: 'ACe2e00000000000000000000000000000',
  authToken: 'test-e2e-token',
  messagingServiceSid: 'MGe2e00000000000000000000000000000',
  fromNumber: '+15550001111',
  timeoutMs: 15000,
  maxRetries: 3,
};

describe('E2E: SMS provider flow (Twilio)', () => {
  let resolver: SmsProviderResolver;

  beforeEach(() => {
    setupFetchMock();
    const twilio = new TwilioSmsProvider(TWILIO_CONFIG as never);
    const ssl = new SslWirelessSmsProvider({
      enabled: false,
      apiKey: '',
      senderId: '',
      baseUrl: '',
    } as never);
    resolver = new SmsProviderResolver(twilio, ssl, 'twilio');
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('sends OTP SMS end-to-end', async () => {
    mockFetchOnce({ status: 201, body: { sid: 'SM123', status: 'queued' } });
    const result = await resolver.send({
      to: '+8801712345678',
      message: 'Your OTP is 123456',
      type: 'otp',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('SM123');

    const calls = getFetchCalls();
    expect(calls[0]?.method).toBe('POST');
    expect(calls[0]?.body).toContain('Your+OTP+is+123456');
  });

  it('handles invalid number error', async () => {
    mockFetchOnce({
      status: 400,
      body: { code: 21211, message: 'Invalid To number' },
    });
    const result = await resolver.send({
      to: 'not-a-number',
      message: 'Test',
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid To number');
  });

  it('handles concurrent SMS batch', async () => {
    mockFetchOnce({ status: 201, body: { sid: 'SM1', status: 'queued' } });
    mockFetchOnce({ status: 201, body: { sid: 'SM2', status: 'queued' } });
    mockFetchOnce({ status: 201, body: { sid: 'SM3', status: 'queued' } });

    const results = await Promise.all([
      resolver.send({ to: '+8801', message: 'A' }),
      resolver.send({ to: '+8802', message: 'B' }),
      resolver.send({ to: '+8803', message: 'C' }),
    ]);

    expect(results.every((r) => r.success)).toBe(true);
    expect(results.map((r) => r.providerMessageId)).toEqual(['SM1', 'SM2', 'SM3']);
  });
});
