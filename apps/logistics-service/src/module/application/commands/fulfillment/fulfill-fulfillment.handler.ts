import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FulfillFulfillmentCommand } from './fulfill-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(FulfillFulfillmentCommand)
export class FulfillFulfillmentHandler implements ICommandHandler<FulfillFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: FulfillFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.fulfill(c.dto, c.actorId); }
}
