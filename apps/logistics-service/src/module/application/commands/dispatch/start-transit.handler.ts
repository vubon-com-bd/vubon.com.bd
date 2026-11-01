import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartTransitDispatchCommand } from './start-transit.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@CommandHandler(StartTransitDispatchCommand)
export class StartTransitDispatchHandler implements ICommandHandler<StartTransitDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: StartTransitDispatchCommand): Promise<DispatchResponseDTO> { return this.service.startTransit(c.dto, c.actorId); }
}
