import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetProfilePublicQuery extends BaseQuery {
  readonly type = 'user.get-profile-public';
  readonly queryType = 'user.get-profile-public';
  constructor(public readonly userId: string, public readonly viewerId?: string) { super(); }
}
