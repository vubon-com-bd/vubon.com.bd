/**
 * User Address Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserAddressEntity } from '../../../domain/entities/user-address.entity.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';

export const USER_ADDRESS_SERVICE = Symbol('USER_ADDRESS_SERVICE');

export interface UserAddressServiceInterface extends BaseServiceInterface<UserAddressEntity, string> {
  listForUser(userId: string): Promise<readonly UserAddressResponseDTO[]>;
  findById(addressId: string): Promise<UserAddressResponseDTO | null>;
  add(userId: string, input: Partial<UserAddressResponseDTO>): Promise<UserAddressResponseDTO>;
  update(addressId: string, patch: Partial<UserAddressResponseDTO>): Promise<UserAddressResponseDTO>;
  remove(addressId: string): Promise<void>;
  setDefault(addressId: string, type: 'billing' | 'shipping' | 'both'): Promise<void>;
}
