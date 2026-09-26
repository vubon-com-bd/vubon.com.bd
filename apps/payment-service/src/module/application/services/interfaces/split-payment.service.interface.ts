import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SplitPaymentEntity } from '../../../domain/entities/split-payment.entity';

export interface SplitPaymentServiceInterface
  extends BaseServiceInterface<SplitPaymentEntity, string> {
  listByPayment(paymentId: string): Promise<readonly SplitPaymentEntity[]>;
}
