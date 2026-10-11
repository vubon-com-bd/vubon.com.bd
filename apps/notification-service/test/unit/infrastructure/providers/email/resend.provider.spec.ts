/**
 * Unit tests for ResendEmailProvider — config injected, no jest.mock needed
 * @module notification-service/test/unit/infrastructure/providers/email
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { ResendEmailProvider } from '../../../../../src/module/infrastructure/providers/email/resend.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

const ENABLED_CONFIG = {
  enabled: true,
  apiKey: 're_test_key',
  baseUrl: 'https://api.resend.com',
  fromEmail: 'onboarding@resend.dev',
  fromName: 'Vubon Test',
  webhookSecret: '',
  timeoutMs: 15000,
  maxRetries: 3,
};

const DISABLED_CONFIG = { ...ENABLED_CONFIG, enabled: false, apiKey: '' };

describe('ResendEmailProvider', () => {
  let provider: ResendEmailProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new ResendEmailProvider(ENABLED_CONFIG as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('has correct name and channel', () => {
    expect(provider.name).toBe('resend');
    expect(provider.channel).toBe('email');
  });

  it('isEnabled reflects config', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('health reports healthy', async () => {
    const health = await provider.health();
    expect(health.healthy).toBe(true);
  });

  it('sends email successfully', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_abc123' } });
    const result = await provider.send({
      to: ['user@example.com'],
      subject: 'Hello',
      text: 'Test',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('msg_abc123');
  });

  it('posts to /emails endpoint', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    await provider.send({ to: ['a@b.com'], subject: 'Hi', text: 'Body' });
    const calls = getFetchCalls();
    expect(calls[0]?.url).toBe('https://api.resend.com/emails');
    expect(calls[0]?.method).toBe('POST');
  });

  it('includes Authorization header', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    await provider.send({ to: ['a@b.com'], subject: 'Hi', text: 'Body' });
    const calls = getFetchCalls();
    expect(calls[0]?.headers['Authorization']).toBe('Bearer re_test_key');
  });

  it('sends correct payload shape', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    await provider.send({
      to: ['a@b.com'],
      cc: ['cc@b.com'],
      subject: 'Hi',
      text: 'plain',
      html: '<p>plain</p>',
      replyTo: 'reply@b.com',
    });
    const calls = getFetchCalls();
    const body = JSON.parse(calls[0]?.body ?? '{}');
    expect(body.to).toEqual(['a@b.com']);
    expect(body.cc).toEqual(['cc@b.com']);
    expect(body.reply_to).toBe('reply@b.com');
    expect(body.from).toContain('Vubon Test');
  });

  it('converts tags object to array', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    await provider.send({
      to: ['a@b.com'],
      subject: 'Hi',
      text: 'x',
      tags: { source: 'test' },
    });
    const calls = getFetchCalls();
    const body = JSON.parse(calls[0]?.body ?? '{}');
    expect(body.tags).toEqual([{ name: 'source', value: 'test' }]);
  });

  it('maps attachments correctly', async () => {
    mockFetchOnce({ status: 200, body: { id: 'msg_1' } });
    await provider.send({
      to: ['a@b.com'],
      subject: 'Hi',
      text: 'x',
      attachments: [{ filename: 'f.pdf', content: 'b64', contentType: 'application/pdf' }],
    });
    const calls = getFetchCalls();
    const body = JSON.parse(calls[0]?.body ?? '{}');
    expect(body.attachments[0]).toMatchObject({
      filename: 'f.pdf',
      content: 'b64',
      content_type: 'application/pdf',
    });
  });

  it('returns error on HTTP 400', async () => {
    mockFetchOnce({ status: 400, body: { message: 'Invalid email' } });
    const result = await provider.send({ to: ['x'], subject: 'x', text: 'y' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid email');
    expect(result.errorCode).toBe('HTTP_400');
  });

  it('marks 5xx errors as retryable', async () => {
    mockFetchOnce({ status: 500, body: { message: 'Server error' } });
    const result = await provider.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
    expect(result.retryable).toBe(true);
  });

  it('returns error on network failure', async () => {
    mockFetchOnce({ throwError: new Error('ECONNRESET') });
    const result = await provider.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
    expect(result.errorCode).toBe('NETWORK_ERROR');
    expect(result.retryable).toBe(true);
  });

  it('returns error on rate limit 429', async () => {
    mockFetchOnce({ status: 429, headers: { 'retry-after': '10' } });
    const result = await provider.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
    expect(result.errorCode).toBe('RATE_LIMITED');
  });
});

describe('ResendEmailProvider (disabled)', () => {
  let provider: ResendEmailProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new ResendEmailProvider(DISABLED_CONFIG as never);
  });

  afterEach(() => {
    teardownFetchMock();
  });

  it('isEnabled returns false', () => {
    expect(provider.isEnabled()).toBe(false);
  });

  it('health reports not healthy', async () => {
    const health = await provider.health();
    expect(health.healthy).toBe(false);
  });

  it('send() returns PROVIDER_DISABLED', async () => {
    const result = await provider.send({ to: ['a@b.com'], subject: 'x', text: 'y' });
    expect(result.errorCode).toBe('PROVIDER_DISABLED');
  });
});
