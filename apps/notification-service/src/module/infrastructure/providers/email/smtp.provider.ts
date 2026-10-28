/**
 * SMTP Email Provider (via nodemailer)
 * @module notification-service/infrastructure/providers/email
 */
import { Injectable } from '@nestjs/common';
import { SMTP_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IEmailProvider,
  EmailProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

// ─── Lazy-load nodemailer (cached) ───
let nodemailerModule: typeof import('nodemailer') | null = null;
let cachedTransporter: import('nodemailer').Transporter | null = null;

async function getNodemailer(): Promise<typeof import('nodemailer') | null> {
  if (nodemailerModule) return nodemailerModule;
  try {
    nodemailerModule = await import('nodemailer');
    return nodemailerModule;
  } catch {
    return null;
  }
}

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
    return (
      SMTP_CONFIG.enabled &&
      Boolean(SMTP_CONFIG.host) &&
      Boolean(SMTP_CONFIG.user)
    );
  }

  /**
   * Get or create reusable transporter (connection pool)
   */
  private async getTransporter(): Promise<import('nodemailer').Transporter | null> {
    if (cachedTransporter) return cachedTransporter;

    const nodemailer = await getNodemailer();
    if (!nodemailer) {
      this.logger.warn('nodemailer not installed — stub mode');
      return null;
    }

    const transporter = nodemailer.default.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.password,
      },
      pool: SMTP_CONFIG.pool,
      maxConnections: SMTP_CONFIG.maxConnections,
      maxMessages: SMTP_CONFIG.maxMessages,
      connectionTimeout: SMTP_CONFIG.connectionTimeoutMs,
      greetingTimeout: SMTP_CONFIG.greetingTimeoutMs,
      socketTimeout: SMTP_CONFIG.socketTimeoutMs,
      tls: {
        rejectUnauthorized: SMTP_CONFIG.tlsRejectUnauthorized,
      },
    });

    cachedTransporter = transporter;
    this.logger.log(
      `📮 SMTP transporter ready: ${SMTP_CONFIG.host}:${SMTP_CONFIG.port}`,
    );
    return transporter;
  }

  async send(input: EmailProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) {
      return this.notConfigured();
    }

    const start = Date.now();

    try {
      const transporter = await this.getTransporter();

      if (!transporter) {
        this.logger.warn('SMTP transporter unavailable — stub');
        return {
          success: true,
          providerMessageId: `smtp-stub-${Date.now()}`,
          status: 'sent',
          durationMs: Date.now() - start,
        };
      }

      this.logger.log(
        `📧 SMTP sending → ${input.to} | subject="${input.subject}"`,
      );

      // Force-typed sendMail to avoid nodemailer's strict overloads
      const sendMailFn = transporter.sendMail.bind(transporter) as (
        options: Record<string, unknown>,
      ) => Promise<{
        messageId: string;
        accepted?: readonly string[];
        rejected?: readonly string[];
        response?: string;
      }>;

      const info = await sendMailFn({
        from: SMTP_CONFIG.user,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html: input.html,
      });

      this.logger.log(`✅ SMTP sent → ${input.to} | msgId=${info.messageId}`);

      return {
        success: true,
        providerMessageId: info.messageId,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: {
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
        },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`SMTP send failed → ${input.to}: ${msg}`);
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
