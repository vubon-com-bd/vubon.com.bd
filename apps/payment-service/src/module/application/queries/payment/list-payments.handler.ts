import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPaymentsQuery } from './list-payments.query';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';

@QueryHandler(ListPaymentsQuery)
export class ListPaymentsHandler
  extends BaseQueryHandler<ListPaymentsQuery, readonly PaymentResponseDTO[]>
  implements IQueryHandler<ListPaymentsQuery>
{
  readonly queryType = 'payment.list';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
  ) {
    super();
  }

  async execute(query: ListPaymentsQuery): Promise<readonly PaymentResponseDTO[]> {
    const entities = await this.paymentRepo.findAll();
    const start = (query.page - 1) * query.limit;
    return entities.slice(start, start + query.limit).map((e) => ({
      success: true,
      payment: {
        id: e.id.value,
        orderId: e.orderId.value,
        status: e.status.value,
        method: e.type.value,
        gateway: e.gateway?.value,
        amount: e.amount.amount as never,
        currency: e.currency.value,
        createdAt: e.createdAt,
        capturedAt: e.capturedAt?.toISOString(),
      },
    } as unknown as PaymentResponseDTO));
  }
}
