import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class LogisticsPushService extends KernelPushService {
  async notifyOutForDelivery(deviceToken: string, trackingNumber: string): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Out for Delivery',
      body: `Your shipment ${trackingNumber} is on the way`,
      data: { type: 'out_for_delivery', trackingNumber },
    });
  }

  async notifyDelivered(deviceToken: string, trackingNumber: string): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Delivered',
      body: `Shipment ${trackingNumber} delivered successfully`,
      data: { type: 'delivered', trackingNumber },
    });
  }
}
