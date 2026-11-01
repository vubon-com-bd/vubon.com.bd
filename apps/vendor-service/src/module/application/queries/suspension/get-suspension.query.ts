import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSuspensionQuery extends BaseQuery {
  readonly type = 'vendor.suspension.get';
  constructor(public readonly suspensionId: string) {
    super();
  }
}
