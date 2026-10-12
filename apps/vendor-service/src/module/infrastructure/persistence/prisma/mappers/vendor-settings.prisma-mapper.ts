/**
 * VendorSettingsPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorSettings as PrismaVendorSettings } from '@prisma/client';
import { VendorSettingsEntity } from '../../../../domain/entities/vendor-settings.entity.js';
import type { VendorNotificationPrefs } from '../../../../domain/entities/vendor-settings.entity.js';

export class VendorSettingsPrismaMapper {
  static toDomain(row: PrismaVendorSettings): VendorSettingsEntity {
    return VendorSettingsEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        autoAcceptOrders: row.autoAcceptOrders,
        autoConfirmPayout: row.autoConfirmPayout,
        vacationMode: row.vacationMode,
        vacationMessage: row.vacationMessage ?? undefined,
        timezone: row.timezone,
        locale: row.locale,
        currency: row.currency,
        notifications: row.notifications as unknown as VendorNotificationPrefs,
      },
    });
  }

  static toPersistence(entity: VendorSettingsEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      autoAcceptOrders: entity.autoAcceptOrders,
      autoConfirmPayout: entity.autoConfirmPayout,
      vacationMode: entity.vacationMode,
      vacationMessage: entity.vacationMessage,
      timezone: entity.timezone,
      locale: entity.locale,
      currency: entity.currency,
      notifications: entity.notifications,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
