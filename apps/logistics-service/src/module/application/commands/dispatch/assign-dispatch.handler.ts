import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDispatchCommand } from './assign-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(AssignDispatchCommand)
export class AssignDispatchHandler implements ICommandHandler<AssignDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: AssignDispatchCommand): Promise<DispatchResponseDTO> { return this.service.assign(c.dto, c.actorId); }
}
