/**
 * Provider isEnabled() branches — Config mock
 * @module notification-service/test/unit/infrastructure/providers
 *
 * Fresh-imports each provider WITH mocked config → covers enabled=true branch।
 */
import { jest } from '@jest/globals';

describe('Email providers — isEnabled TRUE branch', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('SendgridProvider enabled when config true', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      SENDGRID_CONFIG: { enabled: true, apiKey: 'test-key' },
    }));
    const { SendgridProvider } = await import(
      '@infrastructure/providers/email/sendgrid.provider.js'
    );
    const p = new SendgridProvider();
    expect(p.isEnabled()).toBe(true);
  });

  it('SendgridProvider disabled when apiKey empty', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      SENDGRID_CONFIG: { enabled: true, apiKey: '' },
    }));
    const { SendgridProvider } = await import(
      '@infrastructure/providers/email/sendgrid.provider.js'
    );
    expect(new SendgridProvider().isEnabled()).toBe(false);
  });

  it('MailgunProvider enabled when all config present', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: { enabled: true, apiKey: 'k', domain: 'd', region: 'us', timeoutMs: 1000 },
    }));
    const { MailgunProvider } = await import(
      '@infrastructure/providers/email/mailgun.provider.js'
    );
    expect(new MailgunProvider().isEnabled()).toBe(true);
  });

  it('MailgunProvider disabled when domain missing', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      MAILGUN_CONFIG: { enabled: true, apiKey: 'k', domain: '', region: 'us', timeoutMs: 1000 },
    }));
    const { MailgunProvider } = await import(
      '@infrastructure/providers/email/mailgun.provider.js'
    );
    expect(new MailgunProvider().isEnabled()).toBe(false);
  });

  it('ResendProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      RESEND_CONFIG: { enabled: true, apiKey: 'k', baseUrl: 'x', fromEmail: 'y', timeoutMs: 1000 },
    }));
    const { ResendProvider } = await import(
      '@infrastructure/providers/email/resend.provider.js'
    );
    expect(new ResendProvider().isEnabled()).toBe(true);
  });

  it('SesProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      SES_CONFIG: { enabled: true, accessKeyId: 'a', secretAccessKey: 's', region: 'us' },
    }));
    const { SesProvider } = await import('@infrastructure/providers/email/ses.provider.js');
    expect(new SesProvider().isEnabled()).toBe(true);
  });

  it('SmtpProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      SMTP_CONFIG: { enabled: true, host: 'smtp.test', port: 587, secure: false, user: 'u', password: 'p' },
    }));
    const { SmtpProvider } = await import('@infrastructure/providers/email/smtp.provider.js');
    expect(new SmtpProvider().isEnabled()).toBe(true);
  });

  it('PostmarkProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: () => 'test-key',
    }));
    const { PostmarkProvider } = await import(
      '@infrastructure/providers/email/postmark.provider.js'
    );
    expect(new PostmarkProvider().isEnabled()).toBe(true);
  });
});

describe('SMS providers — isEnabled TRUE branch', () => {
  beforeEach(() => jest.resetModules());

  it('SslwirelessProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      SSLWIRELESS_CONFIG: { enabled: true, apiKey: 'k', senderId: 'VUBON', baseUrl: 'u' },
    }));
    const { SslwirelessProvider } = await import(
      '@infrastructure/providers/sms/sslwireless.provider.js'
    );
    expect(new SslwirelessProvider().isEnabled()).toBe(true);
  });

  it('TwilioProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      TWILIO_CONFIG: {
        enabled: true, accountSid: 'a', authToken: 't', fromNumber: '+1',
        timeoutMs: 1000,
      },
    }));
    const { TwilioProvider } = await import(
      '@infrastructure/providers/sms/twilio.provider.js'
    );
    expect(new TwilioProvider().isEnabled()).toBe(true);
  });

  it('BulksmsbdProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { BulksmsbdProvider } = await import(
      '@infrastructure/providers/sms/bulksmsbd.provider.js'
    );
    expect(new BulksmsbdProvider().isEnabled()).toBe(true);
  });

  it('MimsmsProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { MimsmsProvider } = await import(
      '@infrastructure/providers/sms/mimsms.provider.js'
    );
    expect(new MimsmsProvider().isEnabled()).toBe(true);
  });

  it('BanglalinkProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { BanglalinkProvider } = await import(
      '@infrastructure/providers/sms/banglalink.provider.js'
    );
    expect(new BanglalinkProvider().isEnabled()).toBe(true);
  });

  it('GrameenphoneProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { GrameenphoneProvider } = await import(
      '@infrastructure/providers/sms/grameenphone.provider.js'
    );
    expect(new GrameenphoneProvider().isEnabled()).toBe(true);
  });

  it('RobiProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { RobiProvider } = await import(
      '@infrastructure/providers/sms/robi.provider.js'
    );
    expect(new RobiProvider().isEnabled()).toBe(true);
  });

  it('AirtelProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { AirtelProvider } = await import(
      '@infrastructure/providers/sms/airtel.provider.js'
    );
    expect(new AirtelProvider().isEnabled()).toBe(true);
  });

  it('TeletalkProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { TeletalkProvider } = await import(
      '@infrastructure/providers/sms/teletalk.provider.js'
    );
    expect(new TeletalkProvider().isEnabled()).toBe(true);
  });
});

describe('Push providers — isEnabled TRUE branch', () => {
  beforeEach(() => jest.resetModules());

  it('FcmProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      FCM_CONFIG: { enabled: true, projectId: 'p', clientEmail: 'c', privateKey: 'k' },
    }));
    const { FcmProvider } = await import(
      '@infrastructure/providers/push/fcm.provider.js'
    );
    expect(new FcmProvider().isEnabled()).toBe(true);
  });

  it('WebPushProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/platform/notification', () => ({
      WEB_PUSH_CONFIG: {
        enabled: true, vapidPublicKey: 'pub', vapidPrivateKey: 'priv', subject: 's',
      },
    }));
    const { WebPushProvider } = await import(
      '@infrastructure/providers/push/web-push.provider.js'
    );
    expect(new WebPushProvider().isEnabled()).toBe(true);
  });

  it('ApnsProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { ApnsProvider } = await import(
      '@infrastructure/providers/push/apns.provider.js'
    );
    expect(new ApnsProvider().isEnabled()).toBe(true);
  });

  it('OnesignalProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnv: (_k: string, d: string) => (d === '' ? 'test-key' : d),
      getOptionalEnvBool: () => true,
    }));
    const { OnesignalProvider } = await import(
      '@infrastructure/providers/push/onesignal.provider.js'
    );
    expect(new OnesignalProvider().isEnabled()).toBe(true);
  });

  it('ExpoProvider enabled', async () => {
    jest.doMock('@vubon/shared-config/common', () => ({
      getOptionalEnvBool: () => true,
    }));
    const { ExpoProvider } = await import(
      '@infrastructure/providers/push/expo.provider.js'
    );
    expect(new ExpoProvider().isEnabled()).toBe(true);
  });
});
