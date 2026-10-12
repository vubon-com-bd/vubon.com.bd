/**
 * Auth SMS Service — facade over kernel SmsService
 * @module identity-service/infrastructure/external/sms
 */
import { Injectable, Logger } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure/external/sms';

@Injectable()
export class AuthSmsService {
  private readonly logger = new Logger(AuthSmsService.name);

  constructor(private readonly kernel: KernelSmsService) {}

  async send(to: string, message: string): Promise<{ sent: boolean }> {
    try {
      const result = await this.kernel.send({ to, message });
      return { sent: result.success };
    } catch (err) {
      this.logger.warn(
        `sms send failed (${to}): ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return { sent: false };
    }
  }

  async sendVerificationCode(to: string, code: string): Promise<{ sent: boolean }> {
    return this.send(to, `Your Vubon verification code is: ${code}`);
  }

  async sendMfaCode(to: string, code: string): Promise<{ sent: boolean }> {
    return this.send(to, `Your Vubon 2FA code is: ${code}`);
  }

  async sendAccountLockAlert(to: string, until: string): Promise<{ sent: boolean }> {
    return this.send(to, `Your Vubon account was locked until ${until}.`);
  }
}
