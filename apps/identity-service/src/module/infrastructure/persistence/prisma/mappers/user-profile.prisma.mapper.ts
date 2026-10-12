/**
 * User Profile Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserProfileEntity } from '../../../../domain/entities/user-profile.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo.js';

export interface PrismaUserProfileRow {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  website: string | null;
  company: string | null;
  designation: string | null;
  visibility: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserProfilePrismaMapper {
  static toDomain(raw: PrismaUserProfileRow): UserProfileEntity {
    return UserProfileEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        firstName: this.tryName(raw.firstName),
        lastName: this.tryName(raw.lastName),
        bio: raw.bio ?? undefined,
        avatarUrl: raw.avatarUrl ?? undefined,
        coverUrl: raw.coverUrl ?? undefined,
        dateOfBirth: raw.dateOfBirth
          ? new Date(raw.dateOfBirth).toISOString()
          : undefined,
        gender: (raw.gender as 'male' | 'female' | 'other' | 'prefer_not_to_say' | null) ?? undefined,
        website: raw.website ?? undefined,
        language: undefined,
        locale: undefined,
        timezone: undefined,
      },
    });
  }

  static toPersistence(entity: UserProfileEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      firstName: entity.firstName?.value ?? null,
      lastName: entity.lastName?.value ?? null,
      bio: entity.bio ?? null,
      avatarUrl: entity.avatarUrl ?? null,
      coverUrl: entity.coverUrl ?? null,
      dateOfBirth: entity.dateOfBirth ? new Date(entity.dateOfBirth) : null,
      gender: entity.gender ?? null,
      website: entity.website ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static tryName(v: string | null): UserNameVO | undefined {
    if (!v) return undefined;
    try { return UserNameVO.reconstitute(v); } catch { return undefined; }
  }
}
