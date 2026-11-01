import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReturnReasonCommand } from './update.command.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@CommandHandler(UpdateReturnReasonCommand)
export class UpdateReturnReasonHandler implements ICommandHandler<UpdateReturnReasonCommand, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(c: UpdateReturnReasonCommand): Promise<ReturnReasonResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
