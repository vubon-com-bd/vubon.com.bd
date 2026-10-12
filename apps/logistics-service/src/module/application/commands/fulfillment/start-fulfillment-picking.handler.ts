import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartFulfillmentPickingCommand } from './start-fulfillment-picking.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(StartFulfillmentPickingCommand)
export class StartFulfillmentPickingHandler implements ICommandHandler<StartFulfillmentPickingCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: StartFulfillmentPickingCommand): Promise<FulfillmentResponseDTO> { return this.service.startPicking(c.dto, c.actorId); }
}
