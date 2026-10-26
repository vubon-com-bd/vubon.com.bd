/**
 * WebhookProviderModule — Unit tests
 */
import 'reflect-metadata';
import { WebhookProviderModule } from '@modules/provider-gateways/providers/webhook.module.js';
import { HttpWebhookProvider } from '@infrastructure/providers/webhook/http.provider.js';
import { SlackWebhookProvider } from '@infrastructure/providers/webhook/slack.provider.js';
import { DiscordWebhookProvider } from '@infrastructure/providers/webhook/discord.provider.js';
import { TelegramWebhookProvider } from '@infrastructure/providers/webhook/telegram.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('WebhookProviderModule', () => {
  it('should be defined', () => expect(WebhookProviderModule).toBeDefined());

  it('should provide all 4 webhook providers', () => {
    const providers = readMeta('providers', WebhookProviderModule);
    expect(providers).toContain(HttpWebhookProvider);
    expect(providers).toContain(SlackWebhookProvider);
    expect(providers).toContain(DiscordWebhookProvider);
    expect(providers).toContain(TelegramWebhookProvider);
  });

  it('should have 4 provider entries', () => {
    expect(readMeta('providers', WebhookProviderModule)).toHaveLength(4);
  });

  it('should export all 4 providers', () => {
    const exports = readMeta('exports', WebhookProviderModule);
    expect(exports).toHaveLength(4);
  });
});
