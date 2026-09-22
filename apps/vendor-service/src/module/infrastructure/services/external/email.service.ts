import { Injectable } from '@nestjs/common';
import {
  EmailService as KernelEmailService,
  type EmailMessageInput,
  type EmailSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class EmailService extends KernelEmailService {
  async sendVendorRegistered(to: string, vendorName: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Welcome to Vubon Vendor Program',
      html: `<h1>Welcome, ${vendorName}!</h1><p>Your vendor account has been created.</p>`,
      text: `Welcome, ${vendorName}!`,
    });
  }

  async sendVendorApproved(to: string, vendorName: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Your vendor account is approved',
      html: `<h1>Congratulations, ${vendorName}!</h1><p>Your vendor account has been approved.</p>`,
      text: `Congratulations, ${vendorName}! Your account is approved.`,
    });
  }

  async sendVendorRejected(
    to: string,
    vendorName: string,
    reason: string,
  ): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Vendor application update',
      html: `<h1>Hello ${vendorName}</h1><p>Your application was not approved. Reason: ${reason}</p>`,
      text: `Your application was not approved. Reason: ${reason}`,
    });
  }

  async sendVendorSuspended(to: string, vendorName: string): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Vendor account suspended',
      html: `<h1>Hello ${vendorName}</h1><p>Your vendor account has been suspended.</p>`,
      text: `Your vendor account has been suspended.`,
    });
  }

  async sendPayoutProcessed(
    to: string,
    amount: number,
    currency: string,
  ): Promise<EmailSendResult> {
    return this.send({
      to,
      subject: 'Payout processed',
      html: `<h1>Payout sent</h1><p>Amount: ${amount} ${currency}</p>`,
      text: `Payout sent: ${amount} ${currency}`,
    });
  }

  async sendRaw(input: EmailMessageInput): Promise<EmailSendResult> {
    return this.send(input);
  }
}
