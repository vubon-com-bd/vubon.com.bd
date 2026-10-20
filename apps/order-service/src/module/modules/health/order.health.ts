/**
 * OrderHealthIndicator — DB_MODE-aware
 * @module order-service/modules/health
 *
 * Prisma service is optional — memory mode skips DB check.
 */
import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { OrderPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { IS_MEMORY_MODE } from '../../infrastructure/config/db-mode.config.js';

export interface OrderHealthReport {
  readonly service: string;
  readonly healthy: boolean;
  readonly mode: 'memory' | 'prisma';
  readonly timestamp: string;
  readonly uptimeSeconds: number;
  readonly dependencies: readonly {
    readonly name: string;
    readonly healthy: boolean;
    readonly message?: string;
  }[];
}

@Injectable()
export class OrderHealthIndicator {
  private readonly logger = new Logger(OrderHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(
    @Optional()
    @Inject(OrderPrismaService)
    private readonly prisma?: OrderPrismaService,
    @Optional()
    @Inject(RedisService)
    private readonly redis?: RedisService,
  ) {}

  async check(): Promise<OrderHealthReport> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    // Database
    if (IS_MEMORY_MODE) {
      deps.push({
        name: 'database',
        healthy: true,
        message: 'In-memory repositories (DB_MODE=memory)',
      });
    } else if (this.prisma) {
      try {
        if (this.prisma.isEngineAvailable()) {
          const ok = await this.prisma.isHealthy();
          deps.push({ name: 'database', healthy: ok });
        } else {
          deps.push({
            name: 'database',
            healthy: false,
            message: 'Prisma engine unavailable',
          });
        }
      } catch (err) {
        deps.push({
          name: 'database',
          healthy: false,
          message: err instanceof Error ? err.message : 'unknown',
        });
      }
    } else {
      deps.push({
        name: 'database',
        healthy: false,
        message: 'Prisma service not injected',
      });
    }

    // Redis
    if (this.redis) {
      try {
        const ok = await this.redis.isHealthy();
        deps.push({ name: 'redis', healthy: ok });
      } catch (err) {
        deps.push({
          name: 'redis',
          healthy: false,
          message: err instanceof Error ? err.message : 'unknown',
        });
      }
    } else {
      deps.push({
        name: 'redis',
        healthy: false,
        message: 'Redis service not injected',
      });
    }

    return {
      service: 'order-service',
      healthy: deps.every((d) => d.healthy),
      mode: IS_MEMORY_MODE ? 'memory' : 'prisma',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
