import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResumeFromHoldCommand } from './resume-from-hold.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(ResumeFromHoldCommand)
export class ResumeFromHoldHandler implements ICommandHandler<ResumeFromHoldCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ResumeFromHoldCommand): Promise<ShipmentResponseDTO> {
    return this.service.resumeFromHold(c.dto, c.actorId);
  }
}
