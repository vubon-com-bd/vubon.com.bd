/**
 * SurveyService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { SurveyServiceInterface } from '../interfaces/survey.service.interface';
import type { SurveyRepository } from '../../../domain/repositories/survey.repository.interface';
import type { SurveyResponseRepository } from '../../../domain/repositories/survey-response.repository.interface';
import { SurveyEntity } from '../../../domain/entities/survey.entity';
import { SurveyResponseEntity } from '../../../domain/entities/survey-response.entity';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../../../domain/value-objects/primitives/survey-type.vo';
import { SurveyQuestionVO } from '../../../domain/value-objects/primitives/survey-question.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

import { SurveyMapper } from '../../mappers/survey.mapper';
import { SurveyNotFoundException } from '../../errors/survey.errors';
import type { CreateSurveyRequestDTO } from '../../dtos/requests/survey/create-survey.dto';
import type { RespondSurveyRequestDTO } from '../../dtos/requests/survey/respond-survey.dto';
import type { CloseSurveyRequestDTO } from '../../dtos/requests/survey/close-survey.dto';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyListResponseDTO } from '../../dtos/responses/survey-list-response.dto';

@Injectable()
export class SurveyService implements SurveyServiceInterface {
  constructor(
    private readonly surveyRepo: SurveyRepository,
    private readonly responseRepo: SurveyResponseRepository,
    private readonly mapper: SurveyMapper,
  ) {}

  async create(input: CreateSurveyRequestDTO): Promise<SurveyResponseDTO> {
    if (input.questions.length === 0) {
      throw new BusinessRuleError(
        'Survey requires at least one question',
        'survey.questions.empty',
      );
    }
    const now = new Date().toISOString();
    const survey = SurveyEntity.create({
      id: SurveyIdVO.generate(),
      type: SurveyTypeVO.create(input.type),
      title: input.title,
      questions: input.questions.map((q) => SurveyQuestionVO.create(q.text)),
      now,
    });
    await this.surveyRepo.save(survey);
    return this.mapper.map(survey);
  }

  async respond(input: RespondSurveyRequestDTO): Promise<SurveyResponseDTO> {
    const survey = await this.loadOrThrow(input.surveyId);
    if (!survey.isAcceptingResponses) {
      throw new BusinessRuleError(
        'Survey is not accepting responses',
        'survey.not_accepting',
      );
    }
    const now = new Date().toISOString();
    const userId = UserIdVO.create(input.userId ?? 'anonymous');

    const already = await this.responseRepo.hasUserResponded(survey.id, userId);
    if (already) {
      throw new BusinessRuleError(
        'User already responded to this survey',
        'survey.already_responded',
      );
    }

    const response = SurveyResponseEntity.create({
      id: SurveyIdVO.generate(),
      surveyId: survey.id,
      userId,
      answers: input.answers,
      now,
    });
    survey.recordResponse();
    await this.responseRepo.save(response);
    await this.surveyRepo.save(survey);
    return this.mapper.map(survey);
  }

  async close(input: CloseSurveyRequestDTO): Promise<SurveyResponseDTO> {
    const survey = await this.loadOrThrow(input.surveyId);
    survey.close(new Date().toISOString());
    await this.surveyRepo.save(survey);
    return this.mapper.map(survey);
  }

  async getById(surveyId: string): Promise<SurveyResponseDTO> {
    const survey = await this.loadOrThrow(surveyId);
    return this.mapper.map(survey);
  }

  async list(page: number, limit: number): Promise<SurveyListResponseDTO> {
    const all = await this.surveyRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const total = all.length;
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  }

  private async loadOrThrow(surveyId: string): Promise<SurveyEntity> {
    const survey = await this.surveyRepo.findById(SurveyIdVO.create(surveyId));
    if (!survey) {
      throw new SurveyNotFoundException(surveyId);
    }
    return survey;
  }
}
