import { Injectable } from '@nestjs/common';
import { Attribution as PrismaAttribution, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AttributionEntity } from '../../../../domain/entities/attribution.entity';
import { AttributionModelVO } from '../../../../domain/value-objects/primitives/attribution-model.vo';
import type { AttributionRepository } from '../../../../domain/repositories/attribution.repository.interface';

@Injectable()
export class AttributionPrismaRepository
  extends BasePrismaRepository<AttributionEntity, string>
  implements AttributionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAttribution): AttributionEntity {
    const touchpoints = (raw.touchpoints as readonly string[]) ?? [];
    return AttributionEntity.reconstitute(
      raw.id,
      {
        model: AttributionModelVO.create(raw.model),
        conversionId: raw.conversionId,
        touchpoints: [...touchpoints],
        conversionValue: raw.conversionValue,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AttributionEntity | null> {
    const raw = await this.prisma.attribution.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AttributionEntity[]> {
    const rows = await this.prisma.attribution.findMany({
      where: { deletedAt: null },
      orderBy: { computedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AttributionEntity): Promise<AttributionEntity> {
    const credits = entity.computeCredits();
    const top = entity.getTopTouchpoint();
    const data = {
      model: entity.model.value,
      conversionId: entity.conversionId,
      touchpoints: [...entity.touchpoints] as Prisma.InputJsonValue,
      conversionValue: entity.conversionValue,
      credits: credits as unknown as Prisma.InputJsonValue,
      topTouchpoint: top.touchpoint,
      computedAt: new Date(),
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.attribution.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attribution.delete({ where: { id } });
  }

  async findByConversionId(conversionId: string): Promise<AttributionEntity | null> {
    const raw = await this.prisma.attribution.findUnique({
      where: { conversionId },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByModel(model: AttributionModelVO): Promise<readonly AttributionEntity[]> {
    const rows = await this.prisma.attribution.findMany({
      where: { model: model.value, deletedAt: null },
      orderBy: { computedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
