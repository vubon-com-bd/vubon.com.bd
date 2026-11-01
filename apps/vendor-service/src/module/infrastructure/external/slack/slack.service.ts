/**
 * VendorSlackService — admin notifications to Slack
 * @module vendor-service/infrastructure/external/slack
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VendorSlackService {
  private readonly logger = new Logger(VendorSlackService.name);
  private readonly webhookUrl: string;

  constructor() {
    this.webhookUrl = process.env['SLACK_WEBHOOK_URL'] ?? '';
  }

  async notify(params: { text: string }): Promise<{ readonly sent: boolean }> {
    if (!this.webhookUrl) {
      this.logger.debug(`[slack:disabled] ${params.text}`);
      return { sent: false };
    }
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return { sent: res.ok };
    } catch (err) {
      this.logger.warn(`Slack notify failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return { sent: false };
    }
  }
}
