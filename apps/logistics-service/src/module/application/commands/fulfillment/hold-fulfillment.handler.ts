import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { HoldFulfillmentCommand } from './hold-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(HoldFulfillmentCommand)
export class HoldFulfillmentHandler implements ICommandHandler<HoldFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: HoldFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.putOnHold(c.dto, c.actorId); }
}
