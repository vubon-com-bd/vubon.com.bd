import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class WebPushProvider extends AbstractProvider {
  readonly name = 'web-push';
  readonly channel = 'push';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const messageId = this.generateMessageId();
      this.logger.log(
        `Web Push → ${input.recipient.slice(0, 15)}... (messageId=${messageId})`,
      );
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.buildResult(false, null, message);
    }
  }
}
