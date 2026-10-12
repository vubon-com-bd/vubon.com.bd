import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTeamMembersQuery extends BaseQuery {
  readonly type = 'vendor.team.list_members';
  constructor(public readonly vendorId: string) { super(); }
}
