/**
 * UserKycRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserKycEntity } from '../entities/user-kyc.entity';

export interface UserKycRepository extends BaseRepository<UserKycEntity, string> {
  findByUserId(userId: UserId): Promise<UserKycEntity | null>;
  findPending(): Promise<readonly UserKycEntity[]>;
  findByDocumentNumber(docNumber: string): Promise<UserKycEntity | null>;
}
