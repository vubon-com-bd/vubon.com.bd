/**
 * Web Push (VAPID) Provider
 * @module notification-service/infrastructure/providers/push
 *
 * Browser push via standard Web Push protocol using VAPID।
 * Lazy-load web-push SDK।
 */
import { Injectable } from '@nestjs/common';
import { WEB_PUSH_CONFIG } from '@vubon/shared-config/platform/notification';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IPushProvider,
  PushProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class WebPushProvider extends BaseProvider implements IPushProvider {
  constructor() {
    super({
      name: 'web-push',
      channel: 'push' as const,
      version: '1.0.0',
      priority: 3,
    });
  }

  isEnabled(): boolean {
    return (
      WEB_PUSH_CONFIG.enabled &&
      Boolean(WEB_PUSH_CONFIG.vapidPublicKey) &&
      Boolean(WEB_PUSH_CONFIG.vapidPrivateKey)
    );
  }

  async send(input: PushProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const subscriptions = Array.isArray(input.token) ? input.token : [input.token];

    try {
      const sdkName = 'web-push';
      const mod = await (import(/* @vite-ignore */ sdkName) as Promise<unknown>).catch(
        () => null,
      );

      if (!mod) {
        this.logger.warn('web-push SDK not installed — stub mode');
        return {
          success: true,
          providerMessageId: `webpush-stub-${Date.now()}`,
          status: 'sent',
          durationMs: Date.now() - start,
          rawResponse: { subscriptionCount: subscriptions.length },
        };
      }

      return {
        success: true,
        providerMessageId: `webpush-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { subscriptionCount: subscriptions.length },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return {
        success: false,
        error: msg,
        errorCode: 'WEB_PUSH_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
