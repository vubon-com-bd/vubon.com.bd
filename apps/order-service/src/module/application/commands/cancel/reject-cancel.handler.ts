import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectCancelCommand } from './reject-cancel.command.js';
import { ORDER_CANCEL_SERVICE, type IOrderCancelService } from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@CommandHandler(RejectCancelCommand)
export class RejectCancelHandler implements ICommandHandler<RejectCancelCommand, CancelResponseDTO> {
  constructor(@Inject(ORDER_CANCEL_SERVICE) private readonly service: IOrderCancelService) {}
  async execute(c: RejectCancelCommand): Promise<CancelResponseDTO> {
    return this.service.reject(c.dto, c.actorId);
  }
}
