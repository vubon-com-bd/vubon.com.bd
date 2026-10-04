/**
 * DeliveryModule
 * @module order-service/modules/delivery
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryController } from '../../interfaces/controllers/rest/delivery.controller.js';
import { DeliveryService } from '../../application/services/impl/delivery.service.js';
import { DELIVERY_SERVICE } from '../../application/services/interfaces/delivery.service.interface.js';
import { DeliveryMethodService } from '../../application/services/impl/delivery-method.service.js';
import { DELIVERY_METHOD_SERVICE } from '../../application/services/interfaces/delivery-method.service.interface.js';
import { DELIVERY_COMMAND_HANDLERS } from '../../application/commands/delivery/index.js';
import { DELIVERY_QUERY_HANDLERS } from '../../application/queries/delivery/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    { provide: DELIVERY_SERVICE, useExisting: DeliveryService },
    DeliveryMethodService,
    { provide: DELIVERY_METHOD_SERVICE, useExisting: DeliveryMethodService },

    ...DELIVERY_COMMAND_HANDLERS,
    ...DELIVERY_QUERY_HANDLERS,
  ],
  exports: [DeliveryService, DELIVERY_SERVICE, DeliveryMethodService, DELIVERY_METHOD_SERVICE],
})
export class DeliveryModule {}
