import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveReturnCommand } from './approve-return.command.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@CommandHandler(ApproveReturnCommand)
export class ApproveReturnHandler implements ICommandHandler<ApproveReturnCommand, ReturnResponseDTO> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(c: ApproveReturnCommand): Promise<ReturnResponseDTO> {
    return this.service.approve(c.dto, c.actorId);
  }
}
