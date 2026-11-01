/**
 * Resend Email Provider
 * @module notification-service/infrastructure/providers/email
 */
import { Injectable } from '@nestjs/common';
import { RESEND_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class ResendProvider extends BaseProvider implements IEmailProvider {
  constructor() {
    super({
      name: 'resend',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 3,
    });
  }

  isEnabled(): boolean {
    return RESEND_CONFIG.enabled && Boolean(RESEND_CONFIG.apiKey);
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    try {
      const to = Array.isArray(input.to) ? input.to : [input.to];
      const res = await fetch(`${RESEND_CONFIG.baseUrl}/emails`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: input.from ?? RESEND_CONFIG.fromEmail,
          to,
          subject: input.subject,
          text: input.text,
          html: input.html,
        }),
        signal: AbortSignal.timeout(RESEND_CONFIG.timeoutMs),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          success: false,
          error: `HTTP ${res.status}: ${errText.slice(0, 200)}`,
          errorCode: 'RESEND_HTTP_ERROR',
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      const data = (await res.json()) as { id?: string };
      return {
        success: true,
        providerMessageId: data.id ?? `resend-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Resend send failed: ${msg}`);
      return {
        success: false,
        error: msg,
        errorCode: 'RESEND_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
