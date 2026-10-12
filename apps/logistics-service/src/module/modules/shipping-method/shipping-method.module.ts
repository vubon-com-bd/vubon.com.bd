/**
 * ShippingMethodModule — feature wiring for ShippingMethod aggregate
 * @module logistics-service/modules/shipping-method
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShippingMethodController } from '../../interfaces/controllers/rest/shipping-method.controller.js';
import { ShippingMethodService } from '../../application/services/impl/shipping-method.service.js';
import { SHIPPING_METHOD_SERVICE } from '../../application/services/interfaces/shipping-method.service.interface.js';
import { SHIPPING_METHOD_COMMAND_HANDLERS } from '../../application/commands/shipping-method/index.js';
import { SHIPPING_METHOD_QUERY_HANDLERS } from '../../application/queries/shipping-method/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [ShippingMethodController],
  providers: [
    ShippingMethodService,
    { provide: SHIPPING_METHOD_SERVICE, useExisting: ShippingMethodService },
    ...SHIPPING_METHOD_COMMAND_HANDLERS,
    ...SHIPPING_METHOD_QUERY_HANDLERS,
  ],
  exports: [ShippingMethodService, SHIPPING_METHOD_SERVICE],
})
export class ShippingMethodModule {}
