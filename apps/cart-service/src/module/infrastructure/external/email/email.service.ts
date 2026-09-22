import { Injectable } from '@nestjs/common';
import {
  EmailService as KernelEmailService,
  type EmailMessageInput,
  type EmailSendResult,
} from '@vubon/shared-kernel/infrastructure';
import {
  abandonedCart1hEmail,
  abandonedCart24hEmail,
  abandonedCart48hEmail,
  priceDropEmail,
  backInStockEmail,
} from './templates';

@Injectable()
export class EmailService extends KernelEmailService {
  async sendAbandonedCart1h(to: string, input: {
    userName: string;
    itemCount: number;
    cartUrl: string;
  }): Promise<EmailSendResult> {
    const template = abandonedCart1hEmail(input);
    return this.send({ to, subject: template.subject, html: template.html });
  }

  async sendAbandonedCart24h(to: string, input: {
    userName: string;
    itemCount: number;
    cartUrl: string;
  }): Promise<EmailSendResult> {
    const template = abandonedCart24hEmail(input);
    return this.send({ to, subject: template.subject, html: template.html });
  }

  async sendAbandonedCart48h(to: string, input: {
    userName: string;
    itemCount: number;
    cartUrl: string;
  }): Promise<EmailSendResult> {
    const template = abandonedCart48hEmail(input);
    return this.send({ to, subject: template.subject, html: template.html });
  }

  async sendPriceDrop(to: string, input: {
    userName: string;
    productName: string;
    oldPrice: number;
    newPrice: number;
    currency: string;
    productUrl: string;
  }): Promise<EmailSendResult> {
    const template = priceDropEmail(input);
    return this.send({ to, subject: template.subject, html: template.html });
  }

  async sendBackInStock(to: string, input: {
    userName: string;
    productName: string;
    productUrl: string;
  }): Promise<EmailSendResult> {
    const template = backInStockEmail(input);
    return this.send({ to, subject: template.subject, html: template.html });
  }

  async sendRaw(input: EmailMessageInput): Promise<EmailSendResult> {
    return this.send(input);
  }
}
