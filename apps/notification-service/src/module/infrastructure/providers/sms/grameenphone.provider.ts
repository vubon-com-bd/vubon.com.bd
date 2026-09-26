import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class GrameenphoneProvider extends AbstractProvider {
  readonly name = 'grameenphone';
  readonly channel = 'sms';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const messageId = this.generateMessageId();
      this.logger.log(
        `Grameenphone SMS → ${input.recipient} (messageId=${messageId})`,
      );
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.buildResult(false, null, message);
    }
  }
}
