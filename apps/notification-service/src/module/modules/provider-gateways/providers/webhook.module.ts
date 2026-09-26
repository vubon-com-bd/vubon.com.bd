import { Module } from '@nestjs/common';
import { HttpWebhookProvider } from '../../../infrastructure/providers/webhook/http.provider';
import { SlackProvider } from '../../../infrastructure/providers/webhook/slack.provider';
import { DiscordProvider } from '../../../infrastructure/providers/webhook/discord.provider';
import { TelegramProvider } from '../../../infrastructure/providers/webhook/telegram.provider';

@Module({
  providers: [
    HttpWebhookProvider,
    SlackProvider,
    DiscordProvider,
    TelegramProvider,
  ],
  exports: [
    HttpWebhookProvider,
    SlackProvider,
    DiscordProvider,
    TelegramProvider,
  ],
})
export class WebhookProviderModule {}
