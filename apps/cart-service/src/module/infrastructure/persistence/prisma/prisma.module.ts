/**
 * CartPrismaModule — @Global
 * @module cart-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { CartPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [CartPrismaService],
  exports: [CartPrismaService],
})
export class CartPrismaModule {}
