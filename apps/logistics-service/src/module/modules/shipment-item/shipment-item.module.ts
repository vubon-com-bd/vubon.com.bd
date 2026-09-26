import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShipmentItemController } from '../../interfaces/controllers/rest/shipment-item.controller';
import { ShipmentItemService } from '../../application/services/impl/shipment-item.service';
import { ShipmentItemPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/shipment-item.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ShipmentItemController],
  providers: [ShipmentItemPrismaRepository, ShipmentItemService],
  exports: [ShipmentItemService, ShipmentItemPrismaRepository],
})
export class ShipmentItemModule {}
