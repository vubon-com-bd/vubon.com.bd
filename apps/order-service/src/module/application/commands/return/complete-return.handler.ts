import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteReturnCommand } from './complete-return.command.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@CommandHandler(CompleteReturnCommand)
export class CompleteReturnHandler implements ICommandHandler<CompleteReturnCommand, ReturnResponseDTO> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(c: CompleteReturnCommand): Promise<ReturnResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}
