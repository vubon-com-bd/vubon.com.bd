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

  async sendVerificationCode(to: string, code: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Verify your email',
      html: `<p>Your verification code is <strong>${code}</strong></p>`,
      text: `Your verification code is ${code}`,
    });
  }

  async sendPasswordReset(to: string, token: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Reset your password',
      html: `<p>Click to reset your password: <a href="#">${token}</a></p>`,
      text: `Reset token: ${token}`,
    });
  }

  async sendRaw(input: EmailMessageInput): Promise<EmailSendResult> {
    return this.send(input);
  }
}
