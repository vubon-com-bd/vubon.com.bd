import { Injectable } from '@nestjs/common';
import type { SurveyServiceInterface } from '../interfaces/survey.service.interface';
import type { SurveyRepository } from '../../../domain/repositories/survey.repository.interface';
import { SurveyEntity } from '../../../domain/entities/survey.entity';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../../../domain/value-objects/primitives/survey-type.vo';
import { SurveyStatusVO } from '../../../domain/value-objects/primitives/survey-status.vo';
import type { CreateSurveyRequestDTO } from '../../dtos/requests/survey';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';

@Injectable()
export class SurveyService implements SurveyServiceInterface {
  constructor(private readonly surveyRepo: SurveyRepository) {}

  async create(input: CreateSurveyRequestDTO): Promise<SurveyResponseDTO> {
    const entity = SurveyEntity.create({
      title: input.title,
      type: SurveyTypeVO.create(input.type),
      status: SurveyStatusVO.create('draft'),
      questions: input.questions,
    });
    const saved = await this.surveyRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: SurveyIdVO): Promise<SurveyEntity | null> {
    return this.surveyRepo.findById(id);
  }

  async close(id: SurveyIdVO): Promise<void> {
    const existing = await this.surveyRepo.findById(id);
    if (!existing) return;
    void existing;
  }

  private toDTO(entity: SurveyEntity): SurveyResponseDTO {
    return {
      id: entity.id.value,
      title: entity.title,
      type: entity.type.value,
      status: entity.status.value,
      questions: entity.questions,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
