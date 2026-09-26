/**
 * CloseSurveyCommand
 * @module support-service/application/commands/survey
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CloseSurveyRequestDTO } from '../../dtos/requests/survey/close-survey.dto';

export class CloseSurveyCommand extends BaseCommand {
  readonly type = 'support.survey.close';

  constructor(public readonly payload: CloseSurveyRequestDTO) {
    super();
  }
}
