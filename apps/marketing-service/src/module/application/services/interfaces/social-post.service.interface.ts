import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SocialPostEntity } from '../../../domain/entities/social-post.entity';

export interface SocialPostServiceInterface
  extends BaseServiceInterface<SocialPostEntity, string> {
  findBySocialMedia(socialMediaId: string): Promise<readonly SocialPostEntity[]>;
}
