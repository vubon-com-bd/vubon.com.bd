import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorCommissionController } from '../../interfaces/controllers/rest/vendor-commission.controller';
import { CalculateCommissionHandler } from '../../application/commands/commission';
import { UpdateCommissionHandler } from '../../application/commands/commission';
import { GetCommissionHandler } from '../../application/queries/commission';
import { ListCommissionsHandler } from '../../application/queries/commission';
import { GetCommissionSummaryHandler } from '../../application/queries/commission';
import { VendorCommissionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-commission.prisma.repository';
import { CommissionCacheRepository } from '../../infrastructure/persistence/cache/repositories/commission.cache.repository';
import { CommissionCalculatorService } from '../../infrastructure/services/internal/commission-calculator.service';

@Module({
  imports: [CqrsModule],
  controllers: [VendorCommissionController],
  providers: [
    VendorCommissionPrismaRepository,
    CommissionCacheRepository,
    CommissionCalculatorService,
    CalculateCommissionHandler,
    UpdateCommissionHandler,
    GetCommissionHandler,
    ListCommissionsHandler,
    GetCommissionSummaryHandler,
  ],
  exports: [VendorCommissionPrismaRepository, CommissionCalculatorService],
})
export class VendorCommissionModule {}
