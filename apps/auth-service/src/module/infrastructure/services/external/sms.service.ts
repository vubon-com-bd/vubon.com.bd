import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsMessageInput,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsService extends KernelSmsService {
  async sendVerificationCode(to: string, code: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Your Vubon verification code is ${code}`,
    });
  }

  async sendOtp(to: string, otp: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Your OTP is ${otp}. Do not share it with anyone.`,
    });
  }

  async sendAccountLockAlert(to: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: 'Your Vubon account has been locked due to too many attempts.',
    });
  }

  async sendRaw(input: SmsMessageInput): Promise<SmsSendResult> {
    return this.send(input);
  }
}
