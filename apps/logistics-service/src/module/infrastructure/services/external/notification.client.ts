/**
 * NotificationClient — HTTP client for notification-service
 * @module logistics-service/infrastructure/services/external
 *
 * ⚠️ Uses native fetch + AbortSignal.timeout (no axios)
 * ⚠️ NEVER throws — returns null on failure (best-effort)
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export type NotificationType =
  | 'transactional' | 'promotional' | 'system' | 'security' | 'reminder'
  | 'alert' | 'welcome' | 'order_update' | 'payment_update' | 'shipping_update'
  | 'account_update' | 'marketing' | 'announcement' | 'verification';

export type NotificationCategory =
  | 'auth' | 'user' | 'order' | 'payment' | 'shipping' | 'product'
  | 'promotion' | 'support' | 'system' | 'security' | 'marketing' | 'reminder';

export type NotificationChannel =
  | 'email' | 'sms' | 'push' | 'in_app' | 'webhook'
  | 'whatsapp' | 'telegram' | 'messenger' | 'slack' | 'voice';

export type NotificationPriority = 'critical' | 'high' | 'normal' | 'low' | 'silent';

export interface SendNotificationInput {
  readonly userId?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly template?: string;
  readonly type?: NotificationType;
  readonly category?: NotificationCategory;
  readonly channels?: readonly NotificationChannel[];
  readonly subject?: string;
  readonly body?: string;
  readonly priority?: NotificationPriority;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface NotificationDTO {
  readonly id: string;
  readonly status?: string;
}

const SERVICE_URL_KEY = 'NOTIFICATION_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:4006';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('NOTIFICATION_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async send(input: SendNotificationInput): Promise<NotificationDTO | null> {
    try {
      // Build payload with all required fields
      const payload = {
        userId: input.userId,
        type: input.type ?? 'transactional',
        category: input.category ?? 'shipping',
        channels: input.channels ?? ['email', 'in_app'],
        subject: input.subject ?? input.template ?? 'Notification',
        body: input.body ?? JSON.stringify(input.data ?? {}),
        priority: input.priority ?? 'normal',
        email: input.email,
        phone: input.phone,
        data: input.data,
      };

      const res = await fetch(`${this.baseUrl}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!res.ok) {
        this.logger.warn(`Notification send failed: HTTP ${res.status}`);
        return null;
      }

      const respBody = (await res.json()) as { data?: NotificationDTO } | NotificationDTO;
      return 'data' in respBody && respBody.data ? respBody.data : (respBody as NotificationDTO);
    } catch (err) {
      this.logger.warn(`Notification send error: ${this.errMsg(err)}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
