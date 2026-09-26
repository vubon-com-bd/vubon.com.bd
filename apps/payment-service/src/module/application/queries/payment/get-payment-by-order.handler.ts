import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPaymentByOrderQuery } from './get-payment-by-order.query';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';

@QueryHandler(GetPaymentByOrderQuery)
export class GetPaymentByOrderHandler
  extends BaseQueryHandler<GetPaymentByOrderQuery, readonly PaymentResponseDTO[]>
  implements IQueryHandler<GetPaymentByOrderQuery>
{
  readonly queryType = 'payment.get-by-order';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
  ) {
    super();
  }

  async execute(query: GetPaymentByOrderQuery): Promise<readonly PaymentResponseDTO[]> {
    const entities = await this.paymentRepo.findByOrderId(OrderIdVO.create(query.orderId));
    return entities.map((e) => ({
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
