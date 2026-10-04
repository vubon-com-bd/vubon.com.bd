/**
 * UserAddress Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserAddressEntity } from '../entities/user-address.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';

export const USER_ADDRESS_REPOSITORY = Symbol('USER_ADDRESS_REPOSITORY');

export interface UserAddressRepository extends BaseRepository<UserAddressEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]>;
  findDefaultByUserId(userId: UserIdVO): Promise<UserAddressEntity | null>;
  countByUserId(userId: UserIdVO): Promise<number>;
  clearDefaultForUser(userId: UserIdVO): Promise<void>;
  existsById(id: AddressIdVO): Promise<boolean>;
}
