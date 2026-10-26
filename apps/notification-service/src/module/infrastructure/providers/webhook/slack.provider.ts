/**
 * Slack Webhook Provider
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
export class SlackWebhookProvider extends BaseProvider implements IWebhookProvider {
  constructor() {
    super({
      name: 'slack',
      channel: 'webhook' as const,
      version: '1.0.0',
      priority: 2,
    });
  }

  isEnabled(): boolean {
    return true;
  }

  async send(input: WebhookProviderInput): Promise<ProviderResult> {
    if (!input.url.includes('hooks.slack.com')) {
      return {
        success: false,
        error: 'Invalid Slack webhook URL',
        errorCode: 'INVALID_SLACK_URL',
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
          error: `Slack HTTP ${res.status}`,
          errorCode: `SLACK_HTTP_${res.status}`,
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
        errorCode: 'SLACK_NETWORK_ERROR',
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
    // If already Slack format, pass through
    if ('text' in payload || 'blocks' in payload) return { ...payload };

    // Otherwise, convert generic webhook to Slack format
    const title = (payload['title'] as string | undefined) ?? 'Notification';
    const body = (payload['body'] as string | undefined) ?? JSON.stringify(payload);

    return {
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: title },
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: body },
        },
      ],
    };
  }
}
