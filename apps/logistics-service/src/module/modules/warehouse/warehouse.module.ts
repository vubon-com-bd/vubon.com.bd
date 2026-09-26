import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { WarehouseController } from '../../interfaces/controllers/rest/warehouse.controller';
import { WarehouseService } from '../../application/services/impl/warehouse.service';
import { WarehouseMapper } from '../../application/mappers/warehouse.mapper';

import { CreateWarehouseHandler } from '../../application/commands/warehouse/create-warehouse.handler';
import { UpdateWarehouseHandler } from '../../application/commands/warehouse/update-warehouse.handler';
import { AddLocationHandler } from '../../application/commands/warehouse/add-location.handler';

import { GetWarehouseHandler } from '../../application/queries/warehouse/get-warehouse.handler';
import { ListWarehousesHandler } from '../../application/queries/warehouse/list-warehouses.handler';
import { ListLocationsHandler } from '../../application/queries/warehouse/list-locations.handler';

import { WarehousePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/warehouse.prisma.repository';
import { WarehouseCacheRepository } from '../../infrastructure/persistence/cache/repositories/warehouse.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [WarehouseController],
  providers: [
    WarehousePrismaRepository,
    WarehouseCacheRepository,
    WarehouseService,
    WarehouseMapper,
    CreateWarehouseHandler,
    UpdateWarehouseHandler,
    AddLocationHandler,
    GetWarehouseHandler,
    ListWarehousesHandler,
    ListLocationsHandler,
  ],
  exports: [WarehouseService, WarehousePrismaRepository, WarehouseCacheRepository],
})
export class WarehouseModule {}
