import { Injectable } from '@nestjs/common';
import { SocialPost as PrismaSocialPost } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SocialPostEntity } from '../../../../domain/entities/social-post.entity';
import { SocialPostCompositeVO } from '../../../../domain/value-objects/composites/social-post-composite.vo';
import { SocialMediaIdVO } from '../../../../domain/value-objects/primitives/social-media-id.vo';
import { SocialPostVO } from '../../../../domain/value-objects/primitives/social-post.vo';
import { SocialPlatformVO } from '../../../../domain/value-objects/primitives/social-platform.vo';
import type { SocialPostRepository } from '../../../../domain/repositories/social-post.repository.interface';

@Injectable()
export class SocialPostPrismaRepository
  extends BasePrismaRepository<SocialPostEntity, string>
  implements SocialPostRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSocialPost): SocialPostEntity {
    const socialMediaId = SocialMediaIdVO.create(raw.socialMediaId);
    return SocialPostEntity.reconstitute(
      raw.id,
      {
        socialMediaId,
        post: SocialPostCompositeVO.create({
          socialMediaId,
          platform: SocialPlatformVO.create('unknown'),
          content: SocialPostVO.create(raw.content),
          status: raw.status,
          scheduledAt: raw.scheduledAt,
          publishedAt: raw.publishedAt,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<SocialPostEntity | null> {
    const raw = await this.prisma.socialPost.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SocialPostEntity[]> {
    const rows = await this.prisma.socialPost.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SocialPostEntity): Promise<SocialPostEntity> {
    const data = {
      socialMediaId: entity.socialMediaId.value,
      content: entity.post.content.value,
      status: entity.post.status,
      scheduledAt: entity.post.scheduledAt,
      publishedAt: entity.post.publishedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.socialPost.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.socialPost.delete({ where: { id } });
  }

  async findBySocialMedia(socialMediaId: SocialMediaIdVO): Promise<readonly SocialPostEntity[]> {
    const rows = await this.prisma.socialPost.findMany({
      where: { socialMediaId: socialMediaId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
