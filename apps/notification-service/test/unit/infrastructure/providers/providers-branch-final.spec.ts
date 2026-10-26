/**
 * Providers — Final branch coverage
 * @module notification-service/test/unit/infrastructure/providers
 */
import { jest } from '@jest/globals';

const originalFetch = global.fetch;

function mockFetchStatus(status: number, body: unknown = {}): void {
  global.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  })) as never;
}

function mockFetchThrow(msg = 'network down'): void {
  global.fetch = jest.fn(async () => {
    throw new Error(msg);
  }) as never;
}

afterEach(() => {
  global.fetch = originalFetch;
  jest.resetModules();
});

// ═══════════════════════════════════════════════════════════
// Email providers — every catch + HTTP status branch
// ═══════════════════════════════════════════════════════════
describe('Email — full branch matrix', () => {
  describe('MailgunProvider', () => {
    const mockConfig = () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        MAILGUN_CONFIG: {
          enabled: true, apiKey: 'k', domain: 'd', region: 'eu', timeoutMs: 1000,
        },
      }));
    };

    it('send — 400 non-retryable', async () => {
      jest.resetModules();
      mockConfig();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetchStatus(400);
      const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.retryable).toBe(false);
    });

    it('send — 502 retryable', async () => {
      jest.resetModules();
      mockConfig();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetchStatus(502);
      const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.retryable).toBe(true);
    });

    it('send — array of recipients', async () => {
      jest.resetModules();
      mockConfig();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetchStatus(200);
      const r = await new MailgunProvider().send({
        to: ['a@b.com', 'c@d.com'], subject: 'S', text: 'T',
      });
      expect(r.success).toBe(true);
    });

    it('send — no id in response', async () => {
      jest.resetModules();
      mockConfig();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetchStatus(200, {});
      const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.success).toBe(true);
      expect(r.providerMessageId).toBeDefined();
    });
  });

  describe('ResendProvider', () => {
    const mockConfig = () => {
      jest.doMock('@vubon/shared-config/platform/notification', () => ({
        RESEND_CONFIG: {
          enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
          fromEmail: 'x@y.com', timeoutMs: 1000,
        },
      }));
    };

    it('send — no id → fallback', async () => {
      jest.resetModules();
      mockConfig();
      const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
      mockFetchStatus(200, {});
      const r = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.success).toBe(true);
    });

    it('send — 502 retryable', async () => {
      jest.resetModules();
      mockConfig();
      const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
      mockFetchStatus(502);
      const r = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.retryable).toBe(true);
    });

    it('send — 400 non-retryable', async () => {
      jest.resetModules();
      mockConfig();
      const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
      mockFetchStatus(400);
      const r = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.retryable).toBe(false);
    });
  });

  describe('PostmarkProvider', () => {
    const mockConfig = () => {
      jest.doMock('@vubon/shared-config/common', () => ({
        getOptionalEnv: () => 'test-key',
      }));
    };

    it('send — 5xx retryable', async () => {
      jest.resetModules();
      mockConfig();
      const { PostmarkProvider } = await import('@infrastructure/providers/email/postmark.provider.js');
      mockFetchStatus(502);
      const r = await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.retryable).toBe(true);
    });

    it('send — no MessageID fallback', async () => {
      jest.resetModules();
      mockConfig();
      const { PostmarkProvider } = await import('@infrastructure/providers/email/postmark.provider.js');
      mockFetchStatus(200, {});
      const r = await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.providerMessageId).toBeDefined();
    });
  });
});

