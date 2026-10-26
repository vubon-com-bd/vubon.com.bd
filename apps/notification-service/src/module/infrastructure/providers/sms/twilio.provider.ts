/**
 * Twilio SMS Provider — International
 * @module notification-service/infrastructure/providers/sms
 */
import { Injectable } from '@nestjs/common';
import { TWILIO_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type { ISmsProvider, SmsProviderInput } from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class TwilioProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'twilio',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 10,
    });
  }

  isEnabled(): boolean {
    return (
      TWILIO_CONFIG.enabled &&
      Boolean(TWILIO_CONFIG.accountSid) &&
      Boolean(TWILIO_CONFIG.authToken)
    );
  }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];

    try {
      const auth = Buffer.from(
        `${TWILIO_CONFIG.accountSid}:${TWILIO_CONFIG.authToken}`,
      ).toString('base64');

      for (const recipient of recipients) {
        const body = new URLSearchParams({
          To: recipient,
          From: input.from ?? TWILIO_CONFIG.fromNumber,
          Body: input.message,
        });

        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_CONFIG.accountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
            signal: AbortSignal.timeout(TWILIO_CONFIG.timeoutMs),
          },
        );

        if (!res.ok) {
          return {
            success: false,
            error: `HTTP ${res.status}`,
            errorCode: 'TWILIO_HTTP_ERROR',
            retryable: res.status >= 500,
            durationMs: Date.now() - start,
          };
        }
      }

      return {
        success: true,
        providerMessageId: `twilio-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'TWILIO_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
