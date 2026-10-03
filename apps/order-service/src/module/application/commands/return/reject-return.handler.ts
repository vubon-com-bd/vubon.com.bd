import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectReturnCommand } from './reject-return.command.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@CommandHandler(RejectReturnCommand)
export class RejectReturnHandler implements ICommandHandler<RejectReturnCommand, ReturnResponseDTO> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(c: RejectReturnCommand): Promise<ReturnResponseDTO> {
    return this.service.reject(c.dto, c.actorId);
  }
}
