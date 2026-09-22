import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SplitPaymentServiceInterface } from '../interfaces/split-payment.service.interface';
import type { SplitPaymentRepository } from '../../../domain/repositories/split-payment.repository.interface';
import { SplitPaymentEntity } from '../../../domain/entities/split-payment.entity';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';

@Injectable()
export class SplitPaymentService
  extends BaseService<SplitPaymentEntity, string>
  implements SplitPaymentServiceInterface
{
  readonly name = 'SplitPaymentService';

  constructor(
    @Inject('SplitPaymentRepository')
    private readonly splitRepo: SplitPaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByPayment(paymentId: string): Promise<readonly SplitPaymentEntity[]> {
    return this.splitRepo.findByPaymentId(PaymentIdVO.create(paymentId));
  }
}
