import { Injectable } from '@nestjs/common';
import {
  PushService as KernelPushService,
  type PushMessageInput,
  type PushSendResult,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PushService extends KernelPushService {
  async sendLoginNotification(
    deviceToken: string,
    ip: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'New login detected',
      body: `Your account was accessed from ${ip}`,
      data: { type: 'login', ip },
    });
  }

  async sendMfaChallenge(
    deviceToken: string,
    challengeId: string,
  ): Promise<PushSendResult> {
    return this.send({
      deviceToken,
      title: 'MFA Challenge',
      body: 'Approve the login attempt',
      data: { type: 'mfa', challengeId },
    });
  }

  async sendRaw(input: PushMessageInput): Promise<PushSendResult> {
    return this.send(input);
  }
}
