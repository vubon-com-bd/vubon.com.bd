/**
 * SurveyPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SurveyRepository } from '../../../../domain/repositories/survey.repository.interface';
import { SurveyEntity } from '../../../../domain/entities/survey.entity';
import { SurveyIdVO } from '../../../../domain/value-objects/primitives/survey-id.vo';
import { SurveyStatusVO } from '../../../../domain/value-objects/primitives/survey-status.vo';
import { SurveyTypeVO } from '../../../../domain/value-objects/primitives/survey-type.vo';
import { SurveyMapper } from '../mappers/survey.mapper';

@Injectable()
export class SurveyPrismaRepository implements SurveyRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SurveyMapper,
  ) {}

  async findById(id: SurveyIdVO): Promise<SurveyEntity | null> {
    const raw = await this.prisma.survey.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SurveyEntity): Promise<SurveyEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.survey.upsert({
      where: { id: data.id },
      create: { ...data, questions: [...data.questions] },
      update: {
        title: data.title,
        status: data.status,
        questions: [...data.questions],
        responseCount: data.responseCount,
        publishedAt: data.publishedAt,
        closedAt: data.closedAt,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: SurveyIdVO): Promise<void> {
    await this.prisma.survey.delete({ where: { id: id.value } });
  }

  async exists(id: SurveyIdVO): Promise<boolean> {
    const count = await this.prisma.survey.count({ where: { id: id.value } });
    return count > 0;
  }

  async findActive(): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: SurveyStatusVO): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: SurveyTypeVO): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findSatisfactionSurveys(): Promise<readonly SurveyEntity[]> {
    const rows = await this.prisma.survey.findMany({
      where: { type: { in: ['csat', 'nps'] } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
