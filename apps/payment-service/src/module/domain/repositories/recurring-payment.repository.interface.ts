import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RecurringPaymentEntity } from '../entities/recurring-payment.entity';
import { RecurringIdVO } from '../value-objects/primitives/recurring-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface RecurringPaymentRepository extends BaseRepository<RecurringPaymentEntity, RecurringIdVO> {
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RecurringPaymentEntity[]>;
  findDue(before: Date): Promise<readonly RecurringPaymentEntity[]>;
}
