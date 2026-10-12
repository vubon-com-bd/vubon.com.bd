/**
 * Analytics Prisma Module
 * @module analytics-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { AnalyticsPrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [AnalyticsPrismaService],
  exports: [AnalyticsPrismaService],
})
export class AnalyticsPrismaModule {}
