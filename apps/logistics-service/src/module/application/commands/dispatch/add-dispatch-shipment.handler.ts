import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddDispatchShipmentCommand } from './add-dispatch-shipment.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(AddDispatchShipmentCommand)
export class AddDispatchShipmentHandler implements ICommandHandler<AddDispatchShipmentCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: AddDispatchShipmentCommand): Promise<DispatchResponseDTO> { return this.service.addShipment(c.dto, c.actorId); }
}
