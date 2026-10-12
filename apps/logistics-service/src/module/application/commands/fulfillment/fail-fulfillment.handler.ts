import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailFulfillmentCommand } from './fail-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(FailFulfillmentCommand)
export class FailFulfillmentHandler implements ICommandHandler<FailFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: FailFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.fail(c.dto, c.actorId); }
}
