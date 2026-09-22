import { Injectable } from '@nestjs/common';
import {
  EmailService as KernelEmailService,
  type EmailMessageInput,
  type EmailSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class EmailService extends KernelEmailService {
  async sendWelcome(to: string, name: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Welcome to Vubon',
      html: `<h1>Welcome, ${name}!</h1>`,
      text: `Welcome, ${name}!`,
    });
  }

  async sendProfileCompleteEmail(to: string, name: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Your profile is complete',
      html: `<p>Hi ${name}, your profile is now complete.</p>`,
      text: `Hi ${name}, your profile is now complete.`,
    });
  }

  async sendKycStatusEmail(
    to: string,
    status: 'submitted' | 'verified' | 'rejected',
  ): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: `KYC ${status}`,
      html: `<p>Your KYC status: <strong>${status}</strong></p>`,
      text: `Your KYC status: ${status}`,
    });
  }

  async sendRaw(input: EmailMessageInput): Promise<EmailSendResult> {
    return this.send(input);
  }
}
