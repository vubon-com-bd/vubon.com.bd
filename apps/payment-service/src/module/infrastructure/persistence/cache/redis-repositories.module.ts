/**
 * RedisRepositoriesModule — wires cache repositories into DI
 * @module payment-service/infrastructure/persistence/cache
 */
import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';
import { PaymentCacheRepository } from './repositories/payment.cache.repository.js';

@Global()
@Module({
  imports: [RedisModule],
  providers: [IdempotencyCacheRepository, PaymentCacheRepository],
  exports: [IdempotencyCacheRepository, PaymentCacheRepository],
})
export class RedisRepositoriesModule {}
