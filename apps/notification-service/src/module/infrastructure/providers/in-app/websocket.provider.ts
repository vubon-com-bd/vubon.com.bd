import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class WebSocketProvider extends AbstractProvider {
  readonly name = 'websocket';
  readonly channel = 'in_app';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const messageId = this.generateMessageId();
      this.logger.log(
        `WebSocket in-app → user ${input.recipient} (messageId=${messageId})`,
      );
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.buildResult(false, null, message);
    }
  }
}
