/**
 * User Repository Interface
 * @module user-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserEntity } from '../entities/user.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo.js';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserPaginationOptions {
  readonly page: number;
  readonly limit: number;
  readonly status?: UserStatusVO;
  readonly type?: UserTypeVO;
  readonly search?: string;
}

export interface UserRepository extends BaseRepository<UserEntity, string> {
  findByEmail(email: UserEmailVO): Promise<UserEntity | null>;
  existsByEmail(email: UserEmailVO): Promise<boolean>;
  findByStatus(status: UserStatusVO): Promise<readonly UserEntity[]>;
  findByType(type: UserTypeVO): Promise<readonly UserEntity[]>;
  findPaginated(options: UserPaginationOptions): Promise<{
    readonly items: readonly UserEntity[];
    readonly total: number;
  }>;
  countByStatus(status: UserStatusVO): Promise<number>;
  softDelete(id: UserIdVO): Promise<void>;
}
