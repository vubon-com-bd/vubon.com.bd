import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SplitPaymentEntity } from '../entities/split-payment.entity';
import { SplitIdVO } from '../value-objects/primitives/split-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface SplitPaymentRepository extends BaseRepository<SplitPaymentEntity, SplitIdVO> {
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly SplitPaymentEntity[]>;
}
