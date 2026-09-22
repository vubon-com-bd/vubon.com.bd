import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListInvoicesQuery } from './list-invoices.query';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';

@QueryHandler(ListInvoicesQuery)
export class ListInvoicesHandler
  extends BaseQueryHandler<ListInvoicesQuery, readonly Readonly<Record<string, unknown>>[]>
  implements IQueryHandler<ListInvoicesQuery>
{
  readonly queryType = 'invoice.list';
  constructor(
    @Inject('InvoiceRepository')
    private readonly repo: InvoiceRepository,
  ) { super(); }

  async execute(_query: ListInvoicesQuery): Promise<readonly Readonly<Record<string, unknown>>[]> {
    const list = await this.repo.findAll();
    return list.map((e) => ({
      id: e.id.value,
      number: e.number.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.currency.value,
    }));
  }
}
