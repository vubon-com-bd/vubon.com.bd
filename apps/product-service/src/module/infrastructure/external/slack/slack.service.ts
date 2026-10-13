/**
 * SlackService — Slack webhook dispatcher
 * @module product-service/infrastructure/external/slack
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly webhookUrl: string;

  constructor() {
    this.webhookUrl = getOptionalEnv('SLACK_WEBHOOK_URL', '');
  }

  async notify(params: { text: string }): Promise<{ readonly sent: boolean }> {
    if (!this.webhookUrl) return { sent: false };
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(5000),
      });
      return { sent: res.ok };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Slack notify failed: ${msg.slice(0, 100)}`);
      return { sent: false };
    }
  }
}
