import { Injectable } from '@nestjs/common';
import {
  SmsService as KernelSmsService,
  type SmsMessageInput,
  type SmsSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SmsService extends KernelSmsService {
  async sendVendorApproved(to: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: 'Your Vubon vendor account has been approved.',
    });
  }

  async sendVendorSuspended(to: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: 'Your Vubon vendor account has been suspended. Contact support.',
    });
  }

  async sendPayoutAlert(to: string, amount: number, currency: string): Promise<SmsSendResult> {
    return this.send({
      to,
      message: `Payout sent: ${amount} ${currency}`,
    });
  }

  async sendRaw(input: SmsMessageInput): Promise<SmsSendResult> {
    return this.send(input);
  }
}
