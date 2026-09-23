import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShippingMethodController } from '../../interfaces/controllers/rest/shipping-method.controller';
import { ShippingMethodService } from '../../application/services/impl/shipping-method.service';

import { CreateShippingMethodHandler } from '../../application/commands/shipping-method/create-shipping-method.handler';
import { UpdateShippingMethodHandler } from '../../application/commands/shipping-method/update-shipping-method.handler';
import { CalculateShippingHandler } from '../../application/commands/shipping-method/calculate-shipping.handler';

import { GetShippingMethodHandler } from '../../application/queries/shipping-method/get-shipping-method.handler';
import { ListShippingMethodsHandler } from '../../application/queries/shipping-method/list-shipping-methods.handler';

import { ShippingMethodPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/shipping-method.prisma.repository';
import { ShippingMethodCacheRepository } from '../../infrastructure/persistence/cache/repositories/shipping-method.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ShippingMethodController],
  providers: [
    ShippingMethodPrismaRepository,
    ShippingMethodCacheRepository,
    ShippingMethodService,
    CreateShippingMethodHandler,
    UpdateShippingMethodHandler,
    CalculateShippingHandler,
    GetShippingMethodHandler,
    ListShippingMethodsHandler,
  ],
  exports: [ShippingMethodService, ShippingMethodPrismaRepository],
})
export class ShippingMethodModule {}
