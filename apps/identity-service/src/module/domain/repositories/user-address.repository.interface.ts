/**
 * User Address Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserAddressEntity } from '../entities/user-address.entity.js';
import type { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_ADDRESS_REPOSITORY = Symbol('USER_ADDRESS_REPOSITORY');

export interface UserAddressListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly country?: string;
  readonly isDefault?: boolean;
}

export interface UserAddressListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: UserAddressListFilter;
}

export interface UserAddressPaginationResult {
  readonly items: readonly UserAddressEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface UserAddressRepository extends BaseRepository<UserAddressEntity, string> {
  findByIdVO(id: AddressIdVO): Promise<UserAddressEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]>;
  findByUserIdRaw(userId: string): Promise<readonly UserAddressEntity[]>;
  findDefaultByUserId(userId: UserIdVO): Promise<UserAddressEntity | null>;
  findDefaultShippingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null>;
  findDefaultBillingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null>;
  countByUserId(userId: UserIdVO): Promise<number>;

  findPaginated(options: UserAddressListOptions): Promise<UserAddressPaginationResult>;

  unsetAllDefault(userId: UserIdVO): Promise<number>;
  softDelete(id: string): Promise<void>;
}
