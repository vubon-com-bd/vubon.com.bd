/**
 * WebhookProviderModule — HTTP, Slack, Discord, Telegram
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { HttpWebhookProvider } from '@infrastructure/providers/webhook/http.provider.js';
import { SlackWebhookProvider } from '@infrastructure/providers/webhook/slack.provider.js';
import { DiscordWebhookProvider } from '@infrastructure/providers/webhook/discord.provider.js';
import { TelegramWebhookProvider } from '@infrastructure/providers/webhook/telegram.provider.js';

const PROVIDERS = [
  HttpWebhookProvider,
  SlackWebhookProvider,
  DiscordWebhookProvider,
  TelegramWebhookProvider,
];

@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class WebhookProviderModule {}
