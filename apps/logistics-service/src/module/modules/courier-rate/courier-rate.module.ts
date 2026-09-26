import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CourierRateController } from '../../interfaces/controllers/rest/courier-rate.controller';
import { CourierRateService } from '../../application/services/impl/courier-rate.service';
import { SetCourierRatesHandler } from '../../application/commands/courier/set-courier-rates.handler';
import { GetCourierRatesHandler } from '../../application/queries/courier/get-courier-rates.handler';
import { CourierRatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/courier-rate.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CourierRateController],
  providers: [
    CourierRatePrismaRepository,
    CourierRateService,
    SetCourierRatesHandler,
    GetCourierRatesHandler,
  ],
  exports: [CourierRateService, CourierRatePrismaRepository],
})
export class CourierRateModule {}
