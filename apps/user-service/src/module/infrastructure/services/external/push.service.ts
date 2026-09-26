import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushMessageInput,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PushService extends KernelPushService {
  async sendProfileUpdate(deviceToken: string): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'Profile updated',
      body: 'Your profile has been updated successfully',
      data: { type: 'profile.update' },
    });
  }

  async sendRaw(input: PushMessageInput): Promise<PushSendResult> {
    return this.send(input);
  }
}
