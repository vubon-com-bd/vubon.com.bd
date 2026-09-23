import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRouteQuery extends BaseQuery {
  readonly type = 'logistics.route.get';

  constructor(public readonly routeId: string) {
    super();
  }
}
