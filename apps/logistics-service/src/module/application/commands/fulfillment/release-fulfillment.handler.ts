import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseFulfillmentCommand } from './release-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(ReleaseFulfillmentCommand)
export class ReleaseFulfillmentHandler implements ICommandHandler<ReleaseFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: ReleaseFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.release(c.dto, c.actorId); }
}
