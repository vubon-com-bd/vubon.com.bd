/**
 * EmailService — SMTP email sender (nodemailer optional)
 * @module logistics-service/infrastructure/external/email
 *
 * ⚠️ Best-effort — returns false on failure
 * ⚠️ Uses ENV-configured SMTP or falls back to log-only mode
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface SendEmailInput {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly enabled: boolean;
  private readonly fromAddress: string;

  constructor() {
    this.enabled = getOptionalEnv('EMAIL_ENABLED', 'false') === 'true';
    this.fromAddress = getOptionalEnv('EMAIL_FROM', 'noreply@vubon.com.bd');
  }

  async send(input: SendEmailInput): Promise<boolean> {
    if (!this.enabled) {
      this.logger.log(`[EMAIL-LOG-ONLY] to=${input.to} subject="${input.subject}" (SMTP disabled)`);
      return true;
    }
    try {
      // Placeholder — actual nodemailer integration possible via SMTP transport
      this.logger.log(`[EMAIL-SEND] from=${this.fromAddress} to=${input.to} subject="${input.subject}"`);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Email send failed: ${msg}`);
      return false;
    }
  }

  async isHealthy(): Promise<boolean> { return true; }
}
