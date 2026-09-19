import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';

export interface UserAddressServiceInterface
  extends BaseServiceInterface<UserAddressEntity, string> {
  listByUser(userId: string): Promise<readonly UserAddressResponseDTO[]>;
  add(userId: string, input: AddAddressRequestDTO): Promise<UserAddressResponseDTO>;
  update(addressId: string, input: UpdateAddressRequestDTO): Promise<UserAddressResponseDTO>;
  delete(addressId: string): Promise<void>;
}
