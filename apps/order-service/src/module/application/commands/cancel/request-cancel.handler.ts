import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestCancelCommand } from './request-cancel.command.js';
import { ORDER_CANCEL_SERVICE, type IOrderCancelService } from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@CommandHandler(RequestCancelCommand)
export class RequestCancelHandler implements ICommandHandler<RequestCancelCommand, CancelResponseDTO> {
  constructor(@Inject(ORDER_CANCEL_SERVICE) private readonly service: IOrderCancelService) {}
  async execute(c: RequestCancelCommand): Promise<CancelResponseDTO> {
    return this.service.request(c.dto, c.actorId);
  }
}
