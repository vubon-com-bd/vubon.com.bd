import { Injectable } from '@nestjs/common';
import { ProductInventory as PrismaProductInventory } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductInventoryEntity } from '../../../../domain/entities/product-inventory.entity';
import { InventoryIdVO } from '../../../../domain/value-objects/primitives/inventory-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { InventoryQuantityVO } from '../../../../domain/value-objects/primitives/inventory-quantity.vo';
import { InventoryStatusVO } from '../../../../domain/value-objects/primitives/inventory-status.vo';
import type { ProductInventoryRepository } from '../../../../domain/repositories/product-inventory.repository.interface';

@Injectable()
export class ProductInventoryPrismaRepository
  extends BasePrismaRepository<ProductInventoryEntity, InventoryIdVO>
  implements ProductInventoryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductInventory): ProductInventoryEntity {
    return ProductInventoryEntity.reconstitute(
      InventoryIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        quantity: InventoryQuantityVO.create(raw.quantity),
        reserved: InventoryQuantityVO.create(raw.reserved),
        status: InventoryStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: InventoryIdVO): Promise<ProductInventoryEntity | null> {
    const raw = await this.prisma.productInventory.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.prisma.productInventory.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductInventoryEntity): Promise<ProductInventoryEntity> {
    const data = {
      productId: entity.productId.value,
      quantity: entity.quantity.value,
      reserved: entity.reserved.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.productInventory.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: InventoryIdVO): Promise<void> {
    await this.prisma.productInventory.delete({ where: { id: id.value } });
  }

  async findByProduct(productId: ProductIdVO): Promise<ProductInventoryEntity | null> {
    const raw = await this.prisma.productInventory.findFirst({
      where: { productId: productId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findLowStock(threshold: number): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.prisma.productInventory.findMany({
      where: { quantity: { lte: threshold, gt: 0 } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findOutOfStock(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.prisma.productInventory.findMany({
      where: { quantity: 0 },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByProduct(productId: ProductIdVO): Promise<void> {
    await this.prisma.productInventory.deleteMany({
      where: { productId: productId.value },
    });
  }
}
