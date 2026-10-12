/**
 * HealthController — liveness & readiness
 * @module logistics-service/modules/health
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

@ApiTags('health')
@Controller('logistics/health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Liveness probe' })
  live(): { status: 'ok'; service: string; timestamp: string } {
    return { status: 'ok', service: 'logistics-service', timestamp: new Date().toISOString() };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness probe — checks DB + Redis' })
  async ready(): Promise<{
    status: 'ok' | 'degraded';
    checks: { database: boolean; redis: boolean };
    timestamp: string;
  }> {
    const [db, rds] = await Promise.all([
      this.prisma.isHealthy().catch(() => false),
      this.redis.isHealthy().catch(() => false),
    ]);
    return {
      status: db && rds ? 'ok' : 'degraded',
      checks: { database: db, redis: rds },
      timestamp: new Date().toISOString(),
    };
  }
}
