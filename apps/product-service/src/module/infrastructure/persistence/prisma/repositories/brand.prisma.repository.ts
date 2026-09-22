import { Injectable } from '@nestjs/common';
import { Brand as PrismaBrand } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { BrandEntity } from '../../../../domain/entities/brand.entity';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo';
import { BrandNameVO } from '../../../../domain/value-objects/primitives/brand-name.vo';
import { BrandSlugVO } from '../../../../domain/value-objects/primitives/brand-slug.vo';
import { BrandLogoVO } from '../../../../domain/value-objects/primitives/brand-logo.vo';
import type { BrandRepository } from '../../../../domain/repositories/brand.repository.interface';

@Injectable()
export class BrandPrismaRepository
  extends BasePrismaRepository<BrandEntity, BrandIdVO>
  implements BrandRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaBrand): BrandEntity {
    return BrandEntity.reconstitute(
      BrandIdVO.create(raw.id),
      {
        name: BrandNameVO.create(raw.name),
        slug: BrandSlugVO.create(raw.slug),
        logo: raw.logo ? BrandLogoVO.create(raw.logo) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: BrandIdVO): Promise<BrandEntity | null> {
    const raw = await this.prisma.brand.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BrandEntity[]> {
    const rows = await this.prisma.brand.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: BrandEntity): Promise<BrandEntity> {
    const data = {
      name: entity.name.value,
      slug: entity.slug.value,
      logo: entity.logo?.value ?? null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.brand.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: BrandIdVO): Promise<void> {
    await this.prisma.brand.delete({ where: { id: id.value } });
  }

  async findBySlug(slug: BrandSlugVO): Promise<BrandEntity | null> {
    const raw = await this.prisma.brand.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async existsBySlug(slug: BrandSlugVO): Promise<boolean> {
    const count = await this.prisma.brand.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async findActive(): Promise<readonly BrandEntity[]> {
    const rows = await this.prisma.brand.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
