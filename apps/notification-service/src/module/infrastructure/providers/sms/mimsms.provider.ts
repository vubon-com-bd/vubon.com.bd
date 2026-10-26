/**
 * MIMSMS SMS Provider — Bangladesh Aggregator
 * @module notification-service/infrastructure/providers/sms
 *
 * API: https://esms.mimsms.com/smsapi
 * Covers all BD MNO।
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
export class MimsmsProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'mimsms',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 3,
    });
  }

  private get apiKey(): string {
    return getOptionalEnv('MIMSMS_API_KEY', '');
  }
  private get senderId(): string {
    return getOptionalEnv('MIMSMS_SENDER_ID', 'VUBON');
  }
  private get enabled(): boolean {
    return getOptionalEnvBool('MIMSMS_ENABLED', false);
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

        const res = await fetch('https://esms.mimsms.com/smsapi', {
          method: 'POST',
          body,
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) {
          return {
            success: false,
            error: `HTTP ${res.status}`,
            errorCode: 'MIMSMS_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `mim-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'MIMSMS_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
