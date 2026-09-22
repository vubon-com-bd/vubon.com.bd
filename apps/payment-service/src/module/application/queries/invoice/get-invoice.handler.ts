import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetInvoiceQuery } from './get-invoice.query';
import type { InvoiceRepository } from '../../../domain/repositories/invoice.repository.interface';
import { InvoiceIdVO } from '../../../domain/value-objects/primitives/invoice-id.vo';
import type { InvoiceResponseDTO } from '../../dtos/responses/invoice-response.dto';
import { InvoiceOperationFailedError } from '../../errors/invoice.errors';

@QueryHandler(GetInvoiceQuery)
export class GetInvoiceHandler
  extends BaseQueryHandler<GetInvoiceQuery, InvoiceResponseDTO>
  implements IQueryHandler<GetInvoiceQuery>
{
  readonly queryType = 'invoice.get';

  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepo: InvoiceRepository,
  ) {
    super();
  }

  async execute(query: GetInvoiceQuery): Promise<InvoiceResponseDTO> {
    const entity = await this.invoiceRepo.findById(InvoiceIdVO.create(query.invoiceId));
    if (!entity) {
      throw new InvoiceOperationFailedError('invoice not found');
    }
    return {
      id: entity.id.value,
      number: entity.number.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      dueAt: entity.dueAt?.toISOString(),
      paidAt: entity.paidAt?.toISOString(),
      createdAt: entity.createdAt,
    };
  }
}
