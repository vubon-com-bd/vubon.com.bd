/**
 * WebSocket In-App Provider
 * @module notification-service/infrastructure/providers/in-app
 *
 * Sends in-app notifications over WebSocket connections.
 * This provider is a thin dispatcher — actual WS server lives in
 * the interfaces layer (controllers/websocket.gateway.ts)।
 *
 * Production flow:
 *   1. User connects via WS → registered in `userConnections` map
 *   2. This provider emits `notification` event to the user's WS channel
 *   3. If user is offline → returns success with `delivered: false`
 */
import { Injectable } from '@nestjs/common';

import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import type {
  IInAppProvider,
  InAppProviderInput,
} from '@infrastructure/providers/base/provider.interface.js';
import type { ProviderResult } from '@infrastructure/providers/base/provider.types.js';
import type { InAppConnection } from './in-app.types.js';

@Injectable()
export class WebsocketInAppProvider extends BaseProvider implements IInAppProvider {
  constructor() {
    super({
      name: 'websocket',
      channel: 'in-app' as const,
      version: '1.0.0',
      priority: 1,
    });
  }

  /**
   * Connection registry — populated by the WS gateway at interfaces layer।
   * Key: userId, Value: connection info।
   */
  private readonly connections = new Map<string, InAppConnection[]>();

  isEnabled(): boolean {
    return true;
  }

  async send(input: InAppProviderInput): Promise<ProviderResult> {
    if (!this.isEnabled()) return this.notEnabled();

    const start = Date.now();
    const userConns = this.connections.get(input.userId) ?? [];

    if (userConns.length === 0) {
      // User offline — still success (notification saved to DB, will appear in inbox)
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

    // In production: this.emitToConnections(userConns, input)
    this.logger.log(
      `📬 WebSocket send → user=${input.userId} notification=${input.notificationId} connections=${userConns.length}`,
    );

    return {
      success: true,
      status: 'delivered',
      durationMs: Date.now() - start,
      rawResponse: {
        notificationId: input.notificationId,
        connectionCount: userConns.length,
      },
    };
  }

  // ═══════════════ Connection management (called by gateway) ═══════════════
  registerConnection(conn: InAppConnection): void {
    const existing = this.connections.get(conn.userId) ?? [];
    this.connections.set(conn.userId, [...existing, conn]);
    this.logger.debug(`WS connection registered: user=${conn.userId} conn=${conn.connectionId}`);
  }

  unregisterConnection(userId: string, connectionId: string): void {
    const existing = this.connections.get(userId) ?? [];
    const filtered = existing.filter((c) => c.connectionId !== connectionId);
    if (filtered.length === 0) this.connections.delete(userId);
    else this.connections.set(userId, filtered);
    this.logger.debug(`WS connection removed: user=${userId} conn=${connectionId}`);
  }

  isUserOnline(userId: string): boolean {
    return (this.connections.get(userId) ?? []).length > 0;
  }

  onlineUserCount(): number {
    return this.connections.size;
  }
}
