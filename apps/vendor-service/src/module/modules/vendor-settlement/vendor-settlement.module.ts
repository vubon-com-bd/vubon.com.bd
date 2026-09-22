import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorSettlementController } from '../../interfaces/controllers/rest/vendor-settlement.controller';
import { CreateSettlementHandler } from '../../application/commands/settlement';
import { CompleteSettlementHandler } from '../../application/commands/settlement';
import { ListSettlementsHandler } from '../../application/queries/settlement';
import { GetSettlementHandler } from '../../application/queries/settlement';
import { VendorSettlementPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-settlement.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorSettlementController],
  providers: [
    VendorSettlementPrismaRepository,
    CreateSettlementHandler,
    CompleteSettlementHandler,
    ListSettlementsHandler,
    GetSettlementHandler,
  ],
  exports: [VendorSettlementPrismaRepository],
})
export class VendorSettlementModule {}
