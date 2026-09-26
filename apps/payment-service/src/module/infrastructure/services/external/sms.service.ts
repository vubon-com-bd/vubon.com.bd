import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsMessageInput,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsService extends KernelSmsService {
  async sendPaymentConfirmation(
    to: string,
    orderId: string,
    amount: string,
  ): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Payment confirmed for order ${orderId}: ${amount}`,
    });
  }

  async sendPaymentFailed(to: string, orderId: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Payment failed for order ${orderId}. Please retry.`,
    });
  }

  async sendRefundAlert(to: string, amount: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Refund of ${amount} processed successfully.`,
    });
  }

  async sendRaw(input: SmsMessageInput): Promise<SmsSendResult> {
    return this.send(input);
  }
}
