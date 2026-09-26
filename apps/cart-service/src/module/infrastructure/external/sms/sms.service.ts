import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsMessageInput,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsService extends KernelSmsService {
  async sendCartReminder(
    to: string,
    itemCount: number,
    cartUrl: string,
  ): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `You have ${itemCount} item(s) in your cart. Complete your order: ${cartUrl}`,
    });
  }

  async sendRaw(input: SmsMessageInput): Promise<SmsSendResult> {
    return this.send(input);
  }
}
