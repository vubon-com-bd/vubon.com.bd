import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListAuthDevicesQuery extends BaseQuery {
  readonly type = 'auth.list-devices';
  constructor(public readonly userId: UserId) { super(); }
}
