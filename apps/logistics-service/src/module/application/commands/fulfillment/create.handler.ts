import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateFulfillmentCommand } from './create.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(CreateFulfillmentCommand)
export class CreateFulfillmentHandler implements ICommandHandler<CreateFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: CreateFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
