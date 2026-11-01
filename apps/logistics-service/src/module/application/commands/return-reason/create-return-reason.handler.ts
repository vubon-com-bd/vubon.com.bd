import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateReturnReasonCommand } from './create-return-reason.command.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@CommandHandler(CreateReturnReasonCommand)
export class CreateReturnReasonHandler implements ICommandHandler<CreateReturnReasonCommand, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(c: CreateReturnReasonCommand): Promise<ReturnReasonResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
