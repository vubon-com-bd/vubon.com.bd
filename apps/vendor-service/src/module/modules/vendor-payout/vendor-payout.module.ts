import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorPayoutController } from '../../interfaces/controllers/rest/vendor-payout.controller';
import { RequestPayoutHandler } from '../../application/commands/payout';
import { ApprovePayoutHandler } from '../../application/commands/payout';
import { RejectPayoutHandler } from '../../application/commands/payout';
import { ProcessPayoutHandler } from '../../application/commands/payout';
import { GetPayoutHandler } from '../../application/queries/payout';
import { ListPayoutsHandler } from '../../application/queries/payout';
import { GetPayoutSummaryHandler } from '../../application/queries/payout';
import { VendorPayoutSaga } from '../../application/sagas/vendor-payout.saga';
import { VendorPayoutPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-payout.prisma.repository';
import { PayoutCalculatorService } from '../../infrastructure/services/internal/payout-calculator.service';
import { BankService } from '../../infrastructure/services/external';

@Module({
  imports: [CqrsModule],
  controllers: [VendorPayoutController],
  providers: [
    VendorPayoutPrismaRepository,
    PayoutCalculatorService,
    BankService,
    RequestPayoutHandler,
    ApprovePayoutHandler,
    RejectPayoutHandler,
    ProcessPayoutHandler,
    GetPayoutHandler,
    ListPayoutsHandler,
    GetPayoutSummaryHandler,
    VendorPayoutSaga,
  ],
  exports: [VendorPayoutPrismaRepository],
})
export class VendorPayoutModule {}
