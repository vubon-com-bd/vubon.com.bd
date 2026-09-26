import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTeamMembersQuery extends BaseQuery {
  readonly type = 'vendor.team.list-members';

  constructor(public readonly vendorId: string) {
    super();
  }
}
