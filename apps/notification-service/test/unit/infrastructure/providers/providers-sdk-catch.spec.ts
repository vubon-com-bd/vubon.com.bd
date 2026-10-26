/**
 * Providers — SDK + config virtual mock
 * @module notification-service/test/unit/infrastructure/providers
 */
import { jest } from '@jest/globals';

// ═══════════════════════════════════════════════════════════
// CONFIG MOCKS — enable all providers
// ═══════════════════════════════════════════════════════════
jest.mock('@vubon/shared-config/platform/notification', () => ({
  SENDGRID_CONFIG: { enabled: true, apiKey: 'test-key', sandboxMode: false, timeoutMs: 1000 },
  SMTP_CONFIG: {
    enabled: true, host: 'smtp.test', port: 587,
    secure: false, user: 'u', password: 'p',
    pool: false, maxConnections: 1, maxMessages: 1,
    connectionTimeoutMs: 1000, greetingTimeoutMs: 1000, socketTimeoutMs: 1000,
  },
  SES_CONFIG: {
    enabled: true, accessKeyId: 'a', secretAccessKey: 's',
    region: 'us-east-1',
  },
  FCM_CONFIG: {
    enabled: true, projectId: 'p', clientEmail: 'c',
    privateKey: 'k', timeoutMs: 1000,
  },
  WEB_PUSH_CONFIG: {
    enabled: true, vapidPublicKey: 'pub', vapidPrivateKey: 'priv', subject: 's',
  },
}));

jest.mock('@vubon/shared-config/common', () => ({
  getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
  getOptionalEnvBool: () => true,
  getOptionalEnvInt: (_k: string, d: number) => d,
}));

// ═══════════════════════════════════════════════════════════
// SDK VIRTUAL MOCKS — modules don't exist
// ═══════════════════════════════════════════════════════════
jest.mock(
  '@sendgrid/mail',
  () => ({
    __esModule: true,
    default: {
      setApiKey: jest.fn(),
      send: jest.fn(async () => [
        { headers: { 'x-message-id': 'sg-msg-1' } },
      ]),
    },
  }),
  { virtual: true },
);

jest.mock(
  'nodemailer',
  () => ({
    createTransport: jest.fn(() => ({
      sendMail: jest.fn(async () => ({ messageId: 'smtp-1' })),
    })),
  }),
  { virtual: true },
);

jest.mock(
  '@aws-sdk/client-sesv2',
  () => ({
    SESv2Client: class {},
    SendEmailCommand: class {},
  }),
  { virtual: true },
);

jest.mock(
  'firebase-admin',
  () => ({
    initializeApp: jest.fn(() => ({})),
    messaging: jest.fn(() => ({
      send: jest.fn(async () => 'fcm-msg-1'),
    })),
  }),
  { virtual: true },
);

jest.mock(
  'web-push',
  () => ({
    setVapidDetails: jest.fn(),
    sendNotification: jest.fn(async () => ({ statusCode: 200 })),
  }),
  { virtual: true },
);

describe('SDK present (config + SDK virtual mock)', () => {
  it('SendgridProvider success', async () => {
    const { SendgridProvider } = await import('@infrastructure/providers/email/sendgrid.provider.js');
    const r = await new SendgridProvider().send({
      to: 'a@b.com', subject: 'S', text: 'T',
    });
    expect(r.success).toBe(true);
    expect(r.providerMessageId).toBe('sg-msg-1');
  });

  it('SmtpProvider success', async () => {
    const { SmtpProvider } = await import('@infrastructure/providers/email/smtp.provider.js');
    const r = await new SmtpProvider().send({
      to: 'a@b.com', subject: 'S', text: 'T',
    });
    expect(r.success).toBe(true);
  });

  it('SesProvider success', async () => {
    const { SesProvider } = await import('@infrastructure/providers/email/ses.provider.js');
    const r = await new SesProvider().send({
      to: 'a@b.com', subject: 'S', text: 'T',
    });
    expect(r.success).toBe(true);
  });

  it('FcmProvider success', async () => {
    const { FcmProvider } = await import('@infrastructure/providers/push/fcm.provider.js');
    const r = await new FcmProvider().send({ token: 't', title: 'T', body: 'B' });
    expect(r.success).toBe(true);
  });

  it('WebPushProvider success', async () => {
    const { WebPushProvider } = await import('@infrastructure/providers/push/web-push.provider.js');
    const r = await new WebPushProvider().send({ token: 't', title: 'T', body: 'B' });
    expect(r.success).toBe(true);
  });
});
