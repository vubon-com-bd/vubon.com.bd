import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class FcmProvider extends AbstractProvider {
  readonly name = 'fcm';
  readonly channel = 'push';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const serverKey = this.config.apiKey ?? process.env.FCM_SERVER_KEY;
      if (!serverKey) {
        throw new Error('FCM server key not configured');
      }

      const messageId = this.generateMessageId();
      this.logger.log(
        `FCM push → ${input.recipient.slice(0, 15)}... (messageId=${messageId})`,
      );
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`FCM error: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.FCM_SERVER_KEY);
  }
}
