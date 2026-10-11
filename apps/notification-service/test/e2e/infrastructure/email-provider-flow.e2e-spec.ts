/**
 * E2E: Email provider → Resend integration (mocked HTTP)
 * @module notification-service/test/e2e/infrastructure
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { ResendEmailProvider } from '../../../src/module/infrastructure/providers/email/resend.provider.js';
import { EmailProviderResolver } from '../../../src/module/infrastructure/providers/email/email-provider.resolver.js';
import { SmtpEmailProvider } from '../../../src/module/infrastructure/providers/email/smtp.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const RESEND_CONFIG = {
  enabled: true,
  apiKey: 're_e2e_test',
  baseUrl: 'https://api.resend.com',
  fromEmail: 'onboarding@resend.dev',
  fromName: 'E2E Test',
  timeoutMs: 15000,
  maxRetries: 3,
};

const SMTP_CONFIG = {
  enabled: false,
  host: '',
  port: 587,
  secure: false,
  user: '',
  password: '',
  pool: false,
  maxConnections: 1,
  maxMessages: 1,
  connectionTimeoutMs: 1000,
  greetingTimeoutMs: 1000,
  socketTimeoutMs: 1000,
  tlsRejectUnauthorized: true,
};

describe('E2E: Email provider flow (Resend)', () => {
  let resolver: EmailProviderResolver;

  beforeEach(() => {
    setupFetchMock();
    const resend = new ResendEmailProvider(RESEND_CONFIG as never);
    const smtp = new SmtpEmailProvider({
      ...SMTP_CONFIG,
      email: { fromName: '', fromAddress: '', replyTo: '' },
    } as never);
    resolver = new EmailProviderResolver(resend, smtp, 'resend');
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('resolves to Resend when it is default', () => {
    expect(resolver.resolve()?.name).toBe('resend');
  });

  it('sends a full notification email through resolver', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_e2e_1' } });
    const result = await resolver.send({
      to: ['user@example.com'],
      subject: 'Your order #12345 is confirmed',
      text: 'Order confirmed!',
      html: '<h1>Order confirmed!</h1>',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('msg_e2e_1');

    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe('https://api.resend.com/emails');
    expect(calls[0]?.method).toBe('POST');
    expect(calls[0]?.headers['Authorization']).toBe('Bearer re_e2e_test');

    const body = JSON.parse(calls[0]?.body ?? '{}');
    expect(body.to).toEqual(['user@example.com']);
    expect(body.subject).toContain('order #12345');
    expect(body.html).toContain('<h1>');
  });

  it('handles batch sends with error recovery', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    mockFetchOnce({ status: 500, body: { message: 'Internal error' } });
    mockFetchOnce({ status: 200, body: { id: 'msg_3' } });

    const results = await Promise.all([
      resolver.send({ to: ['a@b.com'], subject: 'x', text: '1' }),
      resolver.send({ to: ['c@d.com'], subject: 'y', text: '2' }),
      resolver.send({ to: ['e@f.com'], subject: 'z', text: '3' }),
    ]);

    expect(results[0]?.success).toBe(true);
    expect(results[1]?.success).toBe(false);
    expect(results[1]?.retryable).toBe(true);
    expect(results[2]?.success).toBe(true);
  });

  it('surfaces provider error details', async () => {
    mockFetchOnce({
      status: 403,
      body: { message: 'Domain not verified' },
    });
    const result = await resolver.send({
      to: ['a@b.com'],
      subject: 'x',
      text: 'y',
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Domain not verified');
    expect(result.retryable).toBe(false);
  });

  it('surfaces rate limit errors', async () => {
    mockFetchOnce({
      status: 429,
      headers: { 'retry-after': '60' },
      body: { message: 'Rate limited' },
    });
    const result = await resolver.send({
      to: ['a@b.com'],
      subject: 'x',
      text: 'y',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('RATE_LIMITED');
    expect(result.retryable).toBe(true);
  });
});
