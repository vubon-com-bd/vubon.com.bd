/**
 * HTTP Webhook Provider — generic HMAC-signed delivery
 * @module notification-service/infrastructure/providers/webhook
 */
import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { WEBHOOK_CONFIG, WEBHOOK_SIGNATURE_CONFIG } from '@vubon/shared-config/platform';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IWebhookProvider,
  WebhookProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class HttpWebhookProvider extends BaseProvider implements IWebhookProvider {
  constructor() {
    super({
      name: 'http',
      channel: 'webhook' as const,
      version: '1.0.0',
      priority: 1,
    });
  }

  isEnabled(): boolean {
    return WEBHOOK_CONFIG.enabled;
  }

  async send(input: WebhookProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notEnabled();

    const start = Date.now();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payloadStr = JSON.stringify(input.payload);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'Vubon-Webhook/1.0',
      [WEBHOOK_SIGNATURE_CONFIG.timestampHeaderName]: timestamp,
      ...(input.headers ?? {}),
    };

    if (input.secret) {
      const signature = this.sign(`${timestamp}.${payloadStr}`, input.secret);
      headers[WEBHOOK_SIGNATURE_CONFIG.headerName] = signature;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        input.timeoutMs ?? WEBHOOK_CONFIG.timeoutMs,
      );

      const res = await fetch(input.url, {
        method: input.method,
        headers,
        body: input.method === 'GET' ? undefined : payloadStr,
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const durationMs = Date.now() - start;
      const responseBody = await res.text().catch(() => '');

      if (!res.ok) {
        return {
          success: false,
          status: String(res.status),
          error: `HTTP ${res.status}: ${responseBody.slice(0, 200)}`,
          errorCode: `WEBHOOK_HTTP_${res.status}`,
          retryable: res.status >= 500 || res.status === 429,
          durationMs,
          rawResponse: { status: res.status, body: responseBody.slice(0, 500) },
        };
      }

      return {
        success: true,
        status: 'delivered',
        durationMs,
        rawResponse: { status: res.status, body: responseBody.slice(0, 500) },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return {
        success: false,
        error: msg,
        errorCode: 'WEBHOOK_NETWORK_ERROR',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }

  sign(payload: string, secret: string): string {
    return createHmac(WEBHOOK_SIGNATURE_CONFIG.algorithm, secret)
      .update(payload)
      .digest('hex');
  }
}
