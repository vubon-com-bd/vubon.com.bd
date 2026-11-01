import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkFailedDispatchCommand } from './mark-failed.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(MarkFailedDispatchCommand)
export class MarkFailedDispatchHandler implements ICommandHandler<MarkFailedDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: MarkFailedDispatchCommand): Promise<DispatchResponseDTO> { return this.service.markFailed(c.dto, c.actorId); }
}
