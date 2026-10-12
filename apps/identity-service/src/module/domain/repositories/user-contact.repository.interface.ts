/**
 * User Contact Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserContactEntity } from '../entities/user-contact.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_CONTACT_REPOSITORY = Symbol('USER_CONTACT_REPOSITORY');

export interface UserContactRepository extends BaseRepository<UserContactEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]>;
  findByUserIdRaw(userId: string): Promise<readonly UserContactEntity[]>;
  findPrimaryByUserId(userId: UserIdVO): Promise<UserContactEntity | null>;
  findByValue(value: string): Promise<UserContactEntity | null>;

  unsetAllPrimary(userId: UserIdVO): Promise<number>;
  softDelete(id: string): Promise<void>;
}
