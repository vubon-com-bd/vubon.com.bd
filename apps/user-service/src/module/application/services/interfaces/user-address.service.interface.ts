/**
 * UserAddressServiceInterface
 */
import type { AddAddressRequestDTO } from '../../dtos/requests/address/index.js';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/address/index.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import type { ListAddressesResult } from '../../queries/address/list-addresses.handler.js';

export interface UserAddressServiceInterface {
  list(userId: string): Promise<ListAddressesResult>;
  findById(userId: string, addressId: string): Promise<AddressResponseDTO>;
  findDefault(userId: string): Promise<AddressResponseDTO>;
  add(input: AddAddressRequestDTO): Promise<AddressResponseDTO>;
  update(input: UpdateAddressRequestDTO): Promise<AddressResponseDTO>;
  remove(userId: string, addressId: string): Promise<{ success: true }>;
  setDefault(userId: string, addressId: string): Promise<AddressResponseDTO>;
}
