/**
 * UserProfilePrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserProfile as PrismaUserProfile } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

@Injectable()
export class UserProfilePrismaRepository implements UserProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: PrismaUserProfile): UserProfileEntity {
    return UserProfileEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        userId: UserIdVO.create(raw.userId),
        avatar: raw.avatarUrl ? UserAvatarVO.create(raw.avatarUrl) : UserAvatarVO.empty(),
        bio: raw.bio ? UserBioVO.create(raw.bio) : UserBioVO.empty(),
        visibility: ProfileVisibilityVO.create(raw.visibility),
      },
    });
  }

  async findById(id: string): Promise<UserProfileEntity | null> {
    const raw = await this.prisma.userProfile.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserProfileEntity[]> {
    const raws = await this.prisma.userProfile.findMany({ where: { deletedAt: null } });
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserProfileEntity): Promise<UserProfileEntity> {
    const avatar = entity.avatar.value;
    const bio = entity.bio.value;
    const visibility = entity.visibility.value;

    const raw = await this.prisma.userProfile.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        userId: entity.userId.value,
        avatarUrl: avatar.length > 0 ? avatar : null,
        bio: bio.length > 0 ? bio : null,
        visibility,
      },
      update: {
        avatarUrl: avatar.length > 0 ? avatar : null,
        bio: bio.length > 0 ? bio : null,
        visibility,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userProfile.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userProfile.count({ where: { id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null> {
    const raw = await this.prisma.userProfile.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByUserId(userId: UserIdVO): Promise<boolean> {
    const count = await this.prisma.userProfile.count({
      where: { userId: userId.value },
    });
    return count > 0;
  }

  async deleteByUserId(userId: UserIdVO): Promise<void> {
    await this.prisma.userProfile.deleteMany({ where: { userId: userId.value } });
  }
}
