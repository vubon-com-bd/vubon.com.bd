import { Injectable } from '@nestjs/common';
import {
  EmailService as KernelEmailService,
  type EmailMessageInput,
  type EmailSendResult,
} from '@vubon/shared-kernel/infrastructure';
import {
  paymentSuccessEmail,
  paymentFailedEmail,
  refundProcessedEmail,
  invoiceEmail,
  subscriptionRenewedEmail,
} from '../../external/email/templates';

@Injectable()
export class EmailService extends KernelEmailService {
  async sendPaymentSuccess(input: {
    to: string;
    orderId: string;
    amount: number;
    currency: string;
  }): Promise<EmailSendResult> {
    const template = paymentSuccessEmail(input);
    return this.send({
      to: input.to,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendPaymentFailed(input: {
    to: string;
    orderId: string;
    reason: string;
  }): Promise<EmailSendResult> {
    const template = paymentFailedEmail(input);
    return this.send({
      to: input.to,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendRefundProcessed(input: {
    to: string;
    refundId: string;
    amount: number;
    currency: string;
  }): Promise<EmailSendResult> {
    const template = refundProcessedEmail(input);
    return this.send({
      to: input.to,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendInvoice(input: {
    to: string;
    invoiceNumber: string;
    amount: number;
    currency: string;
  }): Promise<EmailSendResult> {
    const template = invoiceEmail(input);
    return this.send({
      to: input.to,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendSubscriptionRenewed(input: {
    to: string;
    subscriptionId: string;
    plan: string;
  }): Promise<EmailSendResult> {
    const template = subscriptionRenewedEmail(input);
    return this.send({
      to: input.to,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendRaw(input: EmailMessageInput): Promise<EmailSendResult> {
    return this.send(input);
  }
}
