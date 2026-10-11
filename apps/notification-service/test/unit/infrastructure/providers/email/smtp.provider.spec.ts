/**
 * Unit tests for SmtpEmailProvider
 * @module notification-service/test/unit/infrastructure/providers/email
 *
 * ESM mode requires `jest.unstable_mockModule`. nodemailer is a real dep.
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

const mockSendMail = jest.fn<() => Promise<{ messageId: string }>>();
const mockVerify = jest.fn<() => Promise<boolean>>();
const mockCreateTransport = jest.fn(() => ({
  sendMail: mockSendMail,
  verify: mockVerify,
}));

jest.unstable_mockModule('nodemailer', () => ({
  createTransport: mockCreateTransport,
  default: { createTransport: mockCreateTransport },
}));

const ENABLED_CONFIG = {
  enabled: true,
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  user: 'test@example.com',
  password: 'test-pass',
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeoutMs: 10000,
  greetingTimeoutMs: 10000,
  socketTimeoutMs: 30000,
  tlsRejectUnauthorized: true,
  email: {
    fromName: 'Vubon Test',
    fromAddress: 'noreply@example.com',
    replyTo: '',
  },
};

// Dynamic import AFTER unstable_mockModule
const { SmtpEmailProvider } = await import(
  '../../../../../src/module/infrastructure/providers/email/smtp.provider.js'
);

describe('SmtpEmailProvider', () => {
  let provider: InstanceType<typeof SmtpEmailProvider>;

  beforeEach(() => {
    mockSendMail.mockReset();
    mockVerify.mockReset();
    mockCreateTransport.mockClear();
    provider = new SmtpEmailProvider(ENABLED_CONFIG as never);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has correct name and channel', () => {
    expect(provider.name).toBe('smtp');
    expect(provider.channel).toBe('email');
  });

  it('isEnabled reflects config', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('health reports healthy when verify succeeds', async () => {
    mockVerify.mockResolvedValueOnce(true);
    const health = await provider.health();
    expect(health.healthy).toBe(true);
  });

  it('health reports unhealthy when verify fails', async () => {
    mockVerify.mockRejectedValueOnce(new Error('Connection refused'));
    const health = await provider.health();
    expect(health.healthy).toBe(false);
    expect(health.reason).toContain('Connection refused');
  });

  it('sends email via transporter', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '<abc@example.com>' });
    const result = await provider.send({
      to: ['user@example.com'],
      subject: 'Test',
      text: 'Body',
    });
    expect(result.success).toBe(true);
    expect(result.providerMessageId).toBe('<abc@example.com>');
  });

  it('passes correct options to sendMail', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '<xyz>' });
    await provider.send({
      to: ['a@example.com', 'b@example.com'],
      cc: ['cc@example.com'],
      subject: 'Hello',
      text: 'Plain',
      html: '<p>HTML</p>',
    });
    const call = mockSendMail.mock.calls[0]![0] as Record<string, unknown>;
    expect(call['to']).toBe('a@example.com, b@example.com');
    expect(call['cc']).toBe('cc@example.com');
    expect(call['subject']).toBe('Hello');
    expect(call['text']).toBe('Plain');
    expect(call['html']).toBe('<p>HTML</p>');
  });

  it('uses configured from when not provided', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '<xyz>' });
    await provider.send({ to: ['a@x.com'], subject: 'x', text: 'y' });
    const call = mockSendMail.mock.calls[0]![0] as Record<string, unknown>;
    expect(call['from']).toBe('Vubon Test <noreply@example.com>');
  });

  it('overrides from when provided', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '<xyz>' });
    await provider.send({
      to: ['a@x.com'],
      subject: 'x',
      text: 'y',
      from: 'Custom <custom@x.com>',
    });
    const call = mockSendMail.mock.calls[0]![0] as Record<string, unknown>;
    expect(call['from']).toBe('Custom <custom@x.com>');
  });

  it('returns retryable error on network failure', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const result = await provider.send({ to: ['a@x.com'], subject: 'x', text: 'y' });
    expect(result.errorCode).toBe('NETWORK_ERROR');
    expect(result.retryable).toBe(true);
  });

  it('returns non-retryable error on SMTP auth failure', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('Invalid login'));
    const result = await provider.send({ to: ['a@x.com'], subject: 'x', text: 'y' });
    expect(result.errorCode).toBe('SMTP_ERROR');
    expect(result.retryable).toBe(false);
  });
});
