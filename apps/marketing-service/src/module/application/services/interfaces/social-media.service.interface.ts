import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SocialMediaEntity } from '../../../domain/entities/social-media.entity';
import type { CreateSocialPostRequestDTO } from '../../dtos/requests/social-media/create-social-post.dto';
import type { SocialPostResponseDTO } from '../../dtos/responses/social-post-response.dto';

export interface SocialMediaServiceInterface
  extends BaseServiceInterface<SocialMediaEntity, string> {
  create(input: CreateSocialPostRequestDTO): Promise<SocialPostResponseDTO>;
  schedule(postId: string, scheduledAt: string): Promise<void>;
  publish(postId: string): Promise<void>;
}
