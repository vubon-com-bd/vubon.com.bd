import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto';

export interface UserAddressServiceInterface
  extends BaseServiceInterface<UserAddressEntity, string> {
  listByUser(userId: string): Promise<readonly AddressResponseDTO[]>;
  add(userId: string, input: Record<string, unknown>): Promise<AddressResponseDTO>;
  update(addressId: string, input: Record<string, unknown>): Promise<AddressResponseDTO>;
  delete(addressId: string): Promise<void>;
  setDefault(userId: string, addressId: string): Promise<void>;
}
