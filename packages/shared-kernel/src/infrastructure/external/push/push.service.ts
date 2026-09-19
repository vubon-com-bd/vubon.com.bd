/**
 * Push Notification Service (NestJS injectable)
 * @module shared-kernel/infrastructure/external/push
 */
import { Injectable } from '@nestjs/common';
import type { PushMessageInput, PushSendResult } from './push.client';

@Injectable()
export class PushService {
  async send(message: PushMessageInput): Promise<PushSendResult> {
    return {
      success: true,
      messageId: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    };
    void message;
  }
}
