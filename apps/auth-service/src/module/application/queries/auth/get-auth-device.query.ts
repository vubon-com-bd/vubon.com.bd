import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAuthDeviceQuery extends BaseQuery {
  readonly type = 'auth.get-device';
  constructor(public readonly deviceId: string) { super(); }
}
