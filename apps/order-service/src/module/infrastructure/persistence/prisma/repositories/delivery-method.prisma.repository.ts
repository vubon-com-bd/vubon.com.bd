import { Injectable } from '@nestjs/common';
import { DeliveryMethod as PrismaDeliveryMethod } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DeliveryMethodEntity } from '../../../../domain/entities/delivery-method.entity';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo';
import { DeliveryMethodTypeVO } from '../../../../domain/value-objects/primitives/delivery-method-type.vo';
import type { DeliveryMethodRepository } from '../../../../domain/repositories/delivery-method.repository.interface';

@Injectable()
export class DeliveryMethodPrismaRepository
  extends BasePrismaRepository<DeliveryMethodEntity, DeliveryMethodIdVO>
  implements DeliveryMethodRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDeliveryMethod): DeliveryMethodEntity {
    return DeliveryMethodEntity.reconstitute(
      DeliveryMethodIdVO.create(raw.id),
      {
        type: DeliveryMethodTypeVO.create(raw.type),
        name: raw.name,
        description: raw.description,
        basePrice: Number(raw.basePrice),
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: DeliveryMethodIdVO): Promise<DeliveryMethodEntity | null> {
    const raw = await this.prisma.deliveryMethod.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.prisma.deliveryMethod.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DeliveryMethodEntity): Promise<DeliveryMethodEntity> {
    const data = {
      type: entity.type.value,
      name: entity.name,
      description: entity.description,
      basePrice: entity.basePrice,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.deliveryMethod.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DeliveryMethodIdVO): Promise<void> {
    await this.prisma.deliveryMethod.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly DeliveryMethodEntity[]> {
    const rows = await this.prisma.deliveryMethod.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
