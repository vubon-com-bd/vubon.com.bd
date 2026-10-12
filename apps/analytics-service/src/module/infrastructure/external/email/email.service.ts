/**
 * Email Service (SendGrid adapter)
 * @module analytics-service/infrastructure/external/email
 *
 * Wraps shared-kernel EmailService with analytics-specific sending.
 */
import { Injectable, Logger } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email';
import { getOptionalEnv } from '@vubon/shared-config/common';

@Injectable()
export class AnalyticsEmailService {
  private readonly logger = new Logger(AnalyticsEmailService.name);

  constructor(private readonly kernel: KernelEmailService) {}

  async sendKpiBreachAlert(params: {
    to: string;
    kpiName: string;
    achievementPercent: number;
    actualValue: number;
    targetValue: number;
  }): Promise<{ readonly sent: boolean }> {
    const subject = `⚠️ KPI Breach Alert: ${params.kpiName}`;
    const html = `
      <h2>KPI Breach Detected</h2>
      <p><strong>${params.kpiName}</strong> has fallen below target.</p>
      <ul>
        <li>Actual: ${params.actualValue}</li>
        <li>Target: ${params.targetValue}</li>
        <li>Achievement: ${params.achievementPercent.toFixed(1)}%</li>
      </ul>
    `;
    const from = getOptionalEnv('EMAIL_FROM', 'analytics@vubon.com.bd');
    const result = await this.kernel.send({ to: params.to, subject, html, from });
    return { sent: result.success };
  }

  async sendAnomalyAlert(params: {
    to: string;
    metricName: string;
    anomalyCount: number;
    severity: string;
  }): Promise<{ readonly sent: boolean }> {
    const subject = `🚨 Anomaly Detected: ${params.metricName}`;
    const html = `
      <h2>Anomaly Alert</h2>
      <p>Detected <strong>${params.anomalyCount}</strong> anomalies in metric <em>${params.metricName}</em>.</p>
      <p>Severity: <strong>${params.severity}</strong></p>
    `;
    const from = getOptionalEnv('EMAIL_FROM', 'analytics@vubon.com.bd');
    const result = await this.kernel.send({ to: params.to, subject, html, from });
    return { sent: result.success };
  }

  async sendScheduledReport(params: {
    to: readonly string[];
    reportName: string;
    reportUrl: string;
    format: string;
  }): Promise<{ readonly sent: number }> {
    const subject = `📊 Scheduled Report: ${params.reportName}`;
    const html = `
      <h2>Your scheduled report is ready</h2>
      <p>Report: <strong>${params.reportName}</strong></p>
      <p>Format: ${params.format}</p>
      <p><a href="${params.reportUrl}">Download Report</a></p>
    `;
    const from = getOptionalEnv('EMAIL_FROM', 'analytics@vubon.com.bd');
    let sent = 0;
    for (const recipient of params.to) {
      const result = await this.kernel.send({ to: recipient, subject, html, from });
      if (result.success) sent++;
    }
    return { sent };
  }
}
