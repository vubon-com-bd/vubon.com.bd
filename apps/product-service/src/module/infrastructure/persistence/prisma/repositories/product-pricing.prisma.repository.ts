import { Injectable } from '@nestjs/common';
import { ProductPricing as PrismaProductPricing } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductPricingEntity } from '../../../../domain/entities/product-pricing.entity';
import { PriceIdVO } from '../../../../domain/value-objects/primitives/price-id.vo';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo';
import { PriceCurrencyVO } from '../../../../domain/value-objects/primitives/price-currency.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductPricingRepository } from '../../../../domain/repositories/product-pricing.repository.interface';

@Injectable()
export class ProductPricingPrismaRepository
  extends BasePrismaRepository<ProductPricingEntity, PriceIdVO>
  implements ProductPricingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductPricing): ProductPricingEntity {
    return ProductPricingEntity.reconstitute(
      PriceIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        amount: PriceAmountVO.create(raw.amount),
        currency: PriceCurrencyVO.create(raw.currency),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: PriceIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.prisma.productPricing.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductPricingEntity[]> {
    const rows = await this.prisma.productPricing.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductPricingEntity): Promise<ProductPricingEntity> {
    const data = {
      productId: entity.productId.value,
      amount: entity.amount.value,
      currency: entity.currency.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.productPricing.upsert({
      where: { productId: entity.productId.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PriceIdVO): Promise<void> {
    await this.prisma.productPricing.delete({ where: { id: id.value } });
  }

  async findByProduct(productId: ProductIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.prisma.productPricing.findUnique({
      where: { productId: productId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async deleteByProduct(productId: ProductIdVO): Promise<void> {
    await this.prisma.productPricing.deleteMany({
      where: { productId: productId.value },
    });
  }
}
