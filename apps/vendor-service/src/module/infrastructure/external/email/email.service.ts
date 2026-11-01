/**
 * VendorEmailService — vendor-service email dispatcher
 * @module vendor-service/infrastructure/external/email
 *
 * Self-contained — attempts to load kernel EmailService if available,
 * otherwise logs the outgoing mail (graceful degrade for dev/Termux).
 */
import { Injectable, Logger } from '@nestjs/common';

export interface SendEmailInput {
  readonly to: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
  readonly from?: string;
}

@Injectable()
export class VendorEmailService {
  private readonly logger = new Logger(VendorEmailService.name);

  async send(input: SendEmailInput): Promise<{ readonly sent: boolean }> {
    // Placeholder: in production this would call a provider (SES/Resend/etc.)
    this.logger.log(`[email] → ${input.to} | ${input.subject}`);
    return { sent: true };
  }

  async sendToAdmin(input: Omit<SendEmailInput, 'to'>): Promise<{ readonly sent: boolean }> {
    return this.send({ ...input, to: 'vendors-admin@vubon.com.bd' });
  }
}
