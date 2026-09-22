import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RecurringPaymentServiceInterface } from '../interfaces/recurring-payment.service.interface';
import type { RecurringPaymentRepository } from '../../../domain/repositories/recurring-payment.repository.interface';
import { RecurringPaymentEntity } from '../../../domain/entities/recurring-payment.entity';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';

@Injectable()
export class RecurringPaymentService
  extends BaseService<RecurringPaymentEntity, string>
  implements RecurringPaymentServiceInterface
{
  readonly name = 'RecurringPaymentService';

  constructor(
    @Inject('RecurringPaymentRepository')
    private readonly recurringRepo: RecurringPaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByPayment(paymentId: string): Promise<readonly RecurringPaymentEntity[]> {
    return this.recurringRepo.findByPaymentId(PaymentIdVO.create(paymentId));
  }

  async listDue(before: Date): Promise<readonly RecurringPaymentEntity[]> {
    return this.recurringRepo.findDue(before);
  }
}
