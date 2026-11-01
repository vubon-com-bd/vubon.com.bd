/**
 * BulkSMSBD SMS Provider — Bangladesh Aggregator
 * @module notification-service/infrastructure/providers/sms
 *
 * Covers all BD MNO via single API.
 * API: https://bulksmsbd.net/api/smsapi
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  ISmsProvider,
  SmsProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class BulksmsbdProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'bulksmsbd',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 2,
    });
  }

  private get apiKey(): string {
    return getOptionalEnv('BULKSMSBD_API_KEY', '');
  }
  private get senderId(): string {
    return getOptionalEnv('BULKSMSBD_SENDER_ID', 'VUBON');
  }
  private get baseUrl(): string {
    return getOptionalEnv('BULKSMSBD_BASE_URL', 'https://bulksmsbd.net/api');
  }
  private get enabled(): boolean {
    return getOptionalEnvBool('BULKSMSBD_ENABLED', false);
  }

  isEnabled(): boolean {
    return this.enabled && Boolean(this.apiKey);
  }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];

    try {
      for (const recipient of recipients) {
        const body = new URLSearchParams({
          api_key: this.apiKey,
          type: 'text',
          number: recipient,
          senderid: input.from ?? this.senderId,
          message: input.message,
        });

        const res = await fetch(`${this.baseUrl}/smsapi`, {
          method: 'POST',
          body,
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) {
          return {
            success: false,
            error: `HTTP ${res.status}`,
            errorCode: 'BULKSMSBD_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `blk-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'BULKSMSBD_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
