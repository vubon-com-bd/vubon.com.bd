import { Injectable } from '@nestjs/common';
import { ProductVariant as PrismaProductVariant } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductVariantEntity } from '../../../../domain/entities/product-variant.entity';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo';
import { VariantNameVO } from '../../../../domain/value-objects/primitives/variant-name.vo';
import { VariantSkuVO } from '../../../../domain/value-objects/primitives/variant-sku.vo';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductVariantRepository } from '../../../../domain/repositories/product-variant.repository.interface';

@Injectable()
export class ProductVariantPrismaRepository
  extends BasePrismaRepository<ProductVariantEntity, VariantIdVO>
  implements ProductVariantRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductVariant): ProductVariantEntity {
    return ProductVariantEntity.reconstitute(
      VariantIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        name: VariantNameVO.create(raw.name),
        sku: VariantSkuVO.create(raw.sku),
        price: PriceAmountVO.create(raw.price),
        isDefault: raw.isDefault,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VariantIdVO): Promise<ProductVariantEntity | null> {
    const raw = await this.prisma.productVariant.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.prisma.productVariant.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductVariantEntity): Promise<ProductVariantEntity> {
    const data = {
      productId: entity.productId.value,
      name: entity.name.value,
      sku: entity.sku.value,
      price: entity.price.value,
      isDefault: entity.isDefault,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.productVariant.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VariantIdVO): Promise<void> {
    await this.prisma.productVariant.delete({ where: { id: id.value } });
  }

  async findBySku(sku: VariantSkuVO): Promise<ProductVariantEntity | null> {
    const raw = await this.prisma.productVariant.findUnique({ where: { sku: sku.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async existsBySku(sku: VariantSkuVO): Promise<boolean> {
    const count = await this.prisma.productVariant.count({ where: { sku: sku.value } });
    return count > 0;
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.prisma.productVariant.findMany({
      where: { productId: productId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefault(productId: ProductIdVO): Promise<ProductVariantEntity | null> {
    const raw = await this.prisma.productVariant.findFirst({
      where: { productId: productId.value, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.prisma.productVariant.count({ where: { productId: productId.value } });
  }

  async deleteByProduct(productId: ProductIdVO): Promise<void> {
    await this.prisma.productVariant.deleteMany({
      where: { productId: productId.value },
    });
  }
}
