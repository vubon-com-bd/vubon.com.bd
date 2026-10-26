/**
 * Provider SDK fallback + HTTP status branches
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

function mockThrow(msg = 'network down'): void {
  global.fetch = jest.fn(async () => { throw new Error(msg); }) as never;
}

afterEach(() => {
  global.fetch = originalFetch;
  jest.resetModules();
});

describe('Email — every HTTP status code', () => {
  describe('MailgunProvider', () => {
    const config = () => jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: { enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000 },
    }));

    for (const status of [400, 401, 403, 404, 429, 500, 502, 503]) {
      it(`Mailgun — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
        mockFetch(status);
        const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(false);
        expect(r.errorCode).toBe('MAILGUN_HTTP_ERROR');
      });
    }

    it('Mailgun — HTML only (no text)', async () => {
      jest.resetModules();
      config();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetch(200, { id: 'mg-1' });
      const r = await new MailgunProvider().send({
        to: 'a@b.com', subject: 'S', html: '<p>H</p>',
      });
      expect(r.success).toBe(true);
    });

    it('Mailgun — no text no html', async () => {
      jest.resetModules();
      config();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mockFetch(200, { id: 'mg-1' });
      const r = await new MailgunProvider().send({
        to: 'a@b.com', subject: 'S',
      });
      expect(r.success).toBe(true);
    });
  });

  describe('ResendProvider', () => {
    const config = () => jest.doMock('@vubon/shared-config/platform/notification', () => ({
      RESEND_CONFIG: {
        enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
        fromEmail: 'x@y.com', timeoutMs: 1000,
      },
    }));

    for (const status of [400, 401, 403, 429, 500, 502]) {
      it(`Resend — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
        mockFetch(status);
        const r = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(false);
      });
    }
  });

  describe('PostmarkProvider', () => {
    const config = () => jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: () => 'test-key',
    }));

    for (const status of [400, 401, 422, 429, 500, 502]) {
      it(`Postmark — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { PostmarkProvider } = await import('@infrastructure/providers/email/postmark.provider.js');
        mockFetch(status);
        const r = await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(false);
      });
    }
  });
});

describe('SMS — every HTTP status code', () => {
  const config = () => jest.doMock('@vubon/shared-config/common', () => ({
    getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
    getOptionalEnvBool: () => true,
  }));

  describe('BanglalinkProvider — status matrix', () => {
    for (const status of [400, 429, 500, 502]) {
      it(`Banglalink — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { BanglalinkProvider } = await import('@infrastructure/providers/sms/banglalink.provider.js');
        mockFetch(status);
        const r = await new BanglalinkProvider().send({
          to: '+8801412345678', message: 'M',
        });
        expect(r.success).toBe(false);
      });
    }
  });

  describe('GrameenphoneProvider — status matrix', () => {
    for (const status of [400, 500, 502]) {
      it(`Grameenphone — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { GrameenphoneProvider } = await import('@infrastructure/providers/sms/grameenphone.provider.js');
        mockFetch(status);
        const r = await new GrameenphoneProvider().send({
          to: '+8801712345678', message: 'M',
        });
        expect(r.success).toBe(false);
      });
    }
  });

  describe('RobiProvider — status matrix', () => {
    for (const status of [400, 500]) {
      it(`Robi — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { RobiProvider } = await import('@infrastructure/providers/sms/robi.provider.js');
        mockFetch(status);
        const r = await new RobiProvider().send({
          to: '+8801812345678', message: 'M',
        });
        expect(r.success).toBe(false);
      });
    }
  });

  describe('AirtelProvider — status matrix', () => {
    for (const status of [400, 500]) {
      it(`Airtel — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { AirtelProvider } = await import('@infrastructure/providers/sms/airtel.provider.js');
        mockFetch(status);
        const r = await new AirtelProvider().send({
          to: '+8801512345678', message: 'M',
        });
        expect(r.success).toBe(false);
      });
    }
  });

  describe('TeletalkProvider — status matrix', () => {
    for (const status of [400, 500]) {
      it(`Teletalk — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { TeletalkProvider } = await import('@infrastructure/providers/sms/teletalk.provider.js');
        mockFetch(status);
        const r = await new TeletalkProvider().send({
          to: '+8802112345678', message: 'M',
        });
        expect(r.success).toBe(false);
      });
    }
  });
});

describe('Push — every HTTP status code', () => {
  describe('OnesignalProvider — status matrix', () => {
    const config = () => jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));

    for (const status of [400, 401, 429, 500, 502]) {
      it(`Onesignal — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { OnesignalProvider } = await import('@infrastructure/providers/push/onesignal.provider.js');
        mockFetch(status);
        const r = await new OnesignalProvider().send({ token: 't', title: 'T', body: 'B' });
        expect(r.success).toBe(false);
      });
    }

    it('Onesignal — multi-token', async () => {
      jest.resetModules();
      config();
      const { OnesignalProvider } = await import('@infrastructure/providers/push/onesignal.provider.js');
      mockFetch(200, { id: 'os-1' });
      const r = await new OnesignalProvider().send({
        token: ['t1', 't2', 't3'], title: 'T', body: 'B',
      });
      expect(r.success).toBe(true);
    });
  });

  describe('ExpoProvider — status matrix', () => {
    const config = () => jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnvBool: () => true,
    }));

    for (const status of [400, 429, 500]) {
      it(`Expo — HTTP ${status}`, async () => {
        jest.resetModules();
        config();
        const { ExpoProvider } = await import('@infrastructure/providers/push/expo.provider.js');
        mockFetch(status);
        const r = await new ExpoProvider().send({
          token: 'ExponentPushToken[abcd]', title: 'T', body: 'B',
        });
        expect(r.success).toBe(false);
      });
    }

    it('Expo — mixed tokens (expo + invalid)', async () => {
      jest.resetModules();
      config();
      const { ExpoProvider } = await import('@infrastructure/providers/push/expo.provider.js');
      mockFetch(200, {});
      const r = await new ExpoProvider().send({
        token: ['ExponentPushToken[abcd]', 'invalid-token'],
        title: 'T', body: 'B',
      });
      expect(r.success).toBe(true);
    });
  });
});
