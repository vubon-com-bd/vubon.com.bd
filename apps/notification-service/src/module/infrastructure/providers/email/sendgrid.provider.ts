import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class SendGridProvider extends AbstractProvider {
  readonly name = 'sendgrid';
  readonly channel = 'email';

  private initialized = false;

  private ensureInitialized(): void {
    if (this.initialized) return;
    const apiKey = this.config.apiKey;
    if (!apiKey) {
      throw new Error('SendGrid API key is not configured');
    }
    sgMail.setApiKey(apiKey);
    this.initialized = true;
  }

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      this.ensureInitialized();

      const fromAddress = this.config.fromAddress ?? 'no-reply@vubon.com';

      const [response] = await sgMail.send({
        to: input.recipient,
        from: fromAddress,
        subject: input.subject ?? '(no subject)',
        text: input.body,
        html: input.bodyHtml ?? input.body,
        customArgs: input.data
          ? Object.fromEntries(
              Object.entries(input.data).map(([k, v]) => [k, String(v)]),
            )
          : undefined,
      });

      const messageId =
        (response.headers?.['x-message-id'] as string | undefined) ??
        this.generateMessageId();

      this.logger.log(
        `SendGrid delivered to ${input.recipient} (messageId=${messageId})`,
      );

      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SendGrid error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(this.config.apiKey);
  }
}
