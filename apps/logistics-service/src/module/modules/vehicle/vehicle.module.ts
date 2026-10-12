/**
 * VehicleModule — feature wiring for Vehicle aggregate
 * @module logistics-service/modules/vehicle
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VehicleController } from '../../interfaces/controllers/rest/vehicle.controller.js';
import { VehicleService } from '../../application/services/impl/vehicle.service.js';
import { VEHICLE_SERVICE } from '../../application/services/interfaces/vehicle.service.interface.js';
import { VEHICLE_COMMAND_HANDLERS } from '../../application/commands/vehicle/index.js';
import { VEHICLE_QUERY_HANDLERS } from '../../application/queries/vehicle/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    { provide: VEHICLE_SERVICE, useExisting: VehicleService },
    ...VEHICLE_COMMAND_HANDLERS,
    ...VEHICLE_QUERY_HANDLERS,
  ],
  exports: [VehicleService, VEHICLE_SERVICE],
})
export class VehicleModule {}
