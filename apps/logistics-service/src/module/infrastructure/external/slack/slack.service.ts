/**
 * SlackService — admin alerts via Slack webhook
 * @module logistics-service/infrastructure/external/slack
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly webhookUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.webhookUrl = getOptionalEnv('SLACK_WEBHOOK_URL', '');
    this.timeoutMs = Number(getOptionalEnv('SLACK_TIMEOUT_MS', '5000'));
  }

  async notify(channel: string, text: string): Promise<boolean> {
    if (!this.webhookUrl) {
      this.logger.log(`[SLACK-LOG-ONLY] #${channel}: ${text}`);
      return true;
    }
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, text }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      return res.ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Slack notify failed: ${msg}`);
      return false;
    }
  }

  async isHealthy(): Promise<boolean> { return true; }
}
