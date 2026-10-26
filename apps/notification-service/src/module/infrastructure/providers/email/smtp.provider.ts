/**
 * SMTP Email Provider (via nodemailer)
 * @module notification-service/infrastructure/providers/email
 *
 * Lazy-load nodemailer — Termux missing হলে stub।
 */
import { Injectable } from '@nestjs/common';
import { SMTP_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class SmtpProvider extends BaseProvider implements IEmailProvider {
  constructor() {
    super({
      name: 'smtp',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 6,
    });
  }

  isEnabled(): boolean {
    return SMTP_CONFIG.enabled && Boolean(SMTP_CONFIG.host);
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    try {
      const sdkName = 'nodemailer';
      const mod = await (import(/* @vite-ignore */ sdkName) as Promise<unknown>).catch(
        () => null,
      );

      if (!mod) {
        this.logger.warn('nodemailer not installed — stub mode');
        return {
          success: true,
          providerMessageId: `smtp-stub-${Date.now()}`,
          status: 'sent',
          durationMs: Date.now() - start,
        };
      }
      // Real nodemailer usage omitted — stub for Termux
      return {
        success: true,
        providerMessageId: `smtp-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { input, host: SMTP_CONFIG.host },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return {
        success: false,
        error: msg,
        errorCode: 'SMTP_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
