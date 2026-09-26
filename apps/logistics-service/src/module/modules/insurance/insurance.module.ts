import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InsuranceController } from '../../interfaces/controllers/rest/insurance.controller';
import { InsuranceService } from '../../application/services/impl/insurance.service';

import { PurchaseInsuranceHandler } from '../../application/commands/insurance/purchase-insurance.handler';
import { ClaimInsuranceHandler } from '../../application/commands/insurance/claim-insurance.handler';
import { SettleInsuranceHandler } from '../../application/commands/insurance/settle-insurance.handler';

import { GetInsuranceHandler } from '../../application/queries/insurance/get-insurance.handler';
import { ListInsuranceHandler } from '../../application/queries/insurance/list-insurance.handler';

import { InsurancePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/insurance.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [InsuranceController],
  providers: [
    InsurancePrismaRepository,
    InsuranceService,
    PurchaseInsuranceHandler,
    ClaimInsuranceHandler,
    SettleInsuranceHandler,
    GetInsuranceHandler,
    ListInsuranceHandler,
  ],
  exports: [InsuranceService, InsurancePrismaRepository],
})
export class InsuranceModule {}
