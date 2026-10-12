import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReturnDispatchCommand } from './return-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(ReturnDispatchCommand)
export class ReturnDispatchHandler implements ICommandHandler<ReturnDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: ReturnDispatchCommand): Promise<DispatchResponseDTO> { return this.service.markReturned(c.dto, c.actorId); }
}
