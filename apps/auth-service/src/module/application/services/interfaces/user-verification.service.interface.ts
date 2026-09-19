import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto';

export interface UserVerificationServiceInterface
  extends BaseServiceInterface<UserVerificationEntity, string> {
  findByUserId(userId: string): Promise<readonly UserVerificationResponseDTO[]>;
  verify(userId: string, type: string, code: string): Promise<void>;
}
