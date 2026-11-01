/**
 * UserAddressEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { UserAddressEntity } from '../../../../domain/entities/user-address.entity.js';
import type {
  UserAddressRepository,
  UserAddressListOptions,
  UserAddressPaginationResult,
} from '../../../../domain/repositories/user-address.repository.interface.js';
import type { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryUserAddressRepository
  extends InMemoryRepository<UserAddressEntity, string>
  implements UserAddressRepository
{
  protected idOf(entity: UserAddressEntity): string { return entity.id; }

  async findByIdVO(id: AddressIdVO): Promise<UserAddressEntity | null> { return this.findById(id.value); }

  async findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]> {
    return this.findByUserIdRaw(userId.value);
  }

  async findByUserIdRaw(userId: string): Promise<readonly UserAddressEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId);
  }

  async findDefaultByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefault) ?? null;
  }

  async findDefaultShippingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefaultShipping) ?? null;
  }

  async findDefaultBillingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefaultBilling) ?? null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return (await this.findByUserId(userId)).length;
  }

  async findPaginated(options: UserAddressListOptions): Promise<UserAddressPaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }

  async unsetAllDefault(_userId: UserIdVO): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
