import { Injectable } from '@nestjs/common';
import { Survey as PrismaSurvey, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SurveyEntity } from '../../../../domain/entities/survey.entity';
import { SurveyIdVO } from '../../../../domain/value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../../../../domain/value-objects/primitives/survey-type.vo';
import { SurveyStatusVO } from '../../../../domain/value-objects/primitives/survey-status.vo';
import type { SurveyRepository } from '../../../../domain/repositories/survey.repository.interface';

@Injectable()
export class SurveyPrismaRepository
  extends BasePrismaRepository<SurveyEntity, SurveyIdVO>
  implements SurveyRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSurvey): SurveyEntity {
    const questions = Array.isArray(raw.questions) ? raw.questions : [];
    return SurveyEntity.reconstitute(
      SurveyIdVO.create(raw.id),
      {
        title: raw.title,
        type: SurveyTypeVO.create(raw.type),
        status: SurveyStatusVO.create(raw.status),
        questions,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SurveyIdVO): Promise<SurveyEntity | null> {
    const raw = await this.prisma.survey.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SurveyEntity): Promise<SurveyEntity> {
    const data = {
      title: entity.title,
      type: entity.type.value,
      status: entity.status.value,
      questions: entity.questions as Prisma.InputJsonValue,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.survey.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SurveyIdVO): Promise<void> {
    await this.prisma.survey.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: SurveyTypeVO): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({ where: { type: type.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
