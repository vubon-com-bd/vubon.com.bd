import { Injectable } from '@nestjs/common';
import { ProductAttribute as PrismaProductAttribute } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductAttributeEntity } from '../../../../domain/entities/product-attribute.entity';
import { AttributeIdVO } from '../../../../domain/value-objects/primitives/attribute-id.vo';
import { AttributeNameVO } from '../../../../domain/value-objects/primitives/attribute-name.vo';
import { AttributeValueVO } from '../../../../domain/value-objects/primitives/attribute-value.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductAttributeRepository } from '../../../../domain/repositories/product-attribute.repository.interface';

@Injectable()
export class ProductAttributePrismaRepository
  extends BasePrismaRepository<ProductAttributeEntity, AttributeIdVO>
  implements ProductAttributeRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductAttribute): ProductAttributeEntity {
    return ProductAttributeEntity.reconstitute(
      AttributeIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        name: AttributeNameVO.create(raw.name),
        value: AttributeValueVO.create(raw.value),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: AttributeIdVO): Promise<ProductAttributeEntity | null> {
    const raw = await this.prisma.productAttribute.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.prisma.productAttribute.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductAttributeEntity): Promise<ProductAttributeEntity> {
    const data = {
      productId: entity.productId.value,
      name: entity.name.value,
      value: entity.value.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.productAttribute.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AttributeIdVO): Promise<void> {
    await this.prisma.productAttribute.delete({ where: { id: id.value } });
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.prisma.productAttribute.findMany({
      where: { productId: productId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByProduct(productId: ProductIdVO): Promise<void> {
    await this.prisma.productAttribute.deleteMany({
      where: { productId: productId.value },
    });
  }
}
