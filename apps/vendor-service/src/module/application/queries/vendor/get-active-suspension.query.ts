import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetActiveSuspensionQuery extends BaseQuery {
  readonly type = 'vendor.suspension.get_active';
  constructor(public readonly vendorId: string) { super(); }
}
