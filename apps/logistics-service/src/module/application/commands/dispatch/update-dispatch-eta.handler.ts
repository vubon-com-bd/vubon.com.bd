import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDispatchEtaCommand } from './update-dispatch-eta.command.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@CommandHandler(UpdateDispatchEtaCommand)
export class UpdateDispatchEtaHandler implements ICommandHandler<UpdateDispatchEtaCommand, DispatchResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(c: UpdateDispatchEtaCommand): Promise<DispatchResponseDTO> { return this.service.updateEta(c.dto, c.actorId); }
}
