/**
 * Server-Sent Events (SSE) In-App Provider
 * @module notification-service/infrastructure/providers/in-app
 *
 * Sends in-app notifications over SSE streams.
 * Fallback when WebSocket not available.
 *
 * SSE flow:
 *   1. Client connects to GET /notifications/stream (SSE)
 *   2. Controller registers the stream emitter
 *   3. This provider pushes events to registered emitters
 */
import { Injectable } from '@nestjs/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IInAppProvider,
  InAppProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';

export interface SseEmitter {
  readonly userId: string;
  readonly emitterId: string;
  send(data: string): void;
  close(): void;
}

@Injectable()
export class SseInAppProvider extends BaseProvider implements IInAppProvider {
  constructor() {
    super({
      name: 'sse',
      channel: 'in-app' as const,
      version: '1.0.0',
      priority: 2,
    });
  }

  /**
   * Active SSE emitters per user।
   */
  private readonly emitters = new Map<string, SseEmitter[]>();

  isEnabled(): boolean {
    return true;
  }

  async send(input: InAppProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notEnabled();

    const start = Date.now();
    const userEmitters = this.emitters.get(input.userId) ?? [];

    if (userEmitters.length === 0) {
      return {
        success: true,
        status: 'queued',
        durationMs: Date.now() - start,
        rawResponse: {
          notificationId: input.notificationId,
          delivered: false,
          reason: 'user-offline',
        },
      };
    }

    const payload = JSON.stringify({
      type: 'notification',
      data: {
        id: input.notificationId,
        title: input.title,
        body: input.body,
        imageUrl: input.imageUrl,
        iconUrl: input.iconUrl,
        actions: input.actions,
        type: input.type,
        position: input.position,
      },
    });

    for (const emitter of userEmitters) {
      try {
        emitter.send(payload);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`SSE emit failed: user=${input.userId} emitter=${emitter.emitterId} err=${msg}`);
      }
    }

    this.logger.log(
      `📡 SSE send → user=${input.userId} notification=${input.notificationId} emitters=${userEmitters.length}`,
    );

    return {
      success: true,
      status: 'delivered',
      durationMs: Date.now() - start,
      rawResponse: {
        notificationId: input.notificationId,
        emitterCount: userEmitters.length,
      },
    };
  }

  // ═══════════════ Emitter management (called by SSE controller) ═══════════════
  registerEmitter(emitter: SseEmitter): void {
    const existing = this.emitters.get(emitter.userId) ?? [];
    this.emitters.set(emitter.userId, [...existing, emitter]);
    this.logger.debug(
      `SSE emitter registered: user=${emitter.userId} emitter=${emitter.emitterId}`,
    );
  }

  unregisterEmitter(userId: string, emitterId: string): void {
    const existing = this.emitters.get(userId) ?? [];
    const filtered = existing.filter((e) => e.emitterId !== emitterId);
    if (filtered.length === 0) this.emitters.delete(userId);
    else this.emitters.set(userId, filtered);
    this.logger.debug(`SSE emitter removed: user=${userId} emitter=${emitterId}`);
  }

  isUserOnline(userId: string): boolean {
    return (this.emitters.get(userId) ?? []).length > 0;
  }

  onlineUserCount(): number {
    return this.emitters.size;
  }
}
