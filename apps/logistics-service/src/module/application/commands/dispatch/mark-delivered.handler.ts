import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkDeliveredDispatchCommand } from './mark-delivered.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(MarkDeliveredDispatchCommand)
export class MarkDeliveredDispatchHandler implements ICommandHandler<MarkDeliveredDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: MarkDeliveredDispatchCommand): Promise<DispatchResponseDTO> { return this.service.markDelivered(c.dto, c.actorId); }
}
