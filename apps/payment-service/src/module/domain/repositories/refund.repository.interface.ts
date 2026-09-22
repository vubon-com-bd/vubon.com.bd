import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RefundEntity } from '../entities/refund.entity';
import { RefundIdVO } from '../value-objects/primitives/refund-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface RefundRepository extends BaseRepository<RefundEntity, RefundIdVO> {
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RefundEntity[]>;
  findPending(): Promise<readonly RefundEntity[]>;
}
