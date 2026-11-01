/**
 * DeliveryMethodPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type DeliveryMethodRepository } from '../../../../domain/repositories/delivery-method.repository.interface.js';
import { DeliveryMethodEntity } from '../../../../domain/entities/delivery-method.entity.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { DeliveryMethodPrismaMapper } from '../mappers/delivery-method.prisma.mapper.js';
import type { PrismaDeliveryMethodRow } from '../mappers/delivery-method.prisma.mapper.js';

interface DeliveryMethodDelegate {
  findFirst(args: unknown): Promise<PrismaDeliveryMethodRow | null>;
  findUnique(args: unknown): Promise<PrismaDeliveryMethodRow | null>;
  findMany(args?: unknown): Promise<PrismaDeliveryMethodRow[]>;
  create(args: unknown): Promise<PrismaDeliveryMethodRow>;
  update(args: unknown): Promise<PrismaDeliveryMethodRow>;
  delete(args: unknown): Promise<PrismaDeliveryMethodRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class DeliveryMethodPrismaRepository implements DeliveryMethodRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): DeliveryMethodDelegate {
    return this.prisma.getModel<DeliveryMethodDelegate>('deliveryMethod');
  }

  async findById(id: string): Promise<DeliveryMethodEntity | null> {
    return this.findByIdVO(DeliveryMethodIdVO.reconstitute(id));
  }

  async findByIdVO(id: DeliveryMethodIdVO): Promise<DeliveryMethodEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? DeliveryMethodPrismaMapper.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.delegate.findMany({ where: { isActive: true } });
    return rows.map((r) => DeliveryMethodPrismaMapper.toDomain(r));
  }

  async findByType(type: string): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.delegate.findMany({ where: { type } });
    return rows.map((r) => DeliveryMethodPrismaMapper.toDomain(r));
  }

  async findFree(): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.delegate.findMany({
      where: { baseCost: 0, isActive: true } as never,
    });
    return rows.map((r) => DeliveryMethodPrismaMapper.toDomain(r));
  }

  async findFast(maxDays = 2): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.delegate.findMany({
      where: { estimatedDays: { lte: maxDays }, isActive: true } as never,
    });
    return rows.map((r) => DeliveryMethodPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => DeliveryMethodPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: DeliveryMethodEntity): Promise<DeliveryMethodEntity> {
    const data = DeliveryMethodPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return DeliveryMethodPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return DeliveryMethodPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
