/**
 * ProductEmailService — email dispatcher
 * @module product-service/infrastructure/external/email
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductEmailPayload {
  readonly to: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
}

@Injectable()
export class ProductEmailService {
  private readonly logger = new Logger(ProductEmailService.name);

  async send(payload: ProductEmailPayload): Promise<{ readonly sent: boolean }> {
    const from = getOptionalEnv('EMAIL_FROM', 'products@vubon.com.bd');
    const apiKey = getOptionalEnv('SENDGRID_API_KEY', '');

    if (!apiKey) {
      this.logger.warn(`No SENDGRID_API_KEY — email skipped for ${payload.to}`);
      return { sent: false };
    }

    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: payload.to }] }],
          from: { email: from },
          subject: payload.subject,
          content: [
            {
              type: payload.html ? 'text/html' : 'text/plain',
              value: payload.html ?? payload.text ?? '',
            },
          ],
        }),
        signal: AbortSignal.timeout(5000),
      });
      return { sent: res.ok };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Email send failed: ${msg.slice(0, 120)}`);
      return { sent: false };
    }
  }
}
