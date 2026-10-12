/**
 * HealthController — service health check
 * @module vendor-service/modules/health
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Service health check' })
  async check(): Promise<unknown> {
    const [dbHealthy, redisHealthy] = await Promise.all([
      this.prisma.isHealthy().catch(() => false),
      this.redis.isHealthy().catch(() => false),
    ]);

    return {
      service: 'vendor-service',
      status: dbHealthy && redisHealthy ? 'ok' : 'degraded',
      checks: {
        database: dbHealthy,
        redis: redisHealthy,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Liveness probe' })
  live(): unknown {
    return { status: 'live', timestamp: new Date().toISOString() };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness probe' })
  async ready(): Promise<unknown> {
    const dbHealthy = await this.prisma.isHealthy().catch(() => false);
    return {
      status: dbHealthy ? 'ready' : 'not-ready',
      timestamp: new Date().toISOString(),
    };
  }
}
