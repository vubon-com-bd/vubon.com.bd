/**
 * ResendEmailProvider — HTTP-based email via Resend API
 * @module notification-service/infrastructure/providers/email
 */
import { Injectable, Optional } from '@nestjs/common';
import { RESEND_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { EmailSendPayload, IEmailProvider } from '../base/provider.interface.js';

type ResendConfig = typeof RESEND_CONFIG;

interface ResendSuccessResponse {
  readonly id: string;
}

@Injectable()
export class ResendEmailProvider extends BaseHttpProvider implements IEmailProvider {
  readonly channel = 'email' as const;
  private readonly cfg: ResendConfig;

  constructor(@Optional() config?: Partial<ResendConfig>) {
    super({
      name: 'resend',
      channel: 'email',
      timeoutMs: RESEND_CONFIG.timeoutMs ?? 15_000,
      maxRetries: RESEND_CONFIG.maxRetries ?? 3,
      perSecond: 20,
      perDay: 3_000,
    });
    this.cfg = { ...RESEND_CONFIG, ...(config ?? {}) } as ResendConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.cfg.apiKey);
  }

  async health(): Promise<ProviderHealthStatus> {
    if (!this.isEnabled()) {
      return { healthy: false, enabled: false, reason: 'Not configured' };
    }
    return { healthy: true, enabled: true };
  }

  async send(payload: EmailSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'Resend disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    const from = payload.from ?? this.buildFrom();
    try {
      const response = await this.httpRequest<ResendSuccessResponse>({
        method: 'POST',
        url: `${this.cfg.baseUrl}/emails`,
        headers: { Authorization: `Bearer ${this.cfg.apiKey}` },
        body: {
          from,
          to: payload.to,
          cc: payload.cc,
          bcc: payload.bcc,
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
          headers: payload.headers,
          tags: payload.tags
            ? Object.entries(payload.tags).map(([name, value]) => ({ name, value }))
            : undefined,
          attachments: payload.attachments?.map((a) => ({
            filename: a.filename,
            content: a.content,
            path: a.url,
            content_type: a.contentType,
          })),
        },
      });
      const id = response.body.id;
      this.logger.log(`Resend sent email → ${payload.to.join(',')} (id=${id})`);
      return { success: true, providerMessageId: id };
    } catch (err) {
      return this.mapError(err);
    }
  }

  private buildFrom(): string {
    const name = this.cfg.fromName ?? 'Vubon';
    const email = this.cfg.fromEmail ?? 'onboarding@resend.dev';
    return `${name} <${email}>`;
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
