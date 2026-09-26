import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SocialPostServiceInterface } from '../interfaces/social-post.service.interface';
import type { SocialPostRepository } from '../../../domain/repositories/social-post.repository.interface';
import { SocialPostEntity } from '../../../domain/entities/social-post.entity';
import { SocialMediaIdVO } from '../../../domain/value-objects/primitives/social-media-id.vo';

@Injectable()
export class SocialPostService
  extends BaseService<SocialPostEntity, string>
  implements SocialPostServiceInterface
{
  readonly name = 'SocialPostService';

  constructor(private readonly repo: SocialPostRepository) {
    super();
  }

  async findBySocialMedia(socialMediaId: string): Promise<readonly SocialPostEntity[]> {
    return this.repo.findBySocialMedia(SocialMediaIdVO.create(socialMediaId));
  }
}
