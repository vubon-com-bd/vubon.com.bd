import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListGatewaysQuery extends BaseQuery {
  readonly type = 'gateway.list';

  constructor() {
    super();
  }
}
