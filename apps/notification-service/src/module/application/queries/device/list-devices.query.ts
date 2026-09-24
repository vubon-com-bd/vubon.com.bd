import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDevicesQuery extends BaseQuery {
  readonly type = 'device.list';

  constructor(public readonly userId: string) {
    super();
  }
}
