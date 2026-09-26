import { Injectable } from '@nestjs/common';
import { SocialMedia as PrismaSocialMedia } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SocialMediaEntity } from '../../../../domain/entities/social-media.entity';
import { SocialMediaIdVO } from '../../../../domain/value-objects/primitives/social-media-id.vo';
import { SocialPlatformVO } from '../../../../domain/value-objects/primitives/social-platform.vo';
import type { SocialMediaRepository } from '../../../../domain/repositories/social-media.repository.interface';

@Injectable()
export class SocialMediaPrismaRepository
  extends BasePrismaRepository<SocialMediaEntity, SocialMediaIdVO>
  implements SocialMediaRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSocialMedia): SocialMediaEntity {
    return SocialMediaEntity.reconstitute(
      SocialMediaIdVO.create(raw.id),
      {
        name: raw.name,
        platform: SocialPlatformVO.create(raw.platform),
        status: raw.status,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SocialMediaIdVO): Promise<SocialMediaEntity | null> {
    const raw = await this.prisma.socialMedia.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SocialMediaEntity[]> {
    const rows = await this.prisma.socialMedia.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SocialMediaEntity): Promise<SocialMediaEntity> {
    const data = {
      name: entity.name,
      platform: entity.platform.value,
      status: entity.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.socialMedia.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SocialMediaIdVO): Promise<void> {
    await this.prisma.socialMedia.delete({ where: { id: id.value } });
  }

  async findByPlatform(platform: SocialPlatformVO): Promise<readonly SocialMediaEntity[]> {
    const rows = await this.prisma.socialMedia.findMany({ where: { platform: platform.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
