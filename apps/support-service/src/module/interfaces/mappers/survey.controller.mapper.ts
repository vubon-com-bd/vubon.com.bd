/**
 * SurveyControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SurveyResponseDTO as AppSurveyResponseDTO } from '../../application/dtos/responses/survey-response.dto';
import { SurveyResponseDTO } from '../dtos/responses/survey-response.dto';

@Injectable()
export class SurveyControllerMapper {
  toResponse(app: AppSurveyResponseDTO): SurveyResponseDTO {
    const res = new SurveyResponseDTO();
    res.id = app.id;
    res.title = app.title;
    res.description = app.description;
    res.type = app.type;
    res.status = app.status;
    res.questions = app.questions.map((q) => ({
      id: q.id,
      type: q.type,
      text: q.text,
      required: q.required,
      order: q.order,
    }));
    res.isAnonymous = app.isAnonymous;
    res.targetAudience = app.targetAudience ? [...app.targetAudience] : undefined;
    res.startAt = app.startAt;
    res.endAt = app.endAt;
    res.responseCount = app.responseCount;
    res.createdBy = app.createdBy;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
