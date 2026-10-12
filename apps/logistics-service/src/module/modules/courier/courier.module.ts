/**
 * CourierModule — feature wiring for Courier aggregate
 * @module logistics-service/modules/courier
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CourierController } from '../../interfaces/controllers/rest/courier.controller.js';
import { CourierService } from '../../application/services/impl/courier.service.js';
import { COURIER_SERVICE } from '../../application/services/interfaces/courier.service.interface.js';
import { COURIER_COMMAND_HANDLERS } from '../../application/commands/courier/index.js';
import { COURIER_QUERY_HANDLERS } from '../../application/queries/courier/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [CourierController],
  providers: [
    CourierService,
    { provide: COURIER_SERVICE, useExisting: CourierService },
    ...COURIER_COMMAND_HANDLERS,
    ...COURIER_QUERY_HANDLERS,
  ],
  exports: [CourierService, COURIER_SERVICE],
})
export class CourierModule {}
