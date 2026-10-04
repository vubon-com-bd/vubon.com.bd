import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTransactionQuery } from './get-transaction.query.js';
import {
  TRANSACTION_SERVICE,
  type ITransactionService,
} from '../../services/interfaces/transaction.service.interface.js';
import type { TransactionResponseDTO } from '../../dtos/responses/transaction-response.dto.js';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery, TransactionResponseDTO>
{
  constructor(@Inject(TRANSACTION_SERVICE) private readonly service: ITransactionService) {}

  async execute(q: GetTransactionQuery): Promise<TransactionResponseDTO> {
    return this.service.getById(q.transactionId);
  }
}
