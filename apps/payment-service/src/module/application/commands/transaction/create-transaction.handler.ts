/**
 * CreateTransactionHandler
 * @module payment-service/application/commands/transaction
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTransactionCommand } from './create-transaction.command.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '@application/services/interfaces/transaction.service.interface.js';
import type { TransactionResponseDTO } from '@application/dtos/responses/transaction-response.dto.js';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand, TransactionResponseDTO>
{
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly service: ITransactionService,
  ) {}
  async execute(c: CreateTransactionCommand): Promise<TransactionResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
