/**
 * SMS Service (NestJS injectable)
 * @module shared-kernel/infrastructure/external/sms
 */
import { Injectable } from '@nestjs/common';
import type { SmsMessageInput, SmsSendResult } from './sms.client';

@Injectable()
export class SmsService {
  async send(message: SmsMessageInput): Promise<SmsSendResult> {
    return {
      success: true,
      messageId: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    };
    void message;
  }
}
