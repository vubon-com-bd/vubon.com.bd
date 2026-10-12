import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignFulfillmentCommand } from './assign-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(AssignFulfillmentCommand)
export class AssignFulfillmentHandler implements ICommandHandler<AssignFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: AssignFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.assign(c.dto, c.actorId); }
}
