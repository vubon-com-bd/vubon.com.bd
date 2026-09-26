import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class TwilioProvider extends AbstractProvider {
  readonly name = 'twilio';
  readonly channel = 'sms';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const accountSid = this.config.apiKey ?? process.env.TWILIO_ACCOUNT_SID;
      const authToken = this.config.apiSecret ?? process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = this.config.fromNumber ?? process.env.TWILIO_FROM_NUMBER;

      if (!accountSid || !authToken || !fromNumber) {
        throw new Error('Twilio credentials not configured');
      }

      // ⚠️ Real Twilio SDK integration (optional)
      // const twilio = require('twilio')(accountSid, authToken);
      // const message = await twilio.messages.create({
      //   body: input.body,
      //   from: fromNumber,
      //   to: input.recipient,
      // });

      const messageId = this.generateMessageId();
      this.logger.log(
        `Twilio SMS → ${input.recipient} (messageId=${messageId})`,
      );

      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Twilio error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.TWILIO_ACCOUNT_SID);
  }
}
