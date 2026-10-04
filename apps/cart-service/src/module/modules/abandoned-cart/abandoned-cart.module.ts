import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/prisma-repositories.module.js';
import { AbandonedCartController } from '../../interfaces/controllers/rest/abandoned-cart.controller.js';
import { AbandonedCartService } from '../../application/services/impl/abandoned-cart.service.js';
import { ABANDONED_CART_SERVICE } from '../../application/services/interfaces/abandoned-cart.service.interface.js';
import { ABANDONED_QUERY_HANDLERS } from '../../application/queries/abandoned/index.js';
import { ANALYTICS_QUERY_HANDLERS } from '../../application/queries/analytics/index.js';
import { ALL_SAGAS } from '../../application/sagas/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule, PrismaRepositoriesModule],
  controllers: [AbandonedCartController],
  providers: [
    AbandonedCartService,
    { provide: ABANDONED_CART_SERVICE, useExisting: AbandonedCartService },
    ...ABANDONED_QUERY_HANDLERS,
    ...ANALYTICS_QUERY_HANDLERS,
    ...ALL_SAGAS,
  ],
  exports: [AbandonedCartService, ABANDONED_CART_SERVICE],
})
export class AbandonedCartModule {}
