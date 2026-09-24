import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSurveysQuery extends BaseQuery {
  readonly type = 'support.survey.list';

  constructor() {
    super();
  }
}
