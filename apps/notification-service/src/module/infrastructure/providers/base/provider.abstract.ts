/**
 * BaseProvider — abstract base for all providers
 * @module notification-service/infrastructure/providers/base
 *
 * Provides:
 *  - Structured logger
 *  - Health check helper
 *  - Enabled/available state
 *  - Rate limit tracking
 */
import { Logger } from '@nestjs/common';
import type {
  ProviderChannel,
  ProviderHealth,
  ProviderMetadata,
} from './provider.types.js';
import type { IProvider } from './provider.interface.js';

export abstract class BaseProvider implements IProvider {
  protected readonly logger: Logger;

  constructor(public readonly metadata: ProviderMetadata) {
    this.logger = new Logger(`${metadata.name}Provider`);
  }

  // ═══════════════ State ═══════════════
  abstract isEnabled(): boolean;

  async isAvailable(): Promise<boolean> {
    if (!this.isEnabled()) return false;
    try {
      const health = await this.health();
      return health.state === 'healthy' || health.state === 'degraded';
    } catch {
      return false;
    }
  }

  // ═══════════════ Health ═══════════════
  async health(): Promise<ProviderHealth> {
    const start = Date.now();
    try {
      const ok = this.isEnabled();
      return {
        providerName: this.metadata.name,
        state: ok ? 'healthy' : 'unavailable',
        checkedAt: new Date().toISOString(),
        latencyMs: Date.now() - start,
      };
    } catch (err) {
      return {
        providerName: this.metadata.name,
        state: 'unavailable',
        checkedAt: new Date().toISOString(),
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : 'unknown',
      };
    }
  }

  // ═══════════════ Helpers ═══════════════
  protected notConfigured(): { success: false; error: string; errorCode: string } {
    return {
      success: false,
      error: `${this.metadata.name} not configured`,
      errorCode: 'NOT_CONFIGURED',
    };
  }

  protected notEnabled(): { success: false; error: string; errorCode: string } {
    return {
      success: false,
      error: `${this.metadata.name} disabled by configuration`,
      errorCode: 'DISABLED',
    };
  }

  protected notImplemented(op: string): { success: false; error: string; errorCode: string } {
    return {
      success: false,
      error: `${op} not supported by ${this.metadata.name}`,
      errorCode: 'NOT_IMPLEMENTED',
    };
  }

  protected mask(s: string, visible = 4): string {
    if (s.length <= visible) return s;
    return '*'.repeat(Math.max(0, s.length - visible)) + s.slice(-visible);
  }
}

export type { ProviderChannel, ProviderMetadata, ProviderHealth };
