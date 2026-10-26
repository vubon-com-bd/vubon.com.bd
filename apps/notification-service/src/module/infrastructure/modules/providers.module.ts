/**
 * Providers Module — all email/sms/push/webhook/in-app providers
 * @module notification-service/infrastructure/modules
 */
import { Module } from '@nestjs/common';

// ─── Email ─────────────────────────────────
import { SendgridProvider } from '@infrastructure/providers/email/sendgrid.provider.js';
import { MailgunProvider } from '@infrastructure/providers/email/mailgun.provider.js';
import { ResendProvider } from '@infrastructure/providers/email/resend.provider.js';
import { SesProvider } from '@infrastructure/providers/email/ses.provider.js';
import { PostmarkProvider } from '@infrastructure/providers/email/postmark.provider.js';
import { SmtpProvider } from '@infrastructure/providers/email/smtp.provider.js';

// ─── SMS ───────────────────────────────────
import { SslwirelessProvider } from '@infrastructure/providers/sms/sslwireless.provider.js';
import { BulksmsbdProvider } from '@infrastructure/providers/sms/bulksmsbd.provider.js';
import { MimsmsProvider } from '@infrastructure/providers/sms/mimsms.provider.js';
import { BanglalinkProvider } from '@infrastructure/providers/sms/banglalink.provider.js';
import { GrameenphoneProvider } from '@infrastructure/providers/sms/grameenphone.provider.js';
import { RobiProvider } from '@infrastructure/providers/sms/robi.provider.js';
import { AirtelProvider } from '@infrastructure/providers/sms/airtel.provider.js';
import { TeletalkProvider } from '@infrastructure/providers/sms/teletalk.provider.js';
import { TwilioProvider } from '@infrastructure/providers/sms/twilio.provider.js';

// ─── Push ──────────────────────────────────
import { FcmProvider } from '@infrastructure/providers/push/fcm.provider.js';
import { ApnsProvider } from '@infrastructure/providers/push/apns.provider.js';
import { WebPushProvider } from '@infrastructure/providers/push/web-push.provider.js';
import { OnesignalProvider } from '@infrastructure/providers/push/onesignal.provider.js';
import { ExpoProvider } from '@infrastructure/providers/push/expo.provider.js';

// ─── Webhook ───────────────────────────────
import { HttpWebhookProvider } from '@infrastructure/providers/webhook/http.provider.js';
import { SlackWebhookProvider } from '@infrastructure/providers/webhook/slack.provider.js';
import { DiscordWebhookProvider } from '@infrastructure/providers/webhook/discord.provider.js';
import { TelegramWebhookProvider } from '@infrastructure/providers/webhook/telegram.provider.js';

// ─── In-App ────────────────────────────────
import { WebsocketInAppProvider } from '@infrastructure/providers/in-app/websocket.provider.js';
import { SseInAppProvider } from '@infrastructure/providers/in-app/sse.provider.js';

const PROVIDERS = [
  // Email
  SendgridProvider,
  MailgunProvider,
  ResendProvider,
  SesProvider,
  PostmarkProvider,
  SmtpProvider,
  // SMS
  SslwirelessProvider,
  BulksmsbdProvider,
  MimsmsProvider,
  BanglalinkProvider,
  GrameenphoneProvider,
  RobiProvider,
  AirtelProvider,
  TeletalkProvider,
  TwilioProvider,
  // Push
  FcmProvider,
  ApnsProvider,
  WebPushProvider,
  OnesignalProvider,
  ExpoProvider,
  // Webhook
  HttpWebhookProvider,
  SlackWebhookProvider,
  DiscordWebhookProvider,
  TelegramWebhookProvider,
  // In-App
  WebsocketInAppProvider,
  SseInAppProvider,
];

@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class ProvidersModule {}
