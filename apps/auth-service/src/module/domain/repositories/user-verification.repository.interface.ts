import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserVerificationEntity } from '../entities/user-verification.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { VerificationTypeVO } from '../value-objects/primitives/verification-type.vo';

export interface UserVerificationRepository
  extends BaseRepository<UserVerificationEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly UserVerificationEntity[]>;
  findByType(
    userId: UserIdVO,
    type: VerificationTypeVO,
  ): Promise<UserVerificationEntity | null>;
}
