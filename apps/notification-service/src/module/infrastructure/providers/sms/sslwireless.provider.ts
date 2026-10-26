/**
 * SSLWireless SMS Provider — Bangladesh #1 Aggregator
 * @module notification-service/infrastructure/providers/sms
 *
 * Covers all BD MNO (GP, Robi, Airtel, BL, Teletalk) via single API।
 * API: https://esms.mimsms.com/smsapi (SSLWireless backend)
 */
import { Injectable } from '@nestjs/common';
import { SSLWIRELESS_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  ISmsProvider,
  SmsProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class SslwirelessProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'sslwireless',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 1,
    });
  }

  isEnabled(): boolean {
    return SSLWIRELESS_CONFIG.enabled && Boolean(SSLWIRELESS_CONFIG.apiKey);
  }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];

    try {
      for (const recipient of recipients) {
        const body = new URLSearchParams({
          api_key: SSLWIRELESS_CONFIG.apiKey,
          type: 'text',
          number: recipient,
          senderid: input.from ?? SSLWIRELESS_CONFIG.senderId,
          message: input.message,
        });

        const res = await fetch(`${SSLWIRELESS_CONFIG.baseUrl}/smsapi`, {
          method: 'POST',
          body,
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) {
          return {
            success: false,
            error: `HTTP ${res.status}`,
            errorCode: 'SSLWIRELESS_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `ssl-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'SSLWIRELESS_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
