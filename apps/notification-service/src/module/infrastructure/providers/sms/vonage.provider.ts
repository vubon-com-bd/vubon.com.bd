import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class VonageProvider extends AbstractProvider {
  readonly name = 'vonage';
  readonly channel = 'sms';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const apiKey = this.config.apiKey ?? process.env.VONAGE_API_KEY;
      const apiSecret = this.config.apiSecret ?? process.env.VONAGE_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error('Vonage credentials not configured');
      }

      const messageId = this.generateMessageId();
      this.logger.log(`Vonage SMS → ${input.recipient} (messageId=${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Vonage error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.VONAGE_API_KEY);
  }
}
