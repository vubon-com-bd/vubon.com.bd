/**
 * Discord Webhook Provider
 * @module notification-service/infrastructure/providers/webhook
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
export class DiscordWebhookProvider extends BaseProvider implements IWebhookProvider {
  constructor() {
    super({
      name: 'discord',
      channel: 'webhook' as const,
      version: '1.0.0',
      priority: 3,
    });
  }

  isEnabled(): boolean {
    return true;
  }

  async send(input: WebhookProviderInput): Promise<ProviderResult> {
    if (!input.url.includes('discord.com/api/webhooks')) {
      return {
        success: false,
        error: 'Invalid Discord webhook URL',
        errorCode: 'INVALID_DISCORD_URL',
        retryable: false,
      };
    }

    const start = Date.now();
    const payload = this.transformPayload(input.payload);

    try {
      const res = await fetch(input.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(input.timeoutMs ?? 10_000),
      });

      if (!res.ok) {
        return {
          success: false,
          status: String(res.status),
          error: `Discord HTTP ${res.status}`,
          errorCode: `DISCORD_HTTP_${res.status}`,
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      return {
        success: true,
        status: 'delivered',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'DISCORD_NETWORK_ERROR',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }

  sign(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  private transformPayload(
    payload: Readonly<Record<string, unknown>>,
  ): Record<string, unknown> {
    if ('content' in payload || 'embeds' in payload) return { ...payload };

    const title = (payload['title'] as string | undefined) ?? 'Notification';
    const body = (payload['body'] as string | undefined) ?? JSON.stringify(payload);

    return {
      embeds: [
        {
          title,
          description: body,
          color: 0x5865f2,
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }
}
