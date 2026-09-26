import { Injectable } from '@nestjs/common';
import { LeadScore as PrismaLeadScore } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LeadScoreEntity } from '../../../../domain/entities/lead-score.entity';
import { LeadScoreCompositeVO } from '../../../../domain/value-objects/composites/lead-score-composite.vo';
import { LeadIdVO } from '../../../../domain/value-objects/primitives/lead-id.vo';
import { LeadScoreVO } from '../../../../domain/value-objects/primitives/lead-score.vo';
import { LeadSourceVO } from '../../../../domain/value-objects/primitives/lead-source.vo';
import type { LeadScoreRepository } from '../../../../domain/repositories/lead-score.repository.interface';

@Injectable()
export class LeadScorePrismaRepository
  extends BasePrismaRepository<LeadScoreEntity, string>
  implements LeadScoreRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLeadScore): LeadScoreEntity {
    return LeadScoreEntity.reconstitute(
      raw.id,
      {
        leadId: LeadIdVO.create(raw.leadId),
        score: LeadScoreCompositeVO.create({
          score: LeadScoreVO.create(raw.score),
          source: LeadSourceVO.create('website'),
          reason: raw.reason,
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LeadScoreEntity | null> {
    const raw = await this.prisma.leadScore.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LeadScoreEntity[]> {
    const rows = await this.prisma.leadScore.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LeadScoreEntity): Promise<LeadScoreEntity> {
    const data = {
      leadId: entity.leadId.value,
      score: entity.score.score.value,
      reason: entity.score.reason,
    };
    const raw = await this.prisma.leadScore.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.leadScore.delete({ where: { id } });
  }

  async findByLead(leadId: LeadIdVO): Promise<readonly LeadScoreEntity[]> {
    const rows = await this.prisma.leadScore.findMany({ where: { leadId: leadId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
