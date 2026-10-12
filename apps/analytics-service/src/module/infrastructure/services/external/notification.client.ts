/**
 * Notification Service Client
 *
 * Sends analytics alerts via notification-service (which then fans out to email/SMS/push)।
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface NotificationPayload {
  readonly userId: string;
  readonly type: 'email' | 'sms' | 'push';
  readonly title: string;
  readonly body: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface NotificationResult {
  readonly sent: boolean;
  readonly notificationId?: string;
  readonly error?: string;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('NOTIFICATION_SERVICE_URL', 'http://localhost:3012');
    this.timeout = Number(getOptionalEnv('NOTIFICATION_SERVICE_TIMEOUT', '5000'));
  }

  async send(payload: NotificationPayload): Promise<NotificationResult> {
    try {
      const res = await fetch(`${this.baseUrl}/notifications/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        return { sent: false, error: `HTTP ${res.status}` };
      }
      const data = (await res.json()) as { id?: string };
      return { sent: true, notificationId: data.id };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Notification send failed: ${msg.slice(0, 100)}`);
      return { sent: false, error: msg };
    }
  }

  async sendKpiBreachAlert(params: {
    userId: string;
    kpiName: string;
    achievementPercent: number;
  }): Promise<NotificationResult> {
    return this.send({
      userId: params.userId,
      type: 'email',
      title: `⚠️ KPI Breach: ${params.kpiName}`,
      body: `KPI "${params.kpiName}" is at ${params.achievementPercent.toFixed(1)}% of target.`,
      metadata: { alertType: 'kpi-breach', kpiName: params.kpiName },
    });
  }

  async sendAnomalyAlert(params: {
    userId: string;
    metricName: string;
    anomalyCount: number;
  }): Promise<NotificationResult> {
    return this.send({
      userId: params.userId,
      type: 'email',
      title: `🚨 Anomaly: ${params.metricName}`,
      body: `Detected ${params.anomalyCount} anomalies in metric "${params.metricName}".`,
      metadata: { alertType: 'anomaly', metricName: params.metricName },
    });
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
