/**
 * AuthHealthIndicator — aggregated service health
 * @module identity-service/modules/health
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { AuthPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';

export interface AuthHealthReport {
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
export class AuthHealthIndicator {
  private readonly logger = new Logger(AuthHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<AuthHealthReport> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    // DB
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
          message: 'Prisma engine unavailable (degraded)',
        });
      }
    } catch (err) {
      deps.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    // Redis
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
      service: 'identity-service',
      healthy: deps.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
