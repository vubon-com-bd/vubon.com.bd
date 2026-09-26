/**
 * UserSettingsPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { UserSettings as PrismaUserSettings } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserSettingsEntity } from '../../../../domain/entities/user-settings.entity';
import type { UserSettingsRepository } from '../../../../domain/repositories/user-settings.repository.interface';

@Injectable()
export class UserSettingsPrismaRepository
  extends BasePrismaRepository<UserSettingsEntity, PrismaUserSettings, UserId>
  implements UserSettingsRepository {
  protected readonly model: PrismaDelegate<PrismaUserSettings>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.userSettings as unknown as PrismaDelegate<PrismaUserSettings>;
  }

  protected idOf(domain: UserSettingsEntity): UserId {
    return domain.userId;
  }

  protected whereForId(id: UserId): Record<string, unknown> {
    return { userId: id };
  }

  protected toDomain(raw: PrismaUserSettings): UserSettingsEntity {
    return UserSettingsEntity.create({
      id: raw.userId as UserId,
      userId: raw.userId as UserId,
      twoFactorEnabled: false,
      emailNotifications: raw.emailNotifications,
      smsNotifications: raw.smsNotifications,
      pushNotifications: raw.pushNotifications,
      marketingEmails: false,
      language: raw.language,
      timezone: raw.timezone,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserSettingsEntity): Record<string, unknown> {
    return {
      userId: domain.userId,
      language: 'bn',
      timezone: 'Asia/Dhaka',
      currency: 'BDT',
      theme: 'system',
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<UserSettingsEntity | null> {
    const raw = await this.prisma.userSettings.findUnique({
      where: { userId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
