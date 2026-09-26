/**
 * SurveyResponsePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SurveyResponseRepository } from '../../../../domain/repositories/survey-response.repository.interface';
import { SurveyResponseEntity } from '../../../../domain/entities/survey-response.entity';
import { SurveyIdVO } from '../../../../domain/value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SurveyResponseMapper } from '../mappers/survey-response.mapper';

@Injectable()
export class SurveyResponsePrismaRepository
  implements SurveyResponseRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SurveyResponseMapper,
  ) {}

  async findById(id: SurveyIdVO): Promise<SurveyResponseEntity | null> {
    const raw = await this.prisma.surveyResponse.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SurveyResponseEntity[]> {
    const rows = await this.prisma.surveyResponse.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SurveyResponseEntity): Promise<SurveyResponseEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.surveyResponse.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        surveyId: data.surveyId,
        userId: data.userId,
        answers: [...data.answers] as unknown as object,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      update: {
        answers: [...data.answers] as unknown as object,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: SurveyIdVO): Promise<void> {
    await this.prisma.surveyResponse.delete({ where: { id: id.value } });
  }

  async exists(id: SurveyIdVO): Promise<boolean> {
    const count = await this.prisma.surveyResponse.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findBySurvey(surveyId: SurveyIdVO): Promise<readonly SurveyResponseEntity[]> {
    const rows = await this.prisma.surveyResponse.findMany({
      where: { surveyId: surveyId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<readonly SurveyResponseEntity[]> {
    const rows = await this.prisma.surveyResponse.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findBySurveyAndUser(
    surveyId: SurveyIdVO,
    userId: UserIdVO,
  ): Promise<SurveyResponseEntity | null> {
    const raw = await this.prisma.surveyResponse.findUnique({
      where: {
        surveyId_userId: { surveyId: surveyId.value, userId: userId.value },
      },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async countBySurvey(surveyId: SurveyIdVO): Promise<number> {
    return this.prisma.surveyResponse.count({
      where: { surveyId: surveyId.value },
    });
  }

  async hasUserResponded(
    surveyId: SurveyIdVO,
    userId: UserIdVO,
  ): Promise<boolean> {
    const count = await this.prisma.surveyResponse.count({
      where: { surveyId: surveyId.value, userId: userId.value },
    });
    return count > 0;
  }
}
