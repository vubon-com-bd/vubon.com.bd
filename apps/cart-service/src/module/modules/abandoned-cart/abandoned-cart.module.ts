import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AbandonedCartController } from '../../interfaces/controllers/rest/abandoned-cart.controller';
import { AbandonedCartService } from '../../application/services/impl/abandoned-cart.service';
import { AbandonedCartControllerMapper } from '../../interfaces/mappers/abandoned-cart.controller.mapper';
import { ListAbandonedHandler } from '../../application/queries/abandoned/list-abandoned.handler';
import { GetAbandonedStatsHandler } from '../../application/queries/abandoned/get-abandoned-stats.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AbandonedCartController],
  providers: [
    AbandonedCartService,
    AbandonedCartControllerMapper,
    ListAbandonedHandler,
    GetAbandonedStatsHandler,
  ],
  exports: [AbandonedCartService],
})
export class AbandonedCartModule {}
