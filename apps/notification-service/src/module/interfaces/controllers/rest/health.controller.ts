/**
 * HealthController — service health check
 * @module notification-service/interfaces/controllers/rest
 *
 * Memory mode (PERSISTENCE_DRIVER=memory): reports `persistence: memory` (healthy)
 * Prisma mode: checks Prisma DB connection
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { NotificationPrismaService } from '@infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

interface DependencyHealth {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: NotificationPrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Health check' })
  async check(): Promise<{
    readonly service: string;
    readonly driver: string;
    readonly healthy: boolean;
    readonly timestamp: string;
    readonly dependencies: readonly DependencyHealth[];
  }> {
    const dependencies: DependencyHealth[] = [];
    const driver = (process.env['PERSISTENCE_DRIVER'] ?? 'prisma').toLowerCase();

    // ─── Persistence ────────────────────────
    if (driver === 'memory') {
      dependencies.push({
        name: 'persistence',
        healthy: true,
        message: 'In-Memory driver (no external DB)',
      });
    } else {
      try {
        const dbHealthy = await this.prisma.isHealthy();
        dependencies.push({
          name: 'database',
          healthy: dbHealthy,
          message: dbHealthy ? undefined : 'DB check failed',
        });
      } catch (err) {
        dependencies.push({
          name: 'database',
          healthy: false,
          message: err instanceof Error ? err.message : 'unknown',
        });
      }
    }

    // ─── Redis ──────────────────────────────
    try {
      const redisHealthy = await this.redis.isHealthy();
      dependencies.push({
        name: 'redis',
        healthy: redisHealthy,
        message: redisHealthy ? undefined : 'Redis ping failed',
      });
    } catch (err) {
      dependencies.push({
        name: 'redis',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'notification-service',
      driver,
      healthy: dependencies.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      dependencies,
    };
  }
}
