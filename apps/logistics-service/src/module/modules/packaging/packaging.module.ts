/**
 * PackagingModule — feature wiring for Packaging aggregate
 * @module logistics-service/modules/packaging
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PackagingController } from '../../interfaces/controllers/rest/packaging.controller.js';
import { PackagingService } from '../../application/services/impl/packaging.service.js';
import { PACKAGING_SERVICE } from '../../application/services/interfaces/packaging.service.interface.js';
import { PACKAGING_COMMAND_HANDLERS } from '../../application/commands/packaging/index.js';
import { PACKAGING_QUERY_HANDLERS } from '../../application/queries/packaging/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [PackagingController],
  providers: [
    PackagingService,
    { provide: PACKAGING_SERVICE, useExisting: PackagingService },
    ...PACKAGING_COMMAND_HANDLERS,
    ...PACKAGING_QUERY_HANDLERS,
  ],
  exports: [PackagingService, PACKAGING_SERVICE],
})
export class PackagingModule {}
