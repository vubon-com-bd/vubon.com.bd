/**
 * Telegram Bot Webhook Provider
 * @module notification-service/infrastructure/providers/webhook
 *
 * Sends message via Telegram Bot API (https://api.telegram.org/bot<TOKEN>/sendMessage)।
 * URL should be: https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>
 */
import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IWebhookProvider,
  WebhookProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class TelegramWebhookProvider extends BaseProvider implements IWebhookProvider {
  constructor() {
    super({
      name: 'telegram',
      channel: 'webhook' as const,
      version: '1.0.0',
      priority: 4,
    });
  }

  isEnabled(): boolean {
    return true;
  }

  async send(input: WebhookProviderInput): Promise<ProviderResult> {
    if (!input.url.includes('api.telegram.org')) {
      return {
        success: false,
        error: 'Invalid Telegram API URL',
        errorCode: 'INVALID_TELEGRAM_URL',
        retryable: false,
      };
    }

    const start = Date.now();
    const text = this.formatText(input.payload);

    try {
      const res = await fetch(input.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          parse_mode: 'HTML',
          ...(input.payload['options'] as object),
        }),
        signal: AbortSignal.timeout(input.timeoutMs ?? 10_000),
      });

      if (!res.ok) {
        return {
          success: false,
          status: String(res.status),
          error: `Telegram HTTP ${res.status}`,
          errorCode: `TELEGRAM_HTTP_${res.status}`,
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      const data = (await res.json()) as { result?: { message_id?: number } };
      return {
        success: true,
        providerMessageId: String(data.result?.message_id ?? Date.now()),
        status: 'delivered',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'TELEGRAM_NETWORK_ERROR',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }

  sign(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  private formatText(payload: Readonly<Record<string, unknown>>): string {
    const title = (payload['title'] as string | undefined) ?? 'Notification';
    const body = (payload['body'] as string | undefined) ?? JSON.stringify(payload);
    return `<b>${this.escape(title)}</b>\n\n${this.escape(body)}`;
  }

  private escape(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
