/**
 * HealthController — service health endpoint
 * @module vendor-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { VendorPrismaService } from '../../../infrastructure/persistence/prisma/prisma.service.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: VendorPrismaService,
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
    readonly dependencies: readonly {
      readonly name: string;
      readonly healthy: boolean;
      readonly message?: string;
    }[];
  }> {
    const dependencies: { name: string; healthy: boolean; message?: string }[] = [];

    try {
      const dbHealthy = this.prisma.isEngineAvailable()
        ? await this.prisma.isHealthy()
        : false;
      dependencies.push({
        name: 'database',
        healthy: dbHealthy,
        message: dbHealthy
          ? undefined
          : this.prisma.isEngineAvailable()
            ? 'DB query failed'
            : 'Prisma engine unavailable',
      });
    } catch (err) {
      dependencies.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    try {
      const redisHealthy = await this.redis.exists('__health__');
      dependencies.push({ name: 'redis', healthy: true, message: String(redisHealthy) });
    } catch (err) {
      dependencies.push({
        name: 'redis',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'vendor-service',
      healthy: dependencies.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      dependencies,
    };
  }
}
