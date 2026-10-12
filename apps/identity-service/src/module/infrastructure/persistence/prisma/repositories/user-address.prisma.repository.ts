import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserAddressPrismaMapper, type PrismaUserAddressRow } from '../mappers/user-address.prisma.mapper.js';
import { UserAddressEntity } from '../../../../domain/entities/user-address.entity.js';
import type {
  UserAddressRepository,
  UserAddressListOptions,
  UserAddressPaginationResult,
} from '../../../../domain/repositories/user-address.repository.interface.js';
import type { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserAddressRow | null>;
  findFirst(args: unknown): Promise<PrismaUserAddressRow | null>;
  findMany(args?: unknown): Promise<PrismaUserAddressRow[]>;
  create(args: unknown): Promise<PrismaUserAddressRow>;
  update(args: unknown): Promise<PrismaUserAddressRow>;
  delete(args: unknown): Promise<PrismaUserAddressRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class UserAddressPrismaRepository implements UserAddressRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userAddress'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserAddressPrismaMapper.toDomain(raw) : null;
  }
  async findByIdVO(id: AddressIdVO) { return this.findById(id.value); }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const rows = await this.delegate.findMany({ where: { userId, deletedAt: null } });
    return rows.map((r) => UserAddressPrismaMapper.toDomain(r));
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserAddressPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserAddressEntity): Promise<UserAddressEntity> {
    const data = UserAddressPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserAddressPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findDefaultByUserId(userId: UserIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: userId.value, isDefault: true, deletedAt: null } as never });
    return raw ? UserAddressPrismaMapper.toDomain(raw) : null;
  }
  async findDefaultShippingByUserId(userId: UserIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: userId.value, isDefaultShipping: true, deletedAt: null } as never });
    return raw ? UserAddressPrismaMapper.toDomain(raw) : null;
  }
  async findDefaultBillingByUserId(userId: UserIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: userId.value, isDefaultBilling: true, deletedAt: null } as never });
    return raw ? UserAddressPrismaMapper.toDomain(raw) : null;
  }
  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.delegate.count({ where: { userId: userId.value, deletedAt: null } });
  }
  async findPaginated(options: UserAddressListOptions): Promise<UserAddressPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.userId) where['userId'] = options.filter.userId;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => UserAddressPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async unsetAllDefault(userId: UserIdVO): Promise<number> {
    const r = await this.delegate.updateMany({
      where: { userId: userId.value, isDefault: true },
      data: { isDefault: false } as never,
    });
    return r.count;
  }
}
