import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShipmentController } from '../../interfaces/controllers/rest/shipment.controller';
import { ShipmentService } from '../../application/services/impl/shipment.service';
import { ShipmentMapper } from '../../application/mappers/shipment.mapper';

import { CreateShipmentHandler } from '../../application/commands/shipment/create-shipment.handler';
import { UpdateShipmentHandler } from '../../application/commands/shipment/update-shipment.handler';
import { CancelShipmentHandler } from '../../application/commands/shipment/cancel-shipment.handler';
import { PickUpShipmentHandler } from '../../application/commands/shipment/pick-up-shipment.handler';
import { DeliverShipmentHandler } from '../../application/commands/shipment/deliver-shipment.handler';

import { GetShipmentHandler } from '../../application/queries/shipment/get-shipment.handler';
import { ListShipmentsHandler } from '../../application/queries/shipment/list-shipments.handler';
import { GetShipmentByOrderHandler } from '../../application/queries/shipment/get-shipment-by-order.handler';
import { GetShipmentStatsHandler } from '../../application/queries/shipment/get-shipment-stats.handler';

import { ShipmentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/shipment.prisma.repository';
import { ShipmentCacheRepository } from '../../infrastructure/persistence/cache/repositories/shipment.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ShipmentController],
  providers: [
    ShipmentPrismaRepository,
    ShipmentCacheRepository,
    ShipmentService,
    ShipmentMapper,
    CreateShipmentHandler,
    UpdateShipmentHandler,
    CancelShipmentHandler,
    PickUpShipmentHandler,
    DeliverShipmentHandler,
    GetShipmentHandler,
    ListShipmentsHandler,
    GetShipmentByOrderHandler,
    GetShipmentStatsHandler,
  ],
  exports: [ShipmentService, ShipmentPrismaRepository, ShipmentCacheRepository],
})
export class ShipmentModule {}
