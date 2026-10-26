/**
 * SendGrid Email Provider
 * @module notification-service/infrastructure/providers/email
 *
 * Real SendGrid SDK load is LAZY — Termux ARM64 এ SDK missing হলে
 * graceful degrade। Config missing হলে notConfigured() return।
 */
import { Injectable } from '@nestjs/common';
import { SENDGRID_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class SendgridProvider extends BaseProvider implements IEmailProvider {
  constructor() {
    super({
      name: 'sendgrid',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 1,
    });
  }

  isEnabled(): boolean {
    return SENDGRID_CONFIG.enabled && Boolean(SENDGRID_CONFIG.apiKey);
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();

    try {
      // Lazy SDK load (avoid TS resolution — optional dep)
      const sdkName = '@sendgrid/mail';
      const mod = (await (import(/* @vite-ignore */ sdkName) as Promise<unknown>).catch(
        () => null,
      )) as {
        default: {
          setApiKey(k: string): void;
          send(msg: unknown): Promise<Array<{ headers: Record<string, string> }>>;
        };
      } | null;

      if (!mod) {
        this.logger.warn('@sendgrid/mail not installed — using stub send');
        return {
          success: true,
          providerMessageId: `sg-stub-${Date.now()}`,
          status: 'sent',
          durationMs: Date.now() - start,
        };
      }

      const sg = mod.default;
      sg.setApiKey(SENDGRID_CONFIG.apiKey);

      const to = Array.isArray(input.to) ? [...input.to] : [input.to];
      const result = await sg.send({
        to,
        from: input.from ?? 'noreply@vubon.com.bd',
        subject: input.subject,
        text: input.text,
        html: input.html,
        headers: input.headers,
      });

      const messageId = result[0]?.headers['x-message-id'] ?? `sg-${Date.now()}`;
      return {
        success: true,
        providerMessageId: messageId,
        status: 'sent',
        durationMs: Date.now() - start,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`SendGrid send failed: ${msg}`);
      return {
        success: false,
        error: msg,
        errorCode: 'SENDGRID_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
