import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushMessageInput,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PushService extends KernelPushService {
  async sendVendorApproved(
    deviceToken: string,
    vendorId: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Vendor approved',
      body: 'Your vendor account has been approved.',
      data: { type: 'vendor.approved', vendorId },
    });
  }

  async sendNewOrder(
    deviceToken: string,
    vendorId: string,
    orderId: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'New order received',
      body: 'You have a new order',
      data: { type: 'vendor.order.new', vendorId, orderId },
    });
  }

  async sendPayoutProcessed(
    deviceToken: string,
    amount: number,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Payout processed',
      body: `Your payout of ${amount} has been processed`,
      data: { type: 'vendor.payout.processed', amount },
    });
  }

  async sendRaw(input: PushMessageInput): Promise<PushSendResult> {
    return this.send(input);
  }
}
