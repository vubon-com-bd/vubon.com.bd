/**
 * User Address Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface.js';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface.js';
import { USER_ADDRESS_REPOSITORY } from '../../../domain/repositories/user-address.repository.interface.js';
import type { UserAddressEntity } from '../../../domain/entities/user-address.entity.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';

@Injectable()
export class UserAddressService extends BaseService implements UserAddressServiceInterface {
  readonly name = 'UserAddressService';

  constructor(
    @Inject(USER_ADDRESS_REPOSITORY) private readonly repo: UserAddressRepository,
  ) {
    super();
  }

  async listForUser(userId: string): Promise<readonly UserAddressResponseDTO[]> {
    const list = await this.repo.findByUserIdRaw(userId);
    return list.map((a) => this.toDTO(a));
  }

  async findById(addressId: string): Promise<UserAddressResponseDTO | null> {
    const a = await this.repo.findById(addressId);
    if (!a) return null;
    return this.toDTO(a);
  }

  async add(userId: string, input: Partial<UserAddressResponseDTO>): Promise<UserAddressResponseDTO> {
    return {
      id: '',
      userId,
      type: 'home',
      fullName: '',
      phone: '',
      addressLine1: '',
      city: '',
      state: '',
      division: '',
      district: '',
      postalCode: '',
      country: 'BD',
      isDefault: false,
      isDefaultShipping: false,
      isDefaultBilling: false,
      isVerified: false,
      createdAt: new Date().toISOString(),
      ...input,
    } as UserAddressResponseDTO;
  }

  async update(addressId: string, patch: Partial<UserAddressResponseDTO>): Promise<UserAddressResponseDTO> {
    return { id: addressId, ...patch } as UserAddressResponseDTO;
  }

  async remove(addressId: string): Promise<void> {
    await this.repo.delete(addressId);
  }

  async setDefault(_addressId: string, _type: 'billing' | 'shipping' | 'both'): Promise<void> {}

  private toDTO(a: UserAddressEntity): UserAddressResponseDTO {
    return {
      id: a.id,
      userId: a.userId.value,
      type: a.type.value,
      label: a.label,
      fullName: a.fullName,
      phone: a.phone,
      addressLine1: a.addressLine1.value,
      addressLine2: a.addressLine2?.value,
      city: a.city.value,
      state: a.state,
      division: a.division,
      district: a.district,
      upazila: a.upazila,
      postalCode: a.postalCode.value,
      country: a.country,
      isDefault: a.isDefault,
      isDefaultShipping: a.isDefaultShipping,
      isDefaultBilling: a.isDefaultBilling,
      isVerified: a.isVerified,
      createdAt: a.createdAt,
    };
  }
}
