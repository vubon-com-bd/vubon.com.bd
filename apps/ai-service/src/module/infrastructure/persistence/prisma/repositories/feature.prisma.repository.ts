import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiFeature as PrismaFeature } from '@prisma/client';
import { FeatureEntity } from '../../../../domain/entities/feature.entity';
import type { FeatureRepository } from '../../../../domain/repositories/feature.repository.interface';
import { FeatureIdVO } from '../../../../domain/value-objects/primitives/feature-id.vo';
import { FeatureNameVO } from '../../../../domain/value-objects/primitives/feature-name.vo';
import { FeatureStatusVO } from '../../../../domain/value-objects/primitives/feature-status.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeaturePrismaRepository
  extends BasePrismaRepository<FeatureEntity, FeatureIdVO>
  implements FeatureRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaFeature): FeatureEntity {
    return FeatureEntity.reconstitute(
      FeatureIdVO.create(raw.id),
      {
        name: FeatureNameVO.create(raw.name),
        status: FeatureStatusVO.create(raw.status),
        flag: null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FeatureIdVO): Promise<FeatureEntity | null> {
    const raw = await this.prisma.aiFeature.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FeatureEntity[]> {
    const rows = await this.prisma.aiFeature.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FeatureEntity): Promise<FeatureEntity> {
    const data = {
      name: entity.name.value,
      status: entity.status.value,
      enabled: entity.status.isEnabled(),
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiFeature.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FeatureIdVO): Promise<void> {
    await this.prisma.aiFeature.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByName(name: FeatureNameVO): Promise<FeatureEntity | null> {
    const raw = await this.prisma.aiFeature.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllEnabled(): Promise<readonly FeatureEntity[]> {
    const rows = await this.prisma.aiFeature.findMany({
      where: { enabled: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findAllDisabled(): Promise<readonly FeatureEntity[]> {
    const rows = await this.prisma.aiFeature.findMany({
      where: { enabled: false, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly FeatureEntity[]> {
    const rows = await this.prisma.aiFeature.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
