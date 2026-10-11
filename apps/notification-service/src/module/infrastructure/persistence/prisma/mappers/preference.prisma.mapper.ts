/**
 * PreferencePrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { PreferenceEntity } from '../../../../domain/entities/preference.entity.js';

export interface PrismaPreferenceRow {
  id: string;
  userId: string;
  channelPreferences: unknown;
  categoryPreferences: unknown;
  quietHoursEnabled: boolean;
  quietHoursStart: number | null;
  quietHoursEnd: number | null;
  timezone: string;
  locale: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const asBoolRecord = (v: unknown): Readonly<Record<string, boolean>> => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
  const out: Record<string, boolean> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    out[k] = Boolean(val);
  }
  return out;
};

export class PreferencePrismaMapper {
  static toDomain(raw: PrismaPreferenceRow): PreferenceEntity {
    return PreferenceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        userId: raw.userId,
        channelPreferences: asBoolRecord(raw.channelPreferences),
        categoryPreferences: asBoolRecord(raw.categoryPreferences),
        quietHoursEnabled: raw.quietHoursEnabled,
        quietHoursStart: raw.quietHoursStart ?? undefined,
        quietHoursEnd: raw.quietHoursEnd ?? undefined,
        timezone: raw.timezone,
        locale: raw.locale ?? undefined,
      },
    });
  }

  static toPersistence(entity: PreferenceEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId,
      channelPreferences: entity.channelPreferences,
      categoryPreferences: entity.categoryPreferences,
      quietHoursEnabled: entity.quietHoursEnabled,
      quietHoursStart: entity.quietHoursStart ?? null,
      quietHoursEnd: entity.quietHoursEnd ?? null,
      timezone: entity.timezone,
      locale: entity.locale ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
