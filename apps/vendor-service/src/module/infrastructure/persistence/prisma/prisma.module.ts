/**
 * Vendor Prisma Module
 * @module vendor-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { VendorPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [VendorPrismaService],
  exports: [VendorPrismaService],
})
export class VendorPrismaModule {}
