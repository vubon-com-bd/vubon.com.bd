import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class SlackProvider extends AbstractProvider {
  readonly name = 'slack';
  readonly channel = 'webhook';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      await axios.post(input.recipient, { text: input.body }, { timeout: 10000 });
      this.logger.log(`Slack webhook → ${input.recipient.slice(0, 30)}...`);
      return this.buildResult(true, this.generateMessageId());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Slack error: ${message}`);
      return this.buildResult(false, null, message);
    }
  }
}
