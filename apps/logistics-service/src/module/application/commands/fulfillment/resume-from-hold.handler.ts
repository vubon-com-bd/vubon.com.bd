import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResumeFromHoldFulfillmentCommand } from './resume-from-hold.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(ResumeFromHoldFulfillmentCommand)
export class ResumeFromHoldFulfillmentHandler implements ICommandHandler<ResumeFromHoldFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: ResumeFromHoldFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.resumeFromHold(c.dto, c.actorId);
  }
}
