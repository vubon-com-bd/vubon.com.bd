/**
 * Expo Push Provider — managed React Native apps
 * @module notification-service/infrastructure/providers/push
 *
 * Uses Expo Push Service REST API।
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnvBool } from '@vubon/shared-config/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IPushProvider,
  PushProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

@Injectable()
export class ExpoProvider extends BaseProvider implements IPushProvider {
  constructor() {
    super({
      name: 'expo',
      channel: 'push' as const,
      version: '1.0.0',
      priority: 5,
    });
  }

  private get enabled(): boolean {
    return getOptionalEnvBool('EXPO_PUSH_ENABLED', false);
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async send(input: PushProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notConfigured();

    const start = Date.now();
    const tokens = Array.isArray(input.token) ? input.token : [input.token];

    // Expo tokens start with "ExponentPushToken[" or "ExpoPushToken["
    const expoTokens = tokens.filter(
      (t) => t.startsWith('ExponentPushToken[') || t.startsWith('ExpoPushToken['),
    );

    if (expoTokens.length === 0) {
      return {
        success: false,
        error: 'No Expo push tokens in recipient list',
        errorCode: 'INVALID_EXPO_TOKEN',
        retryable: false,
        durationMs: Date.now() - start,
      };
    }

    try {
      const messages = expoTokens.map((to) => ({
        to,
        title: input.title,
        body: input.body,
        data: input.data,
        sound: input.silent ? null : 'default',
      }));

      const res = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(messages),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        return {
          success: false,
          error: `HTTP ${res.status}`,
          errorCode: 'EXPO_HTTP_ERROR',
          retryable: res.status >= 500,
          durationMs: Date.now() - start,
        };
      }

      return {
        success: true,
        providerMessageId: `expo-${Date.now()}`,
        status: 'sent',
        durationMs: Date.now() - start,
        rawResponse: { messageCount: messages.length },
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'unknown',
        errorCode: 'EXPO_SEND_FAILED',
        retryable: true,
        durationMs: Date.now() - start,
      };
    }
  }
}
