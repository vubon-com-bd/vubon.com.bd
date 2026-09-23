import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SocialPostEntity } from '../entities/social-post.entity';
import { SocialMediaIdVO } from '../value-objects/primitives/social-media-id.vo';

export interface SocialPostRepository
  extends BaseRepository<SocialPostEntity, string> {
  findBySocialMedia(socialMediaId: SocialMediaIdVO): Promise<readonly SocialPostEntity[]>;
}
