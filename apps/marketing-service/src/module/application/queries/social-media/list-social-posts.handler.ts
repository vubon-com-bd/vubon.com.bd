import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSocialPostsQuery } from './list-social-posts.query';
import type { SocialPostRepository } from '../../../domain/repositories/social-post.repository.interface';
import { SocialMediaIdVO } from '../../../domain/value-objects/primitives/social-media-id.vo';

@QueryHandler(ListSocialPostsQuery)
export class ListSocialPostsHandler
  extends BaseQueryHandler<ListSocialPostsQuery, readonly unknown[]>
  implements IQueryHandler<ListSocialPostsQuery> {
  readonly queryType = 'marketing.social.list-posts';
  constructor(private readonly repo: SocialPostRepository) { super(); }
  async execute(query: ListSocialPostsQuery): Promise<readonly unknown[]> {
    return this.repo.findBySocialMedia(SocialMediaIdVO.create(query.socialMediaId));
  }
}
