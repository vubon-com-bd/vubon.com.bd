/**
 * Logistics Prisma Module
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { LogisticsPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [LogisticsPrismaService],
  exports: [LogisticsPrismaService],
})
export class LogisticsPrismaModule {}
