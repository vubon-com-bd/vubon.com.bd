/**
 * Auth Email Service — facade over kernel EmailService
 * @module identity-service/infrastructure/external/email
 */
import { Injectable, Logger } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email';
import {
  WelcomeTemplate,
  VerificationTemplate,
  PasswordResetTemplate,
  MfaCodeTemplate,
  RecoveryCodeTemplate,
  AccountLockTemplate,
  DeviceLoginTemplate,
} from './templates/index.js';

@Injectable()
export class AuthEmailService {
  private readonly logger = new Logger(AuthEmailService.name);

  constructor(private readonly kernel: KernelEmailService) {}

  private async send(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<{ sent: boolean }> {
    try {
      const result = await this.kernel.send({
        to: params.to,
        subject: params.subject,
        html: params.html,
      });
      return { sent: result.success };
    } catch (err) {
      this.logger.warn(
        `email send failed (${params.to}): ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return { sent: false };
    }
  }

  async sendWelcome(to: string, name: string): Promise<{ sent: boolean }> {
    const t = new WelcomeTemplate();
    const data = { recipientName: name, ctaUrl: 'https://vubon.com.bd' };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendVerificationCode(to: string, name: string, code: string): Promise<{ sent: boolean }> {
    const t = new VerificationTemplate();
    const data = { recipientName: name, code, expiresInMinutes: 5 };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendPasswordReset(to: string, name: string, resetUrl: string): Promise<{ sent: boolean }> {
    const t = new PasswordResetTemplate();
    const data = { recipientName: name, resetUrl, expiresInMinutes: 60 };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendMfaCode(to: string, name: string, code: string): Promise<{ sent: boolean }> {
    const t = new MfaCodeTemplate();
    const data = { recipientName: name, code, expiresInMinutes: 5 };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendRecoveryCodes(to: string, name: string, codes: readonly string[]): Promise<{ sent: boolean }> {
    const t = new RecoveryCodeTemplate();
    const data = { recipientName: name, codes };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendAccountLockAlert(to: string, name: string, until: string): Promise<{ sent: boolean }> {
    const t = new AccountLockTemplate();
    const data = { recipientName: name, lockedUntil: until };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }

  async sendDeviceLoginAlert(to: string, name: string, device: string, ip: string): Promise<{ sent: boolean }> {
    const t = new DeviceLoginTemplate();
    const data = { recipientName: name, device, ip };
    return this.send({ to, subject: t.subject(data), html: t.render(data) });
  }
}
