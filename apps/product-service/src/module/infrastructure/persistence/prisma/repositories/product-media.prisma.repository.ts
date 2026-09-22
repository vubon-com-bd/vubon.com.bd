import { Injectable } from '@nestjs/common';
import { ProductMedia as PrismaProductMedia } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductMediaEntity, type MediaType } from '../../../../domain/entities/product-media.entity';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductMediaRepository } from '../../../../domain/repositories/product-media.repository.interface';

@Injectable()
export class ProductMediaPrismaRepository
  extends BasePrismaRepository<ProductMediaEntity, string>
  implements ProductMediaRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductMedia): ProductMediaEntity {
    return ProductMediaEntity.reconstitute(
      raw.id,
      {
        productId: ProductIdVO.create(raw.productId),
        url: raw.url,
        type: raw.type as MediaType,
        order: raw.order,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<ProductMediaEntity | null> {
    const raw = await this.prisma.productMedia.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.prisma.productMedia.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductMediaEntity): Promise<ProductMediaEntity> {
    const data = {
      productId: entity.productId.value,
      url: entity.url,
      type: entity.type,
      order: entity.order,
    };
    const raw = await this.prisma.productMedia.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.productMedia.delete({ where: { id } });
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.prisma.productMedia.findMany({
      where: { productId: productId.value },
      orderBy: { order: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.prisma.productMedia.count({
      where: { productId: productId.value },
    });
  }

  async deleteByProduct(productId: ProductIdVO): Promise<void> {
    await this.prisma.productMedia.deleteMany({
      where: { productId: productId.value },
    });
  }
}
