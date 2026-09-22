import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorPerformanceController } from '../../interfaces/controllers/rest/vendor-performance.controller';
import { GetPerformanceHandler } from '../../application/queries/performance';
import { GetPerformanceStatsHandler } from '../../application/queries/performance';
import { VendorPerformancePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-performance.prisma.repository';
import { PerformanceCacheRepository } from '../../infrastructure/persistence/cache/repositories/performance.cache.repository';
import { PerformanceTrackerService } from '../../infrastructure/services/internal/performance-tracker.service';

@Module({
  imports: [CqrsModule],
  controllers: [VendorPerformanceController],
  providers: [
    VendorPerformancePrismaRepository,
    PerformanceCacheRepository,
    PerformanceTrackerService,
    GetPerformanceHandler,
    GetPerformanceStatsHandler,
  ],
  exports: [VendorPerformancePrismaRepository, PerformanceTrackerService],
})
export class VendorPerformanceModule {}
