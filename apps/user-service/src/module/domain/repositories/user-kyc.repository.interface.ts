import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserKycEntity } from '../entities/user-kyc.entity';
import { KycIdVO } from '../value-objects/primitives/kyc-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserKycRepository
  extends BaseRepository<UserKycEntity, KycIdVO> {
  findByUserId(userId: UserIdVO): Promise<UserKycEntity | null>;
}
