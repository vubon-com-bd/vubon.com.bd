import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSocialPostsQuery extends BaseQuery {
  readonly type = 'marketing.social.list-posts';
  constructor(public readonly socialMediaId: string) { super(); }
}
