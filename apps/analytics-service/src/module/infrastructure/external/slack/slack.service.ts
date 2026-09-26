import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface SlackMessage {
  readonly channel: string;
  readonly text: string;
  readonly blocks?: readonly unknown[];
}

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly http: AxiosInstance;
  private readonly webhookUrl: string;

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL ?? '';
    this.http = axios.create({ timeout: 5000 });
  }

  async send(message: SlackMessage): Promise<boolean> {
    if (!this.webhookUrl) {
      this.logger.warn('Slack webhook URL not configured');
      return false;
    }
    try {
      await this.http.post(this.webhookUrl, {
        channel: message.channel,
        text: message.text,
        blocks: message.blocks,
      });
      return true;
    } catch (error) {
      this.logger.error(`Slack send failed: ${String(error)}`);
      return false;
    }
  }

  async alertKpiBreach(kpiName: string, actual: number, target: number): Promise<boolean> {
    return this.send({
      channel: '#analytics-alerts',
      text: `🚨 KPI Breach: *${kpiName}* — actual=${actual}, target=${target}`,
    });
  }
}
