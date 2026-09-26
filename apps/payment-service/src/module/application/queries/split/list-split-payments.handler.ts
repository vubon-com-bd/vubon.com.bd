import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSplitPaymentsQuery } from './list-split-payments.query';
import type { SplitPaymentRepository } from '../../../domain/repositories/split-payment.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';

@QueryHandler(ListSplitPaymentsQuery)
export class ListSplitPaymentsHandler
  extends BaseQueryHandler<ListSplitPaymentsQuery, readonly Readonly<Record<string, unknown>>[]>
  implements IQueryHandler<ListSplitPaymentsQuery>
{
  readonly queryType = 'split.list';
  constructor(
    @Inject('SplitPaymentRepository')
    private readonly splitRepo: SplitPaymentRepository,
  ) { super(); }

  async execute(query: ListSplitPaymentsQuery): Promise<readonly Readonly<Record<string, unknown>>[]> {
    const list = await this.splitRepo.findByPaymentId(PaymentIdVO.create(query.paymentId));
    return list.map((e) => ({
      id: e.id.value,
      type: e.type.value,
      amount: e.amount.amount,
      currency: e.currency.value,
      recipientId: e.recipientId,
      status: e.status,
    }));
  }
}
