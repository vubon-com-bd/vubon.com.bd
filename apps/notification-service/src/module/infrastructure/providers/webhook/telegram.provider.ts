import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class TelegramProvider extends AbstractProvider {
  readonly name = 'telegram';
  readonly channel = 'webhook';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const token = this.config.apiKey ?? process.env.TELEGRAM_BOT_TOKEN;
      if (!token) throw new Error('Telegram bot token not configured');

      await axios.post(
        `https://api.telegram.org/bot${token}/sendMessage`,
        { chat_id: input.recipient, text: input.body },
        { timeout: 10000 },
      );

      this.logger.log(`Telegram → ${input.recipient}`);
      return this.buildResult(true, this.generateMessageId());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Telegram error: ${message}`);
      return this.buildResult(false, null, message);
    }
  }
}
