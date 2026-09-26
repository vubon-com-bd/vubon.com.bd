/**
 * UserAddressService
 * @module auth-service/application/services/impl
 *
 * NOTE: `AddAddressRequestSchema` uses generic fields (city, country, state).
 * Our BD-specific UserAddressEntity keeps `division/district/upazila` for
 * legacy reasons. This service maps schema→entity fields best-effort.
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { ID_GENERATOR } from '../tokens';
import { USER_ADDRESS_REPO } from '../../tokens';

type AddAddressInput = AddAddressRequestDTO & {
  line1: string;
  city: string;
  country: string;
  postalCode?: string;
  state?: string;
  line2?: string;
  label?: string;
  isDefault?: boolean;
  type?: string;
};

type UpdateAddressInput = UpdateAddressRequestDTO & {
  line1?: string;
  line2?: string;
  isDefault?: boolean;
};

@Injectable()
export class UserAddressService
  extends BaseService<UserAddressEntity, string>
  implements UserAddressServiceInterface {
  readonly name = 'UserAddressService';

  constructor(
    @Inject(USER_ADDRESS_REPO) private readonly repo: UserAddressRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async listForUser(userId: UserId): Promise<readonly UserAddressEntity[]> {
    return this.repo.findByUserId(userId);
  }

  async add(
    userId: UserId,
    input: AddAddressRequestDTO,
  ): Promise<UserAddressEntity> {
    const src = input as unknown as AddAddressInput;
    const now = new Date().toISOString();

    // Best-effort mapping from generic schema into BD entity fields.
    const entity = UserAddressEntity.create({
      id: this.idGen.generate(),
      userId,
      label: src.label ?? src.type ?? 'home',
      line1: src.line1,
      line2: src.line2,
      division: src.state ?? src.city,
      district: src.city,
      upazila: src.city,
      postalCode: src.postalCode ?? '0000',
      isDefault: src.isDefault ?? false,
      createdAt: now,
      updatedAt: now,
    });
    if (entity.isDefault) {
      await this.repo.clearDefaultForUser(userId);
    }
    return this.repo.save(entity);
  }

  async update(
    addressId: string,
    input: UpdateAddressRequestDTO,
  ): Promise<UserAddressEntity> {
    const found = await this.repo.findById(addressId);
    if (!found) throw new Error('Address not found');
    const src = input as unknown as UpdateAddressInput;
    if (src.line1) found.updateLines(src.line1, src.line2);
    if (src.isDefault) {
      await this.repo.clearDefaultForUser(found.userId);
      found.markDefault();
    }
    return this.repo.save(found);
  }

  async remove(addressId: string): Promise<void> {
    await this.repo.delete(addressId);
  }

  async setDefault(userId: UserId, addressId: string): Promise<void> {
    const found = await this.repo.findById(addressId);
    if (!found || found.userId !== userId) {
      throw new Error('Address not found');
    }
    await this.repo.clearDefaultForUser(userId);
    found.markDefault();
    await this.repo.save(found);
  }

  toResponse(address: UserAddressEntity): UserAddressResponseDTO {
    return {
      id: address.id,
      userId: address.userId,
      label: address.label,
      line1: address.line1,
      line2: address.line2,
      division: address.division,
      district: address.district,
      upazila: address.upazila,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }
}
