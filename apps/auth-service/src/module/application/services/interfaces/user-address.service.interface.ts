/**
 * UserAddressServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';

export interface UserAddressServiceInterface
  extends BaseServiceInterface<UserAddressEntity, string> {
  listForUser(userId: UserId): Promise<readonly UserAddressEntity[]>;

  add(userId: UserId, input: AddAddressRequestDTO): Promise<UserAddressEntity>;

  update(
    addressId: string,
    input: UpdateAddressRequestDTO,
  ): Promise<UserAddressEntity>;

  remove(addressId: string): Promise<void>;

  setDefault(userId: UserId, addressId: string): Promise<void>;

  toResponse(address: UserAddressEntity): UserAddressResponseDTO;
}
