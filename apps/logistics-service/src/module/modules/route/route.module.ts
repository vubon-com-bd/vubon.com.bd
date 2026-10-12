/**
 * RouteModule — feature wiring for Route aggregate
 * @module logistics-service/modules/route
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RouteController } from '../../interfaces/controllers/rest/route.controller.js';
import { RouteService } from '../../application/services/impl/route.service.js';
import { ROUTE_SERVICE } from '../../application/services/interfaces/route.service.interface.js';
import { ROUTE_COMMAND_HANDLERS } from '../../application/commands/route/index.js';
import { ROUTE_QUERY_HANDLERS } from '../../application/queries/route/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [RouteController],
  providers: [
    RouteService,
    { provide: ROUTE_SERVICE, useExisting: RouteService },
    ...ROUTE_COMMAND_HANDLERS,
    ...ROUTE_QUERY_HANDLERS,
  ],
  exports: [RouteService, ROUTE_SERVICE],
})
export class RouteModule {}
