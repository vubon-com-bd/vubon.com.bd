/**
 * User Preferences Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserPreferencesEntity } from '../../../../domain/entities/user-preferences.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

export interface PrismaUserPreferencesRow {
  id: string;
  userId: string;
  marketingEmails: boolean;
  productUpdates: boolean;
  orderUpdates: boolean;
  securityAlerts: boolean;
  newsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserPreferencesPrismaMapper {
  static toDomain(raw: PrismaUserPreferencesRow): UserPreferencesEntity {
    return UserPreferencesEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        whatsappNotifications: false,
        orderUpdates: raw.orderUpdates,
        promotions: raw.marketingEmails,
        newsletter: raw.newsletter,
        productRecommendations: raw.productUpdates,
        priceDropAlerts: false,
        backInStockAlerts: false,
      },
    });
  }

  static toPersistence(entity: UserPreferencesEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      marketingEmails: entity.promotions,
      productUpdates: entity.productRecommendations,
      orderUpdates: entity.orderUpdates,
      securityAlerts: true,
      newsletter: entity.newsletter,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
