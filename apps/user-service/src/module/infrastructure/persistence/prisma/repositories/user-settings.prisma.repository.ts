import { Injectable } from '@nestjs/common';
import { UserSetting as PrismaUserSetting } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserSettingsEntity, type SettingEntry } from '../../../../domain/entities/user-settings.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '../../../../domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '../../../../domain/value-objects/primitives/setting-value.vo';
import type { UserSettingsRepository } from '../../../../domain/repositories/user-settings.repository.interface';

@Injectable()
export class UserSettingsPrismaRepository
  extends BasePrismaRepository<UserSettingsEntity, UserIdVO>
  implements UserSettingsRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private async loadEntries(userId: string): Promise<readonly SettingEntry[]> {
    const rows = await this.prisma.userSetting.findMany({ where: { userId } });
    return rows.map((r) => ({
      key: SettingKeyVO.create(r.key),
      value: SettingValueVO.create(r.value),
    }));
  }

  private async buildEntity(userId: string): Promise<UserSettingsEntity | null> {
    const first = await this.prisma.userSetting.findFirst({ where: { userId } });
    if (!first) return null;
    const entries = await this.loadEntries(userId);
    return UserSettingsEntity.reconstitute(
      UserIdVO.create(userId),
      { userId: UserIdVO.create(userId), entries },
      first.createdAt.toISOString(),
      first.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: UserIdVO): Promise<UserSettingsEntity | null> {
    return this.buildEntity(id.value);
  }

  async findAll(): Promise<readonly UserSettingsEntity[]> {
    return [];
  }

  async save(entity: UserSettingsEntity): Promise<UserSettingsEntity> {
    const userId = entity.userId.value;
    await this.prisma.userSetting.deleteMany({ where: { userId } });
    for (const entry of entity.entries) {
      await this.prisma.userSetting.create({
        data: {
          userId,
          key: entry.key.value,
          value: entry.value.value,
        },
      });
    }
    const reloaded = await this.buildEntity(userId);
    return reloaded ?? entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userSetting.deleteMany({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null> {
    return this.buildEntity(userId.value);
  }
}
