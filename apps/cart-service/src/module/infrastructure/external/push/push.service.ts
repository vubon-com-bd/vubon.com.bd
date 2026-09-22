import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushMessageInput,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PushService extends KernelPushService {
  async sendCartReminder(
    deviceToken: string,
    itemCount: number,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Cart Reminder',
      body: `You have ${itemCount} item(s) waiting in your cart`,
      data: { type: 'cart.reminder' },
    });
  }

  async sendPriceDrop(
    deviceToken: string,
    productName: string,
    newPrice: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Price Drop',
      body: `${productName} is now ${newPrice}`,
      data: { type: 'cart.price_drop' },
    });
  }

  async sendRaw(input: PushMessageInput): Promise<PushSendResult> {
    return this.send(input);
  }
}
