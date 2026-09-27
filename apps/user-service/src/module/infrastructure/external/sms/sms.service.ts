/**
 * User SMS Service
 */
import { Injectable } from '@nestjs/common';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class UserSmsService {
  constructor(private readonly kernel: KernelSmsService) {}

  async sendVerificationCode(to: string, code: string): Promise<void> {
    await this.kernel.send({
      to,
      message: `Your Vubon verification code is ${code}. It expires in 10 minutes.`,
    });
  }

  async sendKycStatusUpdate(to: string, status: string): Promise<void> {
    await this.kernel.send({
      to,
      message: `Your KYC status has been updated to: ${status}`,
    });
  }
}
