/**
 * WebPushProvider — Web Push via VAPID
 * @module notification-service/infrastructure/providers/push
 */
import { Injectable, Optional } from '@nestjs/common';
import { WEB_PUSH_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { IPushProvider, PushSendPayload } from '../base/provider.interface.js';

type WebPushConfig = typeof WEB_PUSH_CONFIG;

interface PushSubscription {
  readonly endpoint: string;
  readonly keys?: { readonly p256dh: string; readonly auth: string };
}

@Injectable()
export class WebPushProvider extends BaseHttpProvider implements IPushProvider {
  readonly channel = 'push' as const;
  private readonly cfg: WebPushConfig;

  constructor(@Optional() config?: Partial<WebPushConfig>) {
    super({ name: 'web_push', channel: 'push', timeoutMs: 15_000, perSecond: 200, perDay: 500_000 });
    this.cfg = { ...WEB_PUSH_CONFIG, ...(config ?? {}) } as WebPushConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.cfg.vapidPublicKey && this.cfg.vapidPrivateKey);
  }

  async health(): Promise<ProviderHealthStatus> {
    return this.isEnabled()
      ? { healthy: true, enabled: true }
      : { healthy: false, enabled: false, reason: 'Not configured' };
  }

  async send(payload: PushSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'WebPush disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    let sub: PushSubscription;
    try {
      sub = JSON.parse(payload.token) as PushSubscription;
    } catch {
      return {
        success: false,
        error: 'Invalid WebPush subscription (malformed JSON)',
        errorCode: 'INVALID_SUBSCRIPTION',
        retryable: false,
      };
    }
    if (!sub.endpoint) {
      return {
        success: false,
        error: 'WebPush subscription missing endpoint',
        errorCode: 'INVALID_SUBSCRIPTION',
        retryable: false,
      };
    }
    try {
      const response = await this.httpRequest<unknown>({
        method: 'POST',
        url: sub.endpoint,
        headers: {
          TTL: String(this.cfg.ttlSeconds ?? 2419200),
          Urgency: payload.silent ? 'low' : 'high',
        },
        body: { title: payload.title, body: payload.body, data: payload.data },
      });
      this.logger.log(`WebPush sent (status=${response.status})`);
      return { success: true, providerMessageId: `webpush-${Date.now()}` };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const gone = /410|404/.test(message);
      return {
        success: false,
        error: message,
        errorCode: gone ? 'SUBSCRIPTION_GONE' : 'PROVIDER_ERROR',
        retryable: !gone,
      };
    }
  }
}
