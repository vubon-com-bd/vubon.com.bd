import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSocialPostQuery extends BaseQuery {
  readonly type = 'marketing.social.get-post';
  constructor(public readonly postId: string) { super(); }
}
