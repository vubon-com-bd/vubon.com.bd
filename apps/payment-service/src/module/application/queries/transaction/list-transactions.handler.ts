import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTransactionsByPaymentQuery } from './list-transactions.query';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';

@QueryHandler(ListTransactionsByPaymentQuery)
export class ListTransactionsByPaymentHandler
  extends BaseQueryHandler<ListTransactionsByPaymentQuery, readonly Readonly<Record<string, unknown>>[]>
  implements IQueryHandler<ListTransactionsByPaymentQuery>
{
  readonly queryType = 'transaction.list-by-payment';
  constructor(
    @Inject('TransactionRepository')
    private readonly txRepo: TransactionRepository,
  ) { super(); }

  async execute(query: ListTransactionsByPaymentQuery): Promise<readonly Readonly<Record<string, unknown>>[]> {
    const list = await this.txRepo.findByPaymentId(PaymentIdVO.create(query.paymentId));
    return list.map((e) => ({
      id: e.id.value,
      type: e.type.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.currency.value,
    }));
  }
}
