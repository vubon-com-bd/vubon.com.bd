import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkDispatchInTransitCommand } from './mark-dispatch-in-transit.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(MarkDispatchInTransitCommand)
export class MarkDispatchInTransitHandler implements ICommandHandler<MarkDispatchInTransitCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: MarkDispatchInTransitCommand): Promise<DispatchResponseDTO> { return this.service.markInTransit(c.dto, c.actorId); }
}
