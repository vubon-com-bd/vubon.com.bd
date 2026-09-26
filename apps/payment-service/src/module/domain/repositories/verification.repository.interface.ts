import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VerificationEntity } from '../entities/verification.entity';
import { VerificationIdVO } from '../value-objects/primitives/verification-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface VerificationRepository extends BaseRepository<VerificationEntity, VerificationIdVO> {
  findByPaymentId(paymentId: PaymentIdVO): Promise<VerificationEntity | null>;
}
