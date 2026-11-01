import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateReturnReasonCommand } from './activate.command.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@CommandHandler(ActivateReturnReasonCommand)
export class ActivateReturnReasonHandler implements ICommandHandler<ActivateReturnReasonCommand, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(c: ActivateReturnReasonCommand): Promise<ReturnReasonResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
