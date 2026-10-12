import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartFulfillmentProcessingCommand } from './start-fulfillment-processing.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(StartFulfillmentProcessingCommand)
export class StartFulfillmentProcessingHandler implements ICommandHandler<StartFulfillmentProcessingCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: StartFulfillmentProcessingCommand): Promise<FulfillmentResponseDTO> { return this.service.startProcessing(c.dto, c.actorId); }
}
