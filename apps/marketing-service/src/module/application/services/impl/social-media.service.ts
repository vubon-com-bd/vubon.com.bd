import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SocialMediaServiceInterface } from '../interfaces/social-media.service.interface';
import type { SocialMediaRepository } from '../../../domain/repositories/social-media.repository.interface';
import type { SocialPostRepository } from '../../../domain/repositories/social-post.repository.interface';
import { SocialMediaEntity } from '../../../domain/entities/social-media.entity';
import { SocialPostEntity } from '../../../domain/entities/social-post.entity';
import { SocialMediaIdVO } from '../../../domain/value-objects/primitives/social-media-id.vo';
import { SocialPlatformVO } from '../../../domain/value-objects/primitives/social-platform.vo';
import { SocialPostVO } from '../../../domain/value-objects/primitives/social-post.vo';
import type { CreateSocialPostRequestDTO } from '../../dtos/requests/social-media/create-social-post.dto';
import type { SocialPostResponseDTO } from '../../dtos/responses/social-post-response.dto';

@Injectable()
export class SocialMediaService
  extends BaseService<SocialMediaEntity, string>
  implements SocialMediaServiceInterface
{
  readonly name = 'SocialMediaService';

  constructor(
    private readonly mediaRepo: SocialMediaRepository,
    private readonly postRepo: SocialPostRepository,
  ) {
    super();
  }

  async create(input: CreateSocialPostRequestDTO): Promise<SocialPostResponseDTO> {
    const platform = SocialPlatformVO.create(input.platform);
    const mediaList = await this.mediaRepo.findByPlatform(platform);
    const media = mediaList[0];
    const mediaId = media ? SocialMediaIdVO.create(media.id.value) : SocialMediaIdVO.create(crypto.randomUUID());

    const post = SocialPostEntity.create({
      socialMediaId: mediaId,
      post: {
        socialMediaId: mediaId,
        platform,
        content: SocialPostVO.create(input.content),
        status: 'draft',
        scheduledAt: null,
        publishedAt: null,
      } as never,
    });
    await this.postRepo.save(post);
    return this.toDTO(post);
  }

  async schedule(postId: string, scheduledAt: string): Promise<void> {
    void postId;
    void scheduledAt;
  }

  async publish(postId: string): Promise<void> {
    void postId;
  }

  private toDTO(entity: SocialPostEntity): SocialPostResponseDTO {
    return {
      id: entity.id,
      content: entity.post.content.value,
      platform: entity.post.platform.value,
      status: entity.post.status,
      scheduledAt: entity.post.scheduledAt?.toISOString(),
      publishedAt: entity.post.publishedAt?.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as SocialPostResponseDTO;
  }
}
