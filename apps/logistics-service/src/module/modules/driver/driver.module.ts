/**
 * DriverModule — feature wiring for Driver aggregate
 * @module logistics-service/modules/driver
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DriverController } from '../../interfaces/controllers/rest/driver.controller.js';
import { DriverService } from '../../application/services/impl/driver.service.js';
import { DRIVER_SERVICE } from '../../application/services/interfaces/driver.service.interface.js';
import { DRIVER_COMMAND_HANDLERS } from '../../application/commands/driver/index.js';
import { DRIVER_QUERY_HANDLERS } from '../../application/queries/driver/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [DriverController],
  providers: [
    DriverService,
    { provide: DRIVER_SERVICE, useExisting: DriverService },
    ...DRIVER_COMMAND_HANDLERS,
    ...DRIVER_QUERY_HANDLERS,
  ],
  exports: [DriverService, DRIVER_SERVICE],
})
export class DriverModule {}
