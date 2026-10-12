/**
 * DispatchModule — feature wiring for Dispatch aggregate
 * @module logistics-service/modules/dispatch
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DispatchController } from '../../interfaces/controllers/rest/dispatch.controller.js';
import { DispatchService } from '../../application/services/impl/dispatch.service.js';
import { DISPATCH_SERVICE } from '../../application/services/interfaces/dispatch.service.interface.js';
import { DISPATCH_COMMAND_HANDLERS } from '../../application/commands/dispatch/index.js';
import { DISPATCH_QUERY_HANDLERS } from '../../application/queries/dispatch/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [DispatchController],
  providers: [
    DispatchService,
    { provide: DISPATCH_SERVICE, useExisting: DispatchService },
    ...DISPATCH_COMMAND_HANDLERS,
    ...DISPATCH_QUERY_HANDLERS,
  ],
  exports: [DispatchService, DISPATCH_SERVICE],
})
export class DispatchModule {}
