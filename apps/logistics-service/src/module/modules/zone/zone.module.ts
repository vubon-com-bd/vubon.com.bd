/**
 * ZoneModule — feature wiring for Zone aggregate
 * @module logistics-service/modules/zone
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ZoneController } from '../../interfaces/controllers/rest/zone.controller.js';
import { ZoneService } from '../../application/services/impl/zone.service.js';
import { ZONE_SERVICE } from '../../application/services/interfaces/zone.service.interface.js';
import { ZONE_COMMAND_HANDLERS } from '../../application/commands/zone/index.js';
import { ZONE_QUERY_HANDLERS } from '../../application/queries/zone/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [ZoneController],
  providers: [
    ZoneService,
    { provide: ZONE_SERVICE, useExisting: ZoneService },
    ...ZONE_COMMAND_HANDLERS,
    ...ZONE_QUERY_HANDLERS,
  ],
  exports: [ZoneService, ZONE_SERVICE],
})
export class ZoneModule {}
