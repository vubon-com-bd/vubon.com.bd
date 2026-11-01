/**
 * HealthController — service health endpoint
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { AuthPrismaService } from '../../../infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

interface HealthDependency {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Service health check' })
  async check(): Promise<{
    readonly service: string;
    readonly healthy: boolean;
    readonly timestamp: string;
    readonly uptimeSeconds: number;
    readonly dependencies: readonly HealthDependency[];
  }> {
    const dependencies: HealthDependency[] = [];

    // Database check
    try {
      if (this.prisma.isEngineAvailable()) {
        const ok = await this.prisma.isHealthy();
        dependencies.push({
          name: 'database',
          healthy: ok,
          message: ok ? undefined : 'DB query failed',
        });
      } else {
        dependencies.push({
          name: 'database',
          healthy: false,
          message: 'Prisma engine unavailable (degraded)',
        });
      }
    } catch (err) {
      dependencies.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    // Redis check
    try {
      const ok = await this.redis.isHealthy();
      dependencies.push({
        name: 'redis',
        healthy: ok,
        message: ok ? undefined : 'Redis ping failed',
      });
    } catch (err) {
      dependencies.push({
        name: 'redis',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'identity-service',
      healthy: dependencies.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies,
    };
  }
}
