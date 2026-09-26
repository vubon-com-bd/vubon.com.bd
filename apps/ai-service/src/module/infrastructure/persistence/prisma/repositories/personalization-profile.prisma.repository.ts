import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiPersonalizationProfile as PrismaProfile } from '@prisma/client';
import { PersonalizationProfileEntity } from '../../../../domain/entities/personalization-profile.entity';
import type { PersonalizationProfileRepository } from '../../../../domain/repositories/personalization-profile.repository.interface';
import { PersonalizationIdVO } from '../../../../domain/value-objects/primitives/personalization-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PersonalizationProfileVO } from '../../../../domain/value-objects/composites/personalization-profile.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PersonalizationProfilePrismaRepository
  extends BasePrismaRepository<PersonalizationProfileEntity, PersonalizationIdVO>
  implements PersonalizationProfileRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaProfile): PersonalizationProfileEntity {
    return PersonalizationProfileEntity.reconstitute(
      PersonalizationIdVO.create(raw.userId),
      {
        profile: PersonalizationProfileVO.create({
          userId: UserIdVO.create(raw.userId),
          interests: raw.interests,
          categories: raw.categories,
          brandAffinity: raw.brandAffinity as Record<string, number>,
          priceRangeMin: raw.priceRangeMin,
          priceRangeMax: raw.priceRangeMax,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PersonalizationIdVO): Promise<PersonalizationProfileEntity | null> {
    const raw = await this.prisma.aiPersonalizationProfile.findUnique({ where: { userId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PersonalizationProfileEntity[]> {
    const rows = await this.prisma.aiPersonalizationProfile.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PersonalizationProfileEntity): Promise<PersonalizationProfileEntity> {
    const data = {
      interests: [...entity.profile.interests],
      categories: [...entity.profile.categories],
      brandAffinity: entity.profile.brandAffinity as object,
      priceRangeMin: entity.profile.priceRangeMin,
      priceRangeMax: entity.profile.priceRangeMax,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiPersonalizationProfile.upsert({
      where: { userId: entity.profile.userId.value },
      create: { id: entity.id.value, userId: entity.profile.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PersonalizationIdVO): Promise<void> {
    await this.prisma.aiPersonalizationProfile.update({
      where: { userId: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByUserId(userId: UserIdVO): Promise<PersonalizationProfileEntity | null> {
    const raw = await this.prisma.aiPersonalizationProfile.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByInterest(interest: string): Promise<readonly PersonalizationProfileEntity[]> {
    const rows = await this.prisma.aiPersonalizationProfile.findMany({
      where: { interests: { has: interest } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
