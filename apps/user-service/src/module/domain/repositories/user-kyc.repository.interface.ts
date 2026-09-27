/**
 * UserKyc Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserKycEntity } from '../entities/user-kyc.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { KycIdVO } from '../value-objects/primitives/kyc-id.vo.js';
import { KycStatusVO } from '../value-objects/primitives/kyc-status.vo.js';

export const USER_KYC_REPOSITORY = Symbol('USER_KYC_REPOSITORY');

export interface UserKycRepository extends BaseRepository<UserKycEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserKycEntity | null>;
  findAllByUserId(userId: UserIdVO): Promise<readonly UserKycEntity[]>;
  findByStatus(status: KycStatusVO): Promise<readonly UserKycEntity[]>;
  existsById(id: KycIdVO): Promise<boolean>;
  latestForUser(userId: UserIdVO): Promise<UserKycEntity | null>;
}
