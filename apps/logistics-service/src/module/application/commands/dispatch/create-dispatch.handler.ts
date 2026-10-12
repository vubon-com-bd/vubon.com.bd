import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDispatchCommand } from './create-dispatch.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(CreateDispatchCommand)
export class CreateDispatchHandler implements ICommandHandler<CreateDispatchCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: CreateDispatchCommand): Promise<DispatchResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
