/**
 * HealthController
 * @module product-service/modules/health
 *
 * Provides three endpoint styles:
 *
 *   GET /health          — full status (DB + Redis + Search)
 *   GET /health/live     — liveness (process only — for k8s)
 *   GET /health/ready    — readiness (DB required — for k8s)
 *
 * Public — no authentication required.
 */
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { PrismaHealthIndicator } from './indicators/prisma.health.js';
import { RedisHealthIndicator } from './indicators/redis.health.js';
import { SearchHealthIndicator } from './indicators/search.health.js';

const SERVICE_NAME = 'product-service';
const SERVICE_VERSION = '1.0.0';

interface IndicatorStatus {
  readonly status: 'up' | 'down' | 'degraded';
  readonly message?: string;
  readonly responseTimeMs?: number;
  readonly details?: Readonly<Record<string, unknown>>;
}

interface HealthResponse {
  readonly status: 'ok' | 'degraded' | 'error';
  readonly service: string;
  readonly version: string;
  readonly uptimeSeconds: number;
  readonly timestamp: string;
  readonly checks: Readonly<Record<string, IndicatorStatus>>;
}

interface LivenessResponse {
  readonly status: 'ok';
  readonly timestamp: string;
  readonly uptimeSeconds: number;
}

interface ReadinessResponse {
  readonly status: 'ok' | 'error';
  readonly timestamp: string;
  readonly checks: Readonly<Record<string, IndicatorStatus>>;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly startedAt = Date.now();

  constructor(
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly redisHealth: RedisHealthIndicator,
    private readonly searchHealth: SearchHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Full health status' })
  async full(): Promise<HealthResponse> {
    const [prisma, redis, search] = await Promise.all([
      this.prismaHealth.check(),
      this.redisHealth.check(),
      this.searchHealth.check(),
    ]);

    const checks: Record<string, IndicatorStatus> = {
      prisma,
      redis,
      search,
    };

    // Determine overall status
    let status: 'ok' | 'degraded' | 'error' = 'ok';
    if (prisma.status === 'down' || redis.status === 'down') {
      status = 'error';
    } else if (search.status === 'degraded') {
      status = 'degraded';
    }

    return {
      status,
      service: SERVICE_NAME,
      version: SERVICE_VERSION,
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  @Get('live')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness probe — process only' })
  live(): LivenessResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
    };
  }

  @Get('ready')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Readiness probe — dependencies required' })
  async ready(): Promise<ReadinessResponse> {
    const [prisma, redis] = await Promise.all([
      this.prismaHealth.check(),
      this.redisHealth.check(),
    ]);

    const checks: Record<string, IndicatorStatus> = { prisma, redis };
    const ready = prisma.status === 'up' && redis.status === 'up';

    return {
      status: ready ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      checks,
    };
  }
}
