import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTeamMemberQuery extends BaseQuery {
  readonly type = 'vendor.team.get_member';
  constructor(public readonly memberId: string) {
    super();
  }
}
