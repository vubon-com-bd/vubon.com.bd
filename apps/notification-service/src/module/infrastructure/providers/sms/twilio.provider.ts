/**
 * TwilioSmsProvider — HTTP-based SMS via Twilio REST API
 * @module notification-service/infrastructure/providers/sms
 */
import { Injectable, Optional } from '@nestjs/common';
import { TWILIO_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { ISmsProvider, SmsSendPayload } from '../base/provider.interface.js';

type TwilioConfig = typeof TWILIO_CONFIG;

interface TwilioMessageResponse {
  readonly sid: string;
  readonly status: string;
}

@Injectable()
export class TwilioSmsProvider extends BaseHttpProvider implements ISmsProvider {
  readonly channel = 'sms' as const;
  private readonly cfg: TwilioConfig;

  constructor(@Optional() config?: Partial<TwilioConfig>) {
    super({
      name: 'twilio',
      channel: 'sms',
      timeoutMs: TWILIO_CONFIG.timeoutMs ?? 15_000,
      maxRetries: TWILIO_CONFIG.maxRetries ?? 3,
      perSecond: 100,
      perDay: 50_000,
    });
    this.cfg = { ...TWILIO_CONFIG, ...(config ?? {}) } as TwilioConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.cfg.accountSid && this.cfg.authToken);
  }

  async health(): Promise<ProviderHealthStatus> {
    return this.isEnabled()
      ? { healthy: true, enabled: true }
      : { healthy: false, enabled: false, reason: 'Not configured' };
  }

  async send(payload: SmsSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'Twilio disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    const { accountSid, authToken, fromNumber, messagingServiceSid, statusCallbackUrl } = this.cfg;
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const form = new URLSearchParams();
    form.set('To', payload.to);
    form.set('Body', payload.message);
    if (messagingServiceSid) form.set('MessagingServiceSid', messagingServiceSid);
    else if (fromNumber) form.set('From', fromNumber);
    if (statusCallbackUrl) form.set('StatusCallback', statusCallbackUrl);

    try {
      const response = await this.httpRequest<TwilioMessageResponse>({
        method: 'POST',
        url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        bodyRaw: form.toString(),
      });
      const sid = response.body.sid;
      this.logger.log(`Twilio sent SMS → ${payload.to} (sid=${sid})`);
      return { success: true, providerMessageId: sid };
    } catch (err) {
      return this.mapError(err);
    }
  }

  private mapError(err: unknown): ProviderSendResult {
    if (err && typeof err === 'object' && 'retryable' in err) {
      const pe = err as { message: string; code?: string; retryable: boolean };
      return {
        success: false,
        error: pe.message,
        errorCode: pe.code ?? 'PROVIDER_ERROR',
        retryable: pe.retryable,
      };
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode: 'UNKNOWN_ERROR',
      retryable: false,
    };
  }
}
