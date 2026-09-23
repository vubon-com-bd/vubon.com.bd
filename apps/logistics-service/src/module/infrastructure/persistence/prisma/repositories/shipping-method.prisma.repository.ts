import { Injectable } from '@nestjs/common';
import { ShippingMethod as PrismaShippingMethod } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ShippingMethodEntity } from '../../../../domain/entities/shipping-method.entity';
import { ShippingMethodTypeVO } from '../../../../domain/value-objects/primitives/shipping-method-type.vo';
import type { ShippingMethodRepository } from '../../../../domain/repositories/shipping-method.repository.interface';

@Injectable()
export class ShippingMethodPrismaRepository
  extends BasePrismaRepository<ShippingMethodEntity, string>
  implements ShippingMethodRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaShippingMethod): ShippingMethodEntity {
    return ShippingMethodEntity.reconstitute(
      raw.id,
      {
        name: raw.name,
        type: ShippingMethodTypeVO.create(raw.type),
        status: raw.status,
        baseRate: raw.baseRate,
        perKgRate: raw.perKgRate,
        currency: raw.currency,
        estimatedDays: raw.estimatedDays,
        zones: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<ShippingMethodEntity | null> {
    const raw = await this.prisma.shippingMethod.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.shippingMethod.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ShippingMethodEntity): Promise<ShippingMethodEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      status: entity.status,
      baseRate: entity.baseRate,
      perKgRate: entity.perKgRate,
      currency: entity.currency,
      estimatedDays: entity.estimatedDays,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.shippingMethod.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shippingMethod.delete({ where: { id } });
  }

  async findByType(type: string): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.shippingMethod.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.shippingMethod.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
