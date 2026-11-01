/**
 * VendorHealthIndicator — aggregated service health
 * @module vendor-service/modules/health
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { VendorPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';

export interface VendorHealthReport {
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
export class VendorHealthIndicator {
  private readonly logger = new Logger(VendorHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: VendorPrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<VendorHealthReport> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    // 1. Database
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

    // 2. Redis
    try {
      const exists = await this.redis.exists('__vendor_health_probe__');
      deps.push({
        name: 'redis',
        healthy: true,
        message: exists ? 'reachable' : 'reachable (key absent)',
      });
    } catch (err) {
      deps.push({
        name: 'redis',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'vendor-service',
      healthy: deps.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
