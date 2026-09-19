import { Injectable } from '@nestjs/common';
import { UserProfile as PrismaUserProfile } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserProfileEntity } from '../../../../domain/entities/user-profile.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import type { UserProfileRepository } from '../../../../domain/repositories/user-profile.repository.interface';

@Injectable()
export class UserProfilePrismaRepository
  extends BasePrismaRepository<UserProfileEntity, UserIdVO>
  implements UserProfileRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserProfile): UserProfileEntity {
    return UserProfileEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        firstName: UserNameVO.create(raw.firstName),
        lastName: UserNameVO.create(raw.lastName),
        bio: raw.bio,
        avatarUrl: raw.avatarUrl,
        dateOfBirth: raw.dateOfBirth,
        gender: raw.gender,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserProfileEntity | null> {
    const raw = await this.prisma.userProfile.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserProfileEntity[]> {
    const rows = await this.prisma.userProfile.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserProfileEntity): Promise<UserProfileEntity> {
    const data = {
      firstName: entity.firstName.value,
      lastName: entity.lastName.value,
      bio: entity.bio,
      avatarUrl: entity.avatarUrl,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userProfile.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userProfile.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null> {
    const raw = await this.prisma.userProfile.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
