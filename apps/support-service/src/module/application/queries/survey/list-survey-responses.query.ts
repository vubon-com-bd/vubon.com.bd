import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSurveyResponsesQuery extends BaseQuery {
  readonly type = 'support.survey.responses.list';

  constructor(public readonly surveyId: string) {
    super();
  }
}
