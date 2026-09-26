import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiFeatureFlag as PrismaFlag, AiFeature as PrismaFeature } from '@prisma/client';
import { FeatureFlagEntity } from '../../../../domain/entities/feature-flag.entity';
import type { FeatureFlagRepository } from '../../../../domain/repositories/feature-flag.repository.interface';
import { FeatureIdVO } from '../../../../domain/value-objects/primitives/feature-id.vo';
import { FeatureFlagVO } from '../../../../domain/value-objects/composites/feature-flag.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeatureFlagPrismaRepository
  extends BasePrismaRepository<FeatureFlagEntity, FeatureIdVO>
  implements FeatureFlagRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaFlag & { feature?: PrismaFeature }): FeatureFlagEntity {
    return FeatureFlagEntity.reconstitute(
      FeatureIdVO.create(raw.featureId),
      {
        featureId: FeatureIdVO.create(raw.featureId),
        flag: FeatureFlagVO.create({
          featureId: FeatureIdVO.create(raw.featureId),
          enabled: raw.enabled,
          rolloutPercent: raw.rolloutPercent,
          enabledForUsers: raw.enabledForUsers,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FeatureIdVO): Promise<FeatureFlagEntity | null> {
    const raw = await this.prisma.aiFeatureFlag.findUnique({ where: { featureId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FeatureFlagEntity[]> {
    const rows = await this.prisma.aiFeatureFlag.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FeatureFlagEntity): Promise<FeatureFlagEntity> {
    const data = {
      enabled: entity.flag.enabled,
      rolloutPercent: entity.flag.rolloutPercent,
      enabledForUsers: [...entity.flag.enabledForUsers],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiFeatureFlag.upsert({
      where: { featureId: entity.featureId.value },
      create: { id: entity.id.value, featureId: entity.featureId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FeatureIdVO): Promise<void> {
    await this.prisma.aiFeatureFlag.update({
      where: { featureId: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByFeatureId(featureId: FeatureIdVO): Promise<FeatureFlagEntity | null> {
    const raw = await this.prisma.aiFeatureFlag.findUnique({
      where: { featureId: featureId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findEnabledForUser(userId: string): Promise<readonly FeatureFlagEntity[]> {
    const rows = await this.prisma.aiFeatureFlag.findMany({
      where: {
        enabled: true,
        OR: [{ enabledForUsers: { has: userId } }, { rolloutPercent: { gt: 0 } }],
      },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
