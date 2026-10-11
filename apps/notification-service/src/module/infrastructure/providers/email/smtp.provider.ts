/**
 * SmtpEmailProvider — SMTP-based email via nodemailer
 * @module notification-service/infrastructure/providers/email
 */
import { Injectable, Optional } from '@nestjs/common';
import { SMTP_CONFIG, EMAIL_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { EmailSendPayload, IEmailProvider } from '../base/provider.interface.js';

type SmtpConfig = typeof SMTP_CONFIG;
type EmailConfig = typeof EMAIL_CONFIG;

interface MailTransporter {
  sendMail(options: unknown): Promise<{ messageId: string }>;
  verify(): Promise<boolean>;
}

interface NodemailerLike {
  createTransport(options: unknown): MailTransporter;
}

export interface SmtpProviderConfig extends Partial<SmtpConfig> {
  readonly email?: Partial<EmailConfig>;
}

@Injectable()
export class SmtpEmailProvider extends BaseHttpProvider implements IEmailProvider {
  readonly channel = 'email' as const;
  private readonly cfg: SmtpConfig;
  private readonly emailCfg: EmailConfig;
  private transporter: MailTransporter | null = null;

  constructor(@Optional() config?: SmtpProviderConfig) {
    super({
      name: 'smtp',
      channel: 'email',
      timeoutMs: SMTP_CONFIG.socketTimeoutMs ?? 30_000,
      perSecond: 5,
      perDay: 500,
    });
    this.cfg = { ...SMTP_CONFIG, ...(config ?? {}) } as SmtpConfig;
    this.emailCfg = { ...EMAIL_CONFIG, ...(config?.email ?? {}) } as EmailConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.cfg.host && this.cfg.user);
  }

  async health(): Promise<ProviderHealthStatus> {
    if (!this.isEnabled()) {
      return { healthy: false, enabled: false, reason: 'Not configured' };
    }
    try {
      const transporter = await this.getTransporter();
      await transporter.verify();
      return { healthy: true, enabled: true };
    } catch (err) {
      return {
        healthy: false,
        enabled: true,
        reason: err instanceof Error ? err.message : 'Unknown',
      };
    }
  }

  async send(payload: EmailSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'SMTP disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    try {
      const transporter = await this.getTransporter();
      const result = await transporter.sendMail({
        from: payload.from ?? this.buildFrom(),
        to: payload.to.join(', '),
        cc: payload.cc?.join(', '),
        bcc: payload.bcc?.join(', '),
        replyTo: payload.replyTo ?? (this.emailCfg.replyTo || undefined),
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        headers: payload.headers,
        attachments: payload.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content,
          path: a.url,
          contentType: a.contentType,
        })),
      });
      this.logger.log(`SMTP sent → ${payload.to.join(',')} (id=${result.messageId})`);
      return { success: true, providerMessageId: result.messageId };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const retryable = /ECONN|ETIMEDOUT|ENOTFOUND|EAI_AGAIN/.test(message);
      return {
        success: false,
        error: message,
        errorCode: retryable ? 'NETWORK_ERROR' : 'SMTP_ERROR',
        retryable,
      };
    }
  }

  private buildFrom(): string {
    const name = this.emailCfg.fromName || 'Vubon';
    const address = this.emailCfg.fromAddress || this.cfg.user || 'noreply@localhost';
    return `${name} <${address}>`;
  }

  private async getTransporter(): Promise<MailTransporter> {
    if (this.transporter) return this.transporter;

    let nodemailer: NodemailerLike;
    try {
      nodemailer = (await import('nodemailer')) as unknown as NodemailerLike;
    } catch {
      throw new Error(
        'nodemailer is not installed. Run `pnpm add nodemailer` in the notification-service to enable SMTP.',
      );
    }

    this.transporter = nodemailer.createTransport({
      host: this.cfg.host,
      port: this.cfg.port,
      secure: this.cfg.secure,
      auth: { user: this.cfg.user, pass: this.cfg.password },
      pool: this.cfg.pool,
      maxConnections: this.cfg.maxConnections,
      maxMessages: this.cfg.maxMessages,
      connectionTimeout: this.cfg.connectionTimeoutMs,
      greetingTimeout: this.cfg.greetingTimeoutMs,
      socketTimeout: this.cfg.socketTimeoutMs,
      tls: { rejectUnauthorized: this.cfg.tlsRejectUnauthorized },
    });
    return this.transporter;
  }
}
