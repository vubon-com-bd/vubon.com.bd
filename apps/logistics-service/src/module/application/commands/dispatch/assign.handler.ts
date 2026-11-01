import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDispatchCommand } from './assign.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(AssignDispatchCommand)
export class AssignDispatchHandler implements ICommandHandler<AssignDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: AssignDispatchCommand): Promise<DispatchResponseDTO> { return this.service.assign(c.dto, c.actorId); }
}
