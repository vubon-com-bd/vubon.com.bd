import { Injectable, Logger } from '@nestjs/common';
import type { EmailProvider, EmailOptions, EmailResult } from './email.interface';

@Injectable()
export class StubEmailProvider implements EmailProvider {
  private readonly logger = new Logger(StubEmailProvider.name);

  async send(options: EmailOptions): Promise<EmailResult> {
    this.logger.log(`[STUB] Email to ${options.to}: ${options.subject}`);
    return {
      success: true,
      messageId: `stub-${Date.now()}`,
    };
  }
}
