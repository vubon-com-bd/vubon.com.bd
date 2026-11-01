/**
 * CartHealthIndicator — aggregated service health
 * @module cart-service/modules/health
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';
import { CartRedisService } from '../../infrastructure/persistence/redis/redis.service.js';

export interface CartHealthReport {
  readonly service: string;
  readonly healthy: boolean;
  readonly timestamp: string;
  readonly uptimeSeconds: number;
  readonly dependencies: readonly {
    readonly name: string;
    readonly healthy: boolean;
    readonly message?: string;
  }[];
}

@Injectable()
export class CartHealthIndicator {
  private readonly logger = new Logger(CartHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: CartPrismaService,
    private readonly redis: CartRedisService,
  ) {}

  async check(): Promise<CartHealthReport> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    // ─── Database ───────────────────────────
    try {
      if (this.prisma.isEngineAvailable()) {
        const ok = await this.prisma.isHealthy();
        deps.push({
          name: 'database',
          healthy: ok,
          message: ok ? undefined : 'DB query failed',
        });
      } else {
        deps.push({
          name: 'database',
          healthy: false,
          message: 'Prisma engine unavailable (degraded mode)',
        });
      }
    } catch (err) {
      deps.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    // ─── Redis ──────────────────────────────
    try {
      const ok = await this.redis.isHealthy();
      deps.push({
        name: 'redis',
        healthy: ok,
        message: ok ? undefined : 'Redis ping failed',
      });
    } catch (err) {
      deps.push({
        name: 'redis',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'cart-service',
      healthy: deps.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