// ═══════════════════════════════════════════════════════════
// SMS providers — remaining catch + platform branches
// ═══════════════════════════════════════════════════════════
describe('SMS — full branch matrix', () => {
  const mockEnv = () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
  };

  it('Banglalink — HTTP 4xx retryable false', async () => {
    jest.resetModules();
    mockEnv();
    const { BanglalinkProvider } = await import('@infrastructure/providers/sms/banglalink.provider.js');
    mockFetchStatus(400);
    const r = await new BanglalinkProvider().send({
      to: '+8801412345678', message: 'M',
    });
    expect(r.success).toBe(false);
    expect(r.retryable).toBe(false);
  });

  it('Banglalink — 5xx retryable true', async () => {
    jest.resetModules();
    mockEnv();
    const { BanglalinkProvider } = await import('@infrastructure/providers/sms/banglalink.provider.js');
    mockFetchStatus(502);
    const r = await new BanglalinkProvider().send({
      to: '+8801412345678', message: 'M',
    });
    expect(r.retryable).toBe(true);
  });

  it('Grameenphone — 5xx retryable true', async () => {
    jest.resetModules();
    mockEnv();
    const { GrameenphoneProvider } = await import('@infrastructure/providers/sms/grameenphone.provider.js');
    mockFetchStatus(502);
    const r = await new GrameenphoneProvider().send({
      to: '+8801712345678', message: 'M',
    });
    expect(r.retryable).toBe(true);
  });

  it('Robi — 4xx non-retryable', async () => {
    jest.resetModules();
    mockEnv();
    const { RobiProvider } = await import('@infrastructure/providers/sms/robi.provider.js');
    mockFetchStatus(400);
    const r = await new RobiProvider().send({
      to: '+8801812345678', message: 'M',
    });
    expect(r.retryable).toBe(false);
  });

  it('Airtel — 5xx retryable', async () => {
    jest.resetModules();
    mockEnv();
    const { AirtelProvider } = await import('@infrastructure/providers/sms/airtel.provider.js');
    mockFetchStatus(502);
    const r = await new AirtelProvider().send({
      to: '+8801512345678', message: 'M',
    });
    expect(r.retryable).toBe(true);
  });

  it('Teletalk — 5xx retryable', async () => {
    jest.resetModules();
    mockEnv();
    const { TeletalkProvider } = await import('@infrastructure/providers/sms/teletalk.provider.js');
    mockFetchStatus(502);
    const r = await new TeletalkProvider().send({
      to: '+8802112345678', message: 'M',
    });
    expect(r.retryable).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Push providers — remaining catch paths
// ═══════════════════════════════════════════════════════════
describe('Push — full branch matrix', () => {
  it('Onesignal — 5xx retryable', async () => {
    jest.resetModules();
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { OnesignalProvider } = await import('@infrastructure/providers/push/onesignal.provider.js');
    mockFetchStatus(502);
    const r = await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' });
    expect(r.retryable).toBe(true);
  });

  it('Onesignal — no id fallback', async () => {
    jest.resetModules();
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { OnesignalProvider } = await import('@infrastructure/providers/push/onesignal.provider.js');
    mockFetchStatus(200, {});
    const r = await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' });
    expect(r.providerMessageId).toBeDefined();
  });

  it('Onesignal — network throw', async () => {
    jest.resetModules();
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { OnesignalProvider } = await import('@infrastructure/providers/push/onesignal.provider.js');
    mockFetchThrow();
    const r = await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' });
    expect(r.success).toBe(false);
  });

  it('Expo — HTTP 5xx retryable', async () => {
    jest.resetModules();
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnvBool: () => true,
    }));
    const { ExpoProvider } = await import('@infrastructure/providers/push/expo.provider.js');
    mockFetchStatus(502);
    const r = await new ExpoProvider().send({
      token: 'ExponentPushToken[abcd1234]', title: 'T', body: 'B',
    });
    expect(r.retryable).toBe(true);
  });

  it('Expo — network throw', async () => {
    jest.resetModules();
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnvBool: () => true,
    }));
    const { ExpoProvider } = await import('@infrastructure/providers/push/expo.provider.js');
    mockFetchThrow();
    const r = await new ExpoProvider().send({
      token: 'ExponentPushToken[abcd1234]', title: 'T', body: 'B',
    });
    expect(r.success).toBe(false);
  });
});
