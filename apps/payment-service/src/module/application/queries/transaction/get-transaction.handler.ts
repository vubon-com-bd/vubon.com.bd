import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTransactionQuery } from './get-transaction.query';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository.interface';
import { TransactionIdVO } from '../../../domain/value-objects/primitives/transaction-id.vo';
import { TransactionOperationFailedError } from '../../errors/transaction.errors';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  extends BaseQueryHandler<GetTransactionQuery, Readonly<Record<string, unknown>>>
  implements IQueryHandler<GetTransactionQuery>
{
  readonly queryType = 'transaction.get';
  constructor(
    @Inject('TransactionRepository')
    private readonly txRepo: TransactionRepository,
  ) { super(); }

  async execute(query: GetTransactionQuery): Promise<Readonly<Record<string, unknown>>> {
    const entity = await this.txRepo.findById(TransactionIdVO.create(query.transactionId));
    if (!entity) throw new TransactionOperationFailedError('transaction not found');
    return {
      id: entity.id.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
    };
  }
}
