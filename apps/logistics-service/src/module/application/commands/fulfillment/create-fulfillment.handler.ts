import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateFulfillmentCommand } from './create-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(CreateFulfillmentCommand)
export class CreateFulfillmentHandler implements ICommandHandler<CreateFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: CreateFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
