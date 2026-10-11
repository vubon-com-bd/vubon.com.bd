import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListActiveDevicesQuery extends BaseQuery {
  readonly type = 'device.list_active';
  constructor(public readonly userId: string) { super(); }
}
