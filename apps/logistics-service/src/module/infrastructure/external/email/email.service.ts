import { Injectable } from '@nestjs/common';
import {
  EmailService as KernelEmailService,
  type EmailSendResult,
} from '@vubon/shared-kernel/infrastructure';
import {
  ShipmentCreatedEmailTemplate,
  OutForDeliveryEmailTemplate,
  DeliveredEmailTemplate,
  DeliveryFailedEmailTemplate,
  ReturnApprovedEmailTemplate,
  ReturnCompletedEmailTemplate,
} from './templates';

@Injectable()
export class LogisticsEmailService extends KernelEmailService {
  async sendShipmentCreated(to: string, trackingNumber: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: ShipmentCreatedEmailTemplate.subject,
      html: ShipmentCreatedEmailTemplate.html,
    });
  }

  async sendOutForDelivery(to: string, trackingNumber: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: OutForDeliveryEmailTemplate.subject,
      html: OutForDeliveryEmailTemplate.html,
    });
  }

  async sendDelivered(to: string, trackingNumber: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: DeliveredEmailTemplate.subject,
      html: DeliveredEmailTemplate.html,
    });
  }

  async sendDeliveryFailed(to: string, reason: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: DeliveryFailedEmailTemplate.subject,
      html: DeliveryFailedEmailTemplate.html,
    });
  }

  async sendReturnApproved(to: string, returnId: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: ReturnApprovedEmailTemplate.subject,
      html: ReturnApprovedEmailTemplate.html,
    });
  }

  async sendReturnCompleted(to: string, returnId: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: ReturnCompletedEmailTemplate.subject,
      html: ReturnCompletedEmailTemplate.html,
    });
  }
}
