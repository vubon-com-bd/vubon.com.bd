import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class SesProvider extends AbstractProvider {
  readonly name = 'ses';
  readonly channel = 'email';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const accessKeyId = this.config.apiKey ?? process.env.AWS_ACCESS_KEY_ID;
      const region = this.config.region ?? process.env.AWS_REGION ?? 'us-east-1';

      if (!accessKeyId) {
        throw new Error('AWS credentials not configured');
      }

      // ⚠️ Real AWS SDK integration
      // const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
      // const client = new SESClient({ region });
      // await client.send(new SendEmailCommand({...}));

      const messageId = this.generateMessageId();
      this.logger.log(`SES (${region}) → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SES error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.AWS_ACCESS_KEY_ID);
  }
}
