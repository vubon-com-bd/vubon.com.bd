/**
 * Providers — exhaustive HTTP + catch + edge branches
 * @module notification-service/test/unit/infrastructure/providers
 */
import { jest } from '@jest/globals';

const originalFetch = global.fetch;
function mf(status: number, body: unknown = {}): void {
  global.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  })) as never;
}
function mthrow(): void {
  global.fetch = jest.fn(async () => { throw new Error('down'); }) as never;
}
afterEach(() => {
  global.fetch = originalFetch;
  jest.resetModules();
});

describe('Providers — exhaustive HTTP status × every provider', () => {
  describe('MailgunProvider — full status', () => {
    const config = () => jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: { enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000 },
    }));
    for (const status of [200, 201, 400, 401, 403, 404, 422, 429, 500, 502, 503, 504]) {
      it(`status=${status}`, async () => {
        jest.resetModules(); config();
        const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
        mf(status, { id: 'mg' });
        const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(status < 400);
      });
    }
    it('catch branch', async () => {
      jest.resetModules(); config();
      const { MailgunProvider } = await import('@infrastructure/providers/email/mailgun.provider.js');
      mthrow();
      const r = await new MailgunProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
      expect(r.success).toBe(false);
    });
  });

  describe('ResendProvider — full status', () => {
    const config = () => jest.doMock('@vubon/shared-config/platform/notification', () => ({
      RESEND_CONFIG: {
        enabled: true, apiKey: 'k', baseUrl: 'https://api.resend.com',
        fromEmail: 'x@y.com', timeoutMs: 1000,
      },
    }));
    for (const status of [200, 201, 400, 401, 422, 429, 500, 502]) {
      it(`status=${status}`, async () => {
        jest.resetModules(); config();
        const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
        mf(status, { id: 'r' });
        const r = await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(status < 400);
      });
    }
    it('catch branch', async () => {
      jest.resetModules(); config();
      const { ResendProvider } = await import('@infrastructure/providers/email/resend.provider.js');
      mthrow();
      expect((await new ResendProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success).toBe(false);
    });
  });

  describe('PostmarkProvider — full status', () => {
    const config = () => jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: () => 'test-key',
    }));
    for (const status of [200, 400, 401, 422, 429, 500, 502]) {
      it(`status=${status}`, async () => {
        jest.resetModules(); config();
        const { PostmarkProvider } = await import('@infrastructure/providers/email/postmark.provider.js');
        mf(status, { MessageID: 'pm' });
        const r = await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' });
        expect(r.success).toBe(status < 400);
      });
    }
    it('catch branch', async () => {
      jest.resetModules(); config();
      const { PostmarkProvider } = await import('@infrastructure/providers/email/postmark.provider.js');
      mthrow();
      expect((await new PostmarkProvider().send({ to: 'a@b.com', subject: 'S', text: 'T' })).success).toBe(false);
    });
  });
});
