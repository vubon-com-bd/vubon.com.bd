import { Injectable } from '@nestjs/common';
import { SurveyResponse as PrismaSurveyResponse, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SurveyResponseEntity } from '../../../../domain/entities/survey-response.entity';
import { SurveyIdVO } from '../../../../domain/value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { SurveyResponseRepository } from '../../../../domain/repositories/survey-response.repository.interface';

@Injectable()
export class SurveyResponsePrismaRepository
  extends BasePrismaRepository<SurveyResponseEntity, string>
  implements SurveyResponseRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSurveyResponse): SurveyResponseEntity {
    const answers =
      raw.answers && typeof raw.answers === 'object'
        ? (raw.answers as Record<string, unknown>)
        : {};
    return SurveyResponseEntity.reconstitute(
      raw.id,
      {
        surveyId: SurveyIdVO.create(raw.surveyId),
        userId: UserIdVO.create(raw.userId),
        answers,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<SurveyResponseEntity | null> {
    const raw = await this.prisma.surveyResponse.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SurveyResponseEntity[]> {
    const rows = await this.prisma.surveyResponse.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SurveyResponseEntity): Promise<SurveyResponseEntity> {
    const data = {
      surveyId: entity.surveyId.value,
      userId: entity.userId.value,
      answers: entity.answers as Prisma.InputJsonValue,
    };
    const raw = await this.prisma.surveyResponse.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.surveyResponse.delete({ where: { id } });
  }

  async findBySurvey(surveyId: SurveyIdVO): Promise<readonly SurveyResponseEntity[]> {
    const rows = await this.prisma.surveyResponse.findMany({
      where: { surveyId: surveyId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
