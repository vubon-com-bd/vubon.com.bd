import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InventoryLocationController } from '../../interfaces/controllers/rest/inventory-location.controller';
import { InventoryLocationService } from '../../application/services/impl/inventory-location.service';
import { ListLocationsHandler } from '../../application/queries/warehouse/list-locations.handler';
import { InventoryLocationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/inventory-location.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [InventoryLocationController],
  providers: [
    InventoryLocationPrismaRepository,
    InventoryLocationService,
    ListLocationsHandler,
  ],
  exports: [InventoryLocationService, InventoryLocationPrismaRepository],
})
export class InventoryLocationModule {}
