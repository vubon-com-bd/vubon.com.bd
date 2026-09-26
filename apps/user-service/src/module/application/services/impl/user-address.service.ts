import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import { AddressIdVO } from '../../../domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AddressOperationFailedError } from '../../errors/address.errors';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto';

@Injectable()
export class UserAddressService
  extends BaseService<UserAddressEntity, string>
  implements UserAddressServiceInterface
{
  readonly name = 'UserAddressService';

  constructor(
    private readonly addressRepo: UserAddressRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly AddressResponseDTO[]> {
    const entities = await this.addressRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async add(userId: string, input: Record<string, unknown>): Promise<AddressResponseDTO> {
    void input;
    void userId;
    throw new AddressOperationFailedError('add not yet wired');
  }

  async update(addressId: string, input: Record<string, unknown>): Promise<AddressResponseDTO> {
    void input;
    const entity = await this.addressRepo.findById(AddressIdVO.create(addressId));
    if (!entity) throw new AddressOperationFailedError('address not found');
    await this.addressRepo.save(entity);
    return this.toDTO(entity);
  }

  async delete(addressId: string): Promise<void> {
    await this.addressRepo.delete(AddressIdVO.create(addressId));
  }

  async setDefault(userId: string, addressId: string): Promise<void> {
    void userId;
    const entity = await this.addressRepo.findById(AddressIdVO.create(addressId));
    if (!entity) throw new AddressOperationFailedError('address not found');
    const updated = entity.markAsDefault();
    await this.addressRepo.save(updated);
  }

  private toDTO(entity: UserAddressEntity): AddressResponseDTO {
    return {
      success: true,
      address: {
        id: entity.id.value,
        userId: entity.userId.value,
        type: 'home',
        label: entity.label?.value,
        line1: entity.line1.value,
        line2: entity.line2?.value,
        city: entity.city.value,
        state: entity.division.value,
        country: 'BD',
        postalCode: entity.postalCode?.value,
        isDefault: entity.isDefault,
        isDefaultShipping: entity.isDefault,
        isDefaultBilling: false,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    } as unknown as AddressResponseDTO;
  }
}
