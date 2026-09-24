import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SurveyController } from '../../interfaces/controllers/rest/survey.controller';
import { CreateSurveyHandler } from '../../application/commands/survey/create-survey.handler';
import { RespondSurveyHandler } from '../../application/commands/survey/respond-survey.handler';
import { CloseSurveyHandler } from '../../application/commands/survey/close-survey.handler';
import { GetSurveyHandler } from '../../application/queries/survey/get-survey.handler';
import { ListSurveysHandler } from '../../application/queries/survey/list-surveys.handler';
import { ListSurveyResponsesHandler } from '../../application/queries/survey/list-survey-responses.handler';
import { SurveyService } from '../../application/services/impl/survey.service';
import { SurveyResponseService } from '../../application/services/impl/survey-response.service';

const HANDLERS = [
  CreateSurveyHandler,
  RespondSurveyHandler,
  CloseSurveyHandler,
  GetSurveyHandler,
  ListSurveysHandler,
  ListSurveyResponsesHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [SurveyController],
  providers: [...HANDLERS, SurveyService, SurveyResponseService],
  exports: [SurveyService, SurveyResponseService],
})
export class SurveyModule {}
