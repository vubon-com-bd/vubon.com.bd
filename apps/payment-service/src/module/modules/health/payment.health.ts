/**
 * PaymentHealthIndicator — aggregated service health
 * @module payment-service/modules/health
 *
 * Checks:
 *  - Prisma engine availability + query
 *  - Redis PING
 *  - Worker auto-start config (informational)
 */
import { Injectable, Logger } from '@nestjs/common';
import { PaymentPrismaService } from '@infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

export interface PaymentDependencyHealth {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

export interface PaymentHealthReport {
  readonly service: string;
  readonly healthy: boolean;
  readonly timestamp: string;
  readonly uptimeSeconds: number;
  readonly dependencies: readonly PaymentDependencyHealth[];
}

@Injectable()
export class PaymentHealthIndicator {
  private readonly logger = new Logger(PaymentHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: PaymentPrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<PaymentHealthReport> {
    const deps: PaymentDependencyHealth[] = [];

    // 1. Database
    try {
      if (!this.prisma.isEngineAvailable()) {
        deps.push({
          name: 'database',
          healthy: false,
          message: 'Prisma engine unavailable (degraded mode)',
        });
      } else {
        const ok = await this.prisma.isHealthy();
        deps.push({
          name: 'database',
          healthy: ok,
          message: ok ? undefined : 'DB query failed',
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      deps.push({ name: 'database', healthy: false, message: msg });
    }

    // 2. Redis
    try {
      const ok = await this.redis.isHealthy();
      deps.push({
        name: 'redis',
        healthy: ok,
        message: ok ? undefined : 'Redis PING failed',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      deps.push({ name: 'redis', healthy: false, message: msg });
    }

    return {
      service: 'payment-service',
      healthy: deps.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
