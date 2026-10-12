import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelDispatchCommand } from './cancel-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(CancelDispatchCommand)
export class CancelDispatchHandler implements ICommandHandler<CancelDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: CancelDispatchCommand): Promise<DispatchResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
