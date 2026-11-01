/**
 * Product Prisma Module
 * @module product-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { ProductPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [ProductPrismaService],
  exports: [ProductPrismaService],
})
export class ProductPrismaModule {}
