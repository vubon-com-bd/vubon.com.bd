import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelFulfillmentCommand } from './cancel-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(CancelFulfillmentCommand)
export class CancelFulfillmentHandler implements ICommandHandler<CancelFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: CancelFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
