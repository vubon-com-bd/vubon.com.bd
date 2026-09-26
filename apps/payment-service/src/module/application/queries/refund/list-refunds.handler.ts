import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListRefundsQuery } from './list-refunds.query';
import type { RefundRepository } from '../../../domain/repositories/refund.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';

@QueryHandler(ListRefundsQuery)
export class ListRefundsHandler
  extends BaseQueryHandler<ListRefundsQuery, readonly RefundResponseDTO[]>
  implements IQueryHandler<ListRefundsQuery>
{
  readonly queryType = 'refund.list';

  constructor(
    @Inject('RefundRepository')
    private readonly refundRepo: RefundRepository,
  ) {
    super();
  }

  async execute(query: ListRefundsQuery): Promise<readonly RefundResponseDTO[]> {
    const entities = await this.refundRepo.findByPaymentId(PaymentIdVO.create(query.paymentId));
    return entities.map((e) => ({
      id: e.id.value,
      status: e.status.value,
      amount: e.amount.amount as never,
      currency: e.currency.value,
      reason: e.reason ?? undefined,
      createdAt: e.createdAt,
      processedAt: e.processedAt?.toISOString(),
    } as unknown as RefundResponseDTO));
  }
}
