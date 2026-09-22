import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPaymentQuery } from './get-payment.query';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler
  extends BaseQueryHandler<GetPaymentQuery, PaymentResponseDTO>
  implements IQueryHandler<GetPaymentQuery>
{
  readonly queryType = 'payment.get';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
  ) {
    super();
  }

  async execute(query: GetPaymentQuery): Promise<PaymentResponseDTO> {
    const entity = await this.paymentRepo.findById(PaymentIdVO.create(query.paymentId));
    if (!entity) {
      throw new PaymentOperationFailedError('payment not found');
    }
    return {
      success: true,
      payment: {
        id: entity.id.value,
        orderId: entity.orderId.value,
        status: entity.status.value,
        method: entity.type.value,
        gateway: entity.gateway?.value,
        amount: entity.amount.amount as never,
        currency: entity.currency.value,
        createdAt: entity.createdAt,
        capturedAt: entity.capturedAt?.toISOString(),
      },
    } as unknown as PaymentResponseDTO;
  }
}
