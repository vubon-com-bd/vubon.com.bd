import { Injectable, Logger } from '@nestjs/common';

export interface SendPushInput {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface SendPushResult {
  readonly success: boolean;
  readonly messageId?: string;
}

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  async send(input: SendPushInput): Promise<SendPushResult> {
    // Real implementation: firebase-admin
    this.logger.debug(`Sending push to ${input.deviceToken}`);
    return { success: true, messageId: `push-${Date.now()}` };
  }
}
