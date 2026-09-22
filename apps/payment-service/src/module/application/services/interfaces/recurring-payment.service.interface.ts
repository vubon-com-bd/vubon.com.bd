import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RecurringPaymentEntity } from '../../../domain/entities/recurring-payment.entity';

export interface RecurringPaymentServiceInterface
  extends BaseServiceInterface<RecurringPaymentEntity, string> {
  listByPayment(paymentId: string): Promise<readonly RecurringPaymentEntity[]>;
  listDue(before: Date): Promise<readonly RecurringPaymentEntity[]>;
}
