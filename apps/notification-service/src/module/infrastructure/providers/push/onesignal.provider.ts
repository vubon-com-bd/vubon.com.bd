/**
 * OneSignal Push Provider — cross-platform aggregator
 * @module notification-service/infrastructure/providers/push
 *
 * Handles Android + iOS + Web via OneSignal REST API।
 * Uses fetch — no SDK required।
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv, getOptionalEnvBool } from '@vubon/shared-config/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IPushProvider,
  PushProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class OnesignalProvider extends BaseProvider implements IPushProvider {
  constructor() {
    super({
      name: 'onesignal',
      channel: 'push' as const,
      version: '1.0.0',
      priority: 4,
    });
  }

  private get appId(): string {
    return getOptionalEnv('ONESIGNAL_APP_ID', '');
  }
  private get apiKey(): string {
    return getOptionalEnv('ONESIGNAL_API_KEY', '');
  }
  private get enabled(): boolean {
    return getOptionalEnvBool('ONESIGNAL_ENABLED', false);
  }

  isEnabled(): boolean {
    return this.enabled && Boolean(this.appId) && Boolean(this.apiKey);
  }

  async send(input: PushProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const tokens = Array.isArray(input.token) ? input.token : [input.token];

    try {
      const res = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_id: this.appId,
          include_player_ids: tokens,
          headings: { en: input.title },
          contents: { en: input.body },
          data: input.data,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          success: false,
          error: `HTTP ${res.status}: ${errText.slice(0, 200)}`,
          errorCode: 'ONESIGNAL_HTTP_ERROR',
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      const data = (await res.json()) as { id?: string };
      return {
        success: true,
        providerMessageId: data.id ?? `os-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { tokenCount: tokens.length },
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'ONESIGNAL_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
