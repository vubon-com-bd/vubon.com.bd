import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiRecommendation as PrismaRec } from '@prisma/client';
import { RecommendationEntity } from '../../../../domain/entities/recommendation.entity';
import type { RecommendationRepository } from '../../../../domain/repositories/recommendation.repository.interface';
import { RecommendationIdVO } from '../../../../domain/value-objects/primitives/recommendation-id.vo';
import { RecommendationTypeVO } from '../../../../domain/value-objects/primitives/recommendation-type.vo';
import { RecommendationStrategyVO } from '../../../../domain/value-objects/primitives/recommendation-strategy.vo';
import { RecommendationStatusVO } from '../../../../domain/value-objects/primitives/recommendation-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { RecommendationContextVO } from '../../../../domain/value-objects/composites/recommendation-context.vo';
import { RecommendationResultVO } from '../../../../domain/value-objects/composites/recommendation-result.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecommendationPrismaRepository
  extends BasePrismaRepository<RecommendationEntity, RecommendationIdVO>
  implements RecommendationRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaRec): RecommendationEntity {
    return RecommendationEntity.reconstitute(
      RecommendationIdVO.create(raw.id),
      {
        type: RecommendationTypeVO.create(raw.type),
        strategy: RecommendationStrategyVO.create(raw.strategy),
        status: RecommendationStatusVO.create(raw.status),
        context: RecommendationContextVO.create({
          userId: UserIdVO.create(raw.userId),
          sessionId: null,
          deviceType: null,
          location: null,
          recentlyViewed: [],
          cartItems: [],
        }),
        result: RecommendationResultVO.create({ items: [], generatedAt: raw.createdAt }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: RecommendationIdVO): Promise<RecommendationEntity | null> {
    const raw = await this.prisma.aiRecommendation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RecommendationEntity[]> {
    const rows = await this.prisma.aiRecommendation.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RecommendationEntity): Promise<RecommendationEntity> {
    const data = {
      userId: entity.context.userId.value,
      type: entity.type.value,
      strategy: entity.strategy.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiRecommendation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RecommendationIdVO): Promise<void> {
    await this.prisma.aiRecommendation.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByUser(userId: UserIdVO): Promise<readonly RecommendationEntity[]> {
    const rows = await this.prisma.aiRecommendation.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByUser(userId: UserIdVO): Promise<RecommendationEntity | null> {
    const raw = await this.prisma.aiRecommendation.findFirst({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly RecommendationEntity[]> {
    const rows = await this.prisma.aiRecommendation.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findConvertedByUser(userId: UserIdVO): Promise<readonly RecommendationEntity[]> {
    const rows = await this.prisma.aiRecommendation.findMany({
      where: { userId: userId.value, status: 'converted', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
