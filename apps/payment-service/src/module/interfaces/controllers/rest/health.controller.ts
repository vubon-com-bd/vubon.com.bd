/**
 * HealthController — liveness/readiness probes
 * @module payment-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Service health' })
  async check(): Promise<{
    status: 'ok' | 'degraded';
    service: string;
    timestamp: string;
    checks: Record<string, boolean>;
  }> {
    const checks: Record<string, boolean> = {};
    try {
      checks['prisma'] = await this.prisma.isHealthy();
    } catch {
      checks['prisma'] = false;
    }
    try {
      checks['redis'] = await this.redis.isHealthy();
    } catch {
      checks['redis'] = false;
    }
    const allOk = Object.values(checks).every(Boolean);
    return {
      status: allOk ? 'ok' : 'degraded',
      service: 'payment-service',
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  @Public()
  @Get('live')
  @ApiOperation({ summary: 'Liveness probe' })
  live(): { status: 'ok' } {
    return { status: 'ok' };
  }

  @Public()
  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe' })
  async ready(): Promise<{ status: 'ok' | 'not_ready' }> {
    const healthy = await this.prisma.isHealthy();
    return { status: healthy ? 'ok' : 'not_ready' };
  }
}
