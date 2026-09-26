import { Injectable } from '@nestjs/common';
import { Product as PrismaProduct } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { ProductNameVO } from '../../../../domain/value-objects/primitives/product-name.vo';
import { ProductSlugVO } from '../../../../domain/value-objects/primitives/product-slug.vo';
import { ProductSkuVO } from '../../../../domain/value-objects/primitives/product-sku.vo';
import { ProductStatusVO } from '../../../../domain/value-objects/primitives/product-status.vo';
import { ProductTypeVO } from '../../../../domain/value-objects/primitives/product-type.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo';
import type { ProductRepository } from '../../../../domain/repositories/product.repository.interface';

@Injectable()
export class ProductPrismaRepository
  extends BasePrismaRepository<ProductEntity, ProductIdVO>
  implements ProductRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProduct): ProductEntity {
    return ProductEntity.reconstitute(
      ProductIdVO.create(raw.id),
      {
        name: ProductNameVO.create(raw.name),
        slug: ProductSlugVO.create(raw.slug),
        sku: ProductSkuVO.create(raw.sku),
        status: ProductStatusVO.create(raw.status),
        type: ProductTypeVO.create(raw.type),
        vendorId: VendorIdVO.create(raw.vendorId),
        categoryId: raw.categoryId ? CategoryIdVO.create(raw.categoryId) : null,
        brandId: raw.brandId ? BrandIdVO.create(raw.brandId) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ProductIdVO): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductEntity[]> {
    const rows = await this.prisma.product.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductEntity): Promise<ProductEntity> {
    const data = {
      name: entity.name.value,
      slug: entity.slug.value,
      sku: entity.sku.value,
      status: entity.status.value,
      type: entity.type.value,
      vendorId: entity.vendorId.value,
      categoryId: entity.categoryId?.value ?? null,
      brandId: entity.brandId?.value ?? null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.product.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ProductIdVO): Promise<void> {
    await this.prisma.product.delete({ where: { id: id.value } });
  }

  async findBySlug(slug: ProductSlugVO): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findBySku(sku: ProductSkuVO): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { sku: sku.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async existsBySlug(slug: ProductSlugVO): Promise<boolean> {
    const count = await this.prisma.product.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async existsBySku(sku: ProductSkuVO): Promise<boolean> {
    const count = await this.prisma.product.count({ where: { sku: sku.value } });
    return count > 0;
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.prisma.product.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.prisma.product.findMany({
      where: { categoryId: categoryId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.prisma.product.findMany({
      where: { brandId: brandId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findPublished(): Promise<readonly ProductEntity[]> {
    const rows = await this.prisma.product.findMany({
      where: { status: 'published' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByCategory(categoryId: CategoryIdVO): Promise<number> {
    return this.prisma.product.count({ where: { categoryId: categoryId.value } });
  }
}
