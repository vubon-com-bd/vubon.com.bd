import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AddressIdVO } from '../../../domain/value-objects/primitives/address-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';

@Injectable()
export class UserAddressService
  extends BaseService<UserAddressEntity, string>
  implements UserAddressServiceInterface
{
  readonly name = 'UserAddressService';

  constructor(
    @Inject('UserAddressRepository') private readonly addressRepo: UserAddressRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly UserAddressResponseDTO[]> {
    const entities = await this.addressRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async add(
    userId: string,
    input: AddAddressRequestDTO,
  ): Promise<UserAddressResponseDTO> {
    const entity = UserAddressEntity.create({
      userId: UserIdVO.create(userId),
      label: input.label ?? 'Home',
      fullName: '',
      phone: '',
      division: input.state ?? '',
      district: input.city,
      upazila: '',
      addressLine: input.line1,
      postalCode: input.postalCode ?? null,
      isDefault: input.isDefault,
    });
    await this.addressRepo.save(entity);
    return this.toDTO(entity);
  }

  async update(
    addressId: string,
    input: UpdateAddressRequestDTO,
  ): Promise<UserAddressResponseDTO> {
    const entity = await this.addressRepo.findById(AddressIdVO.create(addressId));
    if (!entity) {
      throw new UserOperationFailedError(`address not found: ${addressId}`);
    }
    const updated = entity.update({
      label: input.label,
      district: input.city,
      division: input.state,
      addressLine: input.line1,
      postalCode: input.postalCode,
      isDefault: input.isDefault,
    } as never);
    await this.addressRepo.save(updated);
    return this.toDTO(updated);
  }

  async delete(addressId: string): Promise<void> {
    await this.addressRepo.delete(AddressIdVO.create(addressId));
  }

  private toDTO(entity: UserAddressEntity): UserAddressResponseDTO {
    return {
      success: true,
      address: {
        id: entity.id.value,
        userId: entity.userId.value,
        type: 'home',
        label: entity.label,
        line1: entity.addressLine,
        city: entity.district,
        state: entity.division,
        country: 'BD',
        isDefault: entity.isDefault,
        isDefaultShipping: entity.isDefault,
        isDefaultBilling: false,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
