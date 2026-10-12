import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailDispatchCommand } from './fail-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(FailDispatchCommand)
export class FailDispatchHandler implements ICommandHandler<FailDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: FailDispatchCommand): Promise<DispatchResponseDTO> { return this.service.fail(c.dto, c.actorId); }
}
