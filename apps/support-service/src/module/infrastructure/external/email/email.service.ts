import { Injectable, Logger } from '@nestjs/common';

export interface SendEmailInput {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

export interface SendEmailResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    // Real implementation: @sendgrid/mail, AWS SES, SMTP
    this.logger.debug(`Sending email to ${input.to}: ${input.subject}`);
    return {
      success: true,
      messageId: `email-${Date.now()}`,
    };
  }
}
