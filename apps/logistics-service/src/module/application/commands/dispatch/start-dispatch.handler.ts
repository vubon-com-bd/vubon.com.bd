import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartDispatchCommand } from './start-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(StartDispatchCommand)
export class StartDispatchHandler implements ICommandHandler<StartDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: StartDispatchCommand): Promise<DispatchResponseDTO> { return this.service.start(c.dto, c.actorId); }
}
