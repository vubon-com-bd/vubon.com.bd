import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveCancelCommand } from './approve-cancel.command.js';
import { ORDER_CANCEL_SERVICE, type IOrderCancelService } from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@CommandHandler(ApproveCancelCommand)
export class ApproveCancelHandler implements ICommandHandler<ApproveCancelCommand, CancelResponseDTO> {
  constructor(@Inject(ORDER_CANCEL_SERVICE) private readonly service: IOrderCancelService) {}
  async execute(c: ApproveCancelCommand): Promise<CancelResponseDTO> {
    return this.service.approve(c.dto, c.actorId);
  }
}
