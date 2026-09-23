import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class LogisticsSmsService extends KernelSmsService {
  async sendShipmentUpdate(to: string, trackingNumber: string, status: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Shipment ${trackingNumber} is now ${status}.`,
    });
  }

  async sendDeliveryAttempt(to: string, trackingNumber: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Delivery attempt for ${trackingNumber} was made.`,
    });
  }
}
