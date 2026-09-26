/**
 * PushService — Auth-service push notification adapter
 * @module auth-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure/external/push/index';

@Injectable()
export class PushService {
  constructor(private readonly base: KernelPushService) {}

  async sendDeviceLogin(
    userId: string,
    deviceName: string,
    ip: string,
  ): Promise<void> {
    await this.send(userId, 'New Login Detected', {
      body: `Login from ${deviceName} (${ip})`,
      deviceName,
      ip,
    });
  }

  async sendMfaChallenge(userId: string, challengeId: string): Promise<void> {
    await this.send(userId, 'MFA Verification Required', {
      body: 'Approve the login on your device',
      challengeId,
    });
  }

  private async send(
    userId: string,
    title: string,
    data: Readonly<Record<string, string>>,
  ): Promise<void> {
    await (this.base as unknown as {
      send(input: {
        userId: string;
        title: string;
        data: Record<string, string>;
      }): Promise<unknown>;
    }).send({ userId, title, data: { ...data } });
  }
}
