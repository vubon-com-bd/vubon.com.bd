/**
 * SurveyModule
 * @module support-service/modules/survey
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SurveyService } from '../../application/services/impl/survey.service';
import { SurveyMapper } from '../../application/mappers/survey.mapper';
import { CreateSurveyHandler } from '../../application/commands/survey/create-survey.handler';
import { RespondSurveyHandler } from '../../application/commands/survey/respond-survey.handler';
import { CloseSurveyHandler } from '../../application/commands/survey/close-survey.handler';
import { GetSurveyHandler } from '../../application/queries/survey/get-survey.handler';
import { ListSurveysHandler } from '../../application/queries/survey/list-surveys.handler';
import { SurveyController } from '../../interfaces/controllers/rest/survey.controller';
import { SurveyControllerMapper } from '../../interfaces/mappers/survey.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [SurveyController],
  providers: [
    SurveyService,
    SurveyMapper,
    SurveyControllerMapper,
    CreateSurveyHandler,
    RespondSurveyHandler,
    CloseSurveyHandler,
    GetSurveyHandler,
    ListSurveysHandler,
  ],
  exports: [SurveyService],
})
export class SurveyModule {}
