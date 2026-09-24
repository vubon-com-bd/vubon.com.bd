import { Injectable, Logger } from '@nestjs/common';

export interface SendSmsInput {
  readonly to: string;
  readonly message: string;
}

export interface SendSmsResult {
  readonly success: boolean;
  readonly messageId?: string;
}

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async send(input: SendSmsInput): Promise<SendSmsResult> {
    // Real implementation: Twilio, local SMS gateway
    this.logger.debug(`Sending SMS to ${input.to}`);
    return { success: true, messageId: `sms-${Date.now()}` };
  }
}
