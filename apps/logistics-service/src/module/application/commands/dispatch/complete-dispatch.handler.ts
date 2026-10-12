import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteDispatchCommand } from './complete-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(CompleteDispatchCommand)
export class CompleteDispatchHandler implements ICommandHandler<CompleteDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: CompleteDispatchCommand): Promise<DispatchResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
