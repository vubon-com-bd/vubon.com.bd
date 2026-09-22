import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListRecurringQuery } from './list-recurring.query';
import type { RecurringPaymentRepository } from '../../../domain/repositories/recurring-payment.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';

@QueryHandler(ListRecurringQuery)
export class ListRecurringHandler
  extends BaseQueryHandler<ListRecurringQuery, readonly Readonly<Record<string, unknown>>[]>
  implements IQueryHandler<ListRecurringQuery>
{
  readonly queryType = 'recurring.list';
  constructor(
    @Inject('RecurringPaymentRepository')
    private readonly recurringRepo: RecurringPaymentRepository,
  ) { super(); }

  async execute(query: ListRecurringQuery): Promise<readonly Readonly<Record<string, unknown>>[]> {
    const list = await this.recurringRepo.findByPaymentId(PaymentIdVO.create(query.paymentId));
    return list.map((e) => ({
      id: e.id.value,
      paymentId: e.paymentId.value,
      frequency: e.frequency.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.currency.value,
      nextRunAt: e.nextRunAt.toISOString(),
    }));
  }
}
