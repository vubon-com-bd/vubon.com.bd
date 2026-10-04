/**
 * SmsService — Auth-service SMS adapter
 * @module auth-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure/external/sms/index';

@Injectable()
export class SmsService {
  constructor(private readonly base: KernelSmsService) {}

  async sendOtp(to: string, code: string): Promise<void> {
    await this.send(to, `Your Vubon verification code: ${code}`);
  }

  async sendMfaCode(to: string, code: string): Promise<void> {
    await this.send(to, `Your Vubon login code: ${code}`);
  }

  async sendAccountLocked(to: string, reason: string): Promise<void> {
    await this.send(to, `Your account has been locked. Reason: ${reason}`);
  }

  private async send(to: string, message: string): Promise<void> {
    await (this.base as unknown as {
      send(input: { to: string; message: string }): Promise<unknown>;
    }).send({ to, message });
  }
}
