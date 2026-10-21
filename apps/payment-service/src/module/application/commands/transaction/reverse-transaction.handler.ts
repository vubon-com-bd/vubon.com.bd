/**
 * ReverseTransactionHandler
 * @module payment-service/application/commands/transaction
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReverseTransactionCommand } from './reverse-transaction.command.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '@application/services/interfaces/transaction.service.interface.js';
import type { TransactionResponseDTO } from '@application/dtos/responses/transaction-response.dto.js';

@CommandHandler(ReverseTransactionCommand)
export class ReverseTransactionHandler
  implements ICommandHandler<ReverseTransactionCommand, TransactionResponseDTO>
{
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly service: ITransactionService,
  ) {}
  async execute(c: ReverseTransactionCommand): Promise<TransactionResponseDTO> {
    return this.service.reverse(c.dto, c.actorId);
  }
}
