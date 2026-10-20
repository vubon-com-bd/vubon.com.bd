/**
 * DeliveryMethodModule — feature wiring
 * @module order-service/modules/delivery-method
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DeliveryMethodService } from '../../application/services/impl/delivery-method.service.js';
import { DELIVERY_METHOD_SERVICE } from '../../application/services/interfaces/delivery-method.service.interface.js';
import { DELIVERY_METHOD_COMMAND_HANDLERS } from './commands/index.js';
import { DELIVERY_METHOD_QUERY_HANDLERS } from './queries/index.js';

@Module({
  imports: [CqrsModule],
  providers: [
    DeliveryMethodService,
    { provide: DELIVERY_METHOD_SERVICE, useExisting: DeliveryMethodService },
    ...(DELIVERY_METHOD_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(DELIVERY_METHOD_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [DeliveryMethodService, DELIVERY_METHOD_SERVICE],
})
export class DeliveryMethodModule {}
