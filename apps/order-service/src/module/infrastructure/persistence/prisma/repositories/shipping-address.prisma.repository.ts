/**
 * ShippingAddressPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type ShippingAddressRepository } from '../../../../domain/repositories/shipping-address.repository.interface.js';
import { ShippingAddressEntity } from '../../../../domain/entities/shipping-address.entity.js';
import { ShippingAddressIdVO } from '../../../../domain/value-objects/primitives/shipping-address-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { ShippingAddressPrismaMapper } from '../mappers/shipping-address.prisma.mapper.js';
import type { PrismaShippingAddressRow } from '../mappers/shipping-address.prisma.mapper.js';

interface ShippingAddressDelegate {
  findFirst(args: unknown): Promise<PrismaShippingAddressRow | null>;
  findUnique(args: unknown): Promise<PrismaShippingAddressRow | null>;
  findMany(args?: unknown): Promise<PrismaShippingAddressRow[]>;
  create(args: unknown): Promise<PrismaShippingAddressRow>;
  update(args: unknown): Promise<PrismaShippingAddressRow>;
  delete(args: unknown): Promise<PrismaShippingAddressRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class ShippingAddressPrismaRepository implements ShippingAddressRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): ShippingAddressDelegate {
    return this.prisma.getModel<ShippingAddressDelegate>('shippingAddress');
  }

  async findById(id: string): Promise<ShippingAddressEntity | null> {
    return this.findByIdVO(ShippingAddressIdVO.reconstitute(id));
  }

  async findByIdVO(id: ShippingAddressIdVO): Promise<ShippingAddressEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? ShippingAddressPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<ShippingAddressEntity | null> {
    const raw = await this.delegate.findFirst({ where: { orderId } });
    return raw ? ShippingAddressPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ShippingAddressEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => ShippingAddressPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: ShippingAddressEntity): Promise<ShippingAddressEntity> {
    const data = ShippingAddressPrismaMapper.toPersistence(entity, entity.id, entity.id);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return ShippingAddressPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return ShippingAddressPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
