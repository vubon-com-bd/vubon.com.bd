import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsMessageInput,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsService extends KernelSmsService {
  async sendContactVerificationCode(to: string, code: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Your contact verification code: ${code}`,
    });
  }

  async sendRaw(input: SmsMessageInput): Promise<SmsSendResult> {
    return this.send(input);
  }
}
