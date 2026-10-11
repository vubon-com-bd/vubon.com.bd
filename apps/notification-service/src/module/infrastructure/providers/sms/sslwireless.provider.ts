/**
 * SslWirelessSmsProvider — BD-local SMS via SSLWireless API
 * @module notification-service/infrastructure/providers/sms
 */
import { Injectable, Optional } from '@nestjs/common';
import { SSLWIRELESS_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { ISmsProvider, SmsSendPayload } from '../base/provider.interface.js';

type SslConfig = typeof SSLWIRELESS_CONFIG;

interface SslWirelessResponse {
  readonly status: string;
  readonly error_code?: string;
  readonly error_message?: string;
  readonly smsinfo?: readonly { readonly csms_id: string }[];
}

@Injectable()
export class SslWirelessSmsProvider extends BaseHttpProvider implements ISmsProvider {
  readonly channel = 'sms' as const;
  private readonly cfg: SslConfig;

  constructor(@Optional() config?: Partial<SslConfig>) {
    super({ name: 'sslwireless', channel: 'sms', timeoutMs: 15_000, perSecond: 50, perDay: 10_000 });
    this.cfg = { ...SSLWIRELESS_CONFIG, ...(config ?? {}) } as SslConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.cfg.apiKey);
  }

  async health(): Promise<ProviderHealthStatus> {
    return this.isEnabled()
      ? { healthy: true, enabled: true }
      : { healthy: false, enabled: false, reason: 'Not configured' };
  }

  async send(payload: SmsSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'SSLWireless disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    const form = new URLSearchParams();
    form.set('api_token', this.cfg.apiKey);
    form.set('msisdn', payload.to);
    form.set('sms', payload.message);
    form.set('csms_id', `vubon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    form.set('sid', payload.senderId ?? this.cfg.senderId);

    try {
      const response = await this.httpRequest<SslWirelessResponse>({
        method: 'POST',
        url: `${this.cfg.baseUrl}/api/smsapi`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        bodyRaw: form.toString(),
      });
      const csmsId = response.body.smsinfo?.[0]?.csms_id;
      const ok = response.body.status === 'SUCCESS' || response.body.status === '200';
      if (!ok) {
        return {
          success: false,
          error: response.body.error_message ?? 'SSLWireless error',
          errorCode: response.body.error_code ?? 'PROVIDER_ERROR',
          retryable: false,
        };
      }
      this.logger.log(`SSLWireless sent SMS → ${payload.to} (id=${csmsId})`);
      return { success: true, providerMessageId: csmsId };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: message, errorCode: 'PROVIDER_ERROR', retryable: true };
    }
  }
}
