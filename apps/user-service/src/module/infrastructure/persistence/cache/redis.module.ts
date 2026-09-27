/**
 * Redis Module (Global)
 * @module user-service/infrastructure/persistence/cache
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service.js';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
