import { Injectable } from '@nestjs/common';
import { UserSettings as PrismaUserSettings } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserSettingsEntity } from '../../../../domain/entities/user-settings.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { UserSettingsRepository } from '../../../../domain/repositories/user-settings.repository.interface';

@Injectable()
export class UserSettingsPrismaRepository
  extends BasePrismaRepository<UserSettingsEntity, UserIdVO>
  implements UserSettingsRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserSettings): UserSettingsEntity {
    return UserSettingsEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        language: raw.language,
        timezone: raw.timezone,
        currency: raw.currency,
        theme: raw.theme as 'light' | 'dark' | 'system',
        emailNotifications: raw.emailNotifications,
        smsNotifications: raw.smsNotifications,
        pushNotifications: raw.pushNotifications,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<UserSettingsEntity | null> {
    const raw = await this.prisma.userSettings.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserSettingsEntity[]> {
    const rows = await this.prisma.userSettings.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserSettingsEntity): Promise<UserSettingsEntity> {
    const data = {
      language: entity.language,
      timezone: entity.timezone,
      currency: entity.currency,
      theme: entity.theme,
      emailNotifications: entity.emailNotifications,
      smsNotifications: entity.smsNotifications,
      pushNotifications: entity.pushNotifications,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.userSettings.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.userSettings.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null> {
    const raw = await this.prisma.userSettings.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
