import { Injectable, Logger } from '@nestjs/common';
import type { SmsProvider, SmsOptions, SmsResult } from './sms.interface';

@Injectable()
export class StubSmsProvider implements SmsProvider {
  private readonly logger = new Logger(StubSmsProvider.name);

  async send(options: SmsOptions): Promise<SmsResult> {
    this.logger.log(`[STUB] SMS to ${options.to}`);
    return { success: true, messageId: `stub-${Date.now()}` };
  }
}
