import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserAddressEntity } from '../entities/user-address.entity';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserAddressRepository
  extends BaseRepository<UserAddressEntity, AddressIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]>;
  findDefault(userId: UserIdVO): Promise<UserAddressEntity | null>;
}
