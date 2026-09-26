/**
 * ListSurveysQuery
 * @module support-service/application/queries/survey
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSurveysQuery extends BaseQuery {
  readonly type = 'support.survey.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
