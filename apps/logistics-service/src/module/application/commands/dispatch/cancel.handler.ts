import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelDispatchCommand } from './cancel.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(CancelDispatchCommand)
export class CancelDispatchHandler implements ICommandHandler<CancelDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: CancelDispatchCommand): Promise<DispatchResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
