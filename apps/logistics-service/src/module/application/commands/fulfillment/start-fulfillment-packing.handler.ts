import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartFulfillmentPackingCommand } from './start-fulfillment-packing.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(StartFulfillmentPackingCommand)
export class StartFulfillmentPackingHandler implements ICommandHandler<StartFulfillmentPackingCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: StartFulfillmentPackingCommand): Promise<FulfillmentResponseDTO> { return this.service.startPacking(c.dto, c.actorId); }
}
