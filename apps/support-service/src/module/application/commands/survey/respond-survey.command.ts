/**
 * RespondSurveyCommand
 * @module support-service/application/commands/survey
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RespondSurveyRequestDTO } from '../../dtos/requests/survey/respond-survey.dto';

export class RespondSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.respond';

  constructor(public readonly payload: RespondSurveyRequestDTO) {
    super();
  }
}
