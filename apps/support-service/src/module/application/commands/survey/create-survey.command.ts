/**
 * CreateSurveyCommand
 * @module support-service/application/commands/survey
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateSurveyRequestDTO } from '../../dtos/requests/survey/create-survey.dto';

export class CreateSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.create';

  constructor(public readonly payload: CreateSurveyRequestDTO) {
    super();
  }
}
