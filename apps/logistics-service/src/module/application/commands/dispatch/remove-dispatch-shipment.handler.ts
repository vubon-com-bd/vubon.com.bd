import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveDispatchShipmentCommand } from './remove-dispatch-shipment.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(RemoveDispatchShipmentCommand)
export class RemoveDispatchShipmentHandler implements ICommandHandler<RemoveDispatchShipmentCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: RemoveDispatchShipmentCommand): Promise<DispatchResponseDTO> { return this.service.removeShipment(c.dto, c.actorId); }
}
