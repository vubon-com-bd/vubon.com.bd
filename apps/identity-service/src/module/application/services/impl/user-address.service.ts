/**
 * User Address Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity.js';
import { AddressIdVO } from '../../../domain/value-objects/primitives/address-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { UserAddressAddedEvent } from '../../../domain/events/user-address.events.js';
import { AddressTypeVO } from '../../../domain/value-objects/primitives/address-type.vo.js';
import { AddressLineVO } from '../../../domain/value-objects/primitives/address-line.vo.js';
import { CityVO } from '../../../domain/value-objects/primitives/city.vo.js';
import { PostalCodeVO } from '../../../domain/value-objects/primitives/postal-code.vo.js';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface.js';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface.js';
import { USER_ADDRESS_REPOSITORY } from '../../../domain/repositories/user-address.repository.interface.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';

@Injectable()
export class UserAddressService extends BaseService implements UserAddressServiceInterface {
  readonly name = 'UserAddressService';

  constructor(
    @Inject(USER_ADDRESS_REPOSITORY) private readonly repo: UserAddressRepository,
    private readonly eventBridge: DomainEventBridgeService,
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
    const now = new Date().toISOString();
    const id = AddressIdVO.create(randomUUID());

    const entity = UserAddressEntity.create({
      id,
      props: {
        userId: UserIdVO.create(userId),
        type: AddressTypeVO.create(input.type ?? 'home'),
        label: input.label,
        fullName: input.fullName ?? '',
        phone: input.phone ?? '',
        addressLine1: AddressLineVO.create(input.addressLine1 ?? ''),
        addressLine2: input.addressLine2 ? AddressLineVO.create(input.addressLine2) : undefined,
        city: CityVO.create(input.city ?? ''),
        state: input.state ?? '',
        division: input.division ?? '',
        district: input.district ?? '',
        upazila: input.upazila,
        postalCode: PostalCodeVO.create(input.postalCode ?? '0000'),
        country: input.country ?? 'BD',
      },
      now,
    });

    const saved = await this.repo.save(entity);
    await this.eventBridge.publish(
        new UserAddressAddedEvent({
          aggregateId: saved.id,
          payload: {
            addressId: saved.id,
            userId: saved.userId.value,
            type: saved.type.value,
            addedAt: now,
          },
        }),
      );
    return this.toDTO(saved);
  }

  async update(addressId: string, patch: Partial<UserAddressResponseDTO>): Promise<UserAddressResponseDTO> {
    const existing = await this.repo.findById(addressId);
    if (!existing) {
      throw new Error(`Address ${addressId} not found`);
    }
    const now = new Date().toISOString();
    const saved = await this.repo.save(existing);
    await this.eventBridge.publish(
        new UserAddressAddedEvent({
          aggregateId: saved.id,
          payload: {
            addressId: saved.id,
            userId: saved.userId.value,
            type: saved.type.value,
            addedAt: now,
          },
        }),
      );
    return this.toDTO(saved);
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
