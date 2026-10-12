/**
 * Slack Service — notification channel for analytics alerts
 * @module analytics-service/infrastructure/external/slack
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = getOptionalEnv('SLACK_WEBHOOK_URL', '');
  }

  async notifyKpiBreach(params: {
    kpiName: string;
    achievementPercent: number;
    severity: 'warning' | 'critical';
  }): Promise<{ readonly sent: boolean }> {
    const emoji = params.severity === 'critical' ? '🚨' : '⚠️';
    return this.send({
      text: `${emoji} *KPI Breach:* ${params.kpiName} — ${params.achievementPercent.toFixed(1)}% of target`,
    });
  }

  async notifyAnomaly(params: {
    metricName: string;
    anomalyCount: number;
  }): Promise<{ readonly sent: boolean }> {
    return this.send({
      text: `🔍 *Anomaly Detected:* ${params.anomalyCount} anomalies in *${params.metricName}*`,
    });
  }

  async notifyReportReady(params: {
    reportName: string;
    reportUrl: string;
  }): Promise<{ readonly sent: boolean }> {
    return this.send({
      text: `📊 *Report Ready:* <${params.reportUrl}|${params.reportName}>`,
    });
  }

  private async send(payload: { text: string }): Promise<{ readonly sent: boolean }> {
    if (!this.webhookUrl) {
      this.logger.debug(`Slack webhook not configured — skipping: ${payload.text}`);
      return { sent: false };
    }
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { sent: res.ok };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Slack send failed: ${msg.slice(0, 120)}`);
      return { sent: false };
    }
  }
}
