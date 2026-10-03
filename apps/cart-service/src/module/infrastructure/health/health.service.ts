/**
 * HealthService — service-level health aggregator
 * @module cart-service/infrastructure/health
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { PrismaService } from '@vubon/shared-kernel/prisma';

@Injectable()
export class CartHealthService {
  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}

  async check(): Promise<{
    status: 'ok' | 'degraded';
    service: string;
    checks: {
      redis: boolean;
      prisma: boolean;
      prismaEngineAvailable: boolean;
    };
    timestamp: string;
  }> {
    const redisOk = await this.redis.isHealthy().catch(() => false);
    const prismaOk = await this.prisma.isHealthy().catch(() => false);
    const engineOk = this.prisma.isEngineAvailable();

    // Redis primary, so Prisma degrade is OK
    const status = redisOk ? 'ok' : 'degraded';

    return {
      status,
      service: 'cart-service',
      checks: {
        redis: redisOk,
        prisma: prismaOk,
        prismaEngineAvailable: engineOk,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
