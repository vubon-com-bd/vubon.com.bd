/**
 * Provider real send path coverage — fetch mocked
 * @module notification-service/test/unit/infrastructure/providers
 */
import { jest } from '@jest/globals';

const originalFetch = global.fetch;

function mockFetch(status: number, body: unknown = {}): void {
  global.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  })) as never;
}

function mockFetchThrow(error: Error): void {
  global.fetch = jest.fn(async () => {
    throw error;
  }) as never;
}

afterEach(() => {
  global.fetch = originalFetch;
  jest.resetModules();
});

describe('Providers send() — enabled + fetch success/error', () => {
  describe('Email providers real send', () => {
    it('MailgunProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        MAILGUN_CONFIG: {
          enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000,
        },
      }));
      const { MailgunProvider } = await import(
        '@infrastructure/providers/email/mailgun.provider.js'
      );
      mockFetch(200, { id: 'mg-1' });
      const result = await new MailgunProvider().send({
        to: 'a@b.com', subject: 'S', text: 'T',
      });
      expect(result.success).toBe(true);
    });

    it('MailgunProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        MAILGUN_CONFIG: {
          enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000,
        },
      }));
      const { MailgunProvider } = await import(
        '@infrastructure/providers/email/mailgun.provider.js'
      );
      mockFetch(500);
      const result = await new MailgunProvider().send({
        to: 'a@b.com', subject: 'S', text: 'T',
      });
      expect(result.success).toBe(false);
    });

    it('MailgunProvider network throw', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        MAILGUN_CONFIG: {
          enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000,
        },
      }));
      const { MailgunProvider } = await import(
        '@infrastructure/providers/email/mailgun.provider.js'
      );
      mockFetchThrow(new Error('down'));
      const result = await new MailgunProvider().send({
        to: 'a@b.com', subject: 'S', text: 'T',
      });
      expect(result.success).toBe(false);
    });

    it('ResendProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        RESEND_CONFIG: {
          enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
          fromEmail: 'x@y.com', timeoutMs: 1000,
        },
      }));
      const { ResendProvider } = await import(
        '@infrastructure/providers/email/resend.provider.js'
      );
      mockFetch(200, { id: 'resend-1' });
      expect(
        (await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(true);
    });

    it('ResendProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        RESEND_CONFIG: {
          enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
          fromEmail: 'x@y.com', timeoutMs: 1000,
        },
      }));
      const { ResendProvider } = await import(
        '@infrastructure/providers/email/resend.provider.js'
      );
      mockFetch(400);
      expect(
        (await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(false);
    });

    it('ResendProvider network throw', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        RESEND_CONFIG: {
          enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
          fromEmail: 'x@y.com', timeoutMs: 1000,
        },
      }));
      const { ResendProvider } = await import(
        '@infrastructure/providers/email/resend.provider.js'
      );
      mockFetchThrow(new Error('down'));
      expect(
        (await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(false);
    });

    it('PostmarkProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: () => 'test-key',
      }));
      const { PostmarkProvider } = await import(
        '@infrastructure/providers/email/postmark.provider.js'
      );
      mockFetch(200, { MessageID: 'pm-1' });
      expect(
        (await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(true);
    });

    it('PostmarkProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: () => 'test-key',
      }));
      const { PostmarkProvider } = await import(
        '@infrastructure/providers/email/postmark.provider.js'
      );
      mockFetch(422);
      expect(
        (await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(false);
    });

    it('PostmarkProvider network throw', async () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: () => 'test-key',
      }));
      const { PostmarkProvider } = await import(
        '@infrastructure/providers/email/postmark.provider.js'
      );
      mockFetchThrow(new Error('down'));
      expect(
        (await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success,
      ).toBe(false);
    });
  });

  describe('SMS providers real send', () => {
    it('SslwirelessProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        SSLWIRELESS_CONFIG: { enabled: true, apiKey: 'k', senderId: 'S', baseUrl: 'https://x' },
      }));
      const { SslwirelessProvider } = await import(
        '@infrastructure/providers/sms/sslwireless.provider.js'
      );
      mockFetch(200);
      expect((await new SslwirelessProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(true);
    });

    it('SslwirelessProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        SSLWIRELESS_CONFIG: { enabled: true, apiKey: 'k', senderId: 'S', baseUrl: 'https://x' },
      }));
      const { SslwirelessProvider } = await import(
        '@infrastructure/providers/sms/sslwireless.provider.js'
      );
      mockFetch(500);
      expect((await new SslwirelessProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(false);
    });

    it('SslwirelessProvider network throw', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        SSLWIRELESS_CONFIG: { enabled: true, apiKey: 'k', senderId: 'S', baseUrl: 'https://x' },
      }));
      const { SslwirelessProvider } = await import(
        '@infrastructure/providers/sms/sslwireless.provider.js'
      );
      mockFetchThrow(new Error('down'));
      expect((await new SslwirelessProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(false);
    });

    it('TwilioProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        TWILIO_CONFIG: {
          enabled: true, accountSid: 'a', authToken: 't', fromNumber: '+1', timeoutMs: 1000,
        },
      }));
      const { TwilioProvider } = await import(
        '@infrastructure/providers/sms/twilio.provider.js'
      );
      mockFetch(200);
      expect((await new TwilioProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(true);
    });

    it('TwilioProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        TWILIO_CONFIG: {
          enabled: true, accountSid: 'a', authToken: 't', fromNumber: '+1', timeoutMs: 1000,
        },
      }));
      const { TwilioProvider } = await import(
        '@infrastructure/providers/sms/twilio.provider.js'
      );
      mockFetch(400);
      expect((await new TwilioProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(false);
    });

    it('TwilioProvider network throw', async () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        TWILIO_CONFIG: {
          enabled: true, accountSid: 'a', authToken: 't', fromNumber: '+1', timeoutMs: 1000,
        },
      }));
      const { TwilioProvider } = await import(
        '@infrastructure/providers/sms/twilio.provider.js'
      );
      mockFetchThrow(new Error('down'));
      expect((await new TwilioProvider().send({ to: '+8801712345678', message: 'M' })).success).toBe(false);
    });
  });

  describe('Push providers real send', () => {
    it('OnesignalProvider sends successfully', async () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test' : d),
        getOptionalEnvBool: () => true,
      }));
      const { OnesignalProvider } = await import(
        '@infrastructure/providers/push/onesignal.provider.js'
      );
      mockFetch(200, { id: 'os-1' });
      expect((await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' })).success).toBe(true);
    });

    it('OnesignalProvider HTTP error', async () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test' : d),
        getOptionalEnvBool: () => true,
      }));
      const { OnesignalProvider } = await import(
        '@infrastructure/providers/push/onesignal.provider.js'
      );
      mockFetch(500);
      expect((await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' })).success).toBe(false);
    });
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL — Provider catch blocks + error paths
// ═══════════════════════════════════════════════════════════
describe('Providers — catch/error paths', () => {
  it('MailgunProvider — EU region', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: {
        enabled: true, apiKey: 'k', domain: 'd', region: 'eu', timeoutMs: 1000,
      },
    }));
    const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
    mockFetch(200, { id: 'mg-1' });
    const result = await new MailgunProvider().send({
      to: 'a@b.com', subject: 'S', text: 'T',
    });
    expect(result.success).toBe(true);
  });

  it('MailgunProvider — with html', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: {
        enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000,
      },
    }));
    const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
    mockFetch(200, { id: 'mg-1' });
    const result = await new MailgunProvider().send({
      to: 'a@b.com', subject: 'S', text: 'T', html: '<p>H</p>',
    });
    expect(result.success).toBe(true);
  });

  it('ResendProvider — 500 retryable', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      RESEND_CONFIG: {
        enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
        fromEmail: 'x@y.com', timeoutMs: 1000,
      },
    }));
    const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
    mockFetch(500);
    const result = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
    expect(result.retryable).toBe(true);
  });

  it('TwilioProvider — with sender from', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      TWILIO_CONFIG: {
        enabled: true, accountSid: 'a', authToken: 't', fromNumber: '+1', timeoutMs: 1000,
      },
    }));
    const { TwilioProvider } = await import('@infrastructure/providers/sms/twilio.provider.js');
    mockFetch(200);
    const result = await new TwilioProvider().send({
      to: ['+8801712345678', '+8801812345678'], message: 'M',
    });
    expect(result.success).toBe(true);
  });
});
