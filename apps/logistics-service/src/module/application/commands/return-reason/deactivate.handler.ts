import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateReturnReasonCommand } from './deactivate.command.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@CommandHandler(DeactivateReturnReasonCommand)
export class DeactivateReturnReasonHandler implements ICommandHandler<DeactivateReturnReasonCommand, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(c: DeactivateReturnReasonCommand): Promise<ReturnReasonResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
