import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushMessageInput,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PushService extends KernelPushService {
  async sendPaymentSuccess(
    deviceToken: string,
    orderId: string,
    amount: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Payment Successful',
      body: `Order ${orderId} paid: ${amount}`,
      data: { type: 'payment.success', orderId },
    });
  }

  async sendPaymentFailed(
    deviceToken: string,
    orderId: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Payment Failed',
      body: `Order ${orderId} payment failed`,
      data: { type: 'payment.failed', orderId },
    });
  }

  async sendRefundProcessed(
    deviceToken: string,
    amount: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Refund Processed',
      body: `Refund of ${amount} has been processed`,
      data: { type: 'refund.processed' },
    });
  }

  async sendRaw(input: PushMessageInput): Promise<PushSendResult> {
    return this.send(input);
  }
}
