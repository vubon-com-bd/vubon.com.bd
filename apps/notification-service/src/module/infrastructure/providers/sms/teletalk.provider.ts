/**
 * Teletalk SMS Provider (Direct MNO — Govt of Bangladesh)
 * @module notification-service/infrastructure/providers/sms
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';
import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type { ISmsProvider, SmsProviderInput } from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';
import { detectBdMobileNetwork } from '@infrastructure/providers/sms/sms.types.js';

@Injectable()
export class TeletalkProvider extends BaseProvider implements ISmsProvider {
  constructor() {
    super({
      name: 'teletalk',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 6,
    });
  }

  private get apiKey(): string { return getOptionalEnv('TELETALK_API_KEY', ''); }
  private get senderId(): string { return getOptionalEnv('TELETALK_SENDER_ID', 'VUBON'); }
  private get baseUrl(): string { return getOptionalEnv('TELETALK_BASE_URL', 'https://api.teletalk.com.bd'); }
  private get enabled(): boolean { return getOptionalEnvBool('TELETALK_ENABLED', false); }

  isEnabled(): boolean { return this.enabled && Boolean(this.apiKey); }

  async send(input: SmsProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();
    const start = Date.now();
    const recipients = Array.isArray(input.to) ? input.to : [input.to];
    const targets = recipients.filter((r) => detectBdMobileNetwork(r) === 'teletalk');

    if (targets.length === 0) {
      return { success: false, error: 'No Teletalk numbers', errorCode: 'MNO_MISMATCH', retryable: false, durationMs: Date.now() - start };
    }

    try {
      for (const recipient of targets) {
        const body = new URLSearchParams({ apiKey: this.apiKey, sender: input.from ?? this.senderId, number: recipient, text: input.message });
        const res = await fetch(`${this.baseUrl}/sms/send`, { method: 'POST', body, signal: AbortSignal.timeout(10_000) });
        if (!res.ok) return { success: false, error: `HTTP ${res.status}`, errorCode: 'TELETALK_HTTP_ERROR', retryable: res.status >= 500, durationMs: Date.now() - start };
      }
      return { success: true, providerMessageId: `tt-${Date.now()}`, status: 'sent', durationMs: Date.now() - start };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'unknown', errorCode: 'TELETALK_SEND_FAILED', retryable: true, durationMs: Date.now() - start };
    }
  }
}
