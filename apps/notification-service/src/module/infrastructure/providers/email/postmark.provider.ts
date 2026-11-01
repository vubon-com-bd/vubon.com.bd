/**
 * Postmark Email Provider
 * @module notification-service/infrastructure/providers/email
 *
 * Uses Postmark REST API (via fetch — no SDK required)।
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class PostmarkProvider extends BaseProvider implements IEmailProvider {
  constructor() {
    super({
      name: 'postmark',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 5,
    });
  }

  private get apiKey(): string {
    return getOptionalEnv('POSTMARK_API_KEY', '');
  }

  isEnabled(): boolean {
    return Boolean(this.apiKey);
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    try {
      const to = Array.isArray(input.to) ? input.to.join(',') : input.to;
      const res = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'X-Postmark-Server-Token': this.apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          From: input.from ?? 'noreply@vubon.com.bd',
          To: to,
          Subject: input.subject,
          TextBody: input.text,
          HtmlBody: input.html,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          success: false,
          error: `HTTP ${res.status}: ${errText.slice(0, 200)}`,
          errorCode: 'POSTMARK_HTTP_ERROR',
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      const data = (await res.json()) as { MessageID?: string };
      return {
        success: true,
        providerMessageId: data.MessageID ?? `pm-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return {
        success: false,
        error: msg,
        errorCode: 'POSTMARK_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
