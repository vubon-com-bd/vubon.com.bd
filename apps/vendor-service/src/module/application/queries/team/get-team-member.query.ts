import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTeamMemberQuery extends BaseQuery {
  readonly type = 'vendor.team.get-member';

  constructor(public readonly memberId: string) {
    super();
  }
}
