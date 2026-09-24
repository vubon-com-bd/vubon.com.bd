import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTeamQuery extends BaseQuery {
  readonly type = 'support.team.get';

  constructor(public readonly teamId: string) {
    super();
  }
}
