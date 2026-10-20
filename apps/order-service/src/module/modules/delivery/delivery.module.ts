/**
 * DeliveryModule — feature wiring
 * @module order-service/modules/delivery
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DeliveryMethodModule } from '../delivery-method/delivery-method.module.js';

import { DeliveryController } from '../../interfaces/controllers/rest/delivery.controller.js';
import { DELIVERY_COMMAND_HANDLERS } from './commands/index.js';
import { DELIVERY_QUERY_HANDLERS } from './queries/index.js';
import { DELIVERY_SAGAS } from './sagas/index.js';
import { DeliveryService } from '../../application/services/impl/delivery.service.js';
import { DELIVERY_SERVICE } from '../../application/services/interfaces/delivery.service.interface.js';
import { DeliveryHealthIndicator } from './health/index.js';

@Module({
  imports: [CqrsModule, DeliveryMethodModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    { provide: DELIVERY_SERVICE, useExisting: DeliveryService },
    ...(DELIVERY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(DELIVERY_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(DELIVERY_SAGAS as readonly unknown[] as never[]),
    DeliveryHealthIndicator,
  ],
  exports: [DeliveryService, DELIVERY_SERVICE, DeliveryHealthIndicator],
})
export class DeliveryModule {}
