import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { VerificationEntity } from '../../../domain/entities/verification.entity';
import type { VerificationResponseDTO } from '../../dtos/responses/verification-response.dto';

export interface VerificationServiceInterface
  extends BaseServiceInterface<VerificationEntity, string> {
  findByPaymentId(paymentId: string): Promise<VerificationResponseDTO | null>;
}
