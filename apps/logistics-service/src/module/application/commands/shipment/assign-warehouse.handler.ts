import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignWarehouseCommand } from './assign-warehouse.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(AssignWarehouseCommand)
export class AssignWarehouseHandler implements ICommandHandler<AssignWarehouseCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: AssignWarehouseCommand): Promise<ShipmentResponseDTO> {
    return this.service.assignWarehouse(c.dto, c.actorId);
  }
}
