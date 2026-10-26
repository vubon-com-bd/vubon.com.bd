/**
 * Mailgun Email Provider
 * @module notification-service/infrastructure/providers/email
 */
import { Injectable } from '@nestjs/common';
import { MAILGUN_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class MailgunProvider extends BaseProvider implements IEmailProvider {
  constructor() {
    super({
      name: 'mailgun',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 2,
    });
  }

  isEnabled(): boolean {
    return (
      MAILGUN_CONFIG.enabled &&
      Boolean(MAILGUN_CONFIG.apiKey) &&
      Boolean(MAILGUN_CONFIG.domain)
    );
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    try {
      const endpoint = `https://api.${MAILGUN_CONFIG.region === 'eu' ? 'eu.' : ''}mailgun.net/v3/${MAILGUN_CONFIG.domain}/messages`;
      const body = new URLSearchParams();
      const to = Array.isArray(input.to) ? input.to : [input.to];
      to.forEach((addr) => body.append('to', addr));
      body.append('from', input.from ?? 'noreply@vubon.com.bd');
      body.append('subject', input.subject);
      if (input.text) body.append('text', input.text);
      if (input.html) body.append('html', input.html);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${MAILGUN_CONFIG.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
        signal: AbortSignal.timeout(MAILGUN_CONFIG.timeoutMs),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          success: false,
          error: `HTTP ${res.status}: ${errText.slice(0, 200)}`,
          errorCode: 'MAILGUN_HTTP_ERROR',
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      const data = (await res.json()) as { id?: string };
      return {
        success: true,
        providerMessageId: data.id ?? `mg-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Mailgun send failed: ${msg}`);
      return {
        success: false,
        error: msg,
        errorCode: 'MAILGUN_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
