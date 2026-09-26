/**
 * UserVerificationServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto';

export interface UserVerificationServiceInterface
  extends BaseServiceInterface<UserVerificationEntity, string> {
  request(input: {
    userId: UserId;
    type: 'email' | 'phone' | 'kyc_document';
    ttlMs?: number;
  }): Promise<UserVerificationEntity>;

  verify(input: {
    userId: UserId;
    code: string;
    type: 'email' | 'phone' | 'kyc_document';
  }): Promise<boolean>;

  getLatest(
    userId: UserId,
    type: string,
  ): Promise<UserVerificationEntity | null>;

  toResponse(
    verification: UserVerificationEntity,
  ): UserVerificationResponseDTO;
}
