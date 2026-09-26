import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeviceQuery extends BaseQuery {
  readonly type = 'device.get';

  constructor(public readonly deviceId: string) {
    super();
  }
}
