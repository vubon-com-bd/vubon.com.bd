/**
 * UserProfilePrismaRepository — UserProfileEntity ↔ Prisma UserProfile
 * @module auth-service/infrastructure/persistence/prisma/repositories
 *
 * NOTE: Domain entity uses displayName, Prisma stores firstName + lastName.
 * Concatenation/splitting happens in the mapper.
 */
import { Injectable } from '@nestjs/common';
import type { UserProfile as PrismaUserProfile } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserProfileEntity } from '../../../../domain/entities/user-profile.entity';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import type { UserProfileRepository } from '../../../../domain/repositories/user-profile.repository.interface';

@Injectable()
export class UserProfilePrismaRepository
  extends BasePrismaRepository<UserProfileEntity, PrismaUserProfile, UserId>
  implements UserProfileRepository {
  protected readonly model: PrismaDelegate<PrismaUserProfile>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userProfile as unknown as PrismaDelegate<PrismaUserProfile>;
  }

  protected idOf(domain: UserProfileEntity): UserId {
    return domain.userId;
  }

  protected whereForId(id: UserId): Record<string, unknown> {
    return { userId: id };
  }

  protected toDomain(raw: PrismaUserProfile): UserProfileEntity {
    return UserProfileEntity.create({
      id: raw.userId as UserId,
      userId: raw.userId as UserId,
      displayName: UserNameVO.of(
        `${raw.firstName} ${raw.lastName}`.trim() || 'User',
      ),
      bio: raw.bio ?? undefined,
      avatarUrl: raw.avatarUrl ?? undefined,
      locale: 'bn-BD',
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserProfileEntity): Record<string, unknown> {
    const parts = domain.displayName.value.split(' ').filter(Boolean);
    const firstName = parts[0] ?? 'User';
    const lastName = parts.slice(1).join(' ') || '-';
    return {
      userId: domain.userId,
      firstName,
      lastName,
      bio: domain.bio ?? null,
      avatarUrl: domain.avatarUrl ?? null,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<UserProfileEntity | null> {
    const raw = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
