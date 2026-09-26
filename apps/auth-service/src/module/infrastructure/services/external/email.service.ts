/**
 * EmailService — Auth-service email adapter
 * @module auth-service/infrastructure/services/external
 *
 * Wraps the kernel EmailService with auth-specific templates.
 */
import { Injectable } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email/index';
import {
  WelcomeEmailTemplate,
  VerificationEmailTemplate,
  PasswordResetEmailTemplate,
  MfaCodeEmailTemplate,
  RecoveryCodeEmailTemplate,
  AccountLockEmailTemplate,
  DeviceLoginEmailTemplate,
} from '../../external/email/templates';

@Injectable()
export class EmailService {
  constructor(private readonly base: KernelEmailService) {}

  async sendWelcome(to: string, name: string): Promise<void> {
    await this.send(to, WelcomeEmailTemplate, { name });
  }

  async sendVerification(to: string, code: string, expiresAt: string): Promise<void> {
    await this.send(to, VerificationEmailTemplate, { code, expiresAt });
  }

  async sendPasswordReset(to: string, resetUrl: string, expiresAt: string): Promise<void> {
    await this.send(to, PasswordResetEmailTemplate, { resetUrl, expiresAt });
  }

  async sendMfaCode(to: string, code: string): Promise<void> {
    await this.send(to, MfaCodeEmailTemplate, { code });
  }

  async sendRecoveryCodes(to: string, codes: readonly string[]): Promise<void> {
    await this.send(to, RecoveryCodeEmailTemplate, {
      codes: codes.join('\n'),
      count: String(codes.length),
    });
  }

  async sendAccountLock(to: string, reason: string, unlockAt?: string): Promise<void> {
    await this.send(to, AccountLockEmailTemplate, {
      reason,
      unlockAt: unlockAt ?? 'Contact support',
    });
  }

  async sendDeviceLogin(
    to: string,
    deviceName: string,
    ip: string,
    occurredAt: string,
  ): Promise<void> {
    await this.send(to, DeviceLoginEmailTemplate, { deviceName, ip, occurredAt });
  }

  private async send(
    to: string,
    template: { name: string; subject: string; body: string },
    variables: Readonly<Record<string, string>>,
  ): Promise<void> {
    await this.base.send({
      to,
      subject: template.subject,
      body: template.body,
      variables: { ...variables },
    } as never);
  }
}
