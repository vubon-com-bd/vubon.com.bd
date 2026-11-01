/**
 * Banglalink SMS Provider (Direct MNO)
 * @module notification-service/infrastructure/providers/sms
 *
 * Banglalink Enterprise SMS API — for direct MNO route.
 * Falls back to aggregator when number is not BL.
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  ISmsProvider,
  SmsProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';
import { detectBdMobileNetwork } from '@infrastructure/providers/sms/sms.types.js';

@Injectable()
export class BanglalinkProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'banglalink',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 5,
    });
  }

  private get apiKey(): string {
    return getOptionalEnv('BANGLALINK_API_KEY', '');
  }
  private get senderId(): string {
    return getOptionalEnv('BANGLALINK_SENDER_ID', 'VUBON');
  }
  private get baseUrl(): string {
    return getOptionalEnv('BANGLALINK_BASE_URL', 'https://esmsapi.banglalink.net');
  }
  private get enabled(): boolean {
    return getOptionalEnvBool('BANGLALINK_ENABLED', false);
  }

  isEnabled(): boolean {
    return this.enabled && Boolean(this.apiKey);
  }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];

    // BL provider only handles BL numbers
    const blRecipients = recipients.filter(
      (r) => detectBdMobileNetwork(r) === 'banglalink',
    );

    if (blRecipients.length === 0) {
      return {
        success: false,
        error: 'No Banglalink numbers in recipient list',
        errorCode: 'MNO_MISMATCH',
        retryable: false,
        durationMs: Date.now() - start,
      };
    }

    try {
      for (const recipient of blRecipients) {
        const body = new URLSearchParams({
          apiKey: this.apiKey,
          senderId: input.from ?? this.senderId,
          to: recipient,
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
            errorCode: 'BANGLALINK_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `bl-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { sentCount: blRecipients.length, skipped: recipients.length - blRecipients.length },
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'BANGLALINK_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
