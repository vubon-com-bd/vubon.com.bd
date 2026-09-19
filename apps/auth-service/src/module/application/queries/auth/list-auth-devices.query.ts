import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAuthDevicesQuery extends BaseQuery {
  readonly type = 'auth.list-devices';

  constructor(public readonly userId: string) {
    super();
  }
}
