/**
 * Order Prisma Module
 * @module order-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { OrderPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [OrderPrismaService],
  exports: [OrderPrismaService],
})
export class OrderPrismaModule {}
