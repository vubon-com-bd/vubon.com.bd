import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReturnedDispatchCommand } from './mark-returned.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(MarkReturnedDispatchCommand)
export class MarkReturnedDispatchHandler implements ICommandHandler<MarkReturnedDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: MarkReturnedDispatchCommand): Promise<DispatchResponseDTO> { return this.service.markReturned(c.dto, c.actorId); }
}
