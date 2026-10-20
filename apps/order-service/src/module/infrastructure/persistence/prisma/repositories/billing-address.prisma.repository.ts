/**
 * BillingAddressPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type BillingAddressRepository } from '../../../../domain/repositories/billing-address.repository.interface.js';
import { BillingAddressEntity } from '../../../../domain/entities/billing-address.entity.js';
import { BillingAddressIdVO } from '../../../../domain/value-objects/primitives/billing-address-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { BillingAddressPrismaMapper } from '../mappers/billing-address.prisma.mapper.js';
import type { PrismaBillingAddressRow } from '../mappers/billing-address.prisma.mapper.js';

interface BillingAddressDelegate {
  findFirst(args: unknown): Promise<PrismaBillingAddressRow | null>;
  findUnique(args: unknown): Promise<PrismaBillingAddressRow | null>;
  findMany(args?: unknown): Promise<PrismaBillingAddressRow[]>;
  create(args: unknown): Promise<PrismaBillingAddressRow>;
  update(args: unknown): Promise<PrismaBillingAddressRow>;
  delete(args: unknown): Promise<PrismaBillingAddressRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class BillingAddressPrismaRepository implements BillingAddressRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): BillingAddressDelegate {
    return this.prisma.getModel<BillingAddressDelegate>('billingAddress');
  }

  async findById(id: string): Promise<BillingAddressEntity | null> {
    return this.findByIdVO(BillingAddressIdVO.reconstitute(id));
  }

  async findByIdVO(id: BillingAddressIdVO): Promise<BillingAddressEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? BillingAddressPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<BillingAddressEntity | null> {
    const raw = await this.delegate.findFirst({ where: { orderId } });
    return raw ? BillingAddressPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BillingAddressEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => BillingAddressPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: BillingAddressEntity): Promise<BillingAddressEntity> {
    const data = BillingAddressPrismaMapper.toPersistence(entity, entity.id, entity.id);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return BillingAddressPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return BillingAddressPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
