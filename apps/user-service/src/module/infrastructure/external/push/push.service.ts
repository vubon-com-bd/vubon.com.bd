/**
 * User Push Notification Service
 */
import { Injectable } from '@nestjs/common';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure';

export interface UserPushInput {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class UserPushService {
  constructor(private readonly kernel: KernelPushService) {}

  async send(input: UserPushInput): Promise<void> {
    await this.kernel.send({
      deviceToken: input.deviceToken,
      title: input.title,
      body: input.body,
      data: input.data,
    });
  }

  async sendKycUpdate(
    deviceToken: string,
    status: string
  ): Promise<void> {
    await this.send({
      deviceToken,
      title: 'KYC Update',
      body: `Your KYC status: ${status}`,
    });
  }
}
