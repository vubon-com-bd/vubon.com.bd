/**
 * Grameenphone SMS Provider (Direct MNO)
 * @module notification-service/infrastructure/providers/sms
 *
 * GP Enterprise SMS API — direct MNO route.
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
export class GrameenphoneProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'grameenphone',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 5,
    });
  }

  private get apiKey(): string {
    return getOptionalEnv('GRAMEENPHONE_API_KEY', '');
  }
  private get senderId(): string {
    return getOptionalEnv('GRAMEENPHONE_SENDER_ID', 'VUBON');
  }
  private get baseUrl(): string {
    return getOptionalEnv('GRAMEENPHONE_BASE_URL', 'https://api.grameenphone.com');
  }
  private get enabled(): boolean {
    return getOptionalEnvBool('GRAMEENPHONE_ENABLED', false);
  }

  isEnabled(): boolean {
    return this.enabled && Boolean(this.apiKey);
  }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];
    const gpRecipients = recipients.filter(
      (r) => detectBdMobileNetwork(r) === 'grameenphone',
    );

    if (gpRecipients.length === 0) {
      return {
        success: false,
        error: 'No Grameenphone numbers in recipient list',
        errorCode: 'MNO_MISMATCH',
        retryable: false,
        durationMs: Date.now() - start,
      };
    }

    try {
      for (const recipient of gpRecipients) {
        const body = new URLSearchParams({
          apiKey: this.apiKey,
          senderId: input.from ?? this.senderId,
          msisdn: recipient,
          text: input.message,
        });

        const res = await fetch(`${this.baseUrl}/sms/send`, {
          method: 'POST',
          body,
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) {
          return {
            success: false,
            error: `HTTP ${res.status}`,
            errorCode: 'GP_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `gp-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { sentCount: gpRecipients.length, skipped: recipients.length - gpRecipients.length },
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'GP_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
