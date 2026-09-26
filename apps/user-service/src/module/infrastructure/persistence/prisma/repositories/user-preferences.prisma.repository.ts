import { Injectable } from '@nestjs/common';
import { UserPreference as PrismaUserPreference } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserPreferencesEntity, type PreferenceEntry } from '../../../../domain/entities/user-preferences.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '../../../../domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '../../../../domain/value-objects/primitives/preference-value.vo';
import type { UserPreferencesRepository } from '../../../../domain/repositories/user-preferences.repository.interface';

@Injectable()
export class UserPreferencesPrismaRepository
  extends BasePrismaRepository<UserPreferencesEntity, UserIdVO>
  implements UserPreferencesRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private async buildEntity(userId: string): Promise<UserPreferencesEntity | null> {
    const first = await this.prisma.userPreference.findFirst({ where: { userId } });
    if (!first) return null;
    const rows: PrismaUserPreference[] = await this.prisma.userPreference.findMany({
      where: { userId },
    });
    const entries: readonly PreferenceEntry[] = rows.map((r) => ({
      key: PreferenceKeyVO.create(r.key),
      value: PreferenceValueVO.create(r.value),
    }));
    return UserPreferencesEntity.reconstitute(
      UserIdVO.create(userId),
      { userId: UserIdVO.create(userId), entries },
      first.createdAt.toISOString(),
      first.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: UserIdVO): Promise<UserPreferencesEntity | null> {
    return this.buildEntity(id.value);
  }

  async findAll(): Promise<readonly UserPreferencesEntity[]> {
    return [];
  }

  async save(entity: UserPreferencesEntity): Promise<UserPreferencesEntity> {
    const userId = entity.userId.value;
    await this.prisma.userPreference.deleteMany({ where: { userId } });
    for (const entry of entity.entries) {
      await this.prisma.userPreference.create({
        data: { userId, key: entry.key.value, value: entry.value.value },
      });
    }
    const reloaded = await this.buildEntity(userId);
    return reloaded ?? entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userPreference.deleteMany({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null> {
    return this.buildEntity(userId.value);
  }
}
