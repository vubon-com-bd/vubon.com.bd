/**
 * CartRedisModule — @Global
 * @module cart-service/infrastructure/persistence/redis
 */
import { Global, Module } from '@nestjs/common';
import { CartRedisService } from './redis.service.js';

@Global()
@Module({
  providers: [CartRedisService],
  exports: [CartRedisService],
})
export class CartRedisModule {}
