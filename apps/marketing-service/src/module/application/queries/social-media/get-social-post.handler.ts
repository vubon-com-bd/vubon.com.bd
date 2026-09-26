import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSocialPostQuery } from './get-social-post.query';
import type { SocialPostRepository } from '../../../domain/repositories/social-post.repository.interface';

@QueryHandler(GetSocialPostQuery)
export class GetSocialPostHandler
  extends BaseQueryHandler<GetSocialPostQuery, unknown | null>
  implements IQueryHandler<GetSocialPostQuery> {
  readonly queryType = 'marketing.social.get-post';
  constructor(private readonly repo: SocialPostRepository) { super(); }
  async execute(query: GetSocialPostQuery): Promise<unknown | null> {
    return this.repo.findById(query.postId);
  }
}
