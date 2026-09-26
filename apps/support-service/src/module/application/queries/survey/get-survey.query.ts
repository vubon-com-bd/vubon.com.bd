/**
 * GetSurveyQuery
 * @module support-service/application/queries/survey
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSurveyQuery extends BaseQuery {
  readonly type = 'support.survey.get';

  constructor(public readonly surveyId: string) {
    super();
  }
}
