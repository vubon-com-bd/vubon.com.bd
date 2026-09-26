import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiRecommendationContext as PrismaCtx } from '@prisma/client';
import { RecommendationContextEntity } from '../../../../domain/entities/recommendation-context.entity';
import type { RecommendationContextRepository } from '../../../../domain/repositories/recommendation-context.repository.interface';
import { RecommendationIdVO } from '../../../../domain/value-objects/primitives/recommendation-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { RecommendationContextVO } from '../../../../domain/value-objects/composites/recommendation-context.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecommendationContextPrismaRepository
  extends BasePrismaRepository<RecommendationContextEntity, RecommendationIdVO>
  implements RecommendationContextRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaCtx): RecommendationContextEntity {
    return RecommendationContextEntity.reconstitute(
      RecommendationIdVO.create(raw.recommendationId),
      {
        recommendationId: RecommendationIdVO.create(raw.recommendationId),
        context: RecommendationContextVO.create({
          userId: UserIdVO.create('00000000-0000-0000-0000-000000000000'),
          sessionId: raw.sessionId,
          deviceType: raw.deviceType,
          location: raw.location,
          recentlyViewed: raw.recentlyViewed,
          cartItems: raw.cartItems,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RecommendationIdVO): Promise<RecommendationContextEntity | null> {
    const raw = await this.prisma.aiRecommendationContext.findUnique({
      where: { recommendationId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RecommendationContextEntity[]> {
    const rows = await this.prisma.aiRecommendationContext.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RecommendationContextEntity): Promise<RecommendationContextEntity> {
    const data = {
      sessionId: entity.context.sessionId,
      deviceType: entity.context.deviceType,
      location: entity.context.location,
      recentlyViewed: [...entity.context.recentlyViewed],
      cartItems: [...entity.context.cartItems],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiRecommendationContext.upsert({
      where: { recommendationId: entity.recommendationId.value },
      create: { id: entity.id.value, recommendationId: entity.recommendationId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RecommendationIdVO): Promise<void> {
    await this.prisma.aiRecommendationContext.delete({ where: { recommendationId: id.value } });
  }

  async findByRecommendationId(recommendationId: RecommendationIdVO): Promise<RecommendationContextEntity | null> {
    const raw = await this.prisma.aiRecommendationContext.findUnique({
      where: { recommendationId: recommendationId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
