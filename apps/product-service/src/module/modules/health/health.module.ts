/**
 * HealthModule — liveness / readiness endpoints
 * @module product-service/modules/health
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.module';

import { HealthController } from './health.controller.js';
import { PrismaHealthIndicator } from './indicators/prisma.health.js';
import { RedisHealthIndicator } from './indicators/redis.health.js';
import { SearchHealthIndicator } from './indicators/search.health.js';

import { SearchModule } from '../../infrastructure/persistence/search/search.module.js';

@Module({
  imports: [PrismaModule, RedisModule, SearchModule],
  controllers: [HealthController],
  providers: [
    PrismaHealthIndicator,
    RedisHealthIndicator,
    SearchHealthIndicator,
  ],
})
export class HealthModule {}
