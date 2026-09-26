import { Injectable } from '@nestjs/common';
import { ProductCollection as PrismaProductCollection } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductCollectionEntity } from '../../../../domain/entities/product-collection.entity';
import { CollectionIdVO } from '../../../../domain/value-objects/primitives/collection-id.vo';
import { CollectionNameVO } from '../../../../domain/value-objects/primitives/collection-name.vo';
import { CollectionTypeVO } from '../../../../domain/value-objects/primitives/collection-type.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductCollectionRepository } from '../../../../domain/repositories/product-collection.repository.interface';

@Injectable()
export class ProductCollectionPrismaRepository
  extends BasePrismaRepository<ProductCollectionEntity, CollectionIdVO>
  implements ProductCollectionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductCollection): ProductCollectionEntity {
    return ProductCollectionEntity.reconstitute(
      CollectionIdVO.create(raw.id),
      {
        name: CollectionNameVO.create(raw.name),
        type: CollectionTypeVO.create(raw.type),
        productIds: [ProductIdVO.create(raw.productId)],
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: CollectionIdVO): Promise<ProductCollectionEntity | null> {
    const raw = await this.prisma.productCollection.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.prisma.productCollection.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductCollectionEntity): Promise<ProductCollectionEntity> {
    const firstProductId = entity.productIds[0]?.value ?? '';
    const data = {
      name: entity.name.value,
      type: entity.type.value,
      productId: firstProductId,
    };
    const raw = await this.prisma.productCollection.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CollectionIdVO): Promise<void> {
    await this.prisma.productCollection.delete({ where: { id: id.value } });
  }

  async findByName(name: string): Promise<ProductCollectionEntity | null> {
    const raw = await this.prisma.productCollection.findFirst({ where: { name } });
    return raw ? this.toDomain(raw) : null;
  }

  async findContainingProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.prisma.productCollection.findMany({
      where: { productId: productId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
