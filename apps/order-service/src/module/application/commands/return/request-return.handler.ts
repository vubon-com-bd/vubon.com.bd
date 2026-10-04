import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestReturnCommand } from './request-return.command.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@CommandHandler(RequestReturnCommand)
export class RequestReturnHandler implements ICommandHandler<RequestReturnCommand, ReturnResponseDTO> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(c: RequestReturnCommand): Promise<ReturnResponseDTO> {
    return this.service.request(c.dto, c.actorId);
  }
}
