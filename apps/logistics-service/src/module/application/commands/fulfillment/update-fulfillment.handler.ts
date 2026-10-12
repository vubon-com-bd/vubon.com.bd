import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateFulfillmentCommand } from './update-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(UpdateFulfillmentCommand)
export class UpdateFulfillmentHandler implements ICommandHandler<UpdateFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: UpdateFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
