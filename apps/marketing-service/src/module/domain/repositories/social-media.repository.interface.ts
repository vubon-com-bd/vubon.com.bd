import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SocialMediaEntity } from '../entities/social-media.entity';
import { SocialMediaIdVO } from '../value-objects/primitives/social-media-id.vo';
import { SocialPlatformVO } from '../value-objects/primitives/social-platform.vo';

export interface SocialMediaRepository
  extends BaseRepository<SocialMediaEntity, SocialMediaIdVO> {
  findByPlatform(platform: SocialPlatformVO): Promise<readonly SocialMediaEntity[]>;
}
