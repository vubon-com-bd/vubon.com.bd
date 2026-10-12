import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignWarehouseCommand } from './assign-warehouse.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(AssignWarehouseCommand)
export class AssignWarehouseHandler implements ICommandHandler<AssignWarehouseCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: AssignWarehouseCommand): Promise<ShipmentResponseDTO> {
    return this.service.assignWarehouse(c.dto, c.actorId);
  }
}
