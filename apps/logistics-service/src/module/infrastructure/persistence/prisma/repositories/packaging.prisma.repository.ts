import { Injectable } from '@nestjs/common';
import { Packaging as PrismaPackaging } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PackagingEntity } from '../../../../domain/entities/packaging.entity';
import { PackagingTypeVO } from '../../../../domain/value-objects/primitives/packaging-type.vo';
import { PackagingMaterialVO } from '../../../../domain/value-objects/primitives/packaging-material.vo';
import { PackagingSizeVO } from '../../../../domain/value-objects/primitives/packaging-size.vo';
import type { PackagingRepository } from '../../../../domain/repositories/packaging.repository.interface';

@Injectable()
export class PackagingPrismaRepository
  extends BasePrismaRepository<PackagingEntity, string>
  implements PackagingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPackaging): PackagingEntity {
    return PackagingEntity.reconstitute(
      raw.id,
      {
        type: PackagingTypeVO.create(raw.type),
        material: PackagingMaterialVO.create(raw.material),
        size: PackagingSizeVO.create(raw.size),
        maxWeight: null,
        cost: raw.cost,
        currency: raw.currency,
        status: raw.status,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<PackagingEntity | null> {
    const raw = await this.prisma.packaging.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.packaging.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PackagingEntity): Promise<PackagingEntity> {
    const data = {
      type: entity.type.value,
      material: entity.material.value,
      size: entity.size.value,
      maxWeight: entity.maxWeight?.value ?? null,
      cost: entity.cost,
      currency: entity.currency,
      status: entity.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.packaging.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.packaging.delete({ where: { id } });
  }

  async findByType(type: string): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.packaging.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }

  async findAvailable(): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.packaging.findMany({ where: { status: 'available' } });
    return rows.map((r) => this.toDomain(r));
  }
}
