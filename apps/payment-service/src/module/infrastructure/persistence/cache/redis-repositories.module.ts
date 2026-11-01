/**
 * Redis Repositories Module
 * @module payment-service/infrastructure/persistence/cache
 *
 * Registers Payment's cache repositories. Requires RedisModule
 * (from shared-kernel) to be imported at the app level.
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { PaymentCacheRepository } from './repositories/payment.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';
import { VerificationCacheRepository } from './repositories/verification.cache.repository.js';

const REPOSITORIES = [
  PaymentCacheRepository,
  IdempotencyCacheRepository,
  VerificationCacheRepository,
] as const;

@Module({
  imports: [RedisModule],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class RedisRepositoriesModule {}
