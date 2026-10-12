/**
 * User Settings Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserSettingsEntity } from '../../../../domain/entities/user-settings.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

export interface PrismaUserSettingsRow {
  id: string;
  userId: string;
  language: string;
  timezone: string;
  currency: string;
  theme: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserSettingsPrismaMapper {
  static toDomain(raw: PrismaUserSettingsRow): UserSettingsEntity {
    return UserSettingsEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        language: raw.language,
        timezone: raw.timezone,
        currency: raw.currency,
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        theme: (raw.theme as 'light' | 'dark' | 'system') ?? 'system',
        notificationsEnabled: raw.pushNotifications,
        marketingEmails: false,
        securityAlerts: true,
        loginAlerts: true,
        twoFactorRequired: false,
        sessionTimeout: 86400,
      },
    });
  }

  static toPersistence(entity: UserSettingsEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      language: entity.language,
      timezone: entity.timezone,
      currency: entity.currency,
      theme: entity.theme,
      emailNotifications: false,
      smsNotifications: false,
      pushNotifications: entity.notificationsEnabled,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
